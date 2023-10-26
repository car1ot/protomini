import { ProtoMini } from "./index";

test("should encode and decode packets with nested objects", () => {
  const p = new ProtoMini({ nest: "n", level: "l", item: "i" });

  const originalPacket = { nest: { level: { item: "value" } } };
  const encoded = p.encodePacket(originalPacket);
  const decoded = p.decodePacket(encoded);

  expect(encoded).toBe('{"n":{"l":{"i":"value"}}}');
  expect(decoded).toEqual(originalPacket);
});

test("should encode and decode packets with arrays", () => {
  const p = new ProtoMini({ items: "i" });

  const originalPacket = { items: [1, 2, 3] };
  const encoded = p.encodePacket(originalPacket);
  const decoded = p.decodePacket(encoded);

  expect(encoded).toBe('{"i":[1,2,3]}');
  expect(decoded).toEqual(originalPacket);
});

test("should encode and decode packets with mixed data", () => {
  const p = new ProtoMini({ mix: "m", obj: "o", arr: "a" });

  const originalPacket = { mix: [1, { obj: "object" }, ["array"]] };
  const encoded = p.encodePacket(originalPacket);
  const decoded = p.decodePacket(encoded);

  expect(encoded).toBe('{"m":[1,{"o":"object"},["array"]]}');
  expect(decoded).toEqual(originalPacket);
});

test("should encode and decode packets with boolean values", () => {
  const p = new ProtoMini({ flag: "f" });

  const originalPacket = { flag: true };
  const encoded = p.encodePacket(originalPacket);
  const decoded = p.decodePacket(encoded);

  expect(encoded).toBe('{"f":true}');
  expect(decoded).toEqual(originalPacket);
});

test("should encode and decode packets with string values", () => {
  const p = new ProtoMini({ string: "s" });
  const originalPacket = { string: "hello" };
  const encoded = p.encodePacket(originalPacket);
  const decoded = p.decodePacket(encoded);
  expect(encoded).toBe('{"s":"hello"}');
  expect(decoded).toEqual(originalPacket);
});

test("should encode and decode packets with number values", () => {
  const p = new ProtoMini({ number: "n" });
  const originalPacket = { number: 42 };
  const encoded = p.encodePacket(originalPacket);
  const decoded = p.decodePacket(encoded);
  expect(encoded).toBe('{"n":42}');
  expect(decoded).toEqual(originalPacket);
});

test("should encode and decode packets with BigInt values", () => {
  const p = new ProtoMini({ bigInt: "b" });
  const originalPacket = { bigInt: BigInt(9007199254740991) };
  const encoded = p.encodePacket(originalPacket);
  const decoded = p.decodePacket(encoded);
  expect(encoded).toBe('{"b":"9007199254740991"}');
  expect(decoded).toEqual({ bigInt: "9007199254740991" }); // BigInt is converted to string during encoding
});

test("should encode and decode packets with boolean values", () => {
  const p = new ProtoMini({ boolean: "b" });
  const originalPacket = { boolean: true };
  const encoded = p.encodePacket(originalPacket);
  const decoded = p.decodePacket(encoded);
  expect(encoded).toBe('{"b":true}');
  expect(decoded).toEqual(originalPacket);
});

test("should throw error for unsupported types", () => {
  const p = new ProtoMini({});
  // @ts-ignore
  expect(() => p.encodePacket(() => {})).toThrow("Unsupported type: function");
  // @ts-ignore
  expect(() => p.encodePacket(Symbol())).toThrow("Unsupported type: symbol");
  // @ts-ignore
  expect(() => p.encodePacket(undefined)).toThrow(
    "Unsupported type: undefined"
  );
});
