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
      <h1 className="text-bold text-3xl text-center p-4 m-4">
        No Connections found
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl">Connections</h1>
      {allConnections.map((connect) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connect;
        return (
          <div className="flex m-4 p-4 rounded-lg w-200 mx-auto bg-gray-300">
            <div>
              <img
                src={photoUrl}
                alt="display picture"
                className="w-50 h-35 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ",  " + gender}</p>}
              <h3 className="text-sm ">{about}</h3>
            </div>
            <Link to={"/chat/" + _id}>
              <button className="btn btn-secondary">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
