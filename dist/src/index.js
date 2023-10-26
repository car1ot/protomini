"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtoMini = void 0;
class ProtoMini {
    keysMapping;
    reverseKeysMapping;
    constructor(keysMapping) {
        this.keysMapping = keysMapping;
        this.reverseKeysMapping = {};
        for (const key in this.keysMapping) {
            this.reverseKeysMapping[this.keysMapping[key]] = key;
        }
    }
    encodePacket(packet) {
        return JSON.stringify(this.transform(packet, true), (_, v) => typeof v === 'bigint' ? v.toString() : v);
    }
    decodePacket(packet) {
        return this.transform(JSON.parse(packet), false);
    }
    transform(obj, encode) {
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
    encodeString(str) {
        return this.keysMapping[str] || str;
    }
    decodeString(encodedStr) {
        return this.reverseKeysMapping[encodedStr] || encodedStr;
    }
    transformObject(obj, encode) {
        const newObj = {};
        const keys = Object.keys(obj);
        for (const key of keys) {
            const newKey = encode ? this.encodeString(key) : this.decodeString(key);
            newObj[newKey] = this.transform(obj[key], encode);
        }
        return newObj;
    }
}
exports.ProtoMini = ProtoMini;
