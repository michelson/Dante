import { FloatingMenu } from "@tiptap/react";
import React from "react";
import { add } from "../icons.js";
import { InlinetooltipWrapper } from "../styled/base";
import { usePopperTooltip } from "react-popper-tooltip";

const AddButton = React.forwardRef(
  (
    props: {
      display?: any;
      widgets?: any;
      editor?: any;
      configTooltip: any
    },
    ref: any
  ) => {
    const { display, widgets, editor, configTooltip } = props;
    const { fixed } = configTooltip
    const [scaled, setScaled] = React.useState(false);
    const [scaledWidth, setScaledWidth] = React.useState(
      fixed ? "100%" : "auto"
    );

    let fileInput = React.useRef(null);

    React.useEffect(() => {
      const w = getItems().length * 41
      const val = scaled ? `${w}px` : "0";
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
      const { file_types, insert_block } = block.widget_options;
      if (file_types) {
        fileInput.current.accept = file_types;
        fileInput.current.dataset.blockType = insert_block;
      }

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

    function handleFunc(e: any) {
      // this.hide();
      const ctx = {
        configTooltip: configTooltip,
        editor: editor
      }
      return e.widget_options.funcHandler && e.widget_options.funcHandler(ctx);
    };

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
        case "func":
          return handleFunc(request_block);
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

      editor.commands.insertContent({
        type: fileInput.current.dataset.blockType || "ImageBlock",
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

    function scaledWidthStyle() {
      if (!configTooltip.fixed) {
        return { width: `${scaledWidth}px`, left: `43px`, position: 'absolute' };
      } else {
        return {};
      }
    };


   function fixedClass(){
    if(fixed)
      return 'is-fixed'
    return ""
   }

    return (
      <MaybeFloating editor={editor} fixed={fixed}>
        <InlinetooltipWrapper
          ref={ref}
          className={`inlineTooltip ${fixedClass()} ${activeClass()} ${scaledClass()}`}
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
            //style={scaledWidthStyle()}
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
    
      </MaybeFloating>
    );
  }
);

AddButton.displayName = "AddButton"


function MaybeFloating({editor, children, fixed}: {editor: any, children: any, fixed: any}){


  function isPopOverEnabledFor(a: any) {
    //console.log("ENABLED FOR ", editor.state.selection.$anchor.parent);
    const comp = editor?.state.selection.$anchor.parent;
    if (comp && comp.type.name === "paragraph") return true;
  }

  
  if(!fixed) return <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
                    {isPopOverEnabledFor("AddButton") && (children)}
                  </FloatingMenu>

  return children }

// @ts-ignore
function InlineTooltipItem2({ item, clickHandler, title }: { item: any, clickHandler: any, title: any }) {
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


function InlineTooltipItem ({ item: { type, popper, icon } , clickHandler, title }) {
  const onClick = (e) => {
    e.preventDefault();
    return clickHandler(e, type);
  };

  const popperPlacement = popper && popper.placement ? popper.placement : "bottom"
  const popperOffset = popper && popper.offset ? popper.offset : [0, 7]

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ placement: popperPlacement, offset: popperOffset });

  return (
    <div className="button-container">
      <button
        ref={setTriggerRef}
        type="button"
        className="inlineTooltip-button scale"
        title={title}
        data-cy={`inline-tooltip-button-${type}`}
        onMouseDown={onClick}
        onClick={(e) => e.preventDefault()}
        style={{ fontSize: "21px" }}
      >
        {<span className={"tooltip-icon"}>{icon()}</span>}
      </button>
      {(popper && visible) && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container', style: { fontSize: "12px", borderRadius: "5px" } })}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          {popper && popper.name}
        </div>
      )}
    </div>
  );
  
}


export const AddButtonConfig = (options = {}) => {
  let config = {
    ref: "add_tooltip",
    component: AddButton,
  };
  return Object.assign(config, options);
};

export default AddButton;

