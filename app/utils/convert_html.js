import {Entity} from 'draft-js';
import {convertToHTML} from 'draft-convert';

const toHTML = convertToHTML({
  blockToHTML: (block) => {
    if (block.type === 'atomic') {
      // inspect metadata inside atomic block. if you're using block metadata,
      // you can just inspect `block.data`, if not though we must inspect the
      // entity range inside of the block.
      if (block.entityRanges.length > 0) {
        const entityKey = block.entityRanges[0].key;
        const entity = Entity.get(entityKey);

        // once you get here it depends on your app and what your entity data
        // look like - in this example i'll pretend it uses the type to define
        // if it's an image, a video, etc
        const entityType = entity.getData().type;
        // return unique wrapping block elements for each type of atomic block
        if (entityType === 'ATOMIC-IMAGE') {
          return {
            start: '<div class="image-block">',
            end: '</div>'
          };
        }
        else if (entityType === 'ATOMIC-VIDEO') {
          return {
            start: '<div class="video-block">',
            end: '</div>'
          };
        }
      }
    }
    if (block.type === 'image'){
      debugger
      return {
            start: '<div class="image-block">',
            end: '</div>'
          };
    }
  },
  entityToHTML: (entity, originalText) => {
    if (entity.type === 'LINK') {
      const href = entity.data.href;
      return `<a href=${href}>${originalText}</a>`;
    }
    if (entity.type === 'ATOMIC-IMAGE') {
      const src = entity.data.src;
      return `<img src="${src}" />`;
    }
    if (entity.type === 'ATOMIC-VIDEO') {
      const src = entity.data.src;
      const type = entity.data.type;
      return `<video controls><source src="${src}" type="${type}"></video>`;
    }
    return originalText;
  }
});

//const html = toHTML(contentState);

//export default toHTML;
module.exports = toHTML