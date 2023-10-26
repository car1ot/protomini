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
