import Dante from './Dante.js'

import DanteEditor from '../core/editor'
export {DanteEditor}

import {darkTheme, defaultTheme} from '../Dante/themes'
export {darkTheme, defaultTheme}

import Icons from '../icons'
export {Icons}

import Styled from '../../styled'
export {Styled}

import utils from '../../utils'
export {utils}

import {LinkDecorator, PrismDraftDecorator} from '../decorators'
export {LinkDecorator, PrismDraftDecorator}

import FileBlock, {FileBlockConfig} from '../blocks/file.js'
export { FileBlock, FileBlockConfig}

import ImageBlock, {ImageBlockConfig} from '../blocks/image.js'
export { ImageBlock, ImageBlockConfig}

import EmbedBlock, {EmbedBlockConfig} from '../blocks/embed.js'
export { EmbedBlock, EmbedBlockConfig}  

import VideoBlock, {VideoBlockConfig} from '../blocks/video.js'
export { VideoBlock, VideoBlockConfig}  

import PlaceholderBlock, {PlaceholderBlockConfig} from '../blocks/placeholder.js'
export { PlaceholderBlock, PlaceholderBlockConfig} 

import VideoRecorderBlock, {VideoRecorderBlockConfig} from '../blocks/videoRecorder'
import MediaRecorder from '../blocks/videoRecorder/MediaRecorder'
export { VideoRecorderBlock, VideoRecorderBlockConfig, MediaRecorder }

//import ButtonBlock, {ButtonBlockConfig} from '../blocks/button.js'
//export { ButtonBlock, ButtonBlockConfig} 

// import CardBlock, {CardBlockConfig} from '../blocks/card.js'
import DividerBlock, {DividerBlockConfig} from '../blocks/divider.js'
export { DividerBlock, DividerBlockConfig} 

import CodeBlock, {CodeBlockConfig} from '../blocks/code.js'
export { CodeBlock, CodeBlockConfig} 

import {DanteImagePopoverConfig} from '../popovers/image.js'
export {DanteImagePopoverConfig} 

import {DanteAnchorPopoverConfig} from '../popovers/link.js'
export {DanteAnchorPopoverConfig} 

import {DanteInlineTooltipConfig} from '../popovers/addButton.js' //'../popovers/addButton.js'
export {DanteInlineTooltipConfig} 

import {DanteTooltipConfig} from '../popovers/toolTip.js'
export {DanteTooltipConfig}

import model from '../../model'
export {model}

//export { CardBlock, CardBlockConfig} 
export default Dante