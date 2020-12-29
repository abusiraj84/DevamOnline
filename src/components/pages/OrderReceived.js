import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { H2, H3 } from "../styles/TextStyles";
import { useSelector } from "react-redux";
import SvgLoading from "../SvgLoading";
import { Helmet } from "react-helmet";
import Fotter from "../Fotter";

function OrderReceived({ match }) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);
  const [items, setItems] = useState([]);
  const fetchData = async () => {
    const data = await fetch(
      `https://fierce-forest-56659.herokuapp.com/https://devam.website/wp-json/wcm/api/orders/${match.params.id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "dwm-tkn": currentUser.cookie,
        },
      }
    );
    const items = await data.json();
    setItems(items);
    console.log(items);
  };

  const CreatedDate = () => items.date_created; // 15-11-2017T11:17:30+01:00

  return (
    <div>
      {isLoaded ? (
        <Wrapper>
          <Helmet title="حالة الطلب">
            <title>حالة الطلب</title>
            <meta
              name="description"
              content="حالة الطلب"
              data-react-helmet="true"
            />
          </Helmet>{" "}
          <center>
            <img src="../images/icons/download.png" alt="" />
          </center>
          <Header> تمّ استلام الطلب</Header>{" "}
          <Title>شكرًا لك. لقد تم إستلام طلبك.</Title>
          {/* <Link to={`/course/${items.line_items && items.line_items["0"].id}`}>
        <Title>العودة للدورة</Title>
      </Link> */}
          <UL>
            <li>
              رقم الطلب: <strong>{items.id}</strong>
            </li>

            <li>
              التاريخ: <strong>{CreatedDate()}</strong>
            </li>

            <li>
              الإجمالي:{" "}
              <strong>
                <span>
                  <bdi>
                    <span>$</span>
                    {items.total}
                  </bdi>
                </span>
              </strong>
            </li>

            <li>
              وسيلة الدفع:{" "}
              <strong>
                {items.payment_method === "bacs"
                  ? "حوالة مصرفية مباشرة"
                  : "Paypal"}
              </strong>
            </li>
          </UL>
          <Title>تفاصيل الطلب</Title>
          <FormHeader style={{ marginBottom: "50px" }}>طلبك</FormHeader>
          <table style={{ width: "100%" }}>
            <thead>
              <tr
                style={{
                  textAlign: "right",
                  marginBottom: "20px",
                  padding: "10px",
                  borderTop: "1px solid #ddd",
                }}
              >
                <th
                  style={{
                    textAlign: "right",
                    padding: "10px",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  المنتج
                </th>
                <th
                  style={{
                    textAlign: "right",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  المجموع
                </th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "right", marginBottom: "20px" }}>
              <tr
                style={{
                  textAlign: "right",
                  marginBottom: "40px",
                  paddingBottom: "40px",
                  borderTop: "1px solid #ddd",
                }}
              >
                <td style={{ textAlign: "right", padding: "10px" }}>
                  {items.line_items && items.line_items["0"].name}&nbsp;{" "}
                  <strong>×&nbsp;1</strong>
                </td>
                <td style={{ textAlign: "right" }}>
                  <span>
                    <bdi>
                      <span style={{ textAlign: "right" }}>$</span>
                      {items.line_items && items.line_items["0"].total}
                    </bdi>
                  </span>{" "}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr style={{ textAlign: "right", marginBottom: "20px" }}>
                <th
                  style={{
                    textAlign: "right",
                    marginBottom: "20px",
                    padding: "10px",
                  }}
                >
                  المجموع
                </th>
                <td style={{ textAlign: "right" }}>
                  <span>
                    <bdi>
                      <span style={{ textAlign: "right" }}>$</span>
                      {items.line_items && items.line_items["0"].total}
                    </bdi>
                  </span>
                </td>
              </tr>

              <tr style={{ textAlign: "right", marginBottom: "20px" }}>
                <th style={{ textAlign: "right", padding: "10px" }}>
                  الإجمالي
                </th>
                <td>
                  <strong>
                    <span style={{ textAlign: "right" }}>
                      <bdi style={{ textAlign: "right" }}>
                        <span style={{ textAlign: "right" }}>$</span>
                        {items.line_items && items.line_items["0"].total}
                      </bdi>
                    </span>
                  </strong>
                </td>
              </tr>
            </tfoot>
          </table>
          <Fotter />
        </Wrapper>
      ) : (
        <SvgLoading json="6" />
      )}
    </div>
  );
}

export default OrderReceived;

const animation = keyframes`
  from { opacity: 0; transform: translateY(-10px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0px); filter: blur(0px); }
`;
const Wrapper = styled.div`
  padding-top: 180px;
  width: 1234px;
  margin: 0px auto;
  opacity: 0;
  animation: ${animation} 1s 0.1s forwards;
  @media (max-width: 1270px) {
    width: 80%;
    margin: auto;
  }
`;
const Header = styled(H2)`
  text-align: center;
  margin-top: 20px;
`;

const Title = styled(H3)`
  margin-top: 20px;
  text-align: right;
  font-size: 25px;
  margin-bottom: 20px;
`;
const UL = styled.ul`
  direction: rtl;
  text-align: right;
  margin-bottom: 10px;
  li {
    margin-bottom: 10px;
    font-size: 20px;
  }
`;

const FormHeader = styled.h2`
  text-align: right;
  font-size: 28px;
`;
