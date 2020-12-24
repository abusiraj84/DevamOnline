import React, { useState, useEffect } from "react";
import Modal from "../modal/modal";
import styled from "styled-components";
import { H1, SmallText } from "../styles/TextStyles";
import Waveform from "../Waveform";
import SvgLoading from "../SvgLoading";

import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";

function ShopPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  const url = "https://devam.website/wp-json/wcm/api/products";

  useEffect(() => {
    loadProgressBar();
    axios
      .get(url)
      .then((response) => {
        const myData = response.data;
        setItems(myData);
        console.log(myData);
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);
  const [status, setStatus] = useState(false);
  const [items, setItems] = useState([]);

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [mp3, setMp3] = useState("");
  const [description, setDescription] = useState("");
  const [isLooped, setIsLooped] = useState("");
  const [length, setLength] = useState("");
  const [tempo, setTempo] = useState("");
  const [instruments, setInstruments] = useState("");
  const [tags, setTags] = useState("");
  const [youtubeContent, setYoutubeContent] = useState("");

  return (
    <div>
      {isLoaded ? (
        <Wrapper>
          {status && (
            <Modal closeModal={() => setStatus(false)}>
              <ModalImg src={image} />
              <ContentWrapper>
                <ModalTitle>{name}</ModalTitle>
                <IconsWrapper>
                  <ModalPrice>${price}</ModalPrice>
                  <ModalCart src="images/icons/shop.svg" />
                </IconsWrapper>
                <Waveform url={mp3 || "a.mp3"} />
                <BottomWrapper>
                  <SlideWrapper>
                    <Slide>
                      <Type>Looped Audio</Type>
                      <Choise>{isLooped}</Choise>
                    </Slide>
                    <Slide>
                      <Type>Audio Files Included</Type>
                      <Choise>MP3, WAV</Choise>
                    </Slide>
                    <Slide>
                      <Type>Bit Rate</Type>
                      <Choise>320 kbps</Choise>
                    </Slide>
                    <Slide>
                      <Type>Sample Rate</Type>
                      <Choise>16-Bit Stereo, 44.1 Khz</Choise>
                    </Slide>
                    <Slide>
                      <Type>Main Track Length</Type>
                      <Choise>{length}</Choise>
                    </Slide>

                    <Slide>
                      <Type>Instruments</Type>
                      <Choise>{instruments}</Choise>
                    </Slide>

                    <Slide>
                      <Type>Tempo (BPM)</Type>
                      <Choise>{tempo}</Choise>
                    </Slide>

                    <Slide>
                      <Type>YouTube Content ID Registered</Type>
                      <Choise>{youtubeContent}</Choise>
                    </Slide>
                    <Slide>
                      <Type>Tags</Type>
                      <Choise>{tags}</Choise>
                    </Slide>
                  </SlideWrapper>
                  <Desc>{ReactHtmlParser(description)}</Desc>
                </BottomWrapper>
              </ContentWrapper>
            </Modal>
          )}
          <CardWrapper>
            {items.map(
              (item, i) =>
                item.downloadable && (
                  <Card key={i}>
                    <Img
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setStatus(true);
                        setName(item.name);
                        setPrice(item.price);
                        setMp3(item.preview_mp3);
                        setIsLooped(item.is_looped);
                        setLength(item.track_length);
                        setDescription(item.description);
                        setTempo(item.track_tempo);
                        setTags(item.track_tags);
                        setInstruments(item.instruments);
                        setYoutubeContent(item.youtube_content);
                        setImage(item.images[0].src);
                      }}
                      bg={`url(${item.images[0].src || "0.jpg"})`}
                    />
                    <ContentWrapper>
                      <Title>{item.name}</Title>
                      <Waveform url={item.preview_mp3 || "audio.mp3"} />
                      <Price>${item.price}</Price>
                      <Link to={`/checkout-shop/${item.id}`}>
                        <Cart src="images/icons/shop.svg" />
                      </Link>
                    </ContentWrapper>
                  </Card>
                )
            )}
          </CardWrapper>
        </Wrapper>
      ) : (
        <SvgLoading json="7" />
      )}{" "}
    </div>
  );
}

export default ShopPage;
const Wrapper = styled.div`
  padding-top: 200px;
  width: 1255px;
  margin: 0px auto;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2%;
`;

const Card = styled.div`
  background: #fff;
  height: 460px;
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
`;

const Img = styled.div`
  width: 100%;
  height: 290px;
  background: ${(props) =>
    props.bg ||
    "url(https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/9f0bcd6797e2e275e3ba810d0bafeeec/retina/BU00C_Logo.jpg)"};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 10px 10px 0px 0px;
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

const Title = styled(H1)`
  color: #000;
  text-align: left;
  font-size: 19px;
  line-height: 20px;
  font-weight: 600;
  width: 255px;
  min-height: 41px;
`;

const Price = styled(SmallText)`
  color: #000;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #fdce71;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  min-width: 50px;
  font-size: 17px;
  :hover {
  }
`;

const Cart = styled.img`
  color: #000;
  text-align: center;
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: #414dde;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  :hover {
  }
`;

// // //

const ModalImg = styled.img`
  width: 100%;
  height: 504px;
  /* background: ${(props) =>
    `url(${props.bg})` ||
    "url(https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/9f0bcd6797e2e275e3ba810d0bafeeec/retina/BU00C_Logo.jpg)"}; */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 20px 20px 0px 0px;
`;

const ModalTitle = styled(H1)`
  color: #000;
  text-align: left;
  font-size: 19px;
  line-height: 20px;
  font-weight: 600;
  height: 80px;
`;

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 20px;
  margin-left: 100px;
  margin-bottom: 40px;
  height: 33px;
`;

const ModalPrice = styled(SmallText)`
  color: #000;
  background: #fdce71;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  min-width: 50px;
  font-size: 17px;
  :hover {
  }
`;

const ModalCart = styled.img`
  color: #000;
  text-align: center;
  background: #414dde;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  :hover {
  }
`;

const SlideWrapper = styled.div`
  direction: ltr;
  width: 40%;
`;
const Slide = styled.div`
  display: flex;
  width:100%;
  justify-content: space-between;
  align-items: center;
  padding:10px;
border: 1px solid #f3f3f3;
      margin: 0px auto;
      margin-bottom:0px;
  }
`;
const Type = styled.div`
  padding: 5px 0;
  font-size: 15px;
  line-height: 15px;
  color: #ccc;
`;
const Choise = styled.div`
    text-align: right;
    font-weight: 400;
    color: #797874;
}`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 50px;
`;

const Desc = styled.div`
  color: #000;
  width: 40%;
  line-height: 25px;
`;
