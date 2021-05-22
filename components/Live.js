import React from 'react'
import Highlight, {defaultProps} from 'prism-react-renderer'
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live'
import {mdx} from '@mdx-js/react'
import Dante ,{ 
  ImageBlockConfig,
  EmbedBlockConfig,
  VideoBlockConfig,
  PlaceholderBlockConfig,
  VideoRecorderBlockConfig,
  DanteInlineTooltipConfig,
  DanteTooltipConfig,
  Icons,
  //CustomWidgetconfig,
  CodeBlockConfig,
  PrismDraftDecorator,
  LinkDecorator,
  utils
} from '../packages/dante2/src/editor/components/Dante'
// 'Dante2'
//'../packages/dante2/src/editor/components/Dante'
//'Dante2' // use Dante2 to point to the component package

import {
  CustomWidgetconfig
} from '../data/customWidget'
import { CompositeDecorator } from 'draft-js'
import MultiDecorator from 'draft-js-multidecorators'

//import {code} from './site/data/poc.js'
//import Dante from './editor/components/Dante/Dante.js'
//import {CodeBlockConfig} from './editor/components/blocks/code'
import Prism from 'prismjs'

//import {PrismDraftDecorator} from './editor/components/decorators/prism'
//import Link from './editor/components/decorators/link'
//import findEntities from './editor/utils/find_entities'

import contentData from '../data/poc.js'
import { State, Toggle } from 'react-powerplug'
import config from '../data/constants.js'

function Button (){
  return <p>sjsjsjsjsjsjs</p>
}
export default function Live({children, className, live, render}) {
  const language = className.replace(/language-/, '')

  if (live) {
    return (
      <div>
        <LiveProvider
          code={children.trim()}
          transformCode={code => '/** @jsx mdx */' + code}
          scope={{
            mdx, 
            Dante,
            ImageBlockConfig,
            EmbedBlockConfig,
            VideoBlockConfig,
            PlaceholderBlockConfig,
            VideoRecorderBlockConfig,

            DanteInlineTooltipConfig,
            DanteTooltipConfig,
            Icons,
            CustomWidgetconfig,

            MultiDecorator,
            CompositeDecorator,
            CodeBlockConfig,
            PrismDraftDecorator,
            LinkDecorator,
            utils,

            Prism,

            Button, 
            contentData, 
            State, 
            Toggle,
            config
          }}
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-gray-200 border-2 rounded-md shadow-md">

            <div className=" p-8 shadow-lg">
              <LivePreview />
            </div>
          
            <div style={{
                backgroundColor: 'rgb(42, 39, 52)',
                color: 'rgb(154, 134, 253)',
                padding: '20px'
              }}
              className="p-8 shadow-lg text-xl">
              <LiveEditor />
            </div>
          </div>
        
          <LiveError className="bg-red-600 text-black font-bold" />
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