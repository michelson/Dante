import Dante from "./editor";
import DanteEditor from './DanteEditor'
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
import GiphyBlock, { GiphyBlockConfig } from "./blocks/giphy/giphyBlock";
import AudioRecorderBlock, { AudioRecorderBlockConfig } from "./blocks/audioRecorder";
import FileBlock, { FileBlockConfig } from "./blocks/file";

//import ButtonBlock, {ButtonBlockConfig} from './blocks/button'
//export { ButtonBlock, ButtonBlockConfig}
// import CardBlock, {CardBlockConfig} from './blocks/card'
import DividerBlock, { DividerBlockConfig } from "./blocks/divider";
import CodeBlock, { CodeBlockConfig } from "./blocks/code";


import { MenuBarConfig } from './popovers/menuBar'
import { AddButtonConfig } from './popovers/addButton'
import Renderer from "./renderer";
import { extensionFactory } from './blocks/extension'

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
export { AudioRecorderBlock, AudioRecorderBlockConfig };
export { FileBlock, FileBlockConfig };

export { extensionFactory };
export { Renderer }

export { CodeBlock, CodeBlockConfig };
//export {DanteImagePopoverConfig}
//export {DanteAnchorPopoverConfig} //'./popovers/addButton'
//export {DanteInlineTooltipConfig}
//export {DanteTooltipConfig}

export { MenuBarConfig }
export { AddButtonConfig }

const defaultPlugins = [
  ImageBlockConfig(),
  CodeBlockConfig(),
  DividerBlockConfig(),
  EmbedBlockConfig(),
  PlaceholderBlockConfig(),
  VideoBlockConfig(),
  GiphyBlockConfig(),
  VideoRecorderBlockConfig(),
  SpeechToTextBlockConfig(),
  AudioRecorderBlockConfig(),
  FileBlockConfig()
];



export { defaultPlugins };

//export { CardBlock, CardBlockConfig}
//export {DemoEditor}
export { Dante };
export default DanteEditor
