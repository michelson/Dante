import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import styled from "@emotion/styled";
//import Input from "../../forms/Input";
//import attribution from "../../../images/Poweredby_100px-White_VertText.png";
const GiphyBlock = styled.div`
  //position: absolute;
  //left: 128px;
  //bottom: 48px;
  //z-index: 10000;
  //height: 251px;
  //background: white;
  //border: 1px solid #abaaaa;
  //border-radius: 3px;
  //width: 223px;
  //box-shadow: 1px 1px 1px #ece3e3;
`;

const GridListOverflow = styled.div`
  height: 187px;
  overflow: auto;
`;
const GridList = styled.div`
  display: flex;
  display: flex;
  flex-flow: row wrap;
  margin-left: 0px;
  width: 100%;
  img {
    flex: auto;
    height: 250px;
    min-width: 150px;
    margin: 0 0px 8px 0;
  }
`;

const Container = styled.div`
  padding: 10px;
  //background: "#ccc";
`;

const PickerBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: #c4e17f;
    background-image: -webkit-linear-gradient(
      left,
      #fff35c,
      #fff35c,
      #ff6666,
      #ff6666,
      #9933ff,
      #9933ff,
      #00ccff,
      #00ccff,
      #00ff99,
      #00ff99
    );
    background-image: -moz-linear-gradient(
      left,
      #fff35c,
      #fff35c,
      #ff6666,
      #ff6666,
      #9933ff,
      #9933ff,
      #00ccff,
      #00ccff,
      #00ff99,
      #00ff99
    );
    background-image: -o-linear-gradient(
      left,
      #fff35c,
      #fff35c,
      #ff6666,
      #ff6666,
      #9933ff,
      #9933ff,
      #00ccff,
      #00ccff,
      #00ff99,
      #00ff99
    );
    background-image: linear-gradient(
      left,
      #fff35c,
      #fff35c,
      #ff6666,
      #ff6666,
      #9933ff,
      #9933ff,
      #00ccff,
      #00ccff,
      #00ff99,
      #00ff99
    );
  }
`;

const App = (props: any) => {
  const [gifs, setGifs] = useState([]);
  const [limit, setLimit] = useState(10);
  const [term, setTerm] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    search('', 'trend');
  }, []);

  const onSearchSubmit = (e: any) => {
    if (e.key !== 'Enter') {
      return;
    }

    // @ts-ignore
    const term = inputRef.current.value;

    search(term);
  };

  const search = (term: any, kind: any = 'search') => {
    const url =
      kind === 'search'
        ? `https://api.giphy.com/v1/gifs/search?q=${term}`
        : `https://api.giphy.com/v1/gifs/trending?q=${term}`;
    const link = `${url}&limit=${limit}&api_key=${props.apiKey}`;

    axios
      .get(link)
      .then((response) => {
        // handle success
        setGifs(response.data.data);
        // console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const limitSubmit = (limit: any) => {
    setLimit(limit);
  };

  const handleChange = (e: any) => {
    const term = e.target.value;
    setTerm(term);
  };

  return (
    <GiphyBlock>
    <Container>
      <PickerBlock>
        <input
          ref={inputRef}
          type="text"
          placeholder={"search gif"}
          value={term}
          onChange={handleChange}
          onKeyDown={onSearchSubmit}
        />
      </PickerBlock>

      <GridListOverflow>
        <GridList>
          {gifs.map((o : any) => (
            <img
              alt="giphy"
              key={`giphy-${o.id}`}
              onClick={(_e) => props.handleSelected(o)}
              height={o.images.fixed_width_downsampled.height}
              width={o.images.fixed_width_downsampled.width}
              src={o.images.fixed_width_downsampled.url}
            />
          ))}
        </GridList>
      </GridListOverflow>

      <div className="flex justify-center mt-2">
        {/*<img src={attribution} className="h-6 mt-2" />*/}
      </div>
    </Container>
    {/* <Arrow/> */}
  </GiphyBlock>
  );
};

export default  App