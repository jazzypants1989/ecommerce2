import db from "../../utils/db";
import Product from "../../models/Product";

export default async function searchHandler(req, res) {
  await db.connect();
  let products = await Product.aggregate([
    {
      $search: {
        index: "default",
        text: {
          query: req.query.query,
          path: {
            wildcard: "*",
          },
          fuzzy: {
            maxEdits: 2,
            maxExpansions: 100,
          },
        },
      },
    },
    {
      $limit: 20,
    },
  ]);
  res.send(products);
}
