import axios from "axios";
import { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Layout from "../../../components/Layout";
import { getError } from "../../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, successUpdate: true };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    case "UPDATE_RESET":
      return { ...state, loadingUpdate: false, successUpdate: false };
    default:
      return state;
  }
}

function AdminOrderScreen() {
  const [{ loading, error, order, successUpdate, loadingUpdate }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: "",
    });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/orders/${id}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (successUpdate) {
      dispatch({ type: "UPDATE_RESET" });
    } else {
      fetchData();
    }
  }, [successUpdate]);

  const updateHandler = async () => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      const { data } = await axios.put(`/api/admin/orders/${id}`, {
        isPaid: true,
      });
      dispatch({ type: "UPDATE_SUCCESS", payload: data });
      toast.success("Order paid");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Order Details">
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.user && order.user.name} <br />
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${order.user && order.user.email}`}>
                    {order.user && order.user.email}
                  </a>
                </p>
                <p>
                  <strong>Address:</strong>
                  {order.shippingAddress?.address},{" "}
                  {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.postalCode},{" "}
                  {order.shippingAddress?.country}
                </p>
                {order.isDelivered
                  ? toast.success("Delivered at " + order.deliveredAt)
                  : toast.error("Not Delivered")}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  toast.success("Paid at " + order.paidAt)
                ) : (
                  <button
                    type="button"
                    className="primary block"
                    onClick={updateHandler}
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <li key={item.product}>
                        <div className="row">
                          <div>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="small"
                            ></img>
                          </div>
                          <div className="min-30">
                            <Link href={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>

                          <div>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice?.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice?.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice?.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice?.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminOrderScreen;
