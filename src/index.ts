type KeyMapping = { [key: string]: string };
type Primitive = string | number | BigInt | boolean;
type Encodable = Primitive | Encodable[] | { [key: string]: Encodable };

export class ProtoMini {
  private keysMapping: KeyMapping;

  constructor(keysMapping: KeyMapping) {
    this.keysMapping = keysMapping;
  }

  public encodePacket(packet: Encodable): string {
    const encodedPacket = this.replaceKeysAndValues(packet, true);
    return JSON.stringify(encodedPacket);
  }

  public decodePacket(encodedPacket: string): Encodable {
    const packet = JSON.parse(encodedPacket);
    return this.replaceKeysAndValues(packet, false);
  }

  private replaceKeysAndValues(obj: Encodable, encode: boolean): Encodable {
    const type = typeof obj;

    if (["function", "symbol", "undefined"].includes(type)) {
      throw new Error(`Unsupported type: ${type}`);
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.replaceKeysAndValues(item, encode));
    }

    if (type === "object") {
      const newObj: { [key: string]: Encodable } = {};
      for (const [key, value] of Object.entries(obj)) {
        const newKey = encode
          ? this.keysMapping[key] || key
          : Object.keys(this.keysMapping).find(
              (k) => this.keysMapping[k] === key
            ) || key;
        newObj[newKey] = this.replaceKeysAndValues(value as Encodable, encode);
      }
      return newObj;
    }

    if (typeof obj === "bigint") {
      return encode ? obj.toString() : BigInt(obj);
    }

    return obj;
  }
}
