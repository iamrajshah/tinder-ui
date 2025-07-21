import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/payment/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };
  const buyPlan = async (plan) => {
    try {
      const result = await axios.post(
        BASE_URL + "/payment/order",
        {
          plan,
        },
        { withCredentials: true }
      );

      const { keyId, data } = result.data;
      const { amount, currency, orderId } = data;
      const { firstName, lastName, emailId } = data.notes;

      // Open Razorpay Checkout
      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: "Raj Tinder",
        description: "Test Transaction",
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: firstName + lastName,
          email: emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return isUserPremium ? (
    <div>
      <h2 className="text-3xl flex m-60 justify-center">
        You are already a premium user 😍
      </h2>
    </div>
  ) : (
    <div className="flex w-full p-6">
      <div className="card bg-base-300 rounded-box grid h-120 grow place-items-center">
        <h1 className="text-4xl text-zinc-500">Silver Plan</h1>
        <ul>
          <li>- 100 Request per-day</li>
          <li>- 2 days chat with connections</li>
          <li>- Verified (Blue check)</li>
        </ul>
        <button className="btn btn-primary" onClick={() => buyPlan("silver")}>
          Buy now
        </button>
      </div>
      <div className="divider divider-horizontal">OR</div>
      <div className="card bg-base-300 rounded-box grid h-120 grow place-items-center">
        <h1 className="text-4xl text-amber-600">Gold Plan</h1>
        <ul>
          <li>- Unlimited Request per-day</li>
          <li>- Unlimited chat with connections</li>
          <li>- Verified (Blue check)</li>
          <li>- Profile highlighted everyday</li>
          <li>- Customer support 24*7</li>
        </ul>
        <button className="btn btn-secondary" onClick={() => buyPlan("gold")}>
          Buy now
        </button>
      </div>
    </div>
  );
};

export default Premium;
