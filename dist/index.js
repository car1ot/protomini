"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtoMini = void 0;
class ProtoMini {
    keysMapping;
    constructor(keysMapping) {
        this.keysMapping = keysMapping;
    }
    encodePacket(packet) {
        const encodedPacket = this.replaceKeysAndValues(packet, true);
        return JSON.stringify(encodedPacket);
    }
    decodePacket(encodedPacket) {
        const packet = JSON.parse(encodedPacket);
        return this.replaceKeysAndValues(packet, false);
    }
    replaceKeysAndValues(obj, encode) {
        const type = typeof obj;
        if (['function', 'symbol', 'undefined'].includes(type)) {
            throw new Error(`Unsupported type: ${type}`);
        }
        if (Array.isArray(obj)) {
            return obj.map((item) => this.replaceKeysAndValues(item, encode));
        }
        if (type === 'object') {
            const newObj = {};
            for (const [key, value] of Object.entries(obj)) {
                const newKey = encode
                    ? this.keysMapping[key] || key
                    : Object.keys(this.keysMapping).find((k) => this.keysMapping[k] === key) || key;
                newObj[newKey] = this.replaceKeysAndValues(value, encode);
            }
            return newObj;
        }
        if (typeof obj === 'bigint') {
            return encode ? obj.toString() : BigInt(obj);
        }
        return obj;
    }
}
exports.ProtoMini = ProtoMini;
