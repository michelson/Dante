import Layout from '../components/Layout'
import {ThemeProvider as StyledTheme} from 'emotion-theming'
import {Component} from 'react'
import {Readme as demo} from '../data/poc'


import Dante, {
  darkTheme,
  defaultTheme,
  ImageBlockConfig
} from 'Dante2'

console.log(darkTheme)

export default function Index({ }) {
  return (
    <Layout>
      <Demo/>
    </Layout>
  )
}


class Demo extends Component {

  state = {
    theme: defaultTheme,
    mode: 'light'
  }

  onClick = (theme)=>{
    console.log(theme)
    const t = theme == 'dark' ? darkTheme : defaultTheme

    this.setState({theme: t, mode: theme })
  }
  
  render(){
    const mode = this.state.mode === 'dark' ? 'light' : 'dark'
    return <div className={`mx-10 py-8 ${this.state.mode}`} 
            heme={this.state.theme}>
            <div>
              <div className={`w-3/4 p-10 mx-auto shadow-md bg-gray-50 dark:bg-gray-900 light`}>

                <button
                  className="inline-flex items-center px-6 py-3 border 
                  border-transparent text-base font-medium rounded-md shadow-sm
                   text-white bg-indigo-600 hover:bg-indigo-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={(e)=> this.onClick(mode) }>
                  {this.state.mode === 'dark' ? 'light mode' : 'dark mode'}
                </button>
       

                <Dante content={demo}
                  theme={this.state.theme}
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
