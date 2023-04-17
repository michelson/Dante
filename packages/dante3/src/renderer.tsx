// Option 1: Browser + server-side
import React from 'react'
import { ThemeProvider } from "@emotion/react";
import defaultTheme from "./styled/themes/default";
import EditorContainer from "./styled/base";
import {ImageRenderer} from './blocks/image'

function Renderer({raw, html, theme}) {

  const convertNodeToElement = (node) => {
    
    switch (node.type) {
      case 'heading':
        switch(node.attrs.level) {
          case 1: 
            return <h1 className="graf graf--h">{traverseNodes(node.content)}</h1>
          case 2:
            return <h2 className="graf graf--h">{traverseNodes(node.content)}</h2>
          case 3:
            return <h3 className="graf graf--h">{traverseNodes(node.content)}</h3>

        }
      case 'blockquote':
        return <blockquote>{traverseNodes(node.content)}</blockquote>
      case 'ImageBlock':
        return (
          <ImageRenderer blockKey={node.id} data={node.attrs}/>
        );
      case 'paragraph':
        return <p className="graf graf--p" key={node.id}>
          {traverseNodes(node.content)}
        </p>;
      case 'bulletList':
        return <ul className="graf graf--ul" key={node.id}>
          {traverseNodes(node.content)}
        </ul>;
      case 'listItem':
        return <li className="graf graf--li" key={node.id}>
          {traverseNodes(node.content)}
        </li>;
      case 'codeBlock':
        return <pre className="graf graf--pre" key={node.id}>
          {traverseNodes(node.content)}
        </pre>;
      case 'text':

       const textElement = <React.Fragment key={node.id}>{node.text}</React.Fragment>;

        if (node.marks && node.marks.length > 0) {
          return node.marks.reduce((element, mark) => {
            return handleMark(element, mark, node)
          }, textElement);
        }

        return textElement;

      // Add cases for other node types as needed
      default:
        console.warn("no handler for node", node)
        return null;
    }
  };

  const handleMark = (element, mark, node) => {
    switch(mark.type) {
      case 'textStyle': 
        const { color } = mark.attrs;
        return <span key={node.id} style={{ color }}>{element}</span>;
      case 'bold': 
        return <strong key={node.id}>{element}</strong>;
      case 'italic': 
        return <em key={node.id}>{element}</em>;
      case 'code':
        return <code key={node.id} className="graf code">{element}</code>;
      case 'link':
        const {href, target} = mark.attrs
        return <a className="graf markup--anchor markup--anchor-readOnly" target={target} rel="noopener noreferrer nofollow" href={href}>{element}</a>
      default: 
        console.warn("no handler for mark", mark)
        return element;
    }
  }

  const traverseNodes = (nodes) => {
    return nodes.map((node) => {
      //console.log(node)
      return convertNodeToElement(node)
    });
  };

  const renderedContent = traverseNodes(raw.content);

  return (
    <ThemeProvider theme={theme || defaultTheme}>
      <EditorContainer>
        <div>{renderedContent}</div>
      </EditorContainer>
    </ThemeProvider>
  )
}

export default Renderer
