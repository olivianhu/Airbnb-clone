import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";
import { container, item } from "../animation";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    })
  }, [])

  return(
    <m.div variants={container} initial="hidden" animate="show"
          className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && places.map(place => (
        <m.div variants={item} initial="hidden" animate="show">
          <Link to={'/place/'+place._id} key={place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                  <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+place.photos?.[0]} alt="" />
                
              )}
            </div>
            <h2 className="font-semibold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-2">
              <span className="font-semibold">${place.price}</span> per night
            </div>
        </Link>
        </m.div>
      ))}
    </m.div>
  )
}