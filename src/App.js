import React from 'react';
import Dante from './editor/components/Dante'
import {Readme as demo} from './data/poc'
import {License as license} from './data/poc'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './site/styles/layout/layout.scss'
import './site/styles/layout/normalize.scss'
import './site/styles/layout/scaffold.scss'
import editorLogo from './images/site/dante-editor-logo.png'
import githubLogo from './images/site/github-logo.png'
import {version} from '../package.json'

// public site

class App extends React.Component {

  render(){
    return <div>
            <Router>
              <div> 
                <div id="header">
                  <div className="logo">
                    <div className="menu-buttons">
                      <Link to={`${process.env.PUBLIC_URL}/`} className="menu-button">Documentation & examples</Link>
                      <Link to={`${process.env.PUBLIC_URL}/license`} className="menu-button">License</Link>
                    </div>

                    <Link to="/" >
                      <img src={editorLogo} alt="dante editor" height="21"/>
                    </Link>

                    <span>Dante Editor - {version} </span>

                  </div>

                  <a href="https://github.com/michelson/dante2" 
                    className="github tooltip-left" 
                    data-tooltip="Fork me on github" 
                    target="_blank">
                    <img src={githubLogo} alt="Fork me on github" height="28"/>
                  </a>

                </div>

                <Route exact path={`${process.env.PUBLIC_URL}/`} component={Demo} />
                <Route path={`${process.env.PUBLIC_URL}/license`} component={License} />
              </div>                
            </Router>
          </div>
  }

}

const License = ()=>{
  return <Dante content={license} style={{
                  margin: '0 auto',
                  width: '60%',
                  padding: '100px 0px'
                }} config={{read_only: true}}
              />
}

const Demo = ()=>{
  return <Dante content={demo} style={{
                  margin: '0 auto',
                  width: '60%',
                  padding: '100px 0px'
                }} config={{read_only: false}}
              />
}

export default App;