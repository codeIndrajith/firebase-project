import React, { useEffect, useState } from "react";
import {
  collection,
  limit,
  orderBy,
  query,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";

function Slider() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);
  useEffect(() => {
    const fetchListing = async () => {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
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
  }, []);
  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <></>;
  }
  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          modules={[EffectFade]}
          pagination={{ type: "progressbar" }}
          effect="fade"
          autoplay={{ delay: 3000 }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: "cover",
                }}
                className="relative w-full overflow-hidden h-[300px]"
              ></div>
              <p className="text-gray-800 p-2 rounded-br-3xl font-medium shadow-lg opacity-90 max-w-[90%] bg-blue-400 font-bold absolute left-1 top-3">{data.name}</p>
              <p className="text-red-800 p-2 rounded-br-3xl font-medium shadow-lg opacity-90 max-w-[90%] bg-blue-400 font-bold absolute left-1 bottom-3">
                ${data.discountedPrice ?? data.regularPrice}
                {data.type === "rent" && " / months"}
                </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}

export default Slider;
