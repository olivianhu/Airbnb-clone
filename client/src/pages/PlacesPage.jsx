import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../layout-components/AccountNav";
import PlaceImg from "../components/PlaceImg";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/user-places').then(({data}) => {
      setPlaces(data); 
    });
  })

  return(
    <div>
      <AccountNav />
      <div className="text-center">
        <div>
          {places.length > 0 && places.map(place => (
            <Link to={`/account/places/${place._id}`} className="text-left cursor-pointer max-h-28 flex gap-4 my-4 border shadow-md rounded-2xl overflow-hidden items-center" key={place._id}>
              <div className="w-44 flex bg-gray-300 mr-1">
                <PlaceImg place={place} />
              </div>
              <div className="py-4 grow">
                <h2 className="text-lg font-semibold">{place.title}</h2>
                <div className="flex gap-1 items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <h3 className="text-md text-gray-600">{place.address}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link className="mt-6 inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5 a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
          </svg>
          Add new place
        </Link>
      </div>
    </div>
  );
}

