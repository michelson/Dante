import darkTheme from "./dark";
import defaultTheme from "./default";

// This is a bit hacky, but is the least invasive way to make the migration to typescript work
// Eventually, this could be moved into an explicit interface
type DanteTheme = typeof defaultTheme | typeof darkTheme

// This is the prescribed method for using custom themes with emotion and typescript
// @see https://emotion.sh/docs/typescript
declare module '@emotion/react' {
  export interface Theme extends DanteTheme {}
}

export { darkTheme, defaultTheme };
