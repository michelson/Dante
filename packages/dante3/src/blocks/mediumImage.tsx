import React from "react";
import mediumZoom from "medium-zoom";

function ReactMediumZoom(props: any) {

  let imgRef = React.useRef();

  let zoom = React.useRef(mediumZoom({
    margin: 40,
    background: '#000'
  }));

  React.useEffect(() => {
    if (!props.isEditable) {
      imgRef.current && zoom.current.attach(imgRef.current);
      
    }
    if (props.isEditable) {
      imgRef.current && zoom.current.detach(imgRef.current);
    }
  }, [props.isEditable]);

  const { ...imgProps } = props;

  return <img ref={imgRef} {...imgProps} />;
}

export default ReactMediumZoom;
