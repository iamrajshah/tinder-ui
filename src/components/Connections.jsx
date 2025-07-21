import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const allConnections = useSelector((store) => store.connections);
  const [error, setError] = useState("");
  const fetchConnections = async () => {
    try {
      const connections = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(connections.data.data));
    } catch (error) {
      setError(error?.data?.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!allConnections) return;

  if (allConnections.length === 0)
    return (
      <h1 className="text-3xl flex m-60 justify-center">
        No Connections found 😳
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl">Connections</h1>
      {allConnections.map((connect) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          isPremium,
        } = connect;
        return (
          <div className="inline-flex m-4 p-4 rounded-b-md w-250 mx-auto bg-gray-300">
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
            <div className="r-0 m-auto">
              <Link to={"/chat/" + _id}>
                <button className="btn btn-secondary">Chat</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
