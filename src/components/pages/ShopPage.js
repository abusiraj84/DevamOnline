import React, { useState, useEffect } from "react";
import Modal from "../modal/modal";
import styled from "styled-components";
import { H1, SmallText } from "../styles/TextStyles";
import Waveform from "../Waveform";
import SvgLoading from "../SvgLoading";
import { Helmet } from "react-helmet";

import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import Fotter from "../Fotter";
import { FaArrowCircleUp } from "react-icons/fa";

function ShopPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  const url =
    "https://fierce-forest-56659.herokuapp.com/https://devam.website/wp-json/wcm/api/products?per_page=100";

  useEffect(() => {
    loadProgressBar();
    axios
      .get(url)
      .then((response) => {
        const myData = response.data;
        setItems(myData);
        // console.log(myData);
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
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [isLooped, setIsLooped] = useState("");
  const [length, setLength] = useState("");
  const [tempo, setTempo] = useState("");
  const [instruments, setInstruments] = useState("");
  const [tags, setTags] = useState("");
  const [youtubeContent, setYoutubeContent] = useState("");
  const [showScroll, setShowScroll] = useState(false);
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <div>
      <ScrollTop
        onClick={scrollTop}
        style={{
          height: "40px",

          display: showScroll ? "flex" : "none",
        }}
      >
        <FaArrowCircleUp size={50} />
      </ScrollTop>
      {isLoaded ? (
        <Wrapper>
          <Helmet title="متجر دوام أونلاين">
            <title>متجر دوام أونلاين</title>
            <meta
              name="description"
              content="متجر دوام أونلاين"
              data-react-helmet="true"
            />
          </Helmet>
          {status && (
            <Modal closeModal={() => setStatus(false)}>
              <ModalImg src={image} />
              <ContentWrapper>
                <ModalTitle>{name}</ModalTitle>
                <IconsWrapper>
                  <ModalPrice>${price}</ModalPrice>
                  <Link to={`/checkout-shop/${id}`}>
                    <ModalCart src="images/icons/shop.svg" />
                  </Link>
                </IconsWrapper>
                <Waveform
                  url={
                    `https://fierce-forest-56659.herokuapp.com/` + mp3 ||
                    "a.mp3"
                  }
                />
                <BottomWrapper>
                  <Desc>{ReactHtmlParser(description)}</Desc>
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
                </BottomWrapper>
              </ContentWrapper>
            </Modal>
          )}
          <CardWrapper>
            {items.map(
              (item, i) =>
                item.downloadable &&
                item.purchasable && (
                  <Card key={i}>
                    <Img
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setStatus(true);
                        setName(item.name);
                        setPrice(item.price);
                        setMp3(item.preview_mp3);
                        setId(item.id);
                        setIsLooped(item.is_looped);
                        setLength(item.track_length);
                        setDescription(item.description);
                        setTempo(item.track_tempo);
                        setTags(item.track_tags);
                        setInstruments(item.instruments);
                        setYoutubeContent(item.youtube_content);
                        setImage(item.images[0].src || "0.jpg");
                      }}
                      bg={`url(${item.images[0].src || "0.jpg"})`}
                    />
                    <ContentWrapper>
                      <Title>{item.name}</Title>
                      <Waveform
                        url={
                          `https://fierce-forest-56659.herokuapp.com/${item.preview_mp3}` ||
                          "audio.mp3"
                        }
                      />
                      <Price>${item.price}</Price>
                      <Link to={`/checkout-shop/${item.id}`}>
                        <Cart src="images/icons/shop.svg" />
                      </Link>
                    </ContentWrapper>
                  </Card>
                )
            )}
          </CardWrapper>

          <Fotter />
        </Wrapper>
      ) : (
        <SvgLoading json="7" />
      )}{" "}
    </div>
  );
}

export default ShopPage;
const ScrollTop = styled.div`
  position: fixed;

  bottom: 40px;
  right: 40px;
  align-items: center;
  height: 20px;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
  animation: fadeIn 0.3s;
  transition: opacity 0.4s;
  opacity: 0.5;

  :hover {
    opacity: 1;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

const Wrapper = styled.div`
  padding-top: 200px;
  width: 1440px;
  margin: 0px auto;

  @media (max-width: 1270px) {
    width: 100%;
    padding-top: 150px;
    margin: 0;
  }
  @media (max-width: 1420px) {
    width: 100%;
    padding-top: 150px;
    margin: 0;
  }
  @media (max-width: 1600px) {
    width: 100%;
    padding-top: 150px;
    margin: 0;
  }
  @media (max-width: 1900px) {
    width: 100%;
    padding-top: 150px;
    margin: 0;
  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2%;
  margin: 0 50px;
  margin-bottom: 561px;

  @media (max-width: 1420px) {
    grid-template-columns: 1fr 1fr 1fr;
    margin: 0 50px;
    gap: 50px;
  }

  @media (max-width: 1340px) {
    grid-template-columns: 1fr 1fr 1fr;
    margin: 0 50px;
    gap: 50px;
  }
  @media (max-width: 1085px) {
    grid-template-columns: 1fr 1fr;
    margin: 0 50px;
    gap: 50px;
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #fff;
  height: 460px;
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);

  @media (max-width: 1420px) {
    width: 100%;
  }
  @media (max-width: 1260px) {
    width: 100%;
  }
  @media (max-width: 1085px) {
    width: 100%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
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
  /* width: 255px; */
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
  height: 520px;
  /* background: ${(props) =>
    `url(${props.bg})` ||
    "url(https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/9f0bcd6797e2e275e3ba810d0bafeeec/retina/BU00C_Logo.jpg)"}; */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 20px 20px 0px 0px;

  @media (max-width: 780px) {
    height: 100%;
    /* margin-left: 50px;
    display:block; */
  }
  @media (max-width: 1040px) {
    height: 100%;
    /* margin-left: 50px;
    display:block; */
  }
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
  margin-left: 42px;
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
  @media (max-width: 1000px) {
    width: 80%;
  }
`;
const Slide = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #f3f3f3;
  margin: 0px auto;
  margin-bottom: 0px;
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
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 50px;

  @media (max-width: 1000px) {
    align-items: center;
    flex-direction: column;
  }
`;

const Desc = styled.div`
  color: #000;
  width: 40%;
  line-height: 25px;

  @media (max-width: 1000px) {
    width: 80%;
    margin-bottom: 50px;
  }
`;
