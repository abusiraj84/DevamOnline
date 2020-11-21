import React from "react";
import WaveBackground from "../backgrounds/WaveBackground";
import PayPalBtn from "../buttons/PayPalBtn";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { history } from "../../helpers/history";

function PricesPage() {
  const paypalSubscribe = (data, actions) => {
    return actions.subscription.create({
      plan_id: "P-0S487133E0833935GL6STXQA",
    });
  };
  const paypalOnError = (err) => {
    console.log("Error");
  };
  const paypalOnApprove = (data, detail) => {
    // call the backend api to store transaction details
    console.log("Payapl approved");
    console.log(data.subscriptionID);
    history.push("/thankyou");
  };

  return (
    <Wrapper>
      <div className="App">
        <PayPalBtn
          amount="1"
          currency="USD"
          createSubscription={paypalSubscribe}
          onApprove={paypalOnApprove}
          catchError={paypalOnError}
          onError={paypalOnError}
          onCancel={paypalOnError}
        />
      </div>
    </Wrapper>
  );
}

export default PricesPage;
const Wrapper = styled.div`
  width: 1234px;
  margin: auto 0;
  padding-top: 200px;
`;
