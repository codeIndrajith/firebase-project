import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper";
import "swiper/css/bundle";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair
} from "react-icons/fa";

function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkedCopied, setShareLinkedCopied] = useState(false);
  SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        modules={[EffectFade]}
        pagination={{ type: "progressbar" }}
        effect="fade"
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[350px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center border-2 border-gray-400"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkedCopied(true);
          setTimeout(() => {
            setShareLinkedCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkedCopied && (
        <p className="fixed font-bold top-[23%] right-[5%] z-10 bg-white border-2 border-gray-400 rounded-3xl w-[140px] h-[35px] flex justify-center items-center border-2 border-gray-400">
          Linked Copied
        </p>
      )}

      <div className="flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg lg:space-x-5 md:space-x-5">
        <div className="w-full h-[200px] h-[400px]">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - ${" "}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / month" : ""}
          </p>
          <p className="flex items-center font-bold">
            <FaMapMarkerAlt className="mr-2  text-green-800" />
            {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing.type === "rent" ? "Rent" : "Sale"}{" "}
            </p>
            {listing.offer && (
              <p className="bg-green-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
                ${+listing.regularPrice - +listing.discountedPrice}
              </p>
            )}
          </div>
          <p className="mt-2 mb-3">
            <span className="font-semibold">Description - </span>{" "}
            {listing.description}
          </p>
          <div className="flex items-center space-x-8">
            <p className="font-semibold flex items-center space-x-2">
              <FaBath />{" "}
              <p>
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : "1 Bath"}
              </p>{" "}
            </p>
            <p className="font-semibold flex items-center space-x-2">
              <FaBed />{" "}
              <p>
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Beds`
                  : "1 Bed"}
              </p>{" "}
            </p>
            <p className="font-semibold flex items-center space-x-2">
              <FaParking />
              <p>{listing.parking ? "Parking Spot" : "No Parking"}</p>{" "}
            </p>
            <p className="font-semibold flex items-center space-x-2">
              <FaChair />
              <p>{listing.furnished ? "Furnished" : "Not Furnished"}</p>
            </p>
          </div>
        </div>
        <div className="w-full h-[200px] h-[400px] z-10 overflow-x-hidden"></div>
      </div>
    </main>
  );
}

export default Listing;
