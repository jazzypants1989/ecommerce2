import * as React from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

const Pay = () => {
  return (
    <PaymentForm
      applicationId="sandbox-sq0idb-HODHzphjx6r9d6gW_e28Bg"
      cardTokenizeResponseReceived={async (token, buyer) => {
        console.info({ token, buyer });
      }}
      createVerificationDetails={() => ({
        amount: "100",
        currencyCode: "USD",
        intent: "CHARGE",
        billingContact: {
          familyName: "Smith",
          givenName: "John",
          email: "ding@dong.com",
          country: "US",
          city: "San Francisco",
          addressLines: ["123 Market St"],
          postalCode: "94114",
          phone: "415-555-5555",
        },
      })}
      locationId="LRYJ92HXN7XYZ"
    >
      <CreditCard />
    </PaymentForm>
  );
};

export default Pay;
