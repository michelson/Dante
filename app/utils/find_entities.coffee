{ Entity } = require('draft-js')

findEntities = (entityType, contentBlock, callback)->
  contentBlock.findEntityRanges (character) =>
    entityKey = character.getEntity()
    return (
      entityKey isnt null &&
      Entity.get(entityKey).getType() is entityType
    );
  ,
  callback

module.exports = findEntities