import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//-----Updating Profile----------//
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";

//-Notification
import { toast } from "react-toastify";
const Profile = () => {
  const auth = getAuth();
  //-----States--------//
  const [profileData, setProfileData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  // Desturcting data
  const { name, email } = profileData;

  const [changeDetails, setChangeDetails] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  //----------------------Functions-----------------------------
  const handleChangeDetails = () => {
    setChangeDetails((prevState) => {
      return !prevState;
    });
    if (changeDetails) {
      onSubmit();
    }
  };

  const onSubmit = async () => {
    try {
      const auth = getAuth();
      const member = auth.currentUser;

      // User UI Profile
      if (member.displayName !== name) {
        await updateProfile(member, {
          displayName: name,
        });

        // FireStore
        const refOfUpdatedData = doc(db, "users", member.uid);

        await updateDoc(refOfUpdatedData, {
          name,
        });
      }
    } catch (error) {
      toast.error("Something went wrong !");
    }
  };

  const handleInputUpdates = (e) => {
    setProfileData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  return (
    <>
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">
            My Profile <br />
            <sub>{name}</sub>
          </p>
          <button className="logOut" type="button" onClick={handleLogout}>
            Log out
          </button>
        </header>

        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Details</p>
            <button
              className="changePersonalDetails"
              onClick={handleChangeDetails}
            >
              {changeDetails ? "Done" : "Change"}
            </button>
          </div>

          <div className="profileCard">
            <form>
              <input
                type="text"
                id="name"
                className={!changeDetails ? "profileName" : "profileNameActive"}
                disabled={!changeDetails}
                value={name}
                onChange={handleInputUpdates}
              />

              <input
                type="email"
                id="email"
                className={
                  !changeDetails ? "profileEmail" : "profileEmailActive"
                }
                disabled={!changeDetails}
                value={email}
                onChange={handleInputUpdates}
              />
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
