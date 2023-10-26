type KeyMapping = {
    [key: string]: string;
};
type Primitive = string | number | bigint | boolean;
type Encodable = Primitive | Encodable[] | {
    [key: string]: Encodable;
};
export declare class ProtoMini {
    private keysMapping;
    constructor(keysMapping: KeyMapping);
    encodePacket(packet: Encodable): string;
    decodePacket(encodedPacket: string): Encodable;
    private replaceKeysAndValues;
}
export {};
