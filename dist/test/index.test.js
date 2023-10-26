"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
test('should encode and decode packets with nested objects', () => {
    const p = new index_1.ProtoMini({ nest: 'n', level: 'l', item: 'i' });
    const originalPacket = { nest: { level: { item: 'value' } } };
    const encoded = p.encodePacket(originalPacket);
    const decoded = p.decodePacket(encoded);
    expect(encoded).toBe('{"n":{"l":{"i":"value"}}}');
    expect(decoded).toEqual(originalPacket);
});
test('should encode and decode packets with caps values', () => {
    const p = new index_1.ProtoMini({ TEST: 't', FOO_BAR: 'fb' });
    const originalPacket = {
        TEST: {
            level: {
                55: true,
                item: 'FOO_BAR',
                FOO_BAR: 111,
                xxxxxxxxxxxxxxxxxxxxxxx: ['FOO_BAR', 'TEST'],
            },
        },
    };
    const encoded = p.encodePacket(originalPacket);
    const decoded = p.decodePacket(encoded);
    expect(encoded).toBe('{"t":{"level":{"55":true,"item":"fb","fb":111,"xxxxxxxxxxxxxxxxxxxxxxx":["fb","t"]}}}');
    expect(decoded).toEqual(originalPacket);
});
test('should encode and decode packets with arrays', () => {
    const p = new index_1.ProtoMini({ items: 'i' });
    const originalPacket = { items: [1, 2, 3] };
    const encoded = p.encodePacket(originalPacket);
    const decoded = p.decodePacket(encoded);
    expect(encoded).toBe('{"i":[1,2,3]}');
    expect(decoded).toEqual(originalPacket);
});
test('should encode and decode packets with mixed data', () => {
    const p = new index_1.ProtoMini({ mix: 'm', obj: 'o', arr: 'a' });
    const originalPacket = { mix: [1, { obj: 'object' }, ['array']] };
    const encoded = p.encodePacket(originalPacket);
    const decoded = p.decodePacket(encoded);
    expect(encoded).toBe('{"m":[1,{"o":"object"},["array"]]}');
    expect(decoded).toEqual(originalPacket);
});
test('should encode and decode packets with boolean values', () => {
    const p = new index_1.ProtoMini({ flag: 'f' });
    const originalPacket = { flag: true };
    const encoded = p.encodePacket(originalPacket);
    const decoded = p.decodePacket(encoded);
    expect(encoded).toBe('{"f":true}');
    expect(decoded).toEqual(originalPacket);
});
test('should encode and decode packets with string values', () => {
    const p = new index_1.ProtoMini({ string: 's' });
    const originalPacket = { string: 'hello' };
    const encoded = p.encodePacket(originalPacket);
    const decoded = p.decodePacket(encoded);
    expect(encoded).toBe('{"s":"hello"}');
    expect(decoded).toEqual(originalPacket);
});
test('should encode and decode packets with number values', () => {
    const p = new index_1.ProtoMini({ number: 'n' });
    const originalPacket = { number: 42 };
    const encoded = p.encodePacket(originalPacket);
    const decoded = p.decodePacket(encoded);
    expect(encoded).toBe('{"n":42}');
    expect(decoded).toEqual(originalPacket);
});
test('should encode and decode packets with BigInt values', () => {
    const p = new index_1.ProtoMini({ bigInt: 'b' });
    const originalPacket = { bigInt: BigInt(9007199254740991) };
    const encoded = p.encodePacket(originalPacket);
    const decoded = p.decodePacket(encoded);
    expect(encoded).toBe('{"b":"9007199254740991"}');
    expect(decoded).toEqual({ bigInt: '9007199254740991' }); // BigInt is converted to string during encoding
});
test('should encode and decode packets with boolean values', () => {
    const p = new index_1.ProtoMini({ boolean: 'b' });
    const originalPacket = { boolean: true };
    const encoded = p.encodePacket(originalPacket);
    const decoded = p.decodePacket(encoded);
    expect(encoded).toBe('{"b":true}');
    expect(decoded).toEqual(originalPacket);
});
test('should throw error for unsupported types', () => {
    const p = new index_1.ProtoMini({});
    const fn = () => { };
    expect(() => p.encodePacket(fn)).toThrow('Unsupported type: function');
    const sym = Symbol();
    expect(() => p.encodePacket(sym)).toThrow('Unsupported type: symbol');
    const undef = undefined;
    expect(() => p.encodePacket(undef)).toThrow('Unsupported type: undefined');
});
