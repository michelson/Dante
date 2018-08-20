
import React from 'react';
import DanteEditor from "../core/editor.js"
import '../../styles/dante.scss';
import { Map, fromJS } from 'immutable'
import DanteImagePopover from '../popovers/image.js'
import DanteAnchorPopover from '../popovers/link.js'
import DanteInlineTooltip from '../popovers/addButton.js' //'Dante2/es/components/popovers/addButton.js'
import DanteTooltip from '../popovers/toolTip.js' //'Dante2/es/components/popovers/toolTip.js'
import ImageBlock from '../blocks/image.js'
import EmbedBlock from '../blocks/embed.js'
import VideoBlock from '../blocks/video.js'
import PlaceholderBlock from '../blocks/placeholder.js'
import Icons from "../icons.js"

// custom blocks
import DividerBlock from '../blocks/divider'
//

import {
  resetBlockWithType,
  addNewBlockAt
} from '../../model/index.js'

import PropTypes from 'prop-types'


// component implementation
class Dante extends React.Component {

  constructor(props) {
    super(props)
    let config = Map(fromJS(this.defaultOptions(props.config)))
    this.options = config.mergeDeep(props.config).toJS()
    this.state = this.options
  }

  defaultOptions(options = {}) {
    // default options
  
    let defaultOptions = {}
    //defaultOptions.read_only = false
    //defaultOptions.spellcheck = false
    //defaultOptions.title_placeholder = "Title"
    //defaultOptions.body_placeholder = "Write your story"
    // @defaultOptions.api_key = "86c28a410a104c8bb58848733c82f840"

    //defaultOptions.widgets = options.widgets   || this.defaultWidgets(options)

    //defaultOptions.tooltips = options.tooltips || this.defaultTooltips(options)

    /*
    defaultOptions.xhr = {
      before_handler: null,
      success_handler: null,
      error_handler: null
    }

    defaultOptions.data_storage = {
      url: null,
      method: "POST",
      success_handler: null,
      failure_handler: null,
      interval: 1500
    }

    defaultOptions.default_wrappers = [
      { className: 'graf--p', block: 'unstyled' },
      { className: 'graf--h2', block: 'header-one' },
      { className: 'graf--h3', block: 'header-two' },
      { className: 'graf--h4', block: 'header-three' },
      { className: 'graf--blockquote', block: 'blockquote' },
      { className: 'graf--insertunorderedlist', block: 'unordered-list-item' },
      { className: 'graf--insertorderedlist', block: 'ordered-list-item' },
      { className: 'graf--code', block: 'code-block' },
      { className: 'graf--bold', block: 'BOLD' },
      { className: 'graf--italic', block: 'ITALIC' }]

      defaultOptions.continuousBlocks = [
        "unstyled",
        "blockquote",
        "ordered-list",
        "unordered-list",
        "unordered-list-item",
        "ordered-list-item",
        "code-block"
      ]

    defaultOptions.key_commands = {
      "alt-shift": [{ key: 65, cmd: 'add-new-block' }],
      "alt-cmd": [{ key: 49, cmd: 'toggle_block:header-one' },
                  { key: 50, cmd: 'toggle_block:header-two' },
                  { key: 53, cmd: 'toggle_block:blockquote' }],
      "cmd": [{ key: 66, cmd: 'toggle_inline:BOLD' },
              { key: 73, cmd: 'toggle_inline:ITALIC' },
              { key: 75, cmd: 'insert:link' }]
    }

    defaultOptions.character_convert_mapping = {
      '> ': "blockquote",
      '*.': "unordered-list-item",
      '* ': "unordered-list-item",
      '- ': "unordered-list-item",
      '1.': "ordered-list-item",
      '# ': 'header-one',
      '##': 'header-two',
      '==': "unstyled",
      '` ': "code-block"
    }*/

    return defaultOptions
  }

  componentDidMount() { }

/*
  defaultTooltips = (options)=>{
    return [{
        ref: 'insert_tooltip',
        component: DanteTooltip,
        displayOnSelection: true,
        selectionElements: [
        "unstyled",
        "blockquote",
        "ordered-list",
        "unordered-list",
        "unordered-list-item",
        "ordered-list-item",
        "code-block",
        'header-one',
        'header-two',
        'header-three',
        'header-four',
        'footer', 
        'column',
        'jumbo'],
        widget_options: {
          placeholder: "type a url",
          
          block_types: [
          { label: 'p', style: 'unstyled',  icon: Icons.bold },
          { label: 'h2', style: 'header-one', type: "block" , icon: Icons.h1 },
          { label: 'h3', style: 'header-two', type: "block",  icon: Icons.h2 },
          { label: 'h4', style: 'header-three', type: "block",  icon: Icons.h3 },

          { type: "separator" },
          { label: 'color', type: "color" },
          { type: "link" },
        
          { label: 'blockquote', style: 'blockquote', type: "block", icon: Icons.blockquote },
          { type: "separator" },
          { label: 'insertunorderedlist', style: 'unordered-list-item', type: "block", icon: Icons.insertunorderedlist },
          { label: 'insertorderedlist', style: 'ordered-list-item', type: "block", icon: Icons.insertunorderedlist },
          { type: "separator" },
          { label: 'code', style: 'code-block', type: "block",  icon: Icons.code },
          { label: 'bold', style: 'BOLD', type: "inline", icon: Icons.bold },
          { label: 'italic', style: 'ITALIC', type: "inline", icon: Icons.italic }]
          }
          }, {
            ref: 'add_tooltip',
            component: DanteInlineTooltip
          }, {
            ref: 'anchor_popover',
            component: DanteAnchorPopover
          }, {
            ref: 'image_popover',
            component: DanteImagePopover
          }]
  }

  defaultWidgets = (options)=>{
    return [
      {
        icon: 'divider',
        type: 'divider',
        title: "Divider",
        editable: false,
        renderable: true,
        breakOnContinuous: true,
        block: DividerBlock,
        wrapper_class: "graf graf--hr",
        widget_options: {
          displayOnInlineTooltip: true,
          insertion: "insertion",
          insert_block: "divider"
        }
      },
      {
        title: 'add an image',
        icon: 'image',
        type: 'image',
        block: ImageBlock,
        editable: true,
        renderable: true,
        breakOnContinuous: true,
        wrapper_class: "graf graf--figure",
        selected_class: "is-selected is-mediaFocused",
        selectedFn: block => {
          const { direction } = block.getData().toJS()
          switch (direction) {
            case "left":
              return "graf--layoutOutsetLeft"
            case "center":
              return ""
            case "wide":
              return "sectionLayout--fullWidth"
            case "fill":
              return "graf--layoutFillWidth"
            default:
              return ""
          }
        },
        handleEnterWithoutText(ctx, block) {
          const { editorState } = ctx.state
          return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
        },
        handleEnterWithText(ctx, block) {
          const { editorState } = ctx.state
          return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
        },
        widget_options: {
          displayOnInlineTooltip: true,
          insertion: "upload",
          insert_block: "image"
        },
        options: {
          upload_url: options.upload_url,
          upload_headers: options.upload_headers,
          upload_formName: options.upload_formName,
          upload_callback: options.image_upload_callback,
          image_delete_callback: options.image_delete_callback,
          image_caption_placeholder: options.image_caption_placeholder
        }
      }, {
        icon: 'embed',
        title: 'insert embed',
        type: 'embed',
        block: EmbedBlock,
        editable: true,
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
          endpoint: `${options.oembed_uri}`,
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
      }, {
        icon: 'video',
        title: 'insert video',
        editable: true,
        type: 'video',
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
          endpoint: `${options.oembed_uri}`,
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
      }, {
        renderable: true,
        editable: true,
        block: PlaceholderBlock,
        type: 'placeholder',
        wrapper_class: "is-embedable",
        breakOnContinuous: true,
        selected_class: "is-selected is-mediaFocused",
        widget_options: {
          displayOnInlineTooltip: false
        },

        handleEnterWithoutText(ctx, block) {
          const { editorState } = ctx.state
          return ctx.onChange(resetBlockWithType(editorState, "unstyled"))
        },

        handleEnterWithText(ctx, block) {
          const { editorState } = ctx.state
          const data = {
            provisory_text: block.getText(),
            endpoint: block.getData().get('endpoint'),
            type: block.getData().get('type')
          }
          return ctx.onChange(resetBlockWithType(editorState, data.type, data))
        }
      }
    ]
  }
*/

  toggleEditable = () => {
    this.setState({ read_only: !this.state.read_only })
  }

  render(){
    return(
      <div style={this.props.style}>
        <DanteEditor
          { ...this.props }
          toggleEditable={this.toggleEditable}
        />
      </div>
    )
  }
}

Dante.propTypes = {
  /** Editor content, it expects a null or a draft's EditorContent. */
  content: PropTypes.string,
  read_only: PropTypes.boolean,
  //spellcheck: PropTypes.boolean,
  //title_placeholder: PropTypes.string,
  body_placeholder: PropTypes.string,

  xhr: PropTypes.shape({
    before_handler: PropTypes.func,
    success_handler: PropTypes.func,
    error_handler: PropTypes.func
  }),

  data_storage: PropTypes.shape({
    url: PropTypes.string,
    method: "POST",
    success_handler: PropTypes.func,
    failure_handler: PropTypes.func,
    interval: PropTypes.integer
  }),

  default_wrappers: PropTypes.arrayOf(PropTypes.shape({
     className: PropTypes.string.isRequired,
     block: PropTypes.number.isRequired
   })
  ),

  continuousBlocks: PropTypes.arrayOf(["unstyled",
                                      "blockquote",
                                      "ordered-list",
                                      "unordered-list",
                                      "unordered-list-item",
                                      "ordered-list-item",
                                      "code-block"
                                    ])

  /*key_commands: PropTypes.shape({
      "alt-shift":  PropTypes.arrayOf(PropTypes.shape({
                     key: PropTypes.string.isRequired,
                     name: PropTypes.string.isRequired,
                   }),
      "alt-cmd": PropTypes.arrayOf(PropTypes.shape({
                       key: PropTypes.string.isRequired,
                       name: PropTypes.string.isRequired,
                     }),
      "cmd": PropTypes.arrayOf(PropTypes.shape({
               key: PropTypes.string.isRequired,
               name: PropTypes.string.isRequired,
             })
  })*/

  /*character_convert_mapping: PropTypes.shape({
      '> ': "blockquote"
  })*/
}

Dante.defaultProps = {
  content: null,
  read_only: false,
  spellcheck: false,
  title_placeholder: "Title",
  body_placeholder: "Write your story",

  xhr: {
    before_handler: null,
    success_handler: null,
    error_handler: null
  },

  data_storage: {
    url: null,
    method: "POST",
    success_handler: null,
    failure_handler: null,
    interval: 1500
  },

  default_wrappers: [
    { className: 'graf--p', block: 'unstyled' },
    { className: 'graf--h2', block: 'header-one' },
    { className: 'graf--h3', block: 'header-two' },
    { className: 'graf--h4', block: 'header-three' },
    { className: 'graf--blockquote', block: 'blockquote' },
    { className: 'graf--insertunorderedlist', block: 'unordered-list-item' },
    { className: 'graf--insertorderedlist', block: 'ordered-list-item' },
    { className: 'graf--code', block: 'code-block' },
    { className: 'graf--bold', block: 'BOLD' },
    { className: 'graf--italic', block: 'ITALIC' }
  ],

  continuousBlocks: [
    "unstyled",
    "blockquote",
    "ordered-list",
    "unordered-list",
    "unordered-list-item",
    "ordered-list-item",
    "code-block"
  ],

  key_commands: {
      "alt-shift": [{ key: 65, cmd: 'add-new-block' }],
      "alt-cmd": [{ key: 49, cmd: 'toggle_block:header-one' },
                  { key: 50, cmd: 'toggle_block:header-two' },
                  { key: 53, cmd: 'toggle_block:blockquote' }],
      "cmd": [{ key: 66, cmd: 'toggle_inline:BOLD' },
              { key: 73, cmd: 'toggle_inline:ITALIC' },
              { key: 75, cmd: 'insert:link' }]
  },

  character_convert_mapping: {
    '> ': "blockquote",
    '*.': "unordered-list-item",
    '* ': "unordered-list-item",
    '- ': "unordered-list-item",
    '1.': "ordered-list-item",
    '# ': 'header-one',
    '##': 'header-two',
    '==': "unstyled",
    '` ': "code-block"
  },

  tooltips: [
    {
        ref: 'insert_tooltip',
        component: DanteTooltip,
        displayOnSelection: true,
        selectionElements: [
          "unstyled",
          "blockquote",
          "ordered-list",
          "unordered-list",
          "unordered-list-item",
          "ordered-list-item",
          "code-block",
          'header-one',
          'header-two',
          'header-three',
          'header-four',
          'footer', 
          'column',
          'jumbo'
        ],
        widget_options: {
          placeholder: "type a url",
          
          block_types: [
            { label: 'p', style: 'unstyled',  icon: Icons.bold },
            { label: 'h2', style: 'header-one', type: "block" , icon: Icons.h1 },
            { label: 'h3', style: 'header-two', type: "block",  icon: Icons.h2 },
            { label: 'h4', style: 'header-three', type: "block",  icon: Icons.h3 },

            { type: "separator" },
            { label: 'color', type: "color" },
            { type: "link" },
          
            { label: 'blockquote', style: 'blockquote', type: "block", icon: Icons.blockquote },
            { type: "separator" },
            { label: 'insertunorderedlist', style: 'unordered-list-item', type: "block", icon: Icons.insertunorderedlist },
            { label: 'insertorderedlist', style: 'ordered-list-item', type: "block", icon: Icons.insertunorderedlist },
            { type: "separator" },
            { label: 'code', style: 'code-block', type: "block",  icon: Icons.code },
            { label: 'bold', style: 'BOLD', type: "inline", icon: Icons.bold },
            { label: 'italic', style: 'ITALIC', type: "inline", icon: Icons.italic }
          ]
        }
    }, 
    {
      ref: 'add_tooltip',
      component: DanteInlineTooltip
    }, 
    {
      ref: 'anchor_popover',
      component: DanteAnchorPopover
    }, 
    {
      ref: 'image_popover',
      component: DanteImagePopover
    }
  ],
  
  widgets: [
    {
      icon: 'divider',
      type: 'divider',
      title: "Divider",
      editable: false,
      renderable: true,
      breakOnContinuous: true,
      block: DividerBlock,
      wrapper_class: "graf graf--hr",
      widget_options: {
        displayOnInlineTooltip: true,
        insertion: "insertion",
        insert_block: "divider"
      }
    },
    {
      title: 'add an image',
      icon: 'image',
      type: 'image',
      block: ImageBlock,
      editable: true,
      renderable: true,
      breakOnContinuous: true,
      wrapper_class: "graf graf--figure",
      selected_class: "is-selected is-mediaFocused",
      selectedFn: block => {
        const { direction } = block.getData().toJS()
        switch (direction) {
          case "left":
            return "graf--layoutOutsetLeft"
          case "center":
            return ""
          case "wide":
            return "sectionLayout--fullWidth"
          case "fill":
            return "graf--layoutFillWidth"
          default:
            return ""
        }
      },
      handleEnterWithoutText(ctx, block) {
        const { editorState } = ctx.state
        return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
      },
      handleEnterWithText(ctx, block) {
        const { editorState } = ctx.state
        return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
      },
      widget_options: {
        displayOnInlineTooltip: true,
        insertion: "upload",
        insert_block: "image"
      },
      options: {
        upload_url: '',
        upload_headers: null,
        upload_formName: "file",
        upload_callback: null,
        image_delete_callback: null,
        image_caption_placeholder: "type a caption (optional)"
      }
    }, {
      icon: 'embed',
      title: 'insert embed',
      type: 'embed',
      block: EmbedBlock,
      editable: true,
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
        //endpoint: `${options.oembed_uri}`,
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
    }, {
      icon: 'video',
      title: 'insert video',
      editable: true,
      type: 'video',
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
        //endpoint: `${options.oembed_uri}`,
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
    }, {
      renderable: true,
      editable: true,
      block: PlaceholderBlock,
      type: 'placeholder',
      wrapper_class: "is-embedable",
      breakOnContinuous: true,
      selected_class: "is-selected is-mediaFocused",
      widget_options: {
        displayOnInlineTooltip: false
      },

      handleEnterWithoutText(ctx, block) {
        const { editorState } = ctx.state
        return ctx.onChange(resetBlockWithType(editorState, "unstyled"))
      },

      handleEnterWithText(ctx, block) {
        const { editorState } = ctx.state
        const data = {
          provisory_text: block.getText(),
          endpoint: block.getData().get('endpoint'),
          type: block.getData().get('type')
        }
        return ctx.onChange(resetBlockWithType(editorState, data.type, data))
      }
    }
  ]

}


export default Dante
