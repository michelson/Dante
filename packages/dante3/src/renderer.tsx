// Option 1: Browser + server-side
import React, {Component, ErrorInfo} from 'react'
import { ThemeProvider } from "@emotion/react";
import defaultTheme from "./styled/themes/default";
import EditorContainer from "./styled/base";
import {ImageRenderer} from './blocks/image'
import { AudioRecorderRenderer } from "./blocks/audioRecorder";
import { FileBlockRenderer } from "./blocks/file";
import { EmbedBlockRenderer } from "./blocks/embed";
import { VideoBlockRenderer } from "./blocks/video";
import {VideoRecorderRenderer} from './blocks/videoRecorder'
import {DividerBlockRenderer} from './blocks/divider'

type RendererProps = {
  message?: any;
  domain?: string;
  raw: any;
  html?: string;
  theme?: any;
};

function Renderer({raw, html, theme, domain} : RendererProps) {

  const convertNodeToElement = (node: any) => {
    
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
          <ImageRenderer blockKey={node.id} data={node.attrs} domain={domain}/>
        );
      case 'AudioRecorderBlock':
        return (
          <AudioRecorderRenderer blockKey={node.id} data={node.attrs} domain={domain} />
        )
      case 'DividerBlock':
        return <DividerBlockRenderer blockKey={node.id} data={node.attrs} /> 
      case 'EmbedBlock':
        return <EmbedBlockRenderer blockKey={node.id} data={node.attrs} />
      case 'VideoBlock':
        return <VideoBlockRenderer blockKey={node.id} data={node.attrs} />
      case 'FileBlock':
        return (
          <FileBlockRenderer blockKey={node.id} data={node.attrs} domain={domain}/>
        )
      case 'VideoRecorder':
        return <VideoRecorderRenderer blockKey={node.id} data={node.attrs} domain={domain}/>

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
          return node.marks.reduce((element: any, mark: any) => {
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

  const handleMark = (element: any, mark: any, node: any) => {
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

  const traverseNodes = (nodes: any) => {
    if (!nodes) return null
    return nodes.map((node : any) => {
      //console.log(node)
      return convertNodeToElement(node)
    });
  };

  const renderedContent = traverseNodes(raw.content);

  return (
    <ThemeProvider theme={theme || defaultTheme}>
      <EditorContainer>
        <ErrorBoundary>
          <div>{renderedContent}</div>
        </ErrorBoundary>
      </EditorContainer>
    </ThemeProvider>
  )
}


interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      );
    }

    // @ts-ignore
    return this.props.children;
  }
}

export default Renderer
