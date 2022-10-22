import Layout from "../components/Layout";
import { Component, useEffect, useState } from "react";

import Dante, {
  darkTheme,
  defaultTheme,
  defaultPlugins,
} from "../packages/dante3/src"; //
// from '../packages/dante3'

import { contentDemo as htmlContent } from "../packages/dante3/src/data/content";

import pkg from "../packages/dante3/package.json";
const { version, name } = pkg

export default function Index({}) {
  const [theme, setTheme] = useState(defaultTheme);
  const [mode, setMode] = useState("light");
  const [fixed, setFixed] = useState(false);

  function onClick(m) {
    console.log(m);
    const t = m == "dark" ? darkTheme : defaultTheme;
    setTheme(t);
    setMode(m);
  }

  useEffect(() => {
    setTheme(mode === "light" ? defaultTheme : darkTheme);
  }, [mode]);

  return (
    <Layout
      version={version}
      name={name}
      theme={theme}
      setTheme={setTheme}
      mode={mode}
      setMode={setMode}
    >
      <div className={`sm:mx-10 mx-2 py-8 ${mode}`} heme={theme}>
        <div>
          <div
            className={`sm:w-3/4 p-10 md:mx-auto shadow-md- bg-gray-50- dark:bg-black light`}
          >
            {/*<button
              className="inline-flex items-center px-6 py-3 border 
              border-transparent text-base font-medium rounded-md shadow-sm
                text-white bg-indigo-600 hover:bg-indigo-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(e)=> onClick( mode === 'dark' ? 'light' : 'dark'  ) }>
              {mode === 'dark' ? 'light mode' : 'dark mode'}
            </button>*/}

            <Dante
              widgets={defaultPlugins}
              theme={theme}
              fixed={fixed}
              content={htmlContent}
              style={{}}
              read_only={false}
              onUpdate={(editor) => {
                //console.log("content", editor.getHTML())
                // console.log("content", JSON.stringify(editor.getJSON()));
              }}
              data_storage={{
                interval: 10000,
                save_handler: (context, content) => {
                  //console.log(context, content)
                },
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
