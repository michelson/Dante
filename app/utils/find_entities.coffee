{ Entity } = require('draft-js')

findEntities = (entityType, instance, contentBlock, callback)->
  #TODO pass editor prop to link!!!!!
  contentBlock.findEntityRanges (character) =>
    entityKey = character.getEntity()
    return (
      res = entityKey isnt null &&
      Entity.get(entityKey).getType() is entityType
      if res 
        opts =
          showPopLinkOver: instance.showPopLinkOver 
          hidePopLinkOver: instance.hidePopLinkOver
        Entity.mergeData(entityKey, opts)
      res
    );
  ,
  callback

module.exports = findEntities