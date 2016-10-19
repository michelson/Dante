//https://gist.github.com/benbriggs/d946a7cf4f7d90545779aeb79ccbd292
import {
  EditorState,
  convertFromRaw,
  CompositeDecorator,
} from 'draft-js';

import Link, { findLinkEntities } from '../components/link';


const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);


const createEditorState = (content = null, decorators = null) => {
  if (content === null) {
    return EditorState.createEmpty(decorator);
  }
  let dec = decorator;
  if (decorators !== null) {
    dec = decorators;
  }
  return EditorState.createWithContent(convertFromRaw(content), dec);
};

export default createEditorState;
