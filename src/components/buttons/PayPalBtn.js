import { PayPalButton } from "react-paypal-button-v2";
import React from "react";
export function PayPalBtn(props) {
  const {
    amount,
    currency,
    createSubscription,
    onApprove,
    catchError,
    onError,
    onCancel,
  } = props;
  const paypalKey =
    "AZiZhB64JHqC1jAw1erieTIV-Rt6oQC5wna56LSF8XpKDx0I8Hp6y69aDNypEW6Sslzvy2zS1g13Ig0c";
  return (
    <PayPalButton
      amount={amount}
      currency={currency}
      createSubscription={(data, details) => createSubscription(data, details)}
      onApprove={(data, details) => onApprove(data, details)}
      onError={(err) => onError(err)}
      catchError={(err) => catchError(err)}
      onCancel={(err) => onCancel(err)}
      options={{
        clientId: paypalKey,
        vault: true,
      }}
      style={{
        shape: "pill",
        color: "blue",
        layout: "horizontal",
        label: "subscribe",
      }}
    />
  );
}
export default PayPalBtn;
