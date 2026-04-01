# Dante

[![Rollup Build](https://github.com/michelson/Dante/actions/workflows/ci.yml/badge.svg)](https://github.com/michelson/Dante/actions/workflows/ci.yml)

Dante is a block editor and renderer built on top of TipTap and ProseMirror.
This repository contains the `dante3` package and the Next.js website that powers the live demo and documentation.

## What you get

- A React editor surface with configurable blocks, tooltips, and themes
- JSON and HTML content workflows
- Renderer and parser helpers for non-editor surfaces
- Built-in blocks for images, files, embeds, GIFs, dictation, and recorders

## Install

```bash
npm install dante3
```

## Basic usage

```tsx
import DanteEditor from "dante3";

export default function Example() {
  return <DanteEditor bodyPlaceholder="Write the next section" />;
}
```

## Website

Run the local demo and docs site:

```bash
npm install
npm run dev
```

The site runs on `http://localhost:8080`.

## Package build

Build the editor package:

```bash
npm run dante3:build
```

## Publish

Publish the package from the workspace:

```bash
npm run dante3:publish
```

## Documentation

The public docs are backed by the MDX files in [packages/dante3/docs](/Users/michelson/Documents/node-apps/Dante/packages/dante3/docs).

## License

MIT
