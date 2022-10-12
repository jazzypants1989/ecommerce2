import { client } from "square";
import { randomUUID } from "crypto";

let globalThis = globalThis || window;
let BigInt = globalThis.BigInt;
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const { paymentsApi } = new client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "sandbox",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nonce, amount } = req.body;
    const body = {
      sourceId: nonce,
      amountMoney: {
        amount: BigInt(amount),
        currency: "USD",
      },
      idempotencyKey: randomUUID(),
    };
    try {
      const response = await paymentsApi.createPayment(body);
      res.status(200).json(response.result);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
