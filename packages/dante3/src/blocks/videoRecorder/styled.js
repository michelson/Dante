import styled from "@emotion/styled";

export const VideoContainer = styled.div`
  background: ${(props) => props.theme.inversed_color};
  padding: 0px;
  margin-bottom: 10px;
  //border: 1px solid ${(props) => props.theme.dante_control_color};
  box-shadow: ${(props) => props.theme.dante_menu_box_shadow};
  border-radius: 10px;
  position: relative;
`;

export const VideoBody = styled.div`
  padding-bottom: 20px;
`;

const green = "#00ab6b";
const red = "#e61742";
const green2 = "#52e617";
const gray = "#bbbbbb";

export const RecordActivity = styled.div`
  background: ${(props) => (props.active ? red : green)};
  position: absolute;
  height: 13px;
  width: 13px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  top: 58px;
  right: 25px;
  box-shadow: inset -1px -2px 14px 0px #841744;
`;

export const EditorControls = styled.div`
  position: absolute;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  //margin-top: 25px;
  //margin-left: 17px;
  height: 100%;
  z-index: 10;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .controls-recording {
    position: relative;
    display: flex;
    align-items: center;
  }
`;

export const StatusBar = styled.div`
  z-index: 10;
  position: absolute;
  height: 80%;
  width: 100%;
  background: ${(props) => (props.loading ? "white" : "transparent")};
  display: ${(props) => (props.loading ? "flex" : "none")};
  align-items: center;

  opacity: ${(props) => (props.loading ? "0.9" : "1")};
`;

export const VideoPlayer = styled.video`
  width: 100%;
  background: black;
`;

export const SecondsLeft = styled.div`
  //position: absolute;
  font-size: 1rem;
  right: 39px;
  top: 19px;
  font-size: 2em;
  color: white;
`;

export const RecButton = styled.div`
  display: inline-block;
  cursor: pointer;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
  margin: 7px 17px;
  text-indent: 36px;

  text-indent: 36px;
  color: #d9ece5;
  text-shadow: 0px 1px 0px #101010;

  &:hover {
    //color: ${green}
    color: #d9ece5;
  }

  &:before {
    position: absolute;
    width: 26px;
    height: 26px;
    top: 4px;
    content: "";
    border-radius: 50px;
    background: #e80415;
    cursor: pointer;
    left: 4px;
  }

  &.recording {
    &:before {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 6px;
      content: "";
      border-radius: 2px;
      background: #e80415;
      cursor: pointer;
      left: 7px;
    }
  }

  &:after {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 6px;
    left: 6px;
    content: "";
    -webkit-transform: translate(-6px, -6px);
    -ms-transform: translate(-6px, -6px);
    -webkit-transform: translate(-6px, -6px);
    -ms-transform: translate(-6px, -6px);
    -webkit-transform: translate(-6px, -6px);
    -ms-transform: translate(-6px, -6px);
    transform: translate(-6px, -6px);
    border-radius: 50%;
    border: 2px solid #fff;
    cursor: pointer;
  }
`;

export const Button = styled.button`
  margin: 11px;
  outline: none;
  height: 37px;
  /* margin-right: 10px; */
  /* text-align: center; */
  border-radius: 40px;
  background: ${green};
  border: 2px solid ${green};
  color: #ffffff;
  -webkit-letter-spacing: 1px;
  -moz-letter-spacing: 1px;
  -ms-letter-spacing: 1px;
  letter-spacing: 1px;
  text-shadow: 0;
  cursor: pointer;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;

  font-size: 12px;
  font-weight: bold;

  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    color: white;
    background: ${green};
  }
  &:active {
    //letter-spacing: 2px;
    letter-spacing: 2px;
  }
  //&:after {
  //  content:"SUBMIT";
  //}

  &.onclic {
    width: 24px !important;
    border-color: ${gray};
    border-width: 3px;
    font-size: 0;
    border-left-color: ${green};
    animation: rotating 2s 0.25s linear infinite;

    &:after {
      content: "";
    }
    &:hover {
      color: $green;
      background: white;
    }
  }

  &.right {
    float: right;
    margin-right: 26px;
  }

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
