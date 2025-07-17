import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  console.log("Feed", feed, typeof feed, feed && feed[0]);

  const getFeed = async () => {
    try {
      if (feed) return;
      const result = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log(result, "feed respoinse");
      if (result) {
        console.log(result.data, result.data[0], typeof result.data);
        dispatch(addFeed(result.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length === 0)
    return <h1 className="justify-center m-4">No new user found</h1>;

  console.log(typeof feed);

  return (
    feed[0] && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
