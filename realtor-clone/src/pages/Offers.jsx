import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItems from "../components/ListingItems";

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchListing , setLastFetchListing] = useState(null)
  useEffect(() => {
    try {
      const fetchListing = async () => {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchListing(lastVisible)
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      };
      fetchListing();
    } catch (error) {
      toast.error("Couldn't fetch listings");
    }
  }, []);

  // load to listing after last listing
  const onFetchMoreListing = async () => {
    try {
      const fetchListing = async () => {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          startAfter(lastFetchListing),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchListing(lastVisible)
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings((prevState) => [
          ...prevState , ...listings
        ]);
        setLoading(false);
      };
      fetchListing();
    } catch (error) {
      toast.error("Couldn't fetch listings");
    }
  }
  return (
    <div className="max-w-6xl mx-auto px-3 mb-6">
      <h1 className="text-3xl text-center mt-6 font-bold">Offer</h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
          <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2x:grid-cols-5 mt-6 mb-6'>
            {listings &&
              listings.map((listing) => (
                <ListingItems
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
          </ul>
          </main>
          {lastFetchListing && (
           <div className="flex justify-center items-center">
            <button onClick={onFetchMoreListing} className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out">Load More</button>
           </div>
          )}
        </>
      ) : (
        <p>They are no current offers</p>
      )}
    </div>
  );
}

export default Offers;
