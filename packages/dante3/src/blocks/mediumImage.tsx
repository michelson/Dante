import React from "react";
import PropTypes from "prop-types";
import mediumZoom from "medium-zoom";

function ReactMediumZoom(props) {
  /*static propTypes = {
    text: PropTypes.string,
    onOpen: PropTypes.func,
    onClosed: PropTypes.func
  }*/

  let imgRef = React.useRef();

  let zoom = React.useRef(mediumZoom());

  React.useEffect(() => {
    if (!props.editable) {
      zoom.current.attach(imgRef.current, {
        margin: 40,
        background: "#000",
      });
      //.on('open', props.onOpen)
      //.on('closed', props.onClosed)
    }
    if (props.editable) {
      zoom.current.detach(imgRef.current);
    }
  }, [props.editable]);

  const { ...imgProps } = props;

  return <img ref={imgRef} {...imgProps} alt={imgRef} />;
}

export default ReactMediumZoom;
