import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  where,
  limit,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Category = () => {
  const param = useParams();

  const [loading, setLoadig] = useState(true);
  const [listings, setListings] = useState(null);

  useEffect(() => {
    // Fetching Data From DATABASE
    const fetchListings = async () => {
      try {
        // Ref for the mentioned Collection
        const collectionRef = collection(db, "listings");
        // Make the Query
        const q = query(
          collectionRef,
          where("type", "==", param.categoryName),
          orderBy("timestamp", "desc"),
          limit(5)
        );
        // documentSnapshot >>. id .exists() .data()
        const documentSnapshot = await getDocs(q);

        const listings = [];

        documentSnapshot.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoadig(false);
      } catch (error) {
        toast.error("something went wrong");
      }
    };

    fetchListings();
  }, [param.categoryName]);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          places for {param.categoryName === "rent" ? "Rent" : "Sale"}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => {
                return <h3 key={listing.id}>{listing.data.name}</h3>;
              })}
            </ul>
          </main>
        </>
      ) : (
        <p>No Places For {param.categoryName}</p>
      )}
    </div>
  );
};

export default Category;
