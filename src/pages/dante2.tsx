import Dante, {
  darkTheme,
  defaultTheme,
  ImageBlockConfig
} from '../../packages/dante2/src/editor/components/Dante'

import { VideoRecorderBlockConfig } from '../../packages/dante2/src/editor/components/blocks/videoRecorder/index';


import Layout from '../components/Layout'
import {Component, useEffect, useState} from 'react'

//import {Readme as demo} from '../data/poc'
import {Readme as jsonContent} from '../../data/poc'

import pkg from '../../packages/dante2/package.json'

const {version, name} = pkg

export default function Index({ }) {
  const [theme, setTheme] = useState(defaultTheme)
  const [mode, setMode] = useState<any>('light')
  const [fixed, setFixed] = useState(false)

  useEffect(()=>{
    // @ts-ignore
    setTheme(mode === 'light' ? defaultTheme : darkTheme)
  }, [mode])

  return (
    <Layout 
      version={version}
      basePath={"/dante2/"}
      theme={theme} 
      //setTheme={setTheme} 
      mode={mode}
      setMode={setMode}
      name={name}>
      
      <div className={`sm:mx-10 mx-2 py-8 ${mode}`} >
        <div>
          <div className={`sm:w-3/4 sm:p-10 p-2 md:mx-auto shadow-md- bg-gray-50- dark:bg-black light`}>

            {/*<button
              className="inline-flex items-center px-6 py-3 border 
              border-transparent text-base font-medium rounded-md shadow-sm
                text-white bg-indigo-600 hover:bg-indigo-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(e)=> onClick( mode === 'dark' ? 'light' : 'dark'  ) }>
              {mode === 'dark' ? 'light mode' : 'dark mode'}
            </button>*/}

            <Dante 
              theme={theme}
              content={jsonContent}
              //widgets={[
              // VideoRecorderBlockConfig({
              //   options: {
              //     seconds_to_record: 20000,
              //     mediaType: "video/mp4",
              //     upload_handler: (e)=>{console.log(e)},
              //     //upload_url: `/attachments.json?id=${this.props.data.id}&app_id=${this.props.app.key}`,
              //   },
              // })
              //  ImageBlockConfig(),
              //  CodeBlockConfig(),
              //  EmbedBlockConfig(),
              //  VideoBlockConfig(),
              //  PlaceholderBlockConfig(),
              //  DividerBlockConfig(),
              //  VideoRecorderBlockConfig()
              //]}
              style={{}}
              read_only={false}
              data_storage={ 
                {
                  interval: 10000,
                  save_handler: (context: any, content: any)=>{
                    //console.log(context, content)
                  }
                }
              }
            />
          </div>
        </div>
      </div>


    </Layout>
  )
}