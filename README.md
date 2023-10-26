# ProtoMini

![ProtoMini Logo](https://i.imgur.com/EAu5bx4.png)

[![npm version](https://img.shields.io/npm/v/protomini.svg)](https://www.npmjs.com/package/protomini)
[![Build Status](https://img.shields.io/github/workflow/status/car1ot/protomini/CI)](https://github.com/car1ot/protomini/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Minimize and optimize your network packets for optimal speed and efficiency with ProtoMini.

## Features

- 🚀 Fast encoding and decoding
- 📦 Simple API
- 🛠 TypeScript support
- 🎮 Perfect for real-time game development
- 🌐 Minimize network latency

## Installation

```bash
npm install protomini
```

## Usage

```typescript
import { ProtoMini } from 'protomini';

const p = new ProtoMini({ foo: "f", bar: "b" });

const originalPacket = { foo: ["bar", { bar: "bar" }] };
const encoded = p.encodePacket(originalPacket);
const decoded = p.decodePacket(encoded);
```

## API Reference

### `constructor(keysMapping: { [key: string]: string })`

Initialize a new ProtoMini instance.

### `encodePacket(packet: any): string`

Encode a packet.

### `decodePacket(encodedPacket: string): any`

Decode an encoded packet.

## Tests

Run tests using Jest:

```bash
npm test
```

## License

[MIT](./LICENSE)

## Author

👤 [car1ot](https://github.com/car1ot)

## Support

Raise an issue [here](https://github.com/car1ot/protomini/issues) for any bugs or feature requests.
