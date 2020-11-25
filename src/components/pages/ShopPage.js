import React, { useState } from "react";
import Modal from "../modal/modal";
import styled from "styled-components";
import { H1, SmallText } from "../styles/TextStyles";
import Waveform from "../Waveform";

function ShopPage() {
  const [status, setStatus] = useState(false);
  // https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3

  const shopData = [
    {
      title: "Octave Music - (A Cappella) aCA001",
      img:
        "https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/9f0bcd6797e2e275e3ba810d0bafeeec/retina/BU00C_Logo.jpg",
      url:
        "https://previews.customer.envatousercontent.com/files/310155654/preview.mp3",
      price: "15.99",
    },
    {
      title: "Octave Music - (A Cappella) aCA002",
      img:
        "https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/3d5a0792f43d873c644ce9118beafe66/retina/MU001_Logo.jpg",
      url:
        "https://previews.customer.envatousercontent.com/files/227502547/preview.mp3",
      price: "8.99",
    },
    {
      title: "Octave Music - (A Cappella) aCA003",
      img:
        "https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/1b3e50ebd3bf4d4d1ead8f7c40f86d03/retina/HI001_Logo.jpg",
      url:
        "https://previews.customer.envatousercontent.com/files/227502547/preview.mp3",
      price: "23.99",
    },
    {
      title: "Octave Music - (A Cappella) aCA001",
      img:
        "https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/9f0bcd6797e2e275e3ba810d0bafeeec/retina/BU00C_Logo.jpg",
      url:
        "https://previews.customer.envatousercontent.com/files/310155654/preview.mp3",
      price: "15.99",
    },
    {
      title: "Octave Music - (A Cappella) aCA002",
      img:
        "https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/3d5a0792f43d873c644ce9118beafe66/retina/MU001_Logo.jpg",
      url:
        "https://previews.customer.envatousercontent.com/files/227502547/preview.mp3",
      price: "8.99",
    },
    {
      title: "Octave Music - (A Cappella) aCA003",
      img:
        "https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/1b3e50ebd3bf4d4d1ead8f7c40f86d03/retina/HI001_Logo.jpg",
      url:
        "https://previews.customer.envatousercontent.com/files/227502547/preview.mp3",
      price: "23.99",
    },
    {
      title: "Octave Music - (A Cappella) aCA001",
      img:
        "https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/9f0bcd6797e2e275e3ba810d0bafeeec/retina/BU00C_Logo.jpg",
      url:
        "https://previews.customer.envatousercontent.com/files/310155654/preview.mp3",
      price: "15.99",
    },
    {
      title: "Octave Music - (A Cappella) aCA002",
      img:
        "https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/3d5a0792f43d873c644ce9118beafe66/retina/MU001_Logo.jpg",
      url:
        "https://previews.customer.envatousercontent.com/files/227502547/preview.mp3",
      price: "8.99",
    },
    {
      title: "Octave Music - (A Cappella) aCA003",
      img:
        "https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/1b3e50ebd3bf4d4d1ead8f7c40f86d03/retina/HI001_Logo.jpg",
      url:
        "https://previews.customer.envatousercontent.com/files/227502547/preview.mp3",
      price: "23.99",
    },
    {
      title: "Octave Music - (A Cappella) aCA001",
      img:
        "https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/9f0bcd6797e2e275e3ba810d0bafeeec/retina/BU00C_Logo.jpg",
      url:
        "https://previews.customer.envatousercontent.com/files/310155654/preview.mp3",
      price: "15.99",
    },
    {
      title: "Octave Music - (A Cappella) aCA002",
      img:
        "https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/3d5a0792f43d873c644ce9118beafe66/retina/MU001_Logo.jpg",
      url:
        "https://previews.customer.envatousercontent.com/files/227502547/preview.mp3",
      price: "8.99",
    },
    {
      title: "Octave Music - (A Cappella) aCA003",
      img:
        "https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/1b3e50ebd3bf4d4d1ead8f7c40f86d03/retina/HI001_Logo.jpg",
      url:
        "https://previews.customer.envatousercontent.com/files/227502547/preview.mp3",
      price: "23.99",
    },
  ];
  return (
    <Wrapper>
      {status && (
        <Modal closeModal={() => setStatus(false)}>
          <ModalImg
            bg={
              "url(https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/9f0bcd6797e2e275e3ba810d0bafeeec/retina/BU00C_Logo.jpg)"
            }
          />
          <ContentWrapper>
            <ModalTitle>Octave Music - (A Cappella) aCA001</ModalTitle>
            <IconsWrapper>
              <ModalPrice>$15.99</ModalPrice>
              <ModalCart src="images/icons/shop.svg" />
            </IconsWrapper>
            <Waveform url="https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3" />
            <BottomWrapper>
              <SlideWrapper>
                <Slide>
                  <Type>Looped Audio</Type>
                  <Choise>No</Choise>
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
                  <Choise>01:39</Choise>
                </Slide>

                <Slide>
                  <Type>Instruments</Type>
                  <Choise>Choir</Choise>
                </Slide>

                <Slide>
                  <Type>Tempo (BPM)</Type>
                  <Choise>95</Choise>
                </Slide>

                <Slide>
                  <Type>YouTube Content ID Registered</Type>
                  <Choise>No</Choise>
                </Slide>
                <Slide>
                  <Type>Tags</Type>
                  <Choise>No</Choise>
                </Slide>
              </SlideWrapper>
              <Desc>
                A Cappella, for use in social media videos. (Watch Now) A
                Cappella, for use in social media videos. (Watch Now) A
                Cappella, for use in social media videos. (Watch Now) A
                Cappella, for use in social media videos. (Watch Now) A
                Cappella, for use in social media videos. (Watch Now) A
                Cappella, for use in social media videos. (Watch Now) A
                Cappella, for use in social media videos. (Watch Now) A
              </Desc>
            </BottomWrapper>
          </ContentWrapper>
        </Modal>
      )}
      <CardWrapper onClick={() => status && setStatus(false)}>
        {shopData.map((item, i) => (
          <Card key={i}>
            <Img onClick={() => setStatus(true)} bg={`url(${item.img})`} />
            <ContentWrapper>
              <Title>{item.title}</Title>
              <Waveform url={item.url} />
              <Price>${item.price}</Price>
              <Cart src="images/icons/shop.svg" />
            </ContentWrapper>
          </Card>
        ))}
      </CardWrapper>
    </Wrapper>
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

const ModalImg = styled.div`
  width: 100%;
  height: 504px;
  background: ${(props) =>
    props.bg ||
    "url(https://static-2.gumroad.com/res/gumroad/1407992308196/asset_previews/9f0bcd6797e2e275e3ba810d0bafeeec/retina/BU00C_Logo.jpg)"};
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
  margin-left: 20px;
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
