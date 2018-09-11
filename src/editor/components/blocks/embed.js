
import React from 'react'
import axios from "axios"
import { updateDataOfBlock, addNewBlockAt } from '../../model/index.js'
import {embed} from '../icons'

export default class EmbedBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      embed_data: this.defaultData(),
      error: ""
    }
  }

  defaultData =() =>{
    const existing_data = this.props.block.getData().toJS()
    return existing_data.embed_data || {}
  }

  // will update block state
  updateData =() =>{
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
    // unless @dataForUpdate().endpoint or @dataForUpdate().provisory_text

    if (!this.dataForUpdate().endpoint && !this.dataForUpdate().provisory_text) {
      //debugger
      return
    }

    return axios({
      method: 'get',
      url: `${ this.dataForUpdate().endpoint }${ this.dataForUpdate().provisory_text }&scheme=https`
    }).then(result => {

      return this.setState({ embed_data: result.data } //JSON.parse(data.responseText)
      , this.updateData)
    }).catch(error => {

      this.setState({
        error: error.response.data.error_message })
      return console.log("TODO: error")
    })
  }

  classForImage = ()=> {
    if (this.picture()) {
      return ""
    } else {
      return "mixtapeImage--empty u-ignoreBlock"
    }
  }
  //if @state.embed_data.thumbnail_url then "" else "mixtapeImage--empty u-ignoreBlock"

  picture =()=> {
    if (this.state.embed_data.images && this.state.embed_data.images.length > 0) {
      return this.state.embed_data.images[0].url
    } else {
      if(this.state.embed_data.thumbnail_url ){
        return this.state.embed_data.thumbnail_url
      } else {
        return null  
      }
    }
  }

  render() {
    return (
      <span>
        { this.picture()
          ? <a
              target='_blank'
              className={ `js-mixtapeImage mixtapeImage ${ this.classForImage() }` }
              href={ this.state.embed_data.url }
              style={ { backgroundImage: `url('${ this.picture() }')` } }
            />
          : undefined
        }
        { this.state.error ? 
          <h2>{ this.state.error }</h2>
          : undefined
        }
        <a
          className='markup--anchor markup--mixtapeEmbed-anchor'
          target='_blank'
          href={ this.state.embed_data.url }
        >
          <strong className='markup--strong markup--mixtapeEmbed-strong'>
            { this.state.embed_data.title }
          </strong>
          <em className='markup--em markup--mixtapeEmbed-em'>
            { this.state.embed_data.description }
          </em>
        </a>{ this.state.embed_data.provider_url }
      </span>
    )
  }
}

export const EmbedBlockConfig = (options={})=>{
  let config = {
      title: 'insert embed',
      type: 'embed',
      block: EmbedBlock,
      icon: embed,
      editable: false,
      renderable: true,
      breakOnContinuous: true,
      wrapper_class: "graf graf--mixtapeEmbed",
      selected_class: "is-selected is-mediaFocused",
      widget_options: {
        displayOnInlineTooltip: true,
        insertion: "placeholder",
        insert_block: "embed"
      },
      options: {
        endpoint: '//open.iframe.ly/api/oembed?origin=https://github.com&url=',
        placeholder: 'Paste a link to embed content from another site (e.g. Twitter) and press Enter'
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



