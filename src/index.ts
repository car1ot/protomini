export class ProtoMini {
  private keysMapping: { [key: string]: string };

  constructor(keysMapping: { [key: string]: string }) {
    this.keysMapping = keysMapping;
  }

  public encodePacket(packet: any): string {
    const encodedPacket = this.replaceKeysAndValues(packet, true);
    return JSON.stringify(encodedPacket);
  }

  public decodePacket(encodedPacket: string): any {
    const packet = JSON.parse(encodedPacket);
    return this.replaceKeysAndValues(packet, false);
  }

  private replaceKeysAndValues(obj: any, encode: boolean): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.replaceKeysAndValues(item, encode));
    }

    if (typeof obj === "object") {
      const newObj: { [key: string]: any } = {};
      for (const [key, value] of Object.entries(obj)) {
        const newKey = encode
          ? this.keysMapping[key] || key
          : Object.keys(this.keysMapping).find(
              (k) => this.keysMapping[k] === key
            ) || key;
        newObj[newKey] = this.replaceKeysAndValues(value, encode);
      }
      return newObj;
    }

    if (typeof obj === "string") {
      return encode
        ? this.keysMapping[obj] || obj
        : Object.keys(this.keysMapping).find(
            (k) => this.keysMapping[k] === obj
          ) || obj;
    }

    return obj;
  }
}
