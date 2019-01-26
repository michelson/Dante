
import React from 'react';
import DanteEditor from "../core/editor.js"
import '../../styles/dante.scss';
import { Map, fromJS, merge } from 'immutable'
import {DanteImagePopoverConfig} from '../popovers/image.js'
import {DanteAnchorPopoverConfig} from '../popovers/link.js'
import {DanteInlineTooltipConfig} from '../popovers/addButton.js' //'Dante2/es/components/popovers/addButton.js'
import {DanteTooltipConfig} from '../popovers/toolTip.js' //'Dante2/es/components/popovers/toolTip.js'
import {ImageBlockConfig} from '../blocks/image.js'
import {EmbedBlockConfig} from '../blocks/embed.js'
import {VideoBlockConfig} from '../blocks/video.js'
import {PlaceholderBlockConfig} from '../blocks/placeholder.js'
import {DividerBlockConfig} from '../blocks/divider'
import {CodeBlockConfig} from '../blocks/code.js'
import Link from '../decorators/link'
import {PrismDraftDecorator} from '../decorators/prism'

import { CompositeDecorator } from 'draft-js'

import findEntities from '../../utils/find_entities'

import MultiDecorator from 'draft-js-multidecorators'

// custom blocks

import PropTypes from 'prop-types'

// component implementation
class Dante extends React.Component {

  constructor(props) {
    super(props)
  }

  // componentDidMount() { }

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
  content: PropTypes.object,
  read_only: PropTypes.bool,
  spellcheck: PropTypes.bool,
  title_placeholder: PropTypes.string,
  body_placeholder: PropTypes.string,

  xhr: PropTypes.shape({
    before_handler: PropTypes.func,
    success_handler: PropTypes.func,
    error_handler: PropTypes.func
  }),

  data_storage: PropTypes.shape({
    url: PropTypes.string,
    method: PropTypes.string,
    success_handler: PropTypes.func,
    failure_handler: PropTypes.func,
    interval: PropTypes.integer
  }),

  default_wrappers: PropTypes.arrayOf(PropTypes.shape({
     className: PropTypes.string.isRequired,
     block: PropTypes.number.isRequired
   })
  ),

  continuousBlocks: PropTypes.arrayOf(PropTypes.string),

  key_commands: PropTypes.object

  /*character_convert_mapping: PropTypes.shape({
      '> ': "blockquote"
  })*/
}

Dante.defaultProps = {
  content: {},
  read_only: false,
  spellcheck: false,
  title_placeholder: "Title",
  body_placeholder: "Write your story",

  decorators: (context)=>{
    return new MultiDecorator([
      PrismDraftDecorator(),
      new CompositeDecorator(
        [{
          strategy: findEntities.bind(null, 'LINK', context),
          component: Link
        } ]
      )
    ])
  },

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
              { key: 75, cmd: 'insert:link' },
              /*{ key: 13, cmd: 'toggle_block:divider' }*/
      ]
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
    DanteImagePopoverConfig(),
    DanteAnchorPopoverConfig(),
    DanteInlineTooltipConfig(),
    DanteTooltipConfig(),
  ],
  
  widgets: [
    ImageBlockConfig(),
    EmbedBlockConfig(),
    VideoBlockConfig(),
    PlaceholderBlockConfig(),
    //DividerBlockConfig(),
    //CodeBlockConfig()
  ]

}


export default Dante
