import { useAppSelector } from "@/store/hooks";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { ProductType } from "@/types";

export type OrdersType = {
  id: number;
  orderId: number;
  price: number;
  productId: number;
  quantity: number;
};

export type OrderType = {
  createdAt: string;
  customerId: number;
  id: number;
  items: OrdersType[];
  status: string;
  totalPrice: number;
};

export type OrdetDataType = {
  items: OrderType[];
  limit: number;
  page: number;
  totalItems: number;
};

function OrdersPage() {
  const [orders, setOrders] = useState<OrdetDataType>();
  const [productDetails, setProductDetails] = useState<ProductType>();

  const [productId, setProductId] = useState<number>(196);
  const user = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.accessToken) {
      axios
        .get(`https://nt.softly.uz/api/front/orders?`, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        })
        .then((res) => {
          setOrders(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user]);
  useEffect(() => {
    axios
      .get(`https://nt.softly.uz/api/front/products/${productId}`)
      .then((res) => {
        setProductDetails(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [productId]);

  const orderUser = orders?.items.find(
    (order) => order.customerId === user.user?.id
  );
  console.log(orderUser);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">My Order</h1>

      {orderUser ? (
        <div className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
          <div>
            <p>
              <strong>{user.user?.name}</strong>
            </p>
            <p>
              <strong>Buyurtma holati:</strong> {orderUser.status}
            </p>
            <p>
              <strong>Qachon buyurtma qilingani: </strong>{" "}
              {new Date(orderUser.createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Mahsulotlar:</h3>
            <ul className="space-y-2">
              {orderUser.items.map((item) => (
                <li key={item.id} className="border-b py-2">
                  <p>
                    <strong>Product ID:</strong> {productDetails?.name}
                  </p>
                  <p>
                    <strong>Soni:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Narxi:</strong> {item.price.toLocaleString()} UZS
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <p>
            <strong>Umumiy Summa:</strong>{" "}
            {orderUser.totalPrice.toLocaleString()} UZS
          </p>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default OrdersPage;
