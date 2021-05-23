import Layout from '../components/Layout'
import {Component, useState} from 'react'

import Dante, {darkTheme, defaultTheme, defaultPlugins} from '../packages/dante3/src/index'
import jsonContent from "../packages/dante3/src/data/content";
import {Readme as demo} from '../data/poc'

console.log(darkTheme)

import {version} from '../packages/dante3/package.json'


export default function Index({ }) {
  const [theme, setTheme] = useState(defaultTheme)
  const [mode, setMode] = useState('light')
  const [fixed, setFixed] = useState(false)

  function onClick(m){
    console.log(m)
    const t = m == 'dark' ? darkTheme : defaultTheme
    setTheme( t )
    setMode(m)
  }

  console.log(version)

  return (
    <Layout 
      version={version}
      theme={theme} 
      setTheme={setTheme} 
      mode={mode}
      setMode={setMode}>
      
      <div className={`mx-10 py-8 ${mode}`} 
        heme={theme}>
        <div>
          <div className={`w-3/4 p-10 mx-auto shadow-md- bg-gray-50- dark:bg-black light`}>

            <button
              className="inline-flex items-center px-6 py-3 border 
              border-transparent text-base font-medium rounded-md shadow-sm
                text-white bg-indigo-600 hover:bg-indigo-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(e)=> onClick( mode === 'dark' ? 'light' : 'dark'  ) }>
              {mode === 'dark' ? 'light mode' : 'dark mode'}
            </button>
    

            <Dante 
              widgets={defaultPlugins}
              theme={theme}
              fixed={fixed}
              content={jsonContent}
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
              data_storage={ {
                interval: 10000,
                save_handler: (context, content)=>{
                  //console.log(context, content)
                }}}
            />
          </div>
        </div>
      </div>


    </Layout>
  )
}


class Demo extends Component {

  state = {
    theme: defaultTheme,
    mode: 'light',
    fixed: false
  }

  onClick = (theme)=>{
    console.log(theme)
    const t = theme == 'dark' ? darkTheme : defaultTheme

    setTheme( t )
    setMode(theme)
  }
  
  render(){
    const mode = mode === 'dark' ? 'light' : 'dark'
    return <div className={`mx-10 py-8 ${mode}`} 
            heme={theme}>
            <div>
              <div className={`w-3/4 p-10 mx-auto shadow-md bg-gray-50 dark:bg-gray-900 light`}>

                <button
                  className="inline-flex items-center px-6 py-3 border 
                  border-transparent text-base font-medium rounded-md shadow-sm
                   text-white bg-indigo-600 hover:bg-indigo-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={(e)=> onClick(mode) }>
                  {mode === 'dark' ? 'light mode' : 'dark mode'}
                </button>
       

                <Dante 
                  widgets={defaultPlugins}
                  theme={theme}
                  fixed={fixed}
                  content={jsonContent}
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
                  data_storage={ {
                    interval: 10000,
                    save_handler: (context, content)=>{
                      //console.log(context, content)
                    }}}
                />
              </div>
            </div>
          </div>    
  }

}

