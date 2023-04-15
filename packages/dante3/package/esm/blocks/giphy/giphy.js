import { _ as __makeTemplateObject } from '../../tslib.es6-30a7ce49.js';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

//import Input from "../../forms/Input";
//import attribution from "../../../images/Poweredby_100px-White_VertText.png";
var GiphyBlock = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  //position: absolute;\n  //left: 128px;\n  //bottom: 48px;\n  //z-index: 10000;\n  //height: 251px;\n  //background: white;\n  //border: 1px solid #abaaaa;\n  //border-radius: 3px;\n  //width: 223px;\n  //box-shadow: 1px 1px 1px #ece3e3;\n"], ["\n  //position: absolute;\n  //left: 128px;\n  //bottom: 48px;\n  //z-index: 10000;\n  //height: 251px;\n  //background: white;\n  //border: 1px solid #abaaaa;\n  //border-radius: 3px;\n  //width: 223px;\n  //box-shadow: 1px 1px 1px #ece3e3;\n"])));
var GridListOverflow = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: 187px;\n  overflow: auto;\n"], ["\n  height: 187px;\n  overflow: auto;\n"])));
var GridList = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  display: flex;\n  flex-flow: row wrap;\n  margin-left: 0px;\n  width: 100%;\n  img {\n    flex: auto;\n    height: 250px;\n    min-width: 150px;\n    margin: 0 0px 8px 0;\n  }\n"], ["\n  display: flex;\n  display: flex;\n  flex-flow: row wrap;\n  margin-left: 0px;\n  width: 100%;\n  img {\n    flex: auto;\n    height: 250px;\n    min-width: 150px;\n    margin: 0 0px 8px 0;\n  }\n"])));
var Container = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  padding: 10px;\n  //background: \"#ccc\";\n"], ["\n  padding: 10px;\n  //background: \"#ccc\";\n"])));
var PickerBlock = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  margin-bottom: 4px;\n\n  &:before {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 8px;\n    background: #c4e17f;\n    background-image: -webkit-linear-gradient(\n      left,\n      #fff35c,\n      #fff35c,\n      #ff6666,\n      #ff6666,\n      #9933ff,\n      #9933ff,\n      #00ccff,\n      #00ccff,\n      #00ff99,\n      #00ff99\n    );\n    background-image: -moz-linear-gradient(\n      left,\n      #fff35c,\n      #fff35c,\n      #ff6666,\n      #ff6666,\n      #9933ff,\n      #9933ff,\n      #00ccff,\n      #00ccff,\n      #00ff99,\n      #00ff99\n    );\n    background-image: -o-linear-gradient(\n      left,\n      #fff35c,\n      #fff35c,\n      #ff6666,\n      #ff6666,\n      #9933ff,\n      #9933ff,\n      #00ccff,\n      #00ccff,\n      #00ff99,\n      #00ff99\n    );\n    background-image: linear-gradient(\n      left,\n      #fff35c,\n      #fff35c,\n      #ff6666,\n      #ff6666,\n      #9933ff,\n      #9933ff,\n      #00ccff,\n      #00ccff,\n      #00ff99,\n      #00ff99\n    );\n  }\n"], ["\n  display: flex;\n  justify-content: center;\n  margin-bottom: 4px;\n\n  &:before {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 8px;\n    background: #c4e17f;\n    background-image: -webkit-linear-gradient(\n      left,\n      #fff35c,\n      #fff35c,\n      #ff6666,\n      #ff6666,\n      #9933ff,\n      #9933ff,\n      #00ccff,\n      #00ccff,\n      #00ff99,\n      #00ff99\n    );\n    background-image: -moz-linear-gradient(\n      left,\n      #fff35c,\n      #fff35c,\n      #ff6666,\n      #ff6666,\n      #9933ff,\n      #9933ff,\n      #00ccff,\n      #00ccff,\n      #00ff99,\n      #00ff99\n    );\n    background-image: -o-linear-gradient(\n      left,\n      #fff35c,\n      #fff35c,\n      #ff6666,\n      #ff6666,\n      #9933ff,\n      #9933ff,\n      #00ccff,\n      #00ccff,\n      #00ff99,\n      #00ff99\n    );\n    background-image: linear-gradient(\n      left,\n      #fff35c,\n      #fff35c,\n      #ff6666,\n      #ff6666,\n      #9933ff,\n      #9933ff,\n      #00ccff,\n      #00ccff,\n      #00ff99,\n      #00ff99\n    );\n  }\n"])));
var App = function (props) {
    var _a = useState([]), gifs = _a[0], setGifs = _a[1];
    var _b = useState(10), limit = _b[0]; _b[1];
    var _c = useState(''), term = _c[0], setTerm = _c[1];
    var inputRef = useRef(null);
    useEffect(function () {
        search('', 'trend');
    }, []);
    var onSearchSubmit = function (e) {
        if (e.key !== 'Enter') {
            return;
        }
        var term = inputRef.current.value;
        search(term);
    };
    var search = function (term, kind) {
        if (kind === void 0) { kind = 'search'; }
        var url = kind === 'search'
            ? "https://api.giphy.com/v1/gifs/search?q=".concat(term)
            : "https://api.giphy.com/v1/gifs/trending?q=".concat(term);
        var link = "".concat(url, "&limit=").concat(limit, "&api_key=").concat(props.apiKey);
        axios
            .get(link)
            .then(function (response) {
            // handle success
            setGifs(response.data.data);
            // console.log(response);
        })
            .catch(function (error) {
            // handle error
            console.log(error);
        });
    };
    var handleChange = function (e) {
        var term = e.target.value;
        setTerm(term);
    };
    return (React.createElement(GiphyBlock, null,
        React.createElement(Container, null,
            React.createElement(PickerBlock, null,
                React.createElement("input", { ref: inputRef, type: "text", placeholder: "search gif", value: term, onChange: handleChange, onKeyDown: onSearchSubmit })),
            React.createElement(GridListOverflow, null,
                React.createElement(GridList, null, gifs.map(function (o) { return (React.createElement("img", { alt: "giphy", key: "giphy-".concat(o.id), onClick: function (_e) { return props.handleSelected(o); }, height: o.images.fixed_width_downsampled.height, width: o.images.fixed_width_downsampled.width, src: o.images.fixed_width_downsampled.url })); }))),
            React.createElement("div", { className: "flex justify-center mt-2" }))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

export { App as default };
