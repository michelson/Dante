import { extensionFactory } from "./blocks/extension";
import { defaultPlugins as factoryPlugins } from "./editor/constants";
import {contentJSON} from '../../../data/d3_content_html'
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Focus from "@tiptap/extension-focus";
import {Dante, 
  ImageBlock,
  CodeBlock,
  DividerBlock,
  EmbedBlock,
  PlaceholderBlock,
  VideoBlock,
  GiphyBlock,
  VideoRecorderBlock,
  SpeechToTextBlock,
} from 'dante3/package/esm';


// Option 1: Browser + server-side
import { generateHTML } from '@tiptap/html'
import React, { useMemo } from 'react'

const raw = contentJSON

function Renderer({raw, html}) {
  const output = useMemo(() => {
    return generateHTML(raw, [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: "graf graf--h",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "graf graf--p",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "graf graf--li",
          },
        },

        orderedList: {
          HTMLAttributes: {
            class: "graf graf--ol",
          },
        },
        
        codeBlock: {
          HTMLAttributes: {
            class: "graf code"
          }
        },
        code: {
          HTMLAttributes: {
            class: "graf code"
          }
        }
      }), 
      //TextStyle,
      //CodeBlockLowlight,
      //Focus,
      ImageBlock,
      //DividerBlock,
      //EmbedBlock,
      //PlaceholderBlock,
      //VideoBlock,
      //GiphyBlock,
      //VideoRecorderBlock,
      //SpeechToTextBlock,

      // other extensions …
    ])
  }, [raw])

  return (
    <pre>
      <code>{output}</code>
    </pre>
  )
}

export default Renderer
