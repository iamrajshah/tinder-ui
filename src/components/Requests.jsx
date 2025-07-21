import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/reqestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const allRequests = useSelector((store) => store.requests);

  const requestHandler = async (requestId, status) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const getRequests = async () => {
    try {
      const allRequests = await axios.get(
        BASE_URL + "/user/connections/received",
        {
          withCredentials: true,
        }
      );
      console.log(allRequests);
      dispatch(addRequests(allRequests.data.allRequest));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRequests();
  }, []);

  if (!allRequests) return;

  if (allRequests.length === 0)
    return (
      <div>
        <h2 className="text-3xl flex m-60 justify-center">
          No new requests 😅
        </h2>
      </div>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl">Requests</h1>
      {allRequests.map((request) => {
        const { _id: requestId } = request;
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          isPremium,
        } = request.fromUserId;
        return (
          <div
            key={_id}
            className="inline-flex  items-center m-4 p-4 rounded-lg w-200 mx-auto bg-gray-300"
          >
            <div className="avatar">
              <div className="w-30 rounded-full">
                <img src={photoUrl} alt="display picture" />
              </div>
            </div>
            <div className="flex flex-col text-left mx-4">
              <div className="flex">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {isPremium && (
                  <div className="mx-2">
                    <input
                      type="checkbox"
                      checked="checked"
                      className="checkbox checkbox-info cursor-default"
                    />
                  </div>
                )}
              </div>
              <div className="text-left">
                {age && gender && <p>{age + ",  " + gender}</p>}
                <h3 className="mt-3 w-auto text-sm ">{about}</h3>
              </div>
            </div>
            <div className="flex flex-row">
              <button
                className="btn btn-secondary mx-4"
                onClick={() => requestHandler(requestId, "accepted")}
              >
                Accept
              </button>
              <button
                className="btn btn-primary "
                onClick={() => requestHandler(requestId, "rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
