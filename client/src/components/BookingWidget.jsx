import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from 'date-fns';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function BookingWidget({place}) {
  const[checkIn, setCheckIn] = useState('');
  const[checkOut, setCheckOut] = useState('');
  const[numGuests, setNumGuests] = useState(1);
  const[name, setName] = useState('');
  const[phone, setPhone] = useState('');
  const[redirect, setRedirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numDays = 0;

  if(checkIn && checkOut) {
    numDays = differenceInCalendarDays(new Date(checkOut), new Date (checkIn));
  }

  async function reservePlace() {
    const response = await axios.post('/bookings', {
      checkIn, checkOut, numGuests, name, phone,
      place:place._id,
      price: numDays * place.price
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return(
    <div className="py-4 px-6 rounded-2xl border shadow-md shadow-gray-300">
      <div className="text-xl mb-2">
        <span className="font-bold">${place.price}</span> per night
      </div>
      <div className="border rounded-2xl mb-2">
        <div className="flex">
          <div className="border-r py-3 px-4">
            <label>Check-in: </label>
            <input type='date' 
              value={checkIn} 
              onChange={(ev) => setCheckIn(ev.target.value)} />
          </div>
          <div className="py-3 px-4">
            <label>Checkout: </label>
            <input type='date' 
              value={checkOut} 
              onChange={(ev) => setCheckOut(ev.target.value)} />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests: </label>
          <input type='number' 
            value={numGuests} 
            onChange={(ev) => setNumGuests(ev.target.value)} />
        </div>
        {numDays > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Full name: </label>
            <input type='text'
              value={name} 
              onChange={(ev) => setName(ev.target.value)} />
            <label className="inline-block mt-2">Phone number: </label>
            <input type='tel' 
              value={phone} 
              onChange={(ev) => setPhone(ev.target.value)} />
          </div>
        )}
      </div>
      <button onClick={reservePlace} className="primary">
        Book
        {numDays > 0 && (
          <span> ${numDays * place.price}</span>
        )}
      </button>
    </div>
  );
}