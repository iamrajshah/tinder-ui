import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleRequest = async (status, toUserId) => {
    try {
      await axios.post(
        BASE_URL + `/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(toUserId));
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return;
  const { _id, photoUrl, firstName, lastName, age, gender, about, isPremium } =
    user;

  return (
    user && (
      <div className="card bg-base-200 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="display" />
        </figure>
        <div className="card-body">
          <div className="flex flex-row">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {isPremium && (
              <div className="mx-4">
                <input
                  readOnly
                  type="checkbox"
                  checked="checked"
                  className="checkbox checkbox-info cursor-default"
                />
              </div>
            )}
          </div>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-secondary"
              onClick={() => handleRequest("interested", _id)}
            >
              Interested
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleRequest("interested", _id)}
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
