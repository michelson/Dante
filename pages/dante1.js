
import Dante, {
  darkTheme,
  defaultTheme,
} from 'Dante2'

console.log(darkTheme)

import Layout from '../components/Layout'
import {Component, useEffect, useState} from 'react'
import {Readme as demo} from '../data/poc'

console.log(darkTheme)

import {version} from '../packages/dante3/package.json'


export default function Index({ }) {
  const [theme, setTheme] = useState(defaultTheme)
  const [mode, setMode] = useState('light')
  const [fixed, setFixed] = useState(false)

  useEffect(()=>{
    setTheme(mode === 'light' ? defaultTheme : darkTheme)
  }, [mode])

  console.log(version)

  return (
    <Layout 
      version={version}
      theme={theme} 
      setTheme={setTheme} 
      mode={mode}
      basePath={"/dante2/"}
      setMode={setMode}>
      
      <div className={`sm:mx-10 mx-2 py-8 ${mode}`} 
        heme={theme}>
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
              content={demo}
              /*widgets={[
                ImageBlockConfig(),
                CodeBlockConfig(),
                EmbedBlockConfig(),
                VideoBlockConfig(),
                PlaceholderBlockConfig(),
                DividerBlockConfig(),
                VideoRecorderBlockConfig()
              ]}*/
              style={{}}
              read_only={false}
              data_storage={ 
                {
                  interval: 10000,
                  save_handler: (context, content)=>{
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