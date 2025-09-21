import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
// Storage

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebase.config";

const CreateListing = () => {
  // const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: true,
    address: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  // Desturcting
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  if (loading) {
    return <Spinner />;
  }
  //------------Functions--------------------------//

  //--------------------------SUBMIT------------------------------------------//

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (discountedPrice >= regularPrice) {
      toast.error("you should modifiy the prices !");
      setLoading(false);
      return;
    }

    if (images.length > 6) {
      toast.error("Only 6 images allowed");
      setLoading(false);
      return;
    }

    console.log(formData.images);

    // Store image
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();

        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, "images/" + fileName);
        //sends Only one pic per time
        const uploadTask = uploadBytesResumable(storageRef, image);

        // Upload

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const upladedImages = await Promise.all(
      [...images].map((singleImage) => {
        storeImage(singleImage);
      })
    ).catch((error) => {
      toast.error("Upload Fails");
      return;
    });

    console.log(upladedImages);

    toast.success("Your post is published");
    navigate("/");
  };

  //-----------------MUTATE-------------------------------------------//
  const onMutate = (e) => {
    let bol;

    let val = e.target.value;

    if (e.target.value === "true") {
      bol = true;
    }
    if (e.target.value === "false") {
      bol = false;
    }

    if (e.target.value === "number") {
      val = Number(e.target.value);
    }

    if (e.target.files) {
      val = e.target.files;
    }

    setFormData((prev) => {
      return {
        ...prev,
        [e.target.id]: bol ?? val,
      };
    });

    // console.log(e.target.value);
  };
  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create a Listing</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          {/* First Label */}
          <label className="formLabel">Sell / Rent</label>
          <div className="formButtons">
            <button
              type="button"
              className={type === "sale" ? "formButtonActive" : "formButton"}
              id="type"
              value="sale"
              onClick={onMutate}
            >
              Sell
            </button>

            <button
              type="button"
              className={type === "rent" ? "formButtonActive" : "formButton"}
              id="type"
              value="rent"
              onClick={onMutate}
            >
              Rent
            </button>
          </div>

          {/* Second  Name Label */}
          <label className="formLabel">Name</label>
          <input
            type="text"
            required
            className="formInputName"
            maxLength={32}
            minLength={10}
            id="name"
            value={name}
            onChange={onMutate}
          />

          {/* Third Bed-bath Rooms Label */}
          <div className="formRooms flex">
            <div>
              <label className="formLabel">Bedrooms</label>
              <input
                type="number"
                value={bedrooms}
                id="bedrooms"
                className="formInputSmall"
                min={1}
                max={20}
                required
                onChange={onMutate}
              />
            </div>

            <div>
              <label className="formLabel">Bathrooms</label>
              <input
                type="number"
                value={bathrooms}
                id="bathrooms"
                className="formInputSmall"
                min={1}
                max={20}
                required
                onChange={onMutate}
              />
            </div>
          </div>

          {/* Forth Furnished Label*/}

          <label className="formLabel">Furnished</label>
          <div className="formButtons">
            <button
              id="furnished"
              type="button"
              onClick={onMutate}
              value="true"
              className={furnished ? "formButtonActive" : "formButton"}
            >
              Yes
            </button>

            <button
              id="furnished"
              type="button"
              onClick={onMutate}
              value="false"
              className={
                !furnished && furnished !== null
                  ? "formButtonActive"
                  : "formButton"
              }
            >
              No
            </button>
          </div>

          {/* 5th parking Label */}
          <label className="formLabel">Parking Spot</label>
          <div className="formButtons">
            <button
              id="parking"
              type="button"
              onClick={onMutate}
              value={true}
              className={parking ? "formButtonActive" : "formButton"}
            >
              Yes
            </button>

            <button
              id="parking"
              type="button"
              onClick={onMutate}
              value={false}
              className={
                !parking && parking !== null ? "formButtonActive" : "formButton"
              }
            >
              No
            </button>
          </div>

          {/* 6th Address Label */}
          <label className="formLabel">Address</label>
          <textarea
            type="text"
            className="formInputAddress"
            id="address"
            value={address}
            onChange={onMutate}
            maxLength={25}
            required
          />

          {/* 7th Long - Lat  */}

          {/* {geolocationEnabled && (
            <div className="formLatLng flex">
              <div>
                <label className="formLabel">Latitude</label>
                <input
                  type="number"
                  id="latitude"
                  value={latitude}
                  onChange={onMutate}
                  required
                  className="formInputSmall"
                />
              </div>
              <div>
                <label className="formLabel">longitude</label>
                <input
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={onMutate}
                  required
                  className="formInputSmall"
                />
              </div>
            </div>
          )} */}

          {/* 7Th Offers  */}

          <label className="formLabel">Offers</label>
          <div className="formButtons">
            <button
              id="offer"
              type="button"
              onClick={onMutate}
              value={true}
              className={offer ? "formButtonActive" : "formButton"}
            >
              Yes
            </button>

            <button
              id="offer"
              type="button"
              onClick={onMutate}
              value={false}
              className={
                !offer && offer !== null ? "formButtonActive" : "formButton"
              }
            >
              No
            </button>
          </div>

          {/* 8th Regulare Price */}

          <label className="formLabel">Regulare Price</label>
          <div className="formPriceDiv">
            <input
              type="number"
              value={regularPrice}
              id="regularPrice"
              className="formInputSmall"
              min={50}
              max={1000000}
              step={1}
              required
              onChange={onMutate}
            />
            {type === "rent" && <p className="formPriceText">$ / Month</p>}
          </div>

          {/* 9th Discounted Price */}
          {offer && (
            <>
              <label className="formLabel">Discounted Price</label>

              <input
                type="number"
                value={discountedPrice}
                id="discountedPrice"
                className="formInputSmall"
                min={50}
                max={1000000}
                required={offer}
                onChange={onMutate}
              />
            </>
          )}

          {/* 10th Uplading images */}

          <label className="formLabel">Upload your images</label>
          <p className="imagesInfo">
            The first image will be the Cover (max 6).
          </p>
          <input
            type="file"
            id="images"
            className="formInputFile"
            onChange={onMutate}
            max={6}
            accept=".jpg,.png,.jpeg"
            required
            multiple
          />

          {/* END OF THE FORM -------- */}
          <button
            className="primaryButton createListingButton
          "
            type="submit"
          >
            Create Listing
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateListing;
