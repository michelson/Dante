import Dante from "./editor";
//import DemoEditor from './DanteEditor'
//import DanteEditor from './core/editor'

import { darkTheme, defaultTheme } from "./styled/themes";

import Icons from "./icons";

import Styled from "./styled";

import ImageBlock, { ImageBlockConfig } from "./blocks/image";

import EmbedBlock, { EmbedBlockConfig } from "./blocks/embed";

import VideoBlock, { VideoBlockConfig } from "./blocks/video";

import PlaceholderBlock, { PlaceholderBlockConfig } from "./blocks/placeholder";

import VideoRecorderBlock, {
  VideoRecorderBlockConfig,
} from "./blocks/videoRecorder";
import MediaRecorder from "./blocks/videoRecorder/MediaRecorder";

//import ButtonBlock, {ButtonBlockConfig} from './blocks/button'
//export { ButtonBlock, ButtonBlockConfig}

// import CardBlock, {CardBlockConfig} from './blocks/card'
import DividerBlock, { DividerBlockConfig } from "./blocks/divider";

import CodeBlock, { CodeBlockConfig } from "./blocks/code";

//import {DanteImagePopoverConfig} from './popovers/image'

//import {DanteAnchorPopoverConfig} from './popovers/link'
//import {DanteInlineTooltipConfig} from './popovers/addButton'
//import {DanteTooltipConfig} from './popovers/toolTip'

import GiphyBlock, { GiphyBlockConfig } from "./blocks/giphy/giphyBlock";

import SpeechToTextBlock, {
  SpeechToTextBlockConfig,
} from "./blocks/speechToText";

//export {DanteEditor}
export { darkTheme, defaultTheme };
export { Icons };
export { Styled };
export { ImageBlock, ImageBlockConfig };
export { EmbedBlock, EmbedBlockConfig };
export { VideoBlock, VideoBlockConfig };
export { PlaceholderBlock, PlaceholderBlockConfig };
export { VideoRecorderBlock, VideoRecorderBlockConfig, MediaRecorder };
export { DividerBlock, DividerBlockConfig };
export { GiphyBlock, GiphyBlockConfig };
export { SpeechToTextBlock, SpeechToTextBlockConfig };

export { CodeBlock, CodeBlockConfig };
//export {DanteImagePopoverConfig}
//export {DanteAnchorPopoverConfig} //'./popovers/addButton'
//export {DanteInlineTooltipConfig}
//export {DanteTooltipConfig}

const defaultPlugins = [
  ImageBlockConfig(),
  CodeBlockConfig(),
  DividerBlockConfig(),
  PlaceholderBlockConfig(),
  EmbedBlockConfig(),
  VideoBlockConfig(),
  GiphyBlockConfig(),
  VideoRecorderBlockConfig(),
  SpeechToTextBlockConfig(),
];

export { defaultPlugins };

//export { CardBlock, CardBlockConfig}
//export {DemoEditor}
export default Dante;
