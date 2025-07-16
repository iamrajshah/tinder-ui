import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "./../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "./../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || 0);
  const [gender, setGender] = useState(user.gender);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfileData = async () => {
    try {
      const updatedUser = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, about, photoUrl, age, gender },
        { withCredentials: true }
      );
      dispatch(addUser(updatedUser.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setError(error.data.message);
    }
  };
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card card-border bg-base-100 w-96">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <legend className="fieldset-legend">Photo URL</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />

                <legend className="fieldset-legend">About</legend>

                <textarea
                  className="textarea"
                  placeholder="Bio"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>

                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="number"
                  placeholder="Type here"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />

                <legend className="fieldset-legend">Gender</legend>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1">
                    {gender}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    <li onClick={(e) => setGender(e.target.text)}>
                      <a>M</a>
                    </li>
                    <li onClick={(e) => setGender(e.target.text)}>
                      <a>F</a>
                    </li>
                    <li onClick={(e) => setGender(e.target.text)}>
                      <a>O</a>
                    </li>
                  </ul>
                </div>
              </fieldset>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfileData}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{ photoUrl, firstName, lastName, about, age, gender }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
