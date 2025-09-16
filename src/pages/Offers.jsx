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

const Offers = () => {
  const [loading, setLoadig] = useState(true);
  const [offersListings, setOffersListings] = useState(null);

  useEffect(() => {
    // Fetching Data From DATABASE
    const fetchListings = async () => {
      try {
        const collectionRef = collection(db, "listings");
        // Query
        const q = query(
          collectionRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(5)
        );

        // documentSnapshot
        const documentSnapshot = await getDocs(q);

        const offersListings = [];

        documentSnapshot.forEach((singleDoc) => {
          return offersListings.push({
            id: singleDoc.id,
            data: singleDoc.data(),
          });
        });

        setOffersListings(offersListings);
        setLoadig(false);
      } catch (error) {
        toast.error("Error While Fetching");
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers A vailable</p>
      </header>
      {loading ? (
        <Spinner />
      ) : offersListings && offersListings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {offersListings.map((listing) => {
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
        <p>No Offers Available </p>
      )}
    </div>
  );
};

export default Offers;
