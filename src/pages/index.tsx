'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
//import Editor from "../../packages/dante3/src/index"

const inter = Inter({ subsets: ['latin'] })
import Layout from "../components/Layout";
import { useEffect, useState } from "react";

import {
  darkTheme,
  defaultTheme,
  defaultPlugins,
} from "../../packages/dante3/src/"; //

import Dante from '../../packages/dante3/src/DanteEditor'
// from '../packages/dante3'

import { contentJSON as htmlContent } from "../../data/d3_content_html";

import pkg from "../../packages/dante3/package.json";
const { version, name } = pkg

export default function Index({}) {
  const [theme, setTheme] = useState(defaultTheme);
  const [mode, setMode] = useState("light");
  const [fixed, setFixed] = useState(false);

  const [readOnly, setReadOnly] = useState(false);

  function onClick(m: any) {
    console.log(m);
    const t: any = m == "dark" ? darkTheme : defaultTheme;
    setTheme(t);
    setMode(m);
  }

  useEffect(() => {
    // @ts-ignore
    setTheme(mode === "light" ? defaultTheme : darkTheme);
  }, [mode]);

  function toggleReadOnly(){
    setReadOnly(!readOnly)
  }

  console.log(htmlContent)
  return (
    <Layout
      version={version}
      name={name}
      theme={theme}
      //setTheme={setTheme}
      mode={mode}
      setMode={setMode}
    >
      <div className={`sm:mx-10 mx-2 py-8 ${mode}`}>
        <div>
          <div
            className={`sm:w-3/4 p-10 md:mx-auto shadow-md- bg-gray-50- dark:bg-black light`}
          >
            {<button
              className="inline-flex items-center px-6 py-3 border 
              border-transparent text-base font-medium rounded-md shadow-sm
                text-white bg-indigo-600 hover:bg-indigo-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={toggleReadOnly}>
              {readOnly ? "Read only" : "Editable"}
            </button>}

            <Dante
              widgets={defaultPlugins}
              theme={theme || defaultTheme}
              fixed={fixed}
              content={htmlContent}
              autofocus={true}
              //style={{}}
              readOnly={readOnly}
              onUpdate={(editor: any) => {
                //console.log("content", editor.getHTML())
                console.log("content", JSON.stringify(editor.getJSON()));
              }}
              /*data_storage={{
                interval: 10000,
                save_handler: (context, content) => {
                  //console.log(context, content)
                },
              }}*/
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

