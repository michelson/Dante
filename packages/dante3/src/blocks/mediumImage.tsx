import React from "react";
import mediumZoom from "medium-zoom";

function ReactMediumZoom(props) {

  let imgRef = React.useRef();

  let zoom = React.useRef(mediumZoom({
    margin: 40,
    background: '#000'
  }));

  React.useEffect(() => {
    if (!props.isEditable) {
      zoom.current.attach(imgRef.current);
      
    }
    if (props.isEditable) {
      zoom.current.detach(imgRef.current);
    }
  }, [props.isEditable]);

  const { ...imgProps } = props;

  return <img ref={imgRef} {...imgProps} alt={imgRef} />;
}

export default ReactMediumZoom;
