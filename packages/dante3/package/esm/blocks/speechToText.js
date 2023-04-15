import { _ as __makeTemplateObject } from '../tslib.es6-30a7ce49.js';
import React, { useState, useEffect } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import styled from '@emotion/styled';
import { u as speech } from '../icons-ca14e5a1.js';

var StartButton = styled.a(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border-radius: 50%;\n  background-color: #ff5e5e;\n  width: 50px;\n  height: 50px;\n  display: block;\n  margin: 0 auto;\n  cursor: pointer;\n  text-align: center;\n  box-shadow: ", ";\n  svg {\n    margin-top: 12px;\n    fill: white;\n    display: inline;\n    vertical-align: unset !important;\n    &:hover {\n      fill: #222;\n    }\n  }\n"], ["\n  border-radius: 50%;\n  background-color: #ff5e5e;\n  width: 50px;\n  height: 50px;\n  display: block;\n  margin: 0 auto;\n  cursor: pointer;\n  text-align: center;\n  box-shadow: ", ";\n  svg {\n    margin-top: 12px;\n    fill: white;\n    display: inline;\n    vertical-align: unset !important;\n    &:hover {\n      fill: #222;\n    }\n  }\n"])), function (props) {
    return props.recording
        ? "inset -1px 1px 0px 0px #270101"
        : "inset 0px -1px 0px 0px #270101";
});
var RecorderWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: 0px auto;\n  text-align: center;\n"], ["\n  margin: 0px auto;\n  text-align: center;\n"])));
var RecorderLegend = styled.span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: #797878;\n  font-size: 0.789em;\n  text-transform: uppercase;\n  font-family: futura-pt;\n"], ["\n  color: #797878;\n  font-size: 0.789em;\n  text-transform: uppercase;\n  font-family: futura-pt;\n"])));
var SpeechRecorderWrapper = styled(NodeViewWrapper)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background: #ccc;\n  padding: 20px;\n  background: #fdffd4;\n  padding: 21px;\n  border: 1px solid #f0f1d9;\n  position: relative;\n"], ["\n  background: #ccc;\n  padding: 20px;\n  background: #fdffd4;\n  padding: 21px;\n  border: 1px solid #f0f1d9;\n  position: relative;\n"])));
var DeleteSelf = styled.button(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: absolute;\n  right: 10px;\n  top: 12px;\n"], ["\n  position: absolute;\n  right: 10px;\n  top: 12px;\n"])));
var SpeechToTextBlock = function (_a) {
    var editor = _a.editor, deleteNode = _a.deleteNode;
    var _b = useState(''); _b[0]; _b[1];
    var _c = useState([]), transcript = _c[0], setTranscript = _c[1];
    var _d = useState(false), recording = _d[0], setRecording = _d[1];
    var _e = useState(null), recognition = _e[0], setRecognition = _e[1];
    useEffect(function () {
        if (typeof window === "undefined")
            return;
        if (!("webkitSpeechRecognition" in window)) {
            alert("no speech recognition");
        }
        else {
            var webkitSpeechRecognition = window.webkitSpeechRecognition;
            var newRecognition = new webkitSpeechRecognition();
            newRecognition.continuous = true;
            newRecognition.interimResults = true;
            newRecognition.onstart = function (event) {
                setRecording(true);
            };
            newRecognition.onresult = function (event) {
                var res = [];
                for (var i = 0; i < event.results.length; ++i) {
                    res.push(event.results[i][0].transcript);
                }
                setTranscript(res);
            };
            newRecognition.onerror = function (event) {
                console.log(event);
            };
            newRecognition.onend = function () {
                setRecording(false);
            };
            setRecognition(newRecognition);
        }
    }, []);
    var deleteSelf = function (e) {
        e.preventDefault();
        recognition.stop();
        deleteNode();
    };
    var startButton = function (e) {
        e.preventDefault();
        if (recording) {
            recognition.stop();
        }
        else {
            recognition.start();
        }
    };
    var resetRecorder = function (e) {
        e.preventDefault();
        recognition.stop();
        setTranscript([]);
    };
    var convert = function (e) {
        e.preventDefault();
        recognition.stop();
        editor
            .chain()
            .focus()
            .toggleNode('paragraph', 'paragraph', {})
            .insertContent(transcript.map(function (o) { return o; }).join(' '))
            .run();
    };
    return (React.createElement(SpeechRecorderWrapper, null,
        editor.isEditable ? (React.createElement(DeleteSelf, { type: "button", className: "graf--media-embed-close", onClick: deleteSelf },
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: "2" },
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })))) : null,
        React.createElement(RecorderWrapper, null,
            React.createElement(StartButton, { id: "start_button", className: "".concat(recording ? "recordingButton" : ""), recording: recording, onClick: function (e) {
                    startButton(e);
                } }, speech()),
            React.createElement(RecorderLegend, null, recording ? "stop dictation" : "start dictation"),
            transcript.length > 0 && (React.createElement("div", { className: "d-flex justify-content-center" },
                React.createElement("button", { onClick: convert, className: "btn btn-success mr-1" }, "confirm"),
                React.createElement("button", { type: "button", onClick: resetRecorder, className: "btn btn-link" }, "or cancel")))),
        React.createElement(NodeViewContent, null, transcript.map(function (o) { return o; }))));
};
var SpeechToTextBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        icon: speech,
        name: "SpeechToText",
        tag: "speech-to-text",
        component: SpeechToTextBlock,
        atom: true,
        widget_options: {
            displayOnInlineTooltip: true,
            insertion: "insertion",
            insert_block: "SpeechToText",
        },
        options: {},
        attributes: {},
    };
    return Object.assign(config, options);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

export { SpeechToTextBlockConfig, SpeechToTextBlock as default };
