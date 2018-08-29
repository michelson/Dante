# examples

hahahah

import CardBlock from '../blocks/card'
import ButtonBlock from '../blocks/button'
import UnsubscribeBlock from '../blocks/unsubscribe'
// design blocks
import Column from '../blocks/column.js'
import Jumbo from '../blocks/jumbo.js'





{
  icon: 'jumbo',
  type: 'jumbo',
  title: "Jumbo",
  breakOnContinuous: true,
  editable: true,
  renderable: true,
  undeletable: true,
  block: Jumbo,
  wrapper_class: "graf graf--jumbo",
  widget_options: {
    displayOnInlineTooltip: false
  },
  handleEnterWithoutText(ctx, block) {
    const { editorState } = ctx.state
    return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
  },
  handleEnterWithText(ctx, block) {
    const { editorState } = ctx.state
    return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
  }    
},
{
  icon: 'button',
  type: 'button',
  title: "Button",
  breakOnContinuous: true,
  editable: true,
  renderable: true,
  block: ButtonBlock,
  wrapper_class: "graf graf--figure",
  widget_options: {
    displayOnInlineTooltip: true,
    insertion: "insertion",
    insert_block: "button"
  },
  handleEnterWithoutText(ctx, block) {
    const { editorState } = ctx.state
    return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
  },
  handleEnterWithText(ctx, block) {
    const { editorState } = ctx.state
    return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
  },
},
/*{
  icon: 'column',
  type: 'column',
  title: "Column",
  breakOnContinuous: true,
  editable: true,
  renderable: true,
  undeletable: true,
  block: Column,
  wrapper_class: "graf graf--column",

  selectedFn: block => {
    const { className } = block.getData().toJS()
    return className
  },

  widget_options: {
    displayOnInlineTooltip: false
  },
  handleEnterWithoutText(ctx, block) {
    const { editorState } = ctx.state
    return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
  },
  handleEnterWithText(ctx, block) {
    const { editorState } = ctx.state
    return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
  }    
},*/
/*{
    icon: 'footer',
    type: 'footer',
    title: "Footer",
    breakOnContinuous: true,
    editable: true,
    renderable: true,
    undeletable: true,
    block: UnsubscribeBlock,
    wrapper_class: "graf graf--figure",
    widget_options: {
      displayOnInlineTooltip: false,
      insertion: "insertion",
      insert_block: "unsubscribe"
    },
    handleEnterWithoutText(ctx, block) {
      const { editorState } = ctx.state
      return true
      //ctx.onChange(addNewBlockAt(editorState, block.getKey()))
    },
    handleEnterWithText(ctx, block) {
      const { editorState } = ctx.state
      return true
      //return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
    }
},*/
/*
{
  icon: 'card',
  type: 'card',
  title: 'Signature',
  breakOnContinuous: true,
  editable: true,
  renderable: true,
  block: CardBlock,
  wrapper_class: 'graf graf--figure',
  widget_options: {
    displayOnInlineTooltip: true,
    insertion: 'insertion',
    insert_block: 'card'
  },
  options: {
    upload_url: options.upload_url,
    upload_headers: options.upload_headers,
    upload_formName: options.upload_formName,
    upload_callback: options.image_upload_callback,
    image_delete_callback: options.image_delete_callback,
    image_caption_placeholder: options.image_caption_placeholder
  },
  handleEnterWithoutText(ctx, block) {
    const { editorState } = ctx.state
    return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
  },
  handleEnterWithText(ctx, block) {
    const { editorState } = ctx.state
    return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
  }
},*/
/*{
  icon: 'button',
  type: 'unsubscribe_button',
  title: "Button",
  breakOnContinuous: true,
  editable: true,
  renderable: true,
  undeletable: true,
  block: ButtonBlock,
  wrapper_class: "graf graf--figure",
  widget_options: {
    displayOnInlineTooltip: false,
    insertion: "insertion",
    insert_block: "button"
  },
  handleEnterWithoutText(ctx, block) {
    const { editorState } = ctx.state
    return true
    //return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
  },
  handleEnterWithText(ctx, block) {
    const { editorState } = ctx.state
    return true
    //return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
  },
},*/