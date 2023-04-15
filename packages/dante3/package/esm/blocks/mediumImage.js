import { c as __rest, b as _assign } from '../tslib.es6-30a7ce49.js';
import React from 'react';
import mediumZoom from 'medium-zoom';

function ReactMediumZoom(props) {
    var imgRef = React.useRef();
    var zoom = React.useRef(mediumZoom({
        margin: 40,
        background: '#000'
    }));
    React.useEffect(function () {
        if (!props.isEditable) {
            zoom.current.attach(imgRef.current);
        }
        if (props.isEditable) {
            zoom.current.detach(imgRef.current);
        }
    }, [props.isEditable]);
    var imgProps = __rest(props, []);
    return React.createElement("img", _assign({ ref: imgRef }, imgProps, { alt: imgRef }));
}

export { ReactMediumZoom as default };
