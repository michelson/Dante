
import React from 'react'
import { EditorBlock } from 'draft-js'
import { updateDataOfBlock, addNewBlockAt } from '../../model/index.js'
import axios from "axios"
import {video} from "../icons.js"

export default class VideoBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { embed_data: this.defaultData() }
  }

  defaultData =()=> {
    let existing_data = this.props.block.getData().toJS()
    return existing_data.embed_data || {}
  }

  // will update block state
  updateData =()=> {
    const { block, blockProps } = this.props
    const { getEditorState, setEditorState } = blockProps
    const data = block.getData()
    const newData = data.merge(this.state)
    return setEditorState(updateDataOfBlock(getEditorState(), block, newData))
  }

  dataForUpdate =()=> {
    return this.props.blockProps.data.toJS()
  }

  componentDidMount() {

    if (!this.props.blockProps.data) {
      return
    }
    // ensure data isnt already loaded
    if (!this.dataForUpdate().endpoint && !this.dataForUpdate().provisory_text) {
      return
    }

    return axios({
      method: 'get',
      url: `${ this.dataForUpdate().endpoint }${ this.dataForUpdate().provisory_text }&scheme=https`
    }).then(result => {
      return this.setState({ embed_data: result.data } //JSON.parse(data.responseText)
      , this.updateData)
    }).catch(error => {
      return console.log("TODO: error")
    })
  }

  classForImage =()=> {
    if (this.state.embed_data.thumbnail_url) {
      return ""
    } else {
      return "mixtapeImage--empty u-ignoreBlock"
    }
  }

  renderEmbedHtml = ()=>{
    if (this.dataForUpdate().mediaRenderHandler){
      return this.dataForUpdate().mediaRenderHandler()
    }else{
      return this.state.embed_data.media ? this.state.embed_data.media.html : this.state.embed_data.html
    }
  }

  render() {
    return (
      <figure className='graf--figure graf--iframe graf--first' tabIndex='0'>
        <div className='iframeContainer' 
          dangerouslySetInnerHTML={ { __html: this.renderEmbedHtml() } } />
        <figcaption className='imageCaption'>
          <EditorBlock {...Object.assign({}, this.props, { "className": "imageCaption" })} />
        </figcaption>
      </figure>
    )
  }
}


export const VideoBlockConfig = (options={})=>{
  let config = {
      title: 'insert video',
      editable: true,
      type: 'video',
      icon: video,
      block: VideoBlock,
      renderable: true,
      breakOnContinuous: true,
      wrapper_class: "graf--figure graf--iframe",
      selected_class: " is-selected is-mediaFocused",
      widget_options: {
        displayOnInlineTooltip: true,
        insertion: "placeholder",
        insert_block: "video"
      },
      options: {
        endpoint: '//open.iframe.ly/api/oembed?origin=https://github.com&url=',
        placeholder: 'Paste a YouTube, Vine, Vimeo, or other video link, and press Enter',
        caption: 'Type caption for embed (optional)'
      },

      handleEnterWithoutText(ctx, block) {
        const { editorState } = ctx.state
        return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
      },

      handleEnterWithText(ctx, block) {
        const { editorState } = ctx.state
        return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
      }
  }

  return Object.assign(config, options)
}
