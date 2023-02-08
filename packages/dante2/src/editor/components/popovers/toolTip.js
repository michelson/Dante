import React from "react";
import ReactDOM from "react-dom";
import DanteTooltipColor from "./color";
import { AnchorStyle } from "../../styled/menu";

//import DanteTooltipList from './select'

import { getVisibleSelectionRect, Entity, RichUtils } from "draft-js";

import {
  getSelectionRect,
  getSelection,
  getRelativeParent,
} from "../../utils/selection.js";

import { getCurrentBlock } from "../../model/index.js";

import Icons from "../icons.js";

class DanteTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link_mode: false,
      show: false,
      fixed: props.configTooltip.fixed,
      sticky: props.configTooltip.sticky,
      position: {},
      tooltipArrowPosition: 0,
      menu_style: {},
    };
    this.dante_menu = React.createRef();
    this.dante_menu_input = React.createRef();
  }

  _clickInlineHandler = (ev, style) => {
    ev.preventDefault();

    this.props.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, style)
    );

    this.callRelocate();
  };

  display = (b) => {
    if (b) {
      return this.show();
    } else {
      return this.hide();
    }
  };

  show = () => {
    return this.setState({
      show: true,
    });
  };

  hide = () => {
    return this.setState({
      link_mode: false,
      show: false,
      menu_style: {},
    });
  };

  setPosition = (coords) => {
    return this.setState({
      position: coords,
    });
  };

  isDescendant = (parent, child) => {
    let node = child.parentNode;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };

  handleWindowWidth = () => {};

  relocate = () => {
    // no position needs to be set
    if (this.state.sticky) {
      return this.handleWindowWidth();
    }

    let currentBlock = getCurrentBlock(this.props.editorState);
    let blockType = currentBlock.getType();
    // display tooltip only for unstyled

    if (this.props.configTooltip.selectionElements.indexOf(blockType) < 0) {
      this.hide();
      return;
    }

    if (this.state.link_mode) {
      return;
    }
    if (!this.state.show) {
      return;
    }

    let el = this.dante_menu.current;
    let padd = el.offsetWidth / 2;

    let nativeSelection = getSelection(window);
    if (!nativeSelection.rangeCount) {
      return;
    }

    let selectionBoundary = getSelectionRect(nativeSelection);

    let parent = this.props.editor.editorRef.editor

    // hide if selected node is not in editor
    if (!this.isDescendant(parent, nativeSelection.anchorNode)) {
      this.hide();
      return;
    }

    const relativeParent = getRelativeParent(
      this.dante_menu.current.parentElement
    );
    const toolbarHeight = this.dante_menu.current.clientHeight;
    //const toolbarWidth = this.dante_menu.current.clientWidth;
    const relativeRect = (
      relativeParent || document.body
    ).getBoundingClientRect();
    const selectionRect = getVisibleSelectionRect(window);

    if (!selectionRect || !relativeRect || !selectionBoundary) return;

    let top = selectionRect.top - relativeRect.top - toolbarHeight;
    //let left = selectionBoundary.left + selectionBoundary.width / 2 - padd
    let left =
      selectionRect.left - relativeRect.left + selectionRect.width / 2 - padd; // - (toolbarWidth / 2 ) + 10

    //let left = (selectionRect.left - relativeRect.left) + (selectionRect.width / 2)

    if (!top || !left) {
      return;
    }

    let tooltipArrowPosition = this.state.tooltipArrowPosition;
    let crossedRightBorder =
      relativeRect.width - left - this.dante_menu.current.clientWidth;
    let crossedLeftBorder = left;

    if (crossedLeftBorder < 0) {
      left = 10;
    }

    if (crossedRightBorder < 0) {
      left += crossedRightBorder - 10;
    }

    tooltipArrowPosition = selectionRect.left - left + selectionRect.width / 2;

    return this.setState({
      show: true,
      tooltipArrowPosition: `${tooltipArrowPosition}px`,
      position: {
        left,
        top,
      },
    });
  };

  _clickBlockHandler = (ev, style) => {
    ev.preventDefault();
    this.props.onChange(
      RichUtils.toggleBlockType(this.props.editorState, style)
    );
    return setTimeout(() => {
      return this.relocate();
    }, 0);
  };

  _clickBlockInlineStyle = (ev, style) => {
    let k = Object.keys(style)[0];
    this.props.onChange(
      this.props.styles[k].toggle(this.props.editorState, style[k])
    );
    //this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, style))
    return setTimeout(() => {
      return this.relocate();
    }, 0);
  };

  displayLinkMode = () => {
    if (this.state.link_mode) {
      return "dante-menu--linkmode";
    } else {
      return "";
    }
  };

  displayActiveMenu = () => {
    if (this.state.show || this.state.fixed) {
      return "dante-menu--active";
    } else {
      return "";
    }
  };

  _enableLinkMode = (ev) => {
    ev.preventDefault();
    return this.setState(
      {
        link_mode: true,
        menu_style: {
          minWidth: "200px",
        },
      },
      this.callRelocate
    );
  };

  _disableLinkMode = (ev) => {
    ev.preventDefault();
    return this.setState(
      {
        link_mode: false,
        url: "",
        menu_style: {},
      },
      this.callRelocate
    );
  };

  callRelocate = () => {
    setTimeout(() => {
      return this.relocate();
    }, 0);
  };

  hideMenu = () => {
    return this.hide();
  };

  handleInputEnter = (e) => {
    if (e.which === 13) {
      return this.confirmLink(e);
    }
  };

  confirmLink = (e) => {
    e.preventDefault();
    let { editorState } = this.props;
    let urlValue = e.currentTarget.value;
    let selection = editorState.getSelection();
    if ((/^javascript:/).test(urlValue.trim())) return

    let opts = {
      url: urlValue,
      showPopLinkOver: this.props.showPopLinkOver,
      hidePopLinkOver: this.props.hidePopLinkOver,
    };

    let entityKey = Entity.create("LINK", "MUTABLE", opts);

    if (selection.isCollapsed()) {
      return;
    }

    this.props.onChange(
      RichUtils.toggleLink(editorState, selection, entityKey)
    );

    return this._disableLinkMode(e);
  };

  getPosition = () => {
    if (this.isSticky()) return this.stickyStyle();
    let pos = this.state.position;
    return pos;
  };

  inlineItems = () => {
    return this.props.widget_options.block_types.filter((o) => {
      return o.type === "inline";
    });
  };

  blockItems = () => {
    return this.props.widget_options.block_types.filter((o) => {
      return o.type === "block";
    });
  };

  getDefaultValue = () => {
    const editorState = this.props.editorState
    const contentState = editorState.getCurrentContent();
    const startKey = editorState.getSelection().getStartKey();
    const startOffset = editorState.getSelection().getStartOffset();
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

    let url = '';
    if (linkKey) {
      const linkInstance = contentState.getEntity(linkKey);
      url = linkInstance.getData().url;
    }
    return url
  };

  linkBlock = () => {
    return this.props.widget_options.block_types.find((o) => o.type === "link");
  };

  stickyStyle = () => {
    return {
      position: "sticky",
      top: "0px",
      left: "0px",
    };
  };

  isSticky = () => {
    if (this.state.sticky) return true;

    if (typeof window === "undefined") return;
    const x = window.matchMedia("(max-width: 700px)");
    if (x.matches) return true;
  };

  render = () => {
    return (
      <AnchorStyle
        id="dante-menu"
        ref={this.dante_menu}
        className={`dante-menu ${this.displayActiveMenu()} ${this.displayLinkMode()} ${
          this.isSticky() ? "dante-sticky-menu" : ""
        }`}
        style={this.getPosition()}
        arrowPosition={this.state.tooltipArrowPosition}
      >
        {this.linkBlock() && this.displayLinkMode() ? (
          <div className="dante-menu-linkinput">
            <input
              className="dante-menu-input"
              ref={this.dante_menu_input}
              placeholder={this.linkBlock().placeholder}
              onKeyPress={this.handleInputEnter}
              defaultValue={ this.getDefaultValue() }
            />
            <div
              className="dante-menu-button"
              onMouseDown={this._disableLinkMode}
            >
              <span className={"dante-icon"}>{Icons["close"]()}</span>
            </div>
          </div>
        ) : null}

        <ul className="dante-menu-buttons" style={this.state.menu_style}>
          {/*
          }
          <DanteTooltipList
            editorState={ this.props.editorState }
            styles={this.props.styles}
            value={'Normal'}
            style_type="block"
            values={['unstyled', 'header-one', 'header-two']}
            items={['Normal', 'Title', 'Subtitle']}
            handleClick={(ev, style)=>{
              const types = {Normal: 'unstyled', Title: 'header-one', Subtitle: 'header-two' }

              this._clickBlockHandler(ev, types[style.block])
            }
          }
          />

          <DanteTooltipList
            editorState={ this.props.editorState }
            styles={this.props.styles}
            value={'Arial'}
            style_type="fontFamily"
            items={['Arial', 'Georgia', 'Helvetica',
                    'Tahoma', 'Times', 'Verdana']}
            handleClick={this._clickBlockInlineStyle}
          />

          <DanteTooltipList
            editorState={ this.props.editorState }
            items={
              [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                   22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 44, 48,
                   52, 56, 60].map( (n)=> { return `${n}px` } )
            }
            handleClick={this._clickBlockInlineStyle}
            value={"12px"}
            styles={this.props.styles}
            style_type="fontSize"
          />
          */}

          {this.props.widget_options.block_types.map((item, i) => {
            switch (item.type) {
              case "block":
                return (
                  <DanteTooltipItem
                    key={i}
                    item={item}
                    styles={this.props.style}
                    handleClick={this._clickBlockHandler}
                    editorState={this.props.editorState}
                    type="block"
                    currentStyle={this.props.editorState.getCurrentInlineStyle}
                  />
                );
                break;

              case "inline":
                return (
                  <DanteTooltipItem
                    key={i}
                    item={item}
                    type="inline"
                    editorState={this.props.editorState}
                    handleClick={this._clickInlineHandler}
                  />
                );
                break;

              case "color":
                return (
                  <DanteTooltipColor
                    key={i}
                    styles={this.props.styles}
                    editorState={this.props.editorState}
                    enableLinkMode={this._enableLinkMode}
                    value={"#000"}
                    style_type="color"
                    handleClick={this._clickBlockInlineStyle}
                    show={this.state.show}
                  />
                );
                break;

              case "separator":
                return <DanteMenuDivider key={i} />;
                break;
              case "link":
                return (
                  <DanteTooltipLink
                    key={i}
                    editorState={this.props.editorState}
                    enableLinkMode={this._enableLinkMode}
                  />
                );
                break;
              default:
                break;
            }
          })}
        </ul>
      </AnchorStyle>
    );
  };
}

const DanteMenuDivider = () => {
  return <li className="dante-menu-divider" />;
};

class DanteTooltipItem extends React.Component {
  constructor(...args) {
    super(...args);
  }

  handleClick = (ev) => {
    return this.props.handleClick(ev, this.props.item.style);
  };

  activeClass = () => {
    if (this.isActive()) {
      return "active";
    } else {
      return "";
    }
  };

  isActive = () => {
    if (this.props.type === "block") {
      return this.activeClassBlock();
    } else {
      return this.activeClassInline();
    }
  };

  activeClassInline = () => {
    if (
      !this.props.editorState ||
      !this.props.editorState.getCurrentContent().hasText()
    ) {
      return;
    }
    return this.props.editorState
      .getCurrentInlineStyle()
      .has(this.props.item.style);
  };

  activeClassBlock = () => {
    if (
      !this.props.editorState ||
      !this.props.editorState.getCurrentContent().hasText()
    ) {
      return;
    }
    let selection = this.props.editorState.getSelection();
    let blockKey = this.props.editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey());
    if (!blockKey) return;
    let blockType = blockKey.getType();
    return this.props.item.style === blockType;
  };

  render() {
    return (
      <li
        className={`dante-menu-button ${this.activeClass()}`}
        onMouseDown={this.handleClick}
      >
        <span className={"dante-icon"}>{this.props.item.icon()}</span>
      </li>
    );
  }
}

class DanteTooltipLink extends React.Component {
  constructor(...args) {
    super(...args);
    this.promptForLink = this.promptForLink.bind(this);
  }

  promptForLink = (ev) => {
    let selection = this.props.editorState.getSelection();
    if (!selection.isCollapsed()) {
      return this.props.enableLinkMode(ev);
    }
  };

  render() {
    return (
      <li className="dante-menu-button" onMouseDown={this.promptForLink}>
        <span className={"dante-icon"}>{Icons["link"]()}</span>
      </li>
    );
  }
}

export default DanteTooltip;

export const DanteTooltipConfig = (options = {}) => {
  let config = {
    ref: "insert_tooltip",
    component: DanteTooltip,
    displayOnSelection: true,
    fixed: false,
    sticky: false,
    placement: "up",
    selectionElements: [
      "unstyled",
      "blockquote",
      "ordered-list",
      "unordered-list",
      "unordered-list-item",
      "ordered-list-item",
      "code-block",
      "header-one",
      "header-two",
      "header-three",
      "header-four",
      "footer",
      "column",
      "jumbo",
    ],
    widget_options: {
      placeholder: "type a url",

      block_types: [
        { label: "p", style: "unstyled", icon: Icons.bold },
        { label: "h2", style: "header-one", type: "block", icon: Icons.h1 },
        { label: "h3", style: "header-two", type: "block", icon: Icons.h2 },
        { label: "h4", style: "header-three", type: "block", icon: Icons.h3 },

        { type: "separator" },
        { label: "color", type: "color" },
        { type: "link" },

        {
          label: "blockquote",
          style: "blockquote",
          type: "block",
          icon: Icons.blockquote,
        },
        { type: "separator" },
        {
          label: "insertunorderedlist",
          style: "unordered-list-item",
          type: "block",
          icon: Icons.insertunorderedlist,
        },
        {
          label: "insertorderedlist",
          style: "ordered-list-item",
          type: "block",
          icon: Icons.insertunorderedlist,
        },
        { type: "separator" },
        { label: "code", style: "code-block", type: "block", icon: Icons.code },
        { label: "bold", style: "BOLD", type: "inline", icon: Icons.bold },
        {
          label: "italic",
          style: "ITALIC",
          type: "inline",
          icon: Icons.italic,
        },
      ],
    },
  };
  return Object.assign(config, options);
};
