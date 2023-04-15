import React from "react";
import PropTypes from "prop-types";
import mediumZoom from "medium-zoom";

function ReactMediumZoom(props) {

  let imgRef = React.useRef();

  let zoom = React.useRef(mediumZoom());

  React.useEffect(() => {
    if (!props.isEditable) {
      zoom.current.attach(imgRef.current, {
        margin: 40,
        background: "#000",
      });
    }
    if (props.isEditable) {
      zoom.current.detach(imgRef.current);
    }
  }, [props.isEditable]);

  const { ...imgProps } = props;

  return <img ref={imgRef} {...imgProps} alt={imgRef} />;
}

export default ReactMediumZoom;
