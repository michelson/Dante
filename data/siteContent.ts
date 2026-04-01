export const siteExamples = [
  {
    id: "editorial",
    eyebrow: "Editorial Flow",
    title: "Long-form writing with structure, quotes, and code.",
    description:
      "A starter document for articles, changelogs, and internal notes where formatting should feel invisible.",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Ship polished stories faster" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Dante is a block editor for teams who want a clean writing surface, rich media blocks, and content that serializes cleanly as JSON or HTML.",
            },
          ],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "The editor should disappear while the structure stays obvious.",
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "What this preset shows" }],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Headings, lists, blockquotes, and code blocks." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "A writing-first layout that still supports media blocks." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Content that remains portable across storage formats." }],
                },
              ],
            },
          ],
        },
        {
          type: "codeBlock",
          attrs: { language: "tsx" },
          content: [
            {
              type: "text",
              text: "<DanteEditor bodyPlaceholder=\"Write the next publishable draft\" />",
            },
          ],
        },
      ],
    },
  },
  {
    id: "product",
    eyebrow: "Product Spec",
    title: "Structured notes for features, RFCs, and launch plans.",
    description:
      "A preset focused on fast scannability with sections, task-oriented copy, and implementation snippets.",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Inline editor redesign brief" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Use Dante when the product team wants one surface for rich drafting, structured embeds, and editorial review without custom serializers everywhere.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Goals" }],
        },
        {
          type: "orderedList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Keep block configuration explicit and composable." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Make embeds, uploads, and custom widgets feel native." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Preserve a readable document structure in storage." }],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Implementation note" }],
        },
        {
          type: "codeBlock",
          attrs: { language: "js" },
          content: [
            {
              type: "text",
              text: "const editor = <DanteEditor widgets={defaultPlugins} readOnly={false} />",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Use this preset to validate basic authoring before enabling media-specific extensions in your product.",
            },
          ],
        },
      ],
    },
  },
  {
    id: "docs",
    eyebrow: "API Draft",
    title: "A concise example aimed at docs, snippets, and renderer output.",
    description:
      "Useful when you want to test code-heavy content and the renderer pipeline without switching tools.",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Renderer-first content workflow" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Dante can feed both editing and rendering flows. Store rich JSON, render it later, and keep the same extension vocabulary across both surfaces.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Read the full guides in the documentation, or start with the ",
            },
            {
              type: "text",
              text: "Renderer",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "/posts/renderer",
                    target: null,
                    class: null,
                  },
                },
              ],
            },
            {
              type: "text",
              text: " and ",
            },
            {
              type: "text",
              text: "Parsers",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "/posts/parsers",
                    target: null,
                    class: null,
                  },
                },
              ],
            },
            {
              type: "text",
              text: " guides.",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Keep JSON source-of-truth when you need structured output." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Render articles outside the editor with the same content schema." }],
                },
              ],
            },
          ],
        },
      ],
    },
  },
] as const;

export const platformHighlights = [
  {
    title: "TipTap + ProseMirror core",
    copy: "A modern editing engine with predictable document structure and extension points.",
  },
  {
    title: "JSON or HTML output",
    copy: "Persist rich content in the format that fits your product and keep renderer parity.",
  },
  {
    title: "React block architecture",
    copy: "Compose node views for uploads, recorders, embeds, dictation, and custom interactions.",
  },
];

export const featureHighlights = [
  {
    title: "Media blocks that feel first-party",
    copy: "Image, file, embed, video, audio recorder, video recorder, dictation, and GIF flows all live inside the same authoring surface.",
  },
  {
    title: "Composable integration surface",
    copy: "Pass widgets, tooltips, upload handlers, editor props, and renderer helpers without forking the editor core.",
  },
  {
    title: "Documentation with live code",
    copy: "The docs run live snippets so you can test APIs in place instead of copying disconnected examples.",
  },
];

export const docsHighlights = [
  {
    slug: "index",
    eyebrow: "Start Here",
    title: "Basic options",
    copy: "Set up the editor, placeholders, readonly mode, update callbacks, and tooltip placement.",
  },
  {
    slug: "extensions",
    eyebrow: "Blocks",
    title: "Configurable extensions",
    copy: "Wire upload handlers and custom block options without leaving the docs examples.",
  },
  {
    slug: "renderer",
    eyebrow: "Output",
    title: "Renderer",
    copy: "Render Dante content outside the editor while preserving your extension model.",
  },
  {
    slug: "parsers",
    eyebrow: "Input",
    title: "Parsers",
    copy: "Parse HTML into Dante JSON with the same extension set you use at runtime.",
  },
];
