type KeyMapping = { [key: string]: string };
type Primitive = string | number | bigint | boolean;
type Encodable = Primitive | Encodable[] | { [key: string]: Encodable };

export class ProtoMini {
  private reverseKeysMapping: { [key: string]: string };

  constructor(private keysMapping: KeyMapping) {
    this.reverseKeysMapping = {};
    for (const key in this.keysMapping) {
      this.reverseKeysMapping[this.keysMapping[key]] = key;
    }
  }

  encodePacket(packet: Encodable): string {
    return JSON.stringify(this.transform(packet, true), (_, v) =>
      typeof v === 'bigint' ? v.toString() : v,
    );
  }

  decodePacket(packet: string): Encodable {
    return this.transform(JSON.parse(packet), false);
  }

  private transform(obj: Encodable, encode: boolean): Encodable {
    if (['function', 'symbol', 'undefined'].includes(typeof obj)) {
      throw new Error(`Unsupported type: ${typeof obj}`);
    }

    if (typeof obj === 'string') {
      return encode ? this.encodeString(obj) : this.decodeString(obj);
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.transform(item, encode));
    }

    if (typeof obj === 'object' && obj !== null) {
      return this.transformObject(obj, encode);
    }

    return obj;
  }

  private encodeString(str: string): string {
    return this.keysMapping[str] || str;
  }

  private decodeString(encodedStr: string): string {
    return this.reverseKeysMapping[encodedStr] || encodedStr;
  }

  private transformObject(
    obj: { [key: string]: Encodable },
    encode: boolean,
  ): { [key: string]: Encodable } {
    const newObj: { [key: string]: Encodable } = {};
    const keys = Object.keys(obj);

    for (const key of keys) {
      const newKey = encode ? this.encodeString(key) : this.decodeString(key);
      newObj[newKey] = this.transform(obj[key], encode);
    }

    return newObj;
  }
}
