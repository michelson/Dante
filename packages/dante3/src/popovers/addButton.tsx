import React from "react";
import { add } from "../icons.js";
import { InlinetooltipWrapper } from "../styled/base";

const AddButton = React.forwardRef(
  (
    props: {
      display?: any;
      position?: any;
      widgets?: any;
      editor?: any;
      fixed: any;
    },
    ref: any
  ) => {
    const { display, position, widgets, editor, fixed } = props;
    const [scaled, setScaled] = React.useState(false);
    const [scaledWidth, setScaledWidth] = React.useState(
      fixed ? "100%" : "0px"
    );

    let fileInput = React.useRef(null);

    React.useEffect(() => {
      const val = scaled ? "300px" : "0";
      setScaledWidth(val);
    }, [scaled]);

    React.useEffect(() => {
      editor.on("selectionUpdate", ({ editor, s } : { editor: any, s: any }) => {
        // The selection has changed.
        setScaled(false);
      });
    }, []);

    function scaledClass() {
      if (scaled || fixed) {
        return "is-scaled";
      } else {
        return "";
      }
    }

    function activeClass() {
      //if @props.show then "is-active" else ""
      if (isActive()) {
        return "is-active";
      } else {
        return "";
      }
    }

    function isActive() {
      return display && editor.isEditable;
    }

    function scale() {
      if (scaled) return;
      setScaled(true);
    }

    function collapse() {
      if (!scaled) return;
      setScaled(false);
    }

    function _toggleScaled(ev: any) {
      ev.preventDefault();
      if (scaled) {
        return collapse();
      } else {
        return scale();
      }
    }

    function getItems() {
      if(!widgets) return []
      return widgets.filter((o: any) => {
        return o.widget_options
          ? o.widget_options.displayOnInlineTooltip
          : null;
      });
    }

    function clickOnFileUpload(e: any, block: any) {
      // @ts-ignore
      fileInput && fileInput?.current?.click();
      //this.collapse()
      //return this.hide()
    }

    function handlePlaceholder(block: any) {
      editor.commands.insertContent({
        type: "PlaceholderBlock",
        attrs: {
          blockKind: block
        }
      });
    }

    function handleInsertion(block: any) {
      editor.commands.insertContent({
        type: block.name,
        attrs: {}
      });
    }

    function clickHandler(e: any, type: any) {
      //console.log("TYPE", type);
      let request_block = widgets.find((o: any) => o.tag === type);

      switch (request_block.widget_options.insertion) {
        case "upload":
          return clickOnFileUpload(e, request_block);
        case "placeholder":
          return handlePlaceholder(request_block);
        case "insertion":
          return handleInsertion(request_block);
        default:
          return console.log(
            `WRONG TYPE FOR ${request_block.widget_options.insertion}`
          );
      }
    }

    function insertImage(file: any) {
      if (!file) return;

      let opts = {
        url: URL.createObjectURL(file),
        file
      };
      // cleans input image value
      // @ts-ignore
      fileInput.current.value = "";

      /*editor.chain()
        .focus()
        .setImage({ src: URL.createObjectURL(file) })
        .run()*/

      editor.commands.insertContent({
        type: "ImageBlock",
        attrs: {
          file: file,
          url: URL.createObjectURL(file)
        }
      });
    }

    function handleFileInput(e: any) {
      let fileList = e.target.files;
      // TODO: support multiple file uploads
      /*
      Object.keys(fileList).forEach (o)=>
        @.insertImage(fileList[0])
      */
      return insertImage(fileList[0]);
    }

    return (
      <InlinetooltipWrapper
        ref={ref}
        className={`inlineTooltip ${activeClass()} ${scaledClass()}`}
        style={position}
      >
        {!fixed && (
          <button
            type="button"
            className="inlineTooltip-button control"
            title="Close Menu"
            data-action="inline-menu"
            onClick={_toggleScaled}
          >
            {add()}
          </button>
        )}

        <div
          className={`inlineTooltip-menu ${
            fixed ? "inlineTooltip-menu-fixed" : ""
          }`}
          style={{ width: `${fixed ? "-1" : scaledWidth}` }}
        >
          {getItems().map((item: any, i: any) => {
            return (
              <InlineTooltipItem
                title={""}
                item={item}
                key={i}
                clickHandler={clickHandler}
              />
            );
          })}

          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInput}
            multiple={true}
            onChange={handleFileInput}
          />
        </div>
      </InlinetooltipWrapper>
    );
  }
);

AddButton.displayName = "AddButton"

// @ts-ignore
function InlineTooltipItem({ item, clickHandler, title }: { item: any, clickHandler: any, title: any }) {
  function onMouseDown(e: any) {
    e.preventDefault();
    return clickHandler(e, item.tag);
  }

  return (
    <button
      type="button"
      className="inlineTooltip-button scale"
      title={title}
      onMouseDown={onMouseDown}
      onClick={(e) => e.preventDefault()}
      style={{ fontSize: "21px" }}
    >
      {<span className={"tooltip-icon"}>{item.icon()}</span>}
    </button>
  );
}

export default AddButton;
