export function content2() {
  return `
		<h2>
			Hi there,
		</h2>
		<img src="https://avatars.githubusercontent.com/u/2500670?s=120&v=4" width="100%" height="200px"></img>


		<node-view>
			<div contenteditable="false">
				non-editable text
			</div>
			<div>
				editable text
			</div>
		</node-view>

		<editable-block>
			<div>
				editable text
			</div>
		</editable-block>

		<image-block count="0" 
			url="https://avatars.githubusercontent.com/u/2500670?s=120&v=4">
			<p>This is editable.</p>
		</image-block>

		<react-component count="0" 
			url="https://avatars.githubusercontent.com/u/2500670?s=120&v=4">
			<p>This is editable.</p>
		</react-component>

		<p>
			this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
		</p>
		<ul>
			<li>
				That’s a bullet list with one …
			</li>
			<li>
				… or two list items.
			</li>
		</ul>
		<p>
			Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
		</p>
		<pre><code class="language-css">body {
		display: none;
		}</code></pre>
		<p>
			I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
		</p>
		<blockquote>
			Wow, that’s amazing. Good work, boy! 👏
			<br />
			— Mom
		</blockquote>
`;
}

export default function content() {
  return `
	<h2 class="graf graf--h">The Node version printed in the Node.js <span style="color: #e721eb">Version</span> panel is used in Cypress to:</h2><p class="graf graf--p"></p><image-block url="https://media1.giphy.com/media/3ohs7HdhQA4ffttvrO/giphy.gif" width="480" height="480" loading="false" loading_progress="0" caption="caption!" direction="left" aspect_ratio="[object Object]"></image-block><p class="graf graf--p">hola como estas I am very good and you this is the story of that Mary Lou did big time Big Bird big big boobs and then the lady Lilith ellise tired and leaves your do very low very low I want to live tonight by the new really countdown night I'm running kind of middle a the chicken <strong>nevermind</strong> DiCaprio Pines everyone tonight both of them in the raking in the money moves Bueller I'm the sole in the crane than by there and its crying in the pride is too I am very cute and you this is the story of Mary to do did Big Time big bird big boobs and the little little league and then the little lady lived at least I added</p><ul><li><p class="graf graf--p">Build files in the&nbsp;<a target="_blank" rel="noopener noreferrer nofollow" class="markup--anchor" href="https://docs.cypress.io/guides/references/configuration#Folders-Files">integrationFolder</a>.</p></li><li><p class="graf graf--p">Build files in the&nbsp;<a target="_blank" rel="noopener noreferrer nofollow" class="markup--anchor" href="https://docs.cypress.io/guides/references/configuration#Folders-Files">supportFile</a>.</p></li><li><p class="graf graf--p">Execute code in the&nbsp;<a target="_blank" rel="noopener noreferrer nofollow" class="markup--anchor" href="https://docs.cypress.io/guides/references/configuration#Folders-Files">pluginsFile</a>.</p></li></ul><p class="graf graf--p">Cypress comes automatically bundled with a set Node version by default. You can see the bundled version by running the&nbsp;<code>cypress version</code>&nbsp;command, for example:</p><pre><code>npx cypress version
	Cypress package version: 6.2.1
	Cypress binary version: 6.2.1
	Electron version: 11.1.1
	Bundled Node version: 12.18.3
	</code></pre><p class="graf graf--p">You may want to use a different Node version if the code executing from the plugins file requires features present in a different Node version from the Node version bundled with Cypress. You can use the Node version detected on your system by setting the&nbsp;<a target="_blank" rel="noopener noreferrer nofollow" class="markup--anchor" href="https://docs.cypress.io/guides/references/configuration#Node-version">nodeVersion</a>&nbsp;configuration to&nbsp;<code>system</code>. For example, you need to use the system Node if you want to load&nbsp;<code>node-sass</code>&nbsp;or&nbsp;<code>sqlite3</code>&nbsp;modules from your plugins file.</p><image-block src="https://docs.cypress.io/_nuxt/img/test-runner-settings-nodejs-version.4028364.jpg" width="1000" height="702" loading="false" loading_progress="0" caption="caption!" direction="center" aspect_ratio="[object Object]"></image-block><h3 class="graf graf--h"><strong>Experiments</strong></h3><p class="graf graf--p">Configuration might include experimental options currently being tested. See&nbsp;<a target="_blank" rel="noopener noreferrer nofollow" class="markup--anchor" href="https://docs.cypress.io/guides/references/experiments">Experiments</a>&nbsp;page.</p><h2 class="graf graf--h"><strong>Overriding Options</strong></h2><p class="graf graf--p">Cypress gives you the option to dynamically alter configuration values. This is helpful when running Cypress in multiple environments and on multiple developer machines.</p><p class="graf graf--p">This gives you the option to do things like override the&nbsp;<code>baseUrl</code>&nbsp;or environment variables.</p><h3 class="graf graf--h"><strong>Command Line</strong></h3><p class="graf graf--p">When&nbsp;<a target="_blank" rel="noopener noreferrer nofollow" class="markup--anchor" href="https://docs.cypress.io/guides/guides/command-line">running Cypress from the Command Line</a>&nbsp;you can pass a&nbsp;<code>--config</code>&nbsp;flag.</p><p class="graf graf--p"><strong>Examples:</strong></p><pre><code>cypress open --config pageLoadTimeout=30000,baseUrl=https://myapp.com
	</code></pre><pre><code>cypress run --config integrationFolder=tests,videoUploadOnPasses=false
	</code></pre><pre><code>cypress run --browser firefox --config viewportWidth=1280,viewportHeight=720
	</code></pre><p class="graf graf--p">For more complex configuration objects, you may want to consider passing a&nbsp;<a target="_blank" rel="noopener noreferrer nofollow" class="markup--anchor" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify">JSON.stringified</a>&nbsp;object surrounded by single quotes.</p><pre><code>cypress open --config '{"watchForFileChanges":false,"testFiles":["**/*.js","**/*.ts"]}'
	</code></pre><h3 class="graf graf--h"><strong>Runner Specific Overrides</strong></h3><p class="graf graf--p">You can override configuration for either the E2E or&nbsp;<a target="_blank" rel="noopener noreferrer nofollow" class="markup--anchor" href="https://docs.cypress.io/guides/component-testing/introduction/">Component Testing</a>&nbsp;runner using the&nbsp;<code>e2e</code>&nbsp;and&nbsp;<code>component</code>&nbsp;options.</p><p class="graf graf--p"><strong>Examples</strong></p>
	`;
}

export const jsonContentD = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        { type: "text", text: "The Node version printed in the Node.js " },
        {
          type: "text",
          marks: [{ type: "textStyle", attrs: { color: "" } }],
          text: "Version",
        },
        { type: "text", text: " panel is used in Cypress to:" },
      ],
    },
    { type: "paragraph" },
    {
      type: "ImageBlock",
      attrs: {
        url: "https://media1.giphy.com/media/3ohs7HdhQA4ffttvrO/giphy.gif",
        src: null,
        width: 480,
        height: 480,
        loading: false,
        loading_progress: 0,
        caption: "caption!",
        direction: "left",
        file: null,
        aspect_ratio: { width: 480, height: 480, ratio: 100 },
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "hola como estas I am very good and you this is the story of that Mary Lou did big time Big Bird big big boobs and then the lady Lilith ellise tired and leaves your do very low very low I want to live tonight by the new really countdown night I'm running kind of middle a the chicken ",
        },
        { type: "text", marks: [{ type: "bold" }], text: "nevermind" },
        {
          type: "text",
          text: " DiCaprio Pines everyone tonight both of them in the raking in the money moves Bueller I'm the sole in the crane than by there and its crying in the pride is too I am very cute and you this is the story of Mary to do did Big Time big bird big boobs and the little little league and then the little lady lived at least I added",
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
              content: [
                { type: "text", text: "Build files in the " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://docs.cypress.io/guides/references/configuration#Folders-Files",
                        target: "_blank",
                      },
                    },
                  ],
                  text: "integrationFolder",
                },
                { type: "text", text: "." },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Build files in the " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://docs.cypress.io/guides/references/configuration#Folders-Files",
                        target: "_blank",
                      },
                    },
                  ],
                  text: "supportFile",
                },
                { type: "text", text: "." },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Execute code in the " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://docs.cypress.io/guides/references/configuration#Folders-Files",
                        target: "_blank",
                      },
                    },
                  ],
                  text: "pluginsFile",
                },
                { type: "text", text: "." },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Cypress comes automatically bundled with a set Node version by default. You can see the bundled version by running the ",
        },
        { type: "text", marks: [{ type: "code" }], text: "cypress version" },
        { type: "text", text: " command, for example:" },
      ],
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [
        {
          type: "text",
          text: "npx cypress version\n\tCypress package version: 6.2.1\n\tCypress binary version: 6.2.1\n\tElectron version: 11.1.1\n\tBundled Node version: 12.18.3\n\t",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "You may want to use a different Node version if the code executing from the plugins file requires features present in a different Node version from the Node version bundled with Cypress. You can use the Node version detected on your system by setting the ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://docs.cypress.io/guides/references/configuration#Node-version",
                target: "_blank",
              },
            },
          ],
          text: "nodeVersion",
        },
        { type: "text", text: " configuration to " },
        { type: "text", marks: [{ type: "code" }], text: "system" },
        {
          type: "text",
          text: ". For example, you need to use the system Node if you want to load ",
        },
        { type: "text", marks: [{ type: "code" }], text: "node-sass" },
        { type: "text", text: " or " },
        { type: "text", marks: [{ type: "code" }], text: "sqlite3" },
        { type: "text", text: " modules from your plugins file." },
      ],
    },
    {
      type: "ImageBlock",
      attrs: {
        url: null,
        src: "https://docs.cypress.io/_nuxt/img/test-runner-settings-nodejs-version.4028364.jpg",
        width: 1000,
        height: 702,
        loading: false,
        loading_progress: 0,
        caption: "caption!",
        direction: "center",
        file: null,
        aspect_ratio: { width: 1000, height: 702, ratio: 70.19999999999999 },
      },
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [
        { type: "text", marks: [{ type: "bold" }], text: "Experiments" },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Configuration might include experimental options currently being tested. See ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://docs.cypress.io/guides/references/experiments",
                target: "_blank",
              },
            },
          ],
          text: "Experiments",
        },
        { type: "text", text: " page." },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        { type: "text", marks: [{ type: "bold" }], text: "Overriding Options" },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Cypress gives you the option to dynamically alter configuration values. This is helpful when running Cypress in multiple environments and on multiple developer machines.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This gives you the option to do things like override the ",
        },
        { type: "text", marks: [{ type: "code" }], text: "baseUrl" },
        { type: "text", text: " or environment variables." },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [
        { type: "text", marks: [{ type: "bold" }], text: "Command Line" },
      ],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "When " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://docs.cypress.io/guides/guides/command-line",
                target: "_blank",
              },
            },
          ],
          text: "running Cypress from the Command Line",
        },
        { type: "text", text: " you can pass a " },
        { type: "text", marks: [{ type: "code" }], text: "--config" },
        { type: "text", text: " flag." },
      ],
    },
    {
      type: "paragraph",
      content: [{ type: "text", marks: [{ type: "bold" }], text: "Examples:" }],
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [
        {
          type: "text",
          text: "cypress open --config pageLoadTimeout=30000,baseUrl=https://myapp.com\n\t",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [
        {
          type: "text",
          text: "cypress run --config integrationFolder=tests,videoUploadOnPasses=false\n\t",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [
        {
          type: "text",
          text: "cypress run --browser firefox --config viewportWidth=1280,viewportHeight=720\n\t",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "For more complex configuration objects, you may want to consider passing a ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
                target: "_blank",
              },
            },
          ],
          text: "JSON.stringified",
        },
        { type: "text", text: " object surrounded by single quotes." },
      ],
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [
        {
          type: "text",
          text: 'cypress open --config \'{"watchForFileChanges":false,"testFiles":["**/*.js","**/*.ts"]}\'\n\t',
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [
        {
          type: "text",
          marks: [{ type: "bold" }],
          text: "Runner Specific Overrides",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "You can override configuration for either the E2E or ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://docs.cypress.io/guides/component-testing/introduction/",
                target: "_blank",
              },
            },
          ],
          text: "Component Testing",
        },
        { type: "text", text: " runner using the " },
        { type: "text", marks: [{ type: "code" }], text: "e2e" },
        { type: "text", text: " and " },
        { type: "text", marks: [{ type: "code" }], text: "component" },
        { type: "text", text: " options." },
      ],
    },
    {
      type: "paragraph",
      content: [{ type: "text", marks: [{ type: "bold" }], text: "Examples" }],
    },
  ],
};

export const jsonContent2 = {
  type: "doc",
  content: [
    {
      content: [
        {
          text: "https://www.youtu",
          marks: [
            {
              type: "link",
              attrs: { href: "https://www.youtube.com ", target: "_blank" },
            },
          ],
          type: "text",
        },
        {
          text: "be.",
          marks: [
            { type: "textStyle", attrs: { color: "#dd1010" } },
            {
              type: "link",
              attrs: { href: "https://www.youtube.com ", target: "_blank" },
            },
          ],
          type: "text",
        },
        {
          text: "com ",
          marks: [
            {
              type: "link",
              attrs: { href: "https://www.youtube.com ", target: "_blank" },
            },
          ],
          type: "text",
        },
        { text: " iho", type: "text" },
        { text: "ij o", marks: [{ type: "bold" }], type: "text" },
        { text: "ij", type: "text" },
      ],
      type: "paragraph",
    },
  ],
};

export const contentDemo = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 1,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Dante 3 - This is it!",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Just another medium clone built on top of TipTap",
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
              text: "Dante3 is a Tiptap port of ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "https://github.com/michelson/Dante/tree/master/packages/dante2",
                    target: "_blank",
                  },
                },
              ],
              text: "Dante2 (Draftjs) ",
            },
            {
              type: "text",
              text: ". This version is built on top of ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "https://www.tiptap.dev/",
                    target: "_blank",
                  },
                },
              ],
              text: "TipTap",
            },
            {
              type: "text",
              text: " and reaches all Dante2's features with a shiny ultra mega super uber maintainable architecture.",
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "See the demo at: ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://dante.vercel.com/",
                target: "_blank",
              },
            },
          ],
          text: "dante-editor.dev",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Why rewrite a new version of Dante?",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "The previous version (Dante2) was made on DraftJs, that's a facebook library to build WYSIWYG editor, I'd choose that technology because it implemented a very interesting data model and abstracted many parts of the heuristics implementation that ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://github.com/michelson/Dante/tree/master/packages/dante1-legacy",
                target: "_blank",
              },
            },
          ],
          text: "Dante1 (the previous version)",
        },
        {
          type: "text",
          text: " built as a naive implementation relying a lot on DOM manipulation, So Dante2 was great and is working on a ton of production websites. Sadly over the last years this library has not received much attention from maintainers. Among the ~700 unattended reported issues there are some that have become a deal breaker for me:",
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
              content: [
                {
                  type: "text",
                  text: "Bad mobile support.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "~1MB added to your bundle (immutablejs is heavy)",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Not created for realtime collab.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "My bet, ProseMirror/TipTap",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "After shopping many editors libraries, I mean after tried to implement Dante on almost all of them ",
        },
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "(Trix, Editorjs, Quilljs, Slate, Prosemirror)",
        },
        {
          type: "text",
          text: " I've choosen TipTap library (which is based on Prosemirror library)., I guess all editors libraries have their own flaws but after review it all TipTap is the best of it's class, very well designed/architectured, and I love the community around their ecosystem. So that's it.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Features:",
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
              content: [
                {
                  type: "text",
                  text: "Configurable and extensible extensions / plugins / components",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Undo/redo.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Save Content as a data JSON/HTML structure.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Load Content as a data JSON/HTML structure.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Styled components Theme support (built in light/dark themes).",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Block based content",
        },
        {
          type: "text",
          text: ":",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Dante editor can be extended with (React) components to, currently there are default components to be used as is:",
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
              content: [
                {
                  type: "text",
                  text: "Image upload for paste html.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Video embed.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Video Recorder.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Embed.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Divider.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Speech.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Giphy.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Installation",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "code",
            },
          ],
          text: "npm install dante3",
        },
        {
          type: "text",
          text: " or ",
        },
        {
          type: "text",
          marks: [
            {
              type: "code",
            },
          ],
          text: "yarn add dante3",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Usage",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Component Based",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          type: "text",
          text: "<DanteEditor\n  content={'hello world'}\n/>",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Options:",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Many configuration options and plugin usage can be found on the documentation page:",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "See ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://dante.vercel.com/",
                target: "_blank",
              },
            },
          ],
          text: "dante-editor.dev",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Development",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Installation",
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
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "git clone https://github.com/michelson/dante",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "dependencies",
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
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "npm install",
                },
                {
                  type: "text",
                  text: " or ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "yarn install",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Building",
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
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "npm dante3_build",
                },
                {
                  type: "text",
                  text: " or ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "yarn dante3_build",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "dev install:",
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
              content: [
                {
                  type: "text",
                  text: "lerna bootstrap",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "yarn dev",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Status",
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
              text: "Dante3 is on beta, actively maintained, with all the features that Dante2 has. As is relying in Prosemirror/TipTap this has better browser support and mobile support. Also has realtime collab capabilities.",
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Monorepo",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This repository now contains prior Dante versions, located in the ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://github.com/michelson/Dante/tree/master/packages",
                target: "_blank",
              },
            },
          ],
          text: "packages",
        },
        {
          type: "text",
          text: " folder. so Dante1*, Dante2 and Dante3 lives in the same repo.",
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
              text: "* Dante(1) is not maintained anymore.",
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Open source license",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Dante is licensed under MIT, so you are free to do whatever you want. If you are using it commercially, become one of our wonderful sponsors to fund the maintenance, support and development of Dante now and in the future.",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "💓 Your sponsorship",
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
              text: "Your sponsorship helps to maintain, update, support and develop all of our open source projects.",
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Acknowledgments",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Prosemirror library & Tiptap authors",
        },
      ],
    },
  ],
};
//{"type":"doc","content":[{"type":"VideoRecorderBlock","attrs":{"rejectedReason":"","secondsLeft":0,"fileReady":true,"paused":false,"url":"/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaFFHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4664966424744f6acc1eed3be6667bf6e73dda8b/recorded","recording":false,"granted":true,"loading":false,"direction":"center"}},{"content":[],"type":"paragraph"},{"content":[],"type":"paragraph"},{"type":"EmbedBlock","attrs":{"embed_data":{"url":"https://www.youtube.com/watch?v=LfonmMEWEyU","title":"Manuel Riesco: \"La verdad es que el sistema de AFP no le da pensiones a nadie\"","description":null,"html":"\u003ciframe width=\"200\" height=\"150\" src=\"https://www.youtube.com/embed/LfonmMEWEyU?feature=oembed\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen\u003e\u003c/iframe\u003e","provider_url":"https://www.youtube.com","images":[{"url":null}],"media":{"html":"\u003ciframe width=\"200\" height=\"150\" src=\"https://www.youtube.com/embed/LfonmMEWEyU?feature=oembed\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen\u003e\u003c/iframe\u003e"}}}},{"type":"VideoBlock","attrs":{"embed_data":{"url":"https://www.youtube.com/watch?v=LfonmMEWEyU","title":"Manuel Riesco: \"La verdad es que el sistema de AFP no le da pensiones a nadie\"","description":null,"html":"\u003ciframe width=\"200\" height=\"150\" src=\"https://www.youtube.com/embed/LfonmMEWEyU?feature=oembed\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen\u003e\u003c/iframe\u003e","provider_url":"https://www.youtube.com","images":[{"url":null}],"media":{"html":"\u003ciframe width=\"200\" height=\"150\" src=\"https://www.youtube.com/embed/LfonmMEWEyU?feature=oembed\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen\u003e\u003c/iframe\u003e"}},"provisory_text":"https://www.youtube.com/watch?v=LfonmMEWEyU\u0026lc=UggndzR2V4htengCoAEC"},"content":[{"text":"https://www.youtube.com/watch?v=LfonmMEWEyU\u0026lc=UggndzR2V4htengCoAEC","type":"text"}]},{"type":"DividerBlock"},{"content":[{"text":"Ruby Ranges: How Do They Work?","type":"text"}],"type":"heading","attrs":{"level":1}},{"type":"ImageBlock","attrs":{"aspect_ratio":{"width":164,"height":20,"ratio":12.195121951219512},"width":164,"caption":"type a caption (optional)","height":20,"forceUpload":false,"url":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAAAUCAMAAAA0oWYGAAAANlBMVEUAAACkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT0RuBeAAAAEXRSTlMAECAwQFBgcHuEj5+vv8/f7w0rGDcAAANcSURBVEjHzZbLlsMoDEQLMMYBPaj//9lZCDt2Oj1nZtesHCKbS0klwLFnACh9SwDQWkaM1Cj4I2OSDUAjtQAw8gUAyD6V9e9AcgA7SW6AktQEJPeMKQCaqqpKBoDDVNX2c1JVVW0k1PUsvRUAQLOIA4BNVVUK0FRUKwBsomIdaajoyEhdRaUAQFfRkZC6yjm0wUmyBSQTlAH9YgLMAQySJHcAyUiS/ZokSc6Mdv3wUXC+1AOyne/3a/IgSUH2kCa+ewBISnKW9c8agkmSc0G+ApIFOoFEeUN2ANtcUbHeN8i1nb7iznVJWa8bAAhJ1kCZZYXMbQV7RnpCxq9SSZKWZGHIBIQbLh5NpyZvSJ8+fVpaW/TYA7cH5NrZLME2CwLOErKR9BOSCiRZkEaSM8YIJblvS5SAHGjcPXyzIM9FbpBHziWXkhe9lLL7Eu0GeYreVlgD6krNByRf4YkTctZccsklLyUXJBekAJOyfSxS/Am5X+5rj4KY2w0yGTktdMoeBd+X3tnu6SZZcFdylru7b0qOpSTKtgI6yemkoMbDBemiotpPyHFV236DrCR186AakWZb5fOpJA39nm4TUbEd35Uctx7VSfqYtHSQIj+MY+kOOT4hB8kODaV3kiz59PJDSZ8kj3aH5Anzm5IPyNmMswp5/F/I7CQbDpKewrS1Lis/lRyNqzB+Qv4nJbkP0ia93iF9iIgej3RrNJcLcilTYhqD5OgkJX0qqauz3NM9RMT2S8n6r0pyjyYj2X43zgBQZzTOC1JJej/GOtgqSc7w+IeSM+X5hJz5q3F+VzI+cKS7cY6Ucsr5akE575M3/76Ajc+ufzZpz/hRk+Xsw+8WlFJKKYfTyJYXZP8FMuLqA3KamZnbFoaYFgTz1sxfd0i2q5jjfvVQ0q9GfKXbYwFdbx1L0bR9h2zhn8jIx7HI/ddjMVlk+3WMdWotaSu+KYnI14dxOKOk2deyCfMTUmITe1wJvlwwWG+QM46AdcF4G+p0VBh1poCc9wtGwepRzDjLM8Z1WkRgjtK+QzYz84piZg1J3XyPyTXcCup6VjnWVc3NfMfuZlavGavAy8183Y+yuLkWpOHmmgFkdXPJSOLvFWRZs68LSAkD/pkr+XuUPg8AqDozgPya/W8B/gPQAm/tWHkI8wAAAABJRU5ErkJggg==","loading_progress":0,"selected":false,"loading":false,"direction":"center"}},{"content":[{"text":"What is a Range in Ruby \u0026 how does it work?","type":"text"}],"type":"paragraph"},{"content":[{"text":"A range is an object which has a starting value \u0026 ending value, they help you create sequences that span the whole range between these two values.","type":"text"}],"type":"paragraph"},{"content":[{"text":"You could go from ","type":"text"},{"text":"1 to ","type":"text"},{"text":"20, or from ","type":"text"},{"text":"\"a\" to ","type":"text"},{"text":"\"z\".","type":"text"}],"type":"paragraph"},{"content":[{"text":"In this article you’ll discover:","type":"text"}],"type":"paragraph"},{"content":[{"text":"Let’s do this!","type":"text"}],"type":"paragraph"},{"content":[{"text":"Understanding Ranges","type":"text"}],"type":"heading","attrs":{"level":2}},{"content":[{"text":"Just as a reminder, this is what Ruby range syntax looks like:","type":"text"}],"type":"paragraph"},{"content":[{"text":"(1..20","type":"text"},{"text":")","marks":[{"type":"bold"}],"type":"text"}],"type":"paragraph"},{"content":[{"text":"The parenthesis are not necessary to define a ","type":"text"},{"text":"Range.","type":"text"}],"type":"paragraph"},{"content":[{"text":"But if you want to call methods on your range you will need them. Otherwise, you are calling the method on the 2nd element of the range, instead of the range itself.","type":"text"}],"type":"paragraph"},{"content":[{"text":"The ","type":"text"},{"text":"Range class includes Enumerable, so you get all the powerful iteration methods without having to convert the range into an array.","type":"text"}],"type":"paragraph"},{"content":[{"text":"Ruby Step Method","type":"text"}],"type":"heading","attrs":{"level":2}},{"content":[{"text":"Range has some useful methods, like the ","type":"text"},{"text":"step method.","type":"text"}],"type":"paragraph"},{"content":[{"text":"Get My Ultimate Ruby Cheatsheet: This handy 7-page PDF helps you QUICKLY find the Ruby syntax you need, that Ruby method you're looking for or that built-in class which you can't quite remember the name.","type":"text"}],"type":"paragraph"},{"content":[{"text":"Get Free Ruby CheatSheet","type":"text"}],"type":"paragraph"},{"content":[{"text":"Example:","type":"text"}],"type":"paragraph"},{"content":[{"text":"(10..20","type":"text"},{"text":").step","type":"text"},{"text":"(2","type":"text"},{"text":").to_a","type":"text"}],"type":"paragraph"},{"content":[{"text":"# [10, 12, 14, 16, 18, 20]","type":"text"}],"type":"paragraph"},{"content":[{"text":"Using this method you can iterate over the range in increments of ","type":"text"},{"text":"n, where ","type":"text"},{"text":"n is the argument passed to ","type":"text"},{"text":"step.","type":"text"}],"type":"paragraph"},{"content":[{"text":"How to Find Out If A Number is Inside a Range","type":"text"}],"type":"heading","attrs":{"level":2}},{"content":[{"text":"Other ","type":"text"},{"text":"Range methods to be aware of are: ","type":"text"},{"text":"cover? \u0026 ","type":"text"},{"text":"include?.","type":"text"}],"type":"paragraph"},{"content":[{"text":"📷","type":"text"}],"type":"paragraph"},{"content":[{"text":"It would be a mistake to think that they do the same thing, because they don’t.","type":"text"}],"type":"paragraph"},{"content":[{"text":"The ","type":"text"},{"text":"include? method just does what you would expect, check for inclusion inside the range. So it would be equivalent to expanding the ","type":"text"},{"text":"Range into an ","type":"text"},{"text":"Array and checking if something is in there.","type":"text"}],"type":"paragraph"},{"content":[{"text":"But ","type":"text"},{"text":"cover? is different, all it does is ","type":"text"},{"text":"check against the initial \u0026 ending values of the range (","type":"text"},{"text":"begin \u003c= obj \u003c= end), which can yield unexpected results.","type":"text"}],"type":"paragraph"},{"content":[{"text":"Example:","type":"text"}],"type":"paragraph"},{"content":[{"text":"('a'..'z'","type":"text"},{"text":").include? \"cc\" # false","type":"text"}],"type":"paragraph"},{"content":[{"text":"('a'..'z'","type":"text"},{"text":").cover? \"cc\"  # true","type":"text"}],"type":"paragraph"},{"content":[{"text":"The ","type":"text"},{"text":"cover? example is equivalent to:","type":"text"}],"type":"paragraph"},{"content":[{"text":"\"a\" ","type":"text"},{"text":"\u003c= \"cc\" \u0026\u0026 \"cc\" ","type":"text"},{"text":"\u003c= \"z\"","type":"text"}],"type":"paragraph"},{"content":[{"text":"The reason this returns ","type":"text"},{"text":"true is that ","type":"text"},{"text":"strings are compared character by character. Since \"a\" comes before \"c\", the characters that come after the first \"c\" don't matter.","type":"text"}],"type":"paragraph"},{"content":[{"text":"How Ranges Are Implemented in Ruby","type":"text"}],"type":"heading","attrs":{"level":2}},{"content":[{"text":"Ranges are not limited to numbers \u0026 letters, you can use any objects as long as they implement the following methods: ","type":"text"},{"text":"\u003c=\u003e and ","type":"text"},{"text":"succ.","type":"text"}],"type":"paragraph"},{"content":[{"text":"For example, here is a DateTime range:","type":"text"}],"type":"paragraph"},{"content":[{"text":"require 'time'","type":"text"}],"type":"paragraph"},{"content":[{"text":"t1 = DateTime.new","type":"text"}],"type":"paragraph"},{"content":[{"text":"t2 = DateTime.new + 30","type":"text"}],"type":"paragraph"},{"content":[{"text":"next_30_days = t1..t2","type":"text"}],"type":"paragraph"},{"content":[{"text":"# Example use","type":"text"}],"type":"paragraph"},{"content":[{"text":"next_30_days.select","type":"text"},{"text":"(\u0026","type":"text"},{"text":":friday?","type":"text"},{"text":").map","type":"text"},{"text":"(\u0026","type":"text"},{"text":":day","marks":[{"type":"italic"}],"type":"text"},{"text":")","marks":[{"type":"bold"}],"type":"text"}],"type":"paragraph"},{"content":[{"text":"So how does this work? Let's take a look at this implementation:","type":"text"}],"type":"paragraph"},{"content":[{"text":"def range","type":"text"},{"text":"(a, b","type":"text"},{"text":")","marks":[{"type":"bold"}],"type":"text"}],"type":"paragraph"},{"content":[{"text":"# if the first element is bigger than the second","type":"text"}],"type":"paragraph"},{"content":[{"text":"# then this isn't a sequential range","type":"text"}],"type":"paragraph"},{"content":[{"text":"return ","type":"text"},{"text":"[] ","type":"text"},{"text":"if a ","type":"text"},{"text":"\u003e b","type":"text"}],"type":"paragraph"},{"content":[{"text":"out = ","type":"text"},{"text":"[]","marks":[{"type":"bold"}],"type":"text"}],"type":"paragraph"},{"content":[{"text":"# advance until the 2nd element is the same","type":"text"}],"type":"paragraph"},{"content":[{"text":"# as the first one","type":"text"}],"type":"paragraph"},{"content":[{"text":"while a != b","type":"text"}],"type":"paragraph"},{"content":[{"text":"out ","type":"text"},{"text":"\u003c\u003c a","type":"text"}],"type":"paragraph"},{"content":[{"text":"a = a.next","type":"text"}],"type":"paragraph"},{"content":[{"text":"end","marks":[{"type":"bold"}],"type":"text"}],"type":"paragraph"},{"content":[{"text":"# add last element (inclusive range)","type":"text"}],"type":"paragraph"},{"content":[{"text":"# this also returns the results via implicit return","type":"text"}],"type":"paragraph"},{"content":[{"text":"out ","type":"text"},{"text":"\u003c\u003c a","type":"text"}],"type":"paragraph"},{"content":[{"text":"end","marks":[{"type":"bold"}],"type":"text"}],"type":"paragraph"},{"content":[{"text":"p range 1, 10","type":"text"}],"type":"paragraph"},{"content":[{"text":"p range 'a', 'z'","type":"text"}],"type":"paragraph"}]}

// {"type":"doc","content":[{"type":"ImageBlock","attrs":{"aspect_ratio":{"width":606,"height":557,"ratio":91.91419141914191},"width":606,"caption":"type a caption (optional)","height":557,"forceUpload":false,"url":"/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaElHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6936f8e01935733a05ecc43c4c76fdc9dad63d8a/WhatsApp%20Image%202021-05-16%20at%2010.29.17%20PM.jpeg","loading_progress":0,"selected":false,"loading":true,"file":{},"direction":"center"}},{"content":[{"text":"oijoijoij","type":"text"}],"type":"heading","attrs":{"level":1}},{"content":[{"text":"oijij","type":"text"}],"type":"heading","attrs":{"level":2}},{"content":[{"text":"joioji","type":"text"}],"type":"heading","attrs":{"level":3}},{"type":"ImageBlock","attrs":{"aspect_ratio":{"width":480,"height":270,"ratio":56.25},"width":480,"caption":"type a caption (optional)","height":270,"forceUpload":false,"url":"/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaE1HIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--03eb8abf3892dd4a424ade5c37ee35578e63ebc4/open-uri20210522-1-tpxcbm","loading_progress":0,"selected":false,"loading":true,"direction":"center"}},{"type":"DividerBlock"},{"content":[{"text":"The plugin architecture of chaskiq has multiple kinds of integrations. for example you can set your plugin to display data on your app's dashboard or interact with CRM, add a custom behavior on the text editor or handle external messages from other services.","type":"text"}],"type":"paragraph"},{"content":[],"type":"paragraph"},{"content":[{"text":"App Package Catalog:","type":"text"}],"type":"heading","attrs":{"level":2}},{"content":[{"text":"In the code we have a catalog of integrations when the following basic structure:","type":"text"}],"type":"paragraph"},{"content":[],"type":"paragraph"},{"type":"codeBlock","attrs":{"language":"auto"},"content":[{"type":"text","text":"name: 'Zoom',\ntag_list: ['editor'],\ndescription: 'Zoom conference calls',\nicon: 'https://logo.clearbit.com/zoom.com',\nstate: 'enabled'\n\n"}]},{"content":[{"text":"Tag list:","type":"text"}],"type":"paragraph"},{"content":[{"text":"The tag list tells how the pluggin behaves. ","type":"text"}],"type":"paragraph"},{"content":[{"text":"CRM","type":"text"}],"type":"paragraph"},{"content":[{"text":"CHANNEL","type":"text"}],"type":"paragraph"},{"content":[{"text":"ENRICHMENT","type":"text"}],"type":"paragraph"},{"content":[{"text":"DASHBOARD","type":"text"}],"type":"paragraph"},{"content":[],"type":"paragraph"},{"content":[],"type":"paragraph"},{"content":[],"type":"paragraph"},{"content":[{"text":"Events: ","type":"text"}],"type":"paragraph"},{"content":[{"text":"conversations.added","type":"text"}],"type":"paragraph"},{"content":[{"text":"leads.convert","type":"text"}],"type":"paragraph"},{"content":[{"text":"email_changed","type":"text"}],"type":"paragraph"},{"content":[{"text":"Definitions:","type":"text"}],"type":"heading","attrs":{"level":2}},{"type":"codeBlock","attrs":{"language":"auto"},"content":[{"type":"text","text":"definitions: [{\n  name: 'api_key',\n  type: 'string',\n  grid: { xs: 12, sm: 12 }\n},\n{\n  name: 'api_secret',\n  type: 'string',\n  grid: { xs: 12, sm: 12 }\n},\n{\n  name: 'access_token',\n  type: 'string',\n  grid: { xs: 12, sm: 12 }\n}],\n\n"}]},{"content":[{"text":"Editor definitions:","type":"text"}],"type":"heading","attrs":{"level":2}},{"type":"codeBlock","attrs":{"language":"auto"},"content":[{"type":"text","text":"editor_definitions: {\n requires: [\n   { \n     type: \"input\",\n     name: \"src\",\n     placeholder: \"user email\",\n     hint: \"is the zoom owner email or zoom user id\"\n   }\n],\nschema: [{\n   name: \"zoom\",\n   type: \"button\",\n   label: \"enter video call\",\n   element: \"button\",\n   placeholder: \"click button to open video call\"}\n]}"}]}]}

export const htmlContent = `

<h1 class="graf graf--h"><strong>Dante 3 - This is it!</strong></h1>
<h2 class="graf graf--h"><strong>Just another medium clone built on top of TipTap</strong></h2><blockquote>
<p class="graf graf--p">Dante3 is a TipTap based port of&nbsp;<a target="_blank" rel="noopener noreferrer nofollow" class="markup--anchor" href="https://github.com/michelson/Dante/tree/master/packages/dante2">Dante2 (Draftjs)&nbsp;</a>. 
This version is built on top of&nbsp;<a target="_blank" rel="noopener noreferrer nofollow" class="markup--anchor" href="https://www.tiptap.dev/">TipTap's Prosemirror</a>&nbsp;and reaches all Dante2's features with a shiny ultra mega super uber maintainable architecture.</p></blockquote>
<p class="graf graf--p">See the demo at:&nbsp;<a target="_blank" rel="noopener noreferrer nofollow" class="markup--anchor" href="https://dante-editor.com/">dante-editor.dev</a></p>
<h2 class="graf graf--h"><strong>Why rewrite a new version of Dante?</strong></h2><p class="graf graf--p">The previous version (Dante2) was made on DraftJs, that's a facebook library to build WYSIWYG editor, I'd choose that technology because it implemented a very interesting data model and abstracted many parts of the heuristics implementation that&nbsp;<a target="_blank" rel="noopener noreferrer nofollow" class="markup--anchor" href="https://github.com/michelson/Dante/tree/master/packages/dante1-legacy">Dante1 (the previous version)</a>&nbsp;built as a naive implementation relying a lot on DOM manipulation, So Dante2 was great and is working on a ton of production websites. Sadly over the last years this library has not received much attention from maintainers. Among the ~700 unattended reported issues there are some that have become a deal breaker for me:</p><p class="graf graf--p"></p><image-block url="blob:http://localhost:3001/b56f657c-130c-46a2-b5e8-f5001cf5c9a3" width="1000" height="754" loading="true" loading_progress="0" caption="caption!" direction="center" file="[object File]" aspect_ratio="[object Object]"></image-block><ul><li class="graf graf--li"><p class="graf graf--p">Bad mobile support.</p></li><li class="graf graf--li"><p class="graf graf--p">~1MB added to your bundle (immutablejs is heavy)</p></li><li class="graf graf--li"><p class="graf graf--p">Not created for realtime collab.</p></li></ul><h2 class="graf graf--h"><strong>My bet, ProseMirror/TipTap</strong></h2><p class="graf graf--p">After shopping many editors libraries, I mean after tried to implement Dante on almost all of them&nbsp;<strong>(Trix, Editorjs, Quilljs, Slate, Prosemirror)</strong>&nbsp;I've choosen Prosemirror's TipTap library., I guess all editors libraries have their own flaws but after review it all TipTap is the best of it's class, very well designed/architectured, and I love the community around their ecosystem. So that's it.</p><p class="graf graf--p"><strong>Features:</strong></p><ul><li class="graf graf--li"><p class="graf graf--p">Configurable and extensible extensions / plugins / components</p></li><li class="graf graf--li"><p class="graf graf--p">Undo/redo.</p></li><li class="graf graf--li"><p class="graf graf--p">Save Content as a data JSON/HTML structure.</p></li><li class="graf graf--li"><p class="graf graf--p">Load Content as a data JSON/HTML structure.</p></li><li class="graf graf--li"><p class="graf graf--p">Styled components Theme support (built in light/dark themes).</p></li></ul><p class="graf graf--p"><strong>Block based content</strong>:</p><p class="graf graf--p">Dante editor can be extended with (React) components to, currently there are default components to be used as is:</p><ul><li class="graf graf--li"><p class="graf graf--p">Image upload for paste html.</p></li><li class="graf graf--li"><p class="graf graf--p">Video embed.</p></li><li class="graf graf--li"><p class="graf graf--p">Video Recorder.</p></li><li class="graf graf--li"><p class="graf graf--p">Embed.</p></li><li class="graf graf--li"><p class="graf graf--p">Divider.</p></li><li class="graf graf--li"><p class="graf graf--p">Speech.</p></li><li class="graf graf--li"><p class="graf graf--p">Giphy.</p></li></ul><h2 class="graf graf--h"><strong>Installation</strong></h2><p class="graf graf--p"><code>npm install dante3</code>&nbsp;or&nbsp;<code>yarn add dante3</code></p><h2 class="graf graf--h"><strong>Usage</strong></h2><p class="graf graf--p">Component Based</p><pre><code>&lt;DanteEditor
  content={'hello world'}
/&gt;</code></pre><h3 class="graf graf--h"><strong>Options:</strong></h3><p class="graf graf--p">Many configuration options and plugin usage can be found on the documentation page:</p><p class="graf graf--p">See&nbsp;<a target="_blank" rel="noopener noreferrer nofollow" class="markup--anchor" href="https://dante-editor.dev/">dante-editor.dev</a></p><h2 class="graf graf--h"><strong>Development</strong></h2><h3 class="graf graf--h"><strong>Installation</strong></h3><ul><li class="graf graf--li"><p class="graf graf--p"><code>git clone https://github.com/michelson/dante</code></p></li></ul><p class="graf graf--p"><strong>dependencies</strong></p><ul><li class="graf graf--li"><p class="graf graf--p"><code>npm install</code>&nbsp;or&nbsp;<code>yarn install</code></p></li></ul><h3 class="graf graf--h"><strong>Building</strong></h3><ul><li class="graf graf--li"><p class="graf graf--p"><code>npm dante3_build</code>&nbsp;or&nbsp;<code>yarn dante3_build</code></p></li></ul><h3 class="graf graf--h"><strong>dev install:</strong></h3><ul><li class="graf graf--li"><p class="graf graf--p">lerna bootstrap</p></li><li class="graf graf--li"><p class="graf graf--p">yarn dev</p></li></ul><h2 class="graf graf--h"><strong>Status</strong></h2><blockquote><p class="graf graf--p">Dante3 is on beta, actively maintained, with all the features that Dante2 has. As is relying in Prosemirror/TipTap this has better browser support and mobile support. Also has realtime collab capabilities.</p></blockquote><h2 class="graf graf--h"><strong>Monorepo</strong></h2><p class="graf graf--p">This repository now contains prior Dante versions, located in the&nbsp;<a target="_blank" rel="noopener noreferrer nofollow" class="markup--anchor" href="https://github.com/michelson/Dante/tree/master/packages">packages</a>&nbsp;folder. so Dante1*, Dante2 and Dante3 lives in the same repo.</p><blockquote><p class="graf graf--p">* Dante(1) is not maintained anymore.</p></blockquote><h3 class="graf graf--h"><strong>Open source license</strong></h3><p class="graf graf--p">Dante is licensed under MIT, so you are free to do whatever you want. If you are using it commercially, become one of our wonderful sponsors to fund the maintenance, support and development of Dante now and in the future.</p><h3 class="graf graf--h"><strong>💓&nbsp;Your sponsorship</strong></h3><blockquote><p class="graf graf--p">Your sponsorship helps to maintain, update, support and develop all of our open source projects, including tiptap and many more.</p></blockquote><h3 class="graf graf--h"><strong>Acknowledgments</strong></h3><p class="graf graf--p">Prosemirror library &amp; Tiptap authors</p>

`

export const demoS = `

<p class="graf graf--p"><strong>oijodfjaoidja</strong></p>

<p class="graf graf--p"><strong>adosijoj</strong></p>

<p class="graf graf--p"><span style="color: #000">okokokpokpo kpok pok </span></p>

<image-block url="https://i.imgur.com/f8Fzzao.jpg" width="980" height="695" loading="false" loading_progress="0" caption="caption!" direction="center" aspect_ratio="{&quot;width&quot;:980,&quot;height&quot;:695,&quot;ratio&quot;:70.91836734693877}"></image-block>

<p class="graf graf--p"></p>

<embed-block embed_data="{&quot;error&quot;:&quot;no matching providers found&quot;,&quot;url&quot;:&quot;https://www.instagram.com/p/CPjYH04pMzS/?utm_source=ig_web_copy_link&quot;}" provisory_text="https://www.instagram.com/p/CPjYH04pMzS/?utm_source=ig_web_copy_link"></embed-block>
`