import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

function Contact(props) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", props.userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("couldn't get landlord data");
      }
    };
    getLandlord();
  }, [props.userRef]);
  const handleTextare = (event) => {
    setMessage(event.target.value);
  };
  return (
    <>
      <div className="flex flex-col w-full mt-5">
        <p>
          <span className="font-semibold">Contact </span>
          {landlord && landlord.name} for the{" "}
          <span className="font-semibold">
            {props.listing.name.toLowerCase()}{" "}
          </span>
        </p>
      </div>
      <div>
        {landlord !== null && (
          <textarea
            className="mt-3 w-[48%] py-4 text-xl text-gray-700 border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:bg-slate-600"
            onChange={handleTextare}
            name="message"
            id="message"
            cols="30"
            rows="5"
            value={message}
          ></textarea>
        )}
      </div>
      <a
        href={`mailto:${landlord && landlord.email}?Subject=${
          props.listing.name
        }&body=${message}`}
        className=""
      >
        <button
          type="submit"
          className="mt-3 px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-700 active:shadow-lg transition duration-150 w-[48%] text-center"
        >
          Send Message
        </button>
      </a>
    </>
  );
}

export default Contact;
