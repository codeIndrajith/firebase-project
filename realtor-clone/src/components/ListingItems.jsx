import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationPin } from 'react-icons/md';

function ListingItems({ listing, id }) {
  return (
    <li className='bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]'>
      <Link className='contents' to={`/category/${listing.type}/${id}`}>
        <img className='h-[170px] w-full object-cover hover:scale-105 transition duration-200 ease-in-out' loading='lazy' src={listing.imgUrls[0]} alt="" />
        <div className="w-full p-[10px]">
          <div className="flex  items-center space-x-1">
            <MdLocationPin className='text-green-600 w-4 h-4'/>
            <p className='font-semibold text-sm mb-[2px] text-gray-600 truncate'>{listing.address}</p>
          </div>
          <p className='font-semibold m-0 text-lg truncate'>{listing.name}</p>
          <p className='text-[#457b9d] mt-2 font-semibold'>${listing.offer ? listing.discountedPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : listing.regularPrice}
          {listing.type === 'rent' && ' / month'}
          </p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1 font-bold text-xs">
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Beds"}
            </div>
            <div className="flex items-center space-x-1 font-bold text-xs">
            {listing.bathrooms > 1 ? `${listing.bathrooms} Bath` : "1 Bath"}
            </div>
          </div>
        </div>

      </Link>
    </li>
  );
}

export default ListingItems;
