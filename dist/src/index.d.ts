type KeyMapping = {
    [key: string]: string;
};
type Primitive = string | number | bigint | boolean;
type Encodable = Primitive | Encodable[] | {
    [key: string]: Encodable;
};
export declare class ProtoMini {
    private keysMapping;
    private reverseKeysMapping;
    constructor(keysMapping: KeyMapping);
    encodePacket(packet: Encodable): string;
    decodePacket(packet: string): Encodable;
    private transform;
    private encodeString;
    private decodeString;
    private transformObject;
}
export {};
