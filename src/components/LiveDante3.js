import React from 'react'
import Highlight, {defaultProps} from 'prism-react-renderer'
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live'
import {contentJSON} from '../../data/d3_content_html'
import {mdx} from '@mdx-js/react'
import DanteEditor ,{ 
  ImageBlockConfig,
  EmbedBlockConfig,
  VideoBlockConfig,
  PlaceholderBlockConfig,
  VideoRecorderBlockConfig,
  //DanteInlineTooltipConfig,
  //DanteTooltipConfig,
  Icons,
  //CustomWidgetconfig,
  MenuBarConfig,
  AddButtonConfig,
  CodeBlockConfig,
  Renderer
} from '../../packages/dante3/src' // '../packages/dante3'

import contentData from '../../data/poc.js'
import { State, Toggle } from 'react-powerplug'
import config from '../../data/constants.js'

function Button (){
  return <p>sjsjsjsjsjsjs</p>
}
export default function Live({children, className, live, render}) {
  //const language = className.replace(/language-/, '')
  const language = "js" //className.replace(/language-/, "");


  if (live) {
    return (
      <div>
        <LiveProvider
          className="m-0 p-0"
          code={children.trim()}
          transformCode={code => '/** @jsx mdx */' + code}
          scope={{
            mdx, 
            DanteEditor,
            ImageBlockConfig,
            EmbedBlockConfig,
            VideoBlockConfig,
            PlaceholderBlockConfig,
            VideoRecorderBlockConfig,
            //DanteInlineTooltipConfig,
            //DanteTooltipConfig,
            MenuBarConfig,
            AddButtonConfig,
            Icons,
            CodeBlockConfig,
            Button, 
            contentData, 
            State, 
            Toggle,
            config,
            Renderer,
            contentJSON
          }}
        >

          <div className="border-black bg-white text-black border-4 flex flex-col rounded-md shadow-md">

            <div className="p-8 mx-8">
              <LivePreview />
            </div>
          
            <div style={{
                backgroundColor: 'rgb(42, 39, 52)',
                color: 'rgb(154, 134, 253)',
                padding: '20px'
              }}
              className="p-8 shadow-lg text-sm border-black border-t-4">
              <LiveEditor />
            </div>
          </div>
        
          <LiveError className="error-notice" />
        </LiveProvider>
      </div>
    )
  }

  if (render) {
    return (
      <div style={{marginTop: '40px'}}>
        <LiveProvider code={children}>
          <LivePreview />
        </LiveProvider>
      </div>
    )
  }

  return (
    <Highlight 
      {...defaultProps} 
      code={children.trim()} 
      language={language}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={className} style={{...style, padding: '20px'}}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}