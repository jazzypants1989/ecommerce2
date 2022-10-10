import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

const Pay = () => {
  return (
    <PaymentForm
      applicationId="sandbox-sq0idb-HODHzphjx6r9d6gW_e28Bg"
      cardTokenizeResponseReceived={async (token, buyer) => {
        alert(JSON.stringify(token, null, 2));
      }}
      createVerificationDetails={() => ({
        amount: "100",
        currencyCode: "USD",
        intent: "CHARGE",
        billingContact: {
          familyName: "Smith",
          givenName: "John",
          email: "dingdong@ding.com",
        },
      })}
      locationId="LRYJ92HXN7XYZ"
    >
      <CreditCard />
    </PaymentForm>
  );
};

export default Pay;
