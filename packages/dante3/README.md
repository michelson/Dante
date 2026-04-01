# dante3

Dante is a React editor built on top of TipTap and ProseMirror.

## Install

```bash
npm install dante3
```

## Basic usage

```tsx
import DanteEditor from "dante3";

export default function Example() {
  return <DanteEditor bodyPlaceholder="Write something useful" />;
}
```

## Highlights

- Configurable extensions, widgets, and tooltips
- JSON and HTML content support
- Renderer helpers for read-only surfaces
- Built-in media, file, embed, recorder, GIF, and dictation blocks

## Documentation

The package docs live in [docs](/Users/michelson/Documents/node-apps/Dante/packages/dante3/docs) and are rendered by the website in this repository.

## Development

```bash
npm install
npm run dante3:build
```

## License

MIT
