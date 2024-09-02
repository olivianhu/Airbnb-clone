import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";
import { motion as m } from "framer-motion";


export default function BookingPage() {
  const {id} = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      })
    }
  }, [id])

  if (!booking) {
    return '';
  }

  return(
    <m.div
      initial={{opacity: 0}} 
      animate={{opacity: 1}} 
      transition={{duration: 0.75, ease: 'easeOut'}}
      className="mt-8"
    >
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className={'my-2 block'}>{booking.place.address}</AddressLink>
      <div className="border border-gray-200 shadow-md py-4 px-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-xl">Booking information:</h2>
          <BookingDates booking={booking} className={"mt-2"}/>
        </div>
        <div className="bg-primary text-white py-2 px-3 rounded-2xl text-center">
          <div className="text-sm">Total price</div>
          <div className="text-xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
      <Link className="block mt-8 text-lg text-primary underline" to={'/place/'+booking.place._id}>
        Return to original listing
      </Link>
    </m.div>
  );
}