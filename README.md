# Vite Plugin Replace2

| package | version | downloads | license |
| :---: | :---: | :---: | :---: |
| [vite-plugin-replace2](https://github.com/Keystion/vite-plugin-replace2) | ![NPM Version](https://img.shields.io/npm/v/vite-plugin-replace2) | ![NPM Downloads](https://img.shields.io/npm/dm/vite-plugin-replace2) | ![NPM License](https://img.shields.io/npm/l/vite-plugin-replace2) |
| [vite-plugin-replace](https://github.com/leanupjs/vite-plugin-replace) | ![NPM Version](https://img.shields.io/npm/v/vite-plugin-replace) | ![NPM Downloads](https://img.shields.io/npm/dm/vite-plugin-replace) | ![NPM License](https://img.shields.io/npm/l/vite-plugin-replace) |

[vite-plugin-replace](https://github.com/leanupjs/vite-plugin-replace) has quite a few downloads, but the author no longer maintains it, so I forked the original author's code and made some improvements.

## Features

- Support both string and RegExp patterns
- Support function replacements
- **Exclude files/directories from processing**
- TypeScript support
- Compatible with Vite 2.x

## Installation

```bash
npm i -D vite-plugin-replace2
# or
pnpm add -D vite-plugin-replace2
# or
yarn add -D vite-plugin-replace2
```

## Usage

```ts
import { replaceCodePlugin } from "vite-plugin-replace2";
import { defineConfig } from "vite";
import packageJson from "./package.json";

export default defineConfig({
  plugins: [
    replaceCodePlugin({
      replacements: [
        {
          from: "__CLI_NAME__",
          to: packageJson.name,
        },
        {
          from: /__CLI_VERSION__/g,
          to: packageJson.version,
        },
        {
          // Using function replacement
          from: /__DATE__/g,
          to: () => new Date().toISOString(),
        },
      ],
      exclude: ["node_modules"], // Optional: exclude directories
    }),
  ],
});
```

## Configuration

### VitePluginReplaceConfig

```ts
interface VitePluginReplaceConfig {
  replacements: ViteReplacement[];
  exclude?: string | string[];
}

interface ViteReplacement {
  from: string | RegExp;  // Pattern to match
  to: string | Function;  // Replacement string or function
}
```

| Option | Type | Description |
|--------|------|-------------|
| `replacements` | `Array` | Array of replacement rules |
| `exclude` | `string \| string[]` | Files/directories to exclude from processing |

### Replacement Options

| Option | Type | Description |
|--------|------|-------------|
| `from` | `string \| RegExp` | String or RegExp pattern to match |
| `to` | `string \| Function` | Replacement value or function |

## Examples

### Using String Replacement

```ts
{
  from: "__VERSION__",
  to: "1.0.0"
}
```

### Using RegExp

```ts
{
  from: /__VERSION__/g,
  to: "1.0.0"
}
```

### Using Function Replacement

```ts
{
  from: /__TIMESTAMP__/g,
  to: () => Date.now().toString()
}
```

## License

MIT

## Contributing

Issues and PRs are welcome!

## Thanks

- [vite-plugin-replace](https://github.com/leanupjs/vite-plugin-replace)
