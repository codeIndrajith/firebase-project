import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import ListingItems from "../components/ListingItems";

function Home() {
  // offers
  const [offersListings, setOffersListings] = useState(null);
  // rent
  const [rentListings , setRentListings] = useState(null)
  const [saleListings , setSaleListings] = useState(null)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // get the reference
        const listingRef = collection(db, "listings");
        // create the query
        const q = query(
          listingRef,
          where("type", "==", "sell"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, []);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // get the reference
        const listingRef = collection(db, "listings");
        // create the query
        const q = query(
          listingRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, []);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        // get the reference
        const listingRef = collection(db, "listings");
        // create the query
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOffersListings(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, []);

  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offersListings && offersListings.length > 0 && (
          <div className="mt-2 mb-6">
            <h2 className="px-2 text-2xl font-semibold mt-6">Recent offers</h2>
            <Link to="/offers">
              <p className="px-2 text-sm font-semibold text-blue-500">
                See more offer
              </p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2x:grid-cols-5 mt-6 mb-6'>
              {offersListings && offersListings.map((listing) => (
                <ListingItems
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        
        {rentListings && rentListings.length > 0 && (
          <div className="mt-2 mb-6">
            <h2 className="px-2 text-2xl font-semibold mt-6">Places for rent</h2>
            <Link to="/category/rent">
              <p className="px-2 text-sm font-semibold text-blue-500">
                Show more places for rent
              </p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2x:grid-cols-5 mt-6 mb-6'>
              {rentListings && rentListings.map((listing) => (
                <ListingItems
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="mt-2 mb-6">
            <h2 className="px-2 text-2xl font-semibold mt-6">Places for sale</h2>
            <Link to="/category/sale">
              <p className="px-2 text-sm font-semibold text-blue-500">
                Show more places for sale
              </p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2x:grid-cols-5 mt-6 mb-6'>
              {saleListings && saleListings.map((listing) => (
                <ListingItems
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
