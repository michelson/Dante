import React from 'react'
import { theme, ThemeConfig, DocPreview } from 'docz'
import { ThemeProvider } from 'emotion-theming'

import Dante from '../editor/components/Dante'

import {ImageBlockConfig} from '../editor/components/blocks/image'
import {CodeBlockConfig} from '../editor/components/blocks/code'
import {EmbedBlockConfig} from '../editor/components/blocks/embed'
import {VideoBlockConfig} from '../editor/components/blocks/video'
import {PlaceholderBlockConfig} from '../editor/components/blocks/placeholder'
import {DividerBlockConfig} from "../editor/components/blocks/divider";
import {VideoRecorderBlockConfig} from "../editor/components/blocks/videoRecorder";

import 'bulma/css/bulma.css'
import Prism from 'prismjs';

import Normalizer from 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'

import {Readme as demo} from '../site/data/poc'
import {License as license} from '../site/data/poc'
import { HashRouter as Router, Route, Link } from "react-router-dom";

import '../site/styles/layout/layout.scss'
import '../site/styles/layout/normalize.scss'
import '../site/styles/layout/scaffold.scss'
import editorLogo from '../images/site/dante-editor-logo.png'
import githubLogo from '../images/site/github-logo.png'
import {version} from '../../package.json'
import styled from '@emotion/styled'
import {Table} from './table'
import Menu from './sidebar'

import {ThemeProvider as StyledTheme} from 'emotion-theming'
import darkTheme from '../editor/components/Dante/themes/dark'
import defaultTheme from '../editor/components/Dante/themes/default'


const ThemeButton = styled.button`
    position: absolute;
    left: 13px;
    top: 69px;
`

//import Menu from 'docz-theme-default'

const urlFor = (path)=>{
  return path
}

const isActive = (url)=>{
  return url === document.location.pathname ? 'is-active' : ''
}

const Theme = () => (
  <div>
    <Router>
      <div>
        <Header/>
        <Route exact path={urlFor('')} component={Demo} />
        <Route path={urlFor('/license')} component={License} />
        <Route path={urlFor('/docs')} component={Doc} />
        <Route path={urlFor('/:doc')} component={Doc} />
      </div>
    </Router>
  </div>

)

class Header extends React.Component{

  state = {
    activeMenu: false 
  }

  toggleMenu = (e)=>{
    e.preventDefault()
    this.setState({
      activeMenu: !this.state.activeMenu
    })
  }


  render(){
    return  <nav id="header" className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">

              <Link className="navbar-item" to={urlFor('')}>
                <img src={editorLogo} alt="dante editor" height="21"/>

              </Link>

              <a role="button" 
                onClick={this.toggleMenu}
                className={`navbar-burger burger ${this.state.activeMenu ? 'is-active' : ''}`}
                aria-label="menu" 
                aria-expanded="false" 
                data-target="navbarBasicExample">

                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>

              </a>
            </div>

            <div id="navbarBasicExample" className={`navbar-menu ${this.state.activeMenu ? 'is-active' : ''}`}>
              <div className="navbar-start">
                <div className="navbar-item">
                  <span>Dante Editor - {version} </span>
                </div>

                <Link to={urlFor('src-index')} className={`navbar-item ${isActive('/src-index')}`}>
                  Documentation & examples
                </Link>

                <Link to={urlFor('license')} className={`navbar-item ${isActive('/license')}`}>
                  License
                </Link>

              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">

                    <a href="https://github.com/michelson/dante2"
                      className="navbar-item"
                      data-tooltip="Fork me on github"
                      target="_blank">

                      <img src={githubLogo} alt="Fork me on github" height="28"/>
                    </a>


                  </div>
                </div>
              </div>
            </div>
          </nav>  
  }
}

const License = ()=>{
  return <Dante content={license} style={{
                  margin: '0 auto',
                  width: '60%',
                  padding: '100px 0px'
                }} read_only={true}
              />
}

class Demo extends React.Component {

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
    return <StyledTheme theme={this.state.theme}>
            <EditorContainer>
              <EditorWraper>

                <ThemeButton
                  onClick={(e)=> this.onClick(mode) }>
                  {this.state.mode === 'dark' ? 'light mode' : 'dark mode'}
                </ThemeButton>
       

                <Dante content={demo}
                  theme={this.state.theme}
                  widgets={[
                    ImageBlockConfig(),
                    CodeBlockConfig(),
                    EmbedBlockConfig(),
                    VideoBlockConfig(),
                    PlaceholderBlockConfig(),
                    DividerBlockConfig(),
                    VideoRecorderBlockConfig()
                  ]}
                  style={{
                    width: '100%',
                    padding: '100px 0px'
                  }}
                  read_only={false}
                  data_storage={ {
                    interval: 10000,
                    save_handler: (context, content)=>{
                      //console.log(context, content)
                    }}}
                />
              </EditorWraper>
            </EditorContainer>
          </StyledTheme>    
  }

}

const EditorContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  background-color: ${props => props.theme.dante_inversed_color};
`

const EditorWraper = styled.div`
  margin: 0 auto;
  @media only screen and (max-width: 600px) {
    padding: 2em;
    width: 100%;
  }
  padding: 3em;
  width: 60%;
`


const Pre = styled.pre`
  font-size: 14px;
  font-family: monospace;
  margin: 21px 0px;

`
const Code = styled.pre`
  background-color: #2d2d2d;
  color: #654f53;
  font-size: 1.2em;
  font-weight: normal;
  padding: 1.2em;
  width: 100%;
  display: block;
  font-family: monospace !important;
`

const H2 = styled.h2`
  font-size: 1.6em;
`

const Playground = styled.div`
  padding: 2em;
  border:1px solid #ccc;
  margin-bottom: 20px;
  margin-top: 20px;
`

const PlayGroundContainer = styled.div`
  margin-bottom: 2em;
`

class Render extends React.Component {

  constructor(props){
    super(props)

    // Create a new Normalizer object
    this.nw = new Normalizer({
      //'remove-trailing': true,
      //'remove-indent': true,
      //'left-trim': true,
      //'right-trim': true,
      'break-lines': 40,
      //'indent': 1,
      'remove-initial-line-feed': false,
      /*'tabs-to-spaces': 4,
      'spaces-to-tabs': 4*/
    });

    // ..or use the default object from Prism
    //this.nw = Prism.plugins.NormalizeWhitespace;
  }


  render(){

    const code = this.nw.normalize(this.props.code, {
      // Extra settings
      //indent: 1
    });

    const fmt =  {__html: Prism.highlight(
                            code,
                            Prism.languages.jsx,
                            'jsx')
                  }
    return <PlayGroundContainer>
              <Playground>
                {this.props.component}
              </Playground>

              <Code dangerouslySetInnerHTML={fmt}/>
              
           </PlayGroundContainer>
  }
}


const Doc = ()=>{
  return <div className="container-dis"
              style={{padding: '100px 0px'}}>
            <section className="section">
              <h1 className="title">Documentation</h1>
              <h2 className="subtitle">
                Examples of Dante 2 editor
              </h2>

              <ThemeConfig>
                {config => (
                  <ThemeProvider theme={config}>
                    <div className="columns is-mobile">
                      <div className="column is-3 is-narrow-mobile is-fullheight section is-hidden-mobile">
                        <Menu />
                      </div>
                      <div className="container column is-9">

                        <DocPreview
                          
                          components={{
                            //page: components.Page,
                            //notFound: components.NotFound,
                            render: Render,
                            //h1: components.H1,
                            h2: H2,
                            //h3: components.H3,
                            //h4: components.H4,
                            //h5: components.H5,
                            //h6: components.H6,
                            //ul: components.List,
                            //loading: components.Loading,
                            table: Table,
                            //pre: Pre,
                            inlineCode: Code,
                          }}
                        />

                      </div>
                    </div>
                  </ThemeProvider>
                )}
              </ThemeConfig>
            </section>
          </div>
}

const themeConfig = {
  colors: {
    primary: 'danty',
    secondary: 'khaki',
    gray: 'lightslategray',
  },
}

export default theme(themeConfig)(Theme)
