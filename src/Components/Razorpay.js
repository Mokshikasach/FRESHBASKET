import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { SERVER_BASE_URL } from "../config";
import Payment from "./Payment";
import { useStateValue } from "./StateProvider";
var flag = false;
function Razorpay() {
  const { amount } = useParams();
  const [{ user, basket }] = useStateValue();

  const [email, setEmail] = useState();

  const resp = JSON.parse(localStorage.getItem("data"));
  const id = resp.id;

  axios
    .get(SERVER_BASE_URL + `/users/${id}`)
    .then((res) => {
      const result = res.data;
      console.log(result.email);
      setEmail(result.email);
    })
    .catch((error) => {
      console.log(error);
    });

  const email_req = {
    recipient: email,
    msgBody: "Your Order Placed!!!",
  };

  const sendEmail = () => {
    if (flag) {
      axios
        .post(SERVER_BASE_URL + "/sendMail", email_req)
        .then((response) => {
          const result = response.data;
          console.log(result);

          alert("Email Send to Your Registered Email-ID !!!");
          setTimeout(() => {
            basket.length = 0;
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const navigate = useNavigate();
  var payment_Amount = {
    create: "Created",
    amount: amount,
    userId: user.id,
  };

  const pay = () => {
    axios
      .post(SERVER_BASE_URL + "/payment/order", payment_Amount)
      .then((response) => {
        const result = response.data;
        console.log(result);

        if (result.status === "created") {
          const options = {
            key: "rzp_test_E4MkK7Plh7O8qI",
            currency: result.currency,
            amount: result.amount,
            name: "Fresh-Cart Payment",
            description: "Test Wallet Transaction",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW1IdZmFeT9m-QJaiO0c8rveBMFaPdhQIydg&usqp=CAU",
            order_id: result.id,
            handler: function (response) {
              console.log(response.razorpay_payment_id);
              console.log(response.razorpay_order_id);
              console.log(response.razorpay_signature);

              updatePaymentOnServer(
                response.razorpay_payment_id,
                response.razorpay_order_id,
                "paid"
              );
              flag = true;
              sendEmail();
            },
            prefill: {
              name: "",
              email: "",
              contact: "",
            },
          };

          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  const updatePaymentOnServer = (payment_id, order_id, payment_status) => {
    var update_req = {
      payment_id: payment_id,
      order_id: order_id,
      payment_status: payment_status,
    };
    axios
      .post(SERVER_BASE_URL + "/payment/order/update", update_req)
      .then((response) => {
        const result = response.data;
        console.log(result);

        alert("Payment Successfull!!!");
        setTimeout(() => {
          basket.length = 0;
          navigate("/home");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Payment />
      <Button className="btn btn-info  " onClick={pay}>
        {" "}
        Proceed To Payment GateWay
      </Button>
    </div>
  );
}

export default Razorpay;
