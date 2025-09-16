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

//----Importimg Listing Component

import Listing from "../components/Listing";

const Category = () => {
  const param = useParams();

  const [loading, setLoadig] = useState(true);
  const [listings, setListings] = useState(null);

  useEffect(() => {
    // Fetching Data From DATABASE
    const fetchListings = async () => {
      try {
        const collectionRef = collection(db, "listings");
        // Query
        const q = query(
          collectionRef,
          where("type", "==", param.categoryName),
          orderBy("timestamp", "desc"),
          limit(5)
        );

        // documentSnapshot

        const documentSnapshot = await getDocs(q);

        const listings = [];

        documentSnapshot.forEach((singleDoc) => {
          return listings.push({
            id: singleDoc.id,
            data: singleDoc.data(),
          });
        });

        setListings(listings);
        setLoadig(false);
      } catch (error) {
        toast.error("Error While Fetching");
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
                return (
                  <Listing
                    listingData={listing.data}
                    id={listing.id}
                    key={listing.id}
                  />
                );
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
