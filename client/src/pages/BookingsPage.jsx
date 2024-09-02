import axios from "axios";
import { useEffect, useState } from "react";
import AccountNav from "../layout-components/AccountNav";
import PlaceImg from "../components/PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDates";
import { motion as m } from "framer-motion";
import { container, item } from "../animation";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    })
  }, [])
  return (
    <m.div variants={container} initial="hidden" animate="show">
      <AccountNav />
      <div>
        {bookings?.length > 0 && bookings.map(booking => (
          <m.div variants={item} initial="hidden" animate="show">
          <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 border shadow-md max-h-32 my-4 rounded-2xl overflow-hidden items-center" key={booking._id}>
            <div className="w-48 flex bg-gray-300 mr-1">
              <PlaceImg place={booking.place} />
            </div>
            <div className="py-4 grow">
              <h2 className="text-lg font-semibold">{booking.place.title}</h2>
              <div className="flex gap-1 items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <h3 className="text-md text-gray-600">{booking.place.address}</h3>
              </div>
              <BookingDates booking={booking} className={'pt-2 text-sm'}/>
            </div>
          </Link>
          </m.div>
        ))}
      </div>
    </m.div>
  );
}