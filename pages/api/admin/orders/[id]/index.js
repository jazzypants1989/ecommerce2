import { getSession } from "next-auth/react";
import Order from "../../../../../models/Product";
import db from "../../../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("signin required");
  }
  if (req.method === "GET") {
    await db.connect();
    const order = await Order.findById(req.query.id);
    await db.disconnect();
    res.send(order);
  } else if (req.method === "PUT") {
    return updateHandler(req, res);
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const updateHandler = async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    await db.disconnect();
    res.send({ message: "Order Delivered", order: updatedOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Order Not Found" });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    await order.remove();
    await db.disconnect();
    res.send({ message: "Order Deleted" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Order Not Found" });
  }
};

export default handler;
