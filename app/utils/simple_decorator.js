var Immutable = require('immutable');

var KEY_SEPARATOR = '-';

/**
 * Creates a Draft decorator
 * @param {Function} strategy function (contentBlock, callback(start, end, props))
 * @param {Function} getComponent function (props) -> React.Component
 */
function SimpleDecorator(strategy, getComponent) {
    this.decorated = {};
    this.strategy = strategy;
    this.getComponent = getComponent;
}

/**
 * Return list of decoration IDs per character
 * @param {ContentBlock} block
 * @return {List<String>}
 */
SimpleDecorator.prototype.getDecorations = function(block) {
    var decorations = Array(block.getText().length).fill(null);
    // Apply a decoration to given range, with given props
    function callback (start, end, props) {
        if (props === undefined) {
            props = {};
        }
        key = blockKey + KEY_SEPARATOR + decorationId;
        decorated[blockKey][decorationId] = props;
        decorateRange(decorations, start, end, key);
        decorationId++;
    }

    var blockKey = block.getKey();
    var key;
    var decorationId = 0;
    var decorated = this.decorated;
    decorated[blockKey] = {};

    this.strategy(block, callback);

    return Immutable.List(decorations);
};

/**
 * Return component to render a decoration
 * @param {String} key
 * @return {Function}
 */
SimpleDecorator.prototype.getComponentForKey = function(key) {
    return this.getComponent;
};

/**
 * Return props to render a decoration
 * @param {String} key
 * @return {Object}
 */
SimpleDecorator.prototype.getPropsForKey = function(key) {
    var parts = key.split(KEY_SEPARATOR);
    var blockKey = parts[0];
    var decorationId = parts[1];
    return this.decorated[blockKey][decorationId];
};

function decorateRange(decorationsArray, start, end, key) {
    for (var ii = start; ii < end; ii++) {
        decorationsArray[ii] = key;
    }
}

module.exports = SimpleDecorator;