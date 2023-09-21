import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore , { Navigation, Pagination, Autoplay, EffectFade } from "swiper";
import "swiper/css/bundle";
import {FaShare} from 'react-icons/fa'

function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkedCopied , setShareLinkedCopied] = useState(false);
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
                backgroundSize : "cover"
            }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center border-2 border-gray-400" onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        setShareLinkedCopied(true)
        setTimeout(() => {
            setShareLinkedCopied(false)
        }, 2000)
      }}>
        <FaShare className="text-lg text-slate-500"/>
      </div>
      {shareLinkedCopied && (
        <p className="fixed font-bold top-[23%] right-[5%] z-10 bg-white border-2 border-gray-400 rounded-3xl w-[140px] h-[35px] flex justify-center items-center border-2 border-gray-400">Linked Copied</p>
      )}

      <div className="flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg lg:space-x-5">
        <div className="bg-blue-600 w-full h-[200px] h-[400px]"></div>
        <div className="bg-red-600 w-full h-[200px] h-[400px]"></div>
      </div>
    </main>
    
  );
}

export default Listing;
