{ Entity } = require('draft-js')

findEntities = (entityType, instance, contentBlock, callback)->
  #TODO pass editor prop to link!!!!!
  contentBlock.findEntityRanges (character) =>
    entityKey = character.getEntity()
    return (
      debugger
      entityKey isnt null &&
      Entity.get(entityKey).getType() is entityType
    );
  ,
  callback

module.exports = findEntities