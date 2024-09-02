import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AddressLink from "../components/AddressLink";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import { motion as m } from "framer-motion";

export default function PlacePage() {
  const {id} = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    } 
    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    })
  }, [id])

  if (!place) return '';

  return (
    <m.div
      initial={{opacity: 0}} 
      animate={{opacity: 1}} 
      transition={{duration: 0.75, ease: 'easeOut'}}
      className="-mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place}/>
      <div className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="mb-6">
            <h2 className="font-semibold text-xl mb-2">Description</h2>
            {place.description}
          </div>
          <div className="mb-4">
            <h2 className="font-semibold text-xl mb-2">Things to know</h2>
            Check-in after {place.checkIn}:00 <br/>
            Checkout before {place.checkOut}:00 <br />
            {place.maxGuests} guests maximum
          </div>
          <div className="flex gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
              {!place.perks.includes('wifi') && (
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 18 L21 5" />
              )}
              <title>{place.perks.includes('wifi') ? 'WiFi included' : 'No WiFi'}</title>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              {!place.perks.includes('parking') && (
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 20 L21 5" />
              )}
              <title>{place.perks.includes('parking') ? 'Free parking available' : 'No free parking'}</title>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
              {!place.perks.includes('tv') && (
                <path strokeLinecap="round" strokeLinejoin="round" d="M0 20 L24 2" />
              )}
              <title>{place.perks.includes('tv') ? 'TV included' : 'No TV'}</title>
            </svg>
            <svg className="size-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <path d="M19.0993 10.6602C20.2113 11.9744 19.98 13.5815 19.9801 15C19.9801 18.9062 14.7132 20 12 20C9.28677 20 4.01994 18.9062 4.01994 15C4.01995 13.5815 3.78875 11.9744 4.90066 10.6602M19.0993 10.6602C18.9048 10.4303 18.6692 10.2094 18.384 10M19.0993 10.6602C19.7993 11.0634 19.9781 9.55469 19.9801 9.0625V7.18761C19.9801 5.56261 18.8629 5.00011 17.9053 5.00011C16.9477 5.00011 15.0324 6.5625 14.394 6.5625C13.6279 6.5625 13.4804 6.40636 12 6.40636C10.5197 6.40636 10.3721 6.5625 9.60601 6.5625C8.9676 6.5625 7.05236 5 6.09476 5C5.13715 5 4.01995 5.5625 4.01995 7.1875V9.0625C4.02188 9.55469 4.20072 11.0634 4.90066 10.6602M4.90066 10.6602C5.09519 10.4303 5.33082 10.2094 5.61599 10" stroke="#000000" strokeWidth={'1.5'}></path> <path strokeWidth={'1.5'} d="M12.8258 16C12.8258 16.1726 12.4647 16.3125 12.0193 16.3125C11.574 16.3125 11.2129 16.1726 11.2129 16C11.2129 15.8274 11.574 15.6875 12.0193 15.6875C12.4647 15.6875 12.8258 15.8274 12.8258 16Z" stroke="#000000" ></path> <path strokeWidth={'1.5'} d="M15.5 13.5938C15.5 14.0252 15.2834 14.375 15.0161 14.375C14.7489 14.375 14.5323 14.0252 14.5323 13.5938C14.5323 13.1623 14.7489 12.8125 15.0161 12.8125C15.2834 12.8125 15.5 13.1623 15.5 13.5938Z" stroke="#000000" ></path> <path strokeWidth={'1.5'} d="M9.5 13.5938C9.5 14.0252 9.28336 14.375 9.01613 14.375C8.74889 14.375 8.53226 14.0252 8.53226 13.5938C8.53226 13.1623 8.74889 12.8125 9.01613 12.8125C9.28336 12.8125 9.5 13.1623 9.5 13.5938Z" stroke="#000000" ></path> <path strokeWidth={'1.5'} d="M22.0004 15.4688C21.5165 15.1562 19.4197 14.375 18.6133 14.375" stroke="#000000"></path> <path strokeWidth={'1.5'} d="M20.3871 17.9688C19.9033 17.6562 18.7742 16.875 17.9678 16.875" stroke="#000000"></path> <path strokeWidth={'1.5'} d="M2 15.4688C2.48387 15.1562 4.58065 14.375 5.3871 14.375" stroke="#000000"></path> <path strokeWidth={'1.5'} d="M3.61279 17.9688C4.09667 17.6562 5.2257 16.875 6.03215 16.875" stroke="#000000"></path>
            {!place.perks.includes('pets') && (
                <path d="M3 20 L21 5" stroke="#000000" strokeWidth={'1.5'}></path>
            )}
             </g>
             <title>{place.perks.includes('pets') ? 'Pets allowed' : 'No pets allowed'}</title>
             </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
              {!place.perks.includes('check-in') && (
                <path strokeLinecap="round" strokeLinejoin="round" d="M-1 22 L22 4" />
              )}
              <title>{place.perks.includes('check-in') ? 'Self check-in' : 'No self check-in'}</title>
            </svg>
            <svg fill="#000000" className="size-8" viewBox="0 -1.05 48.095 48.095" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" data-name="Слой 1" stroke="#000000" ><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"><path d="M9 0 A 1.0001 1.0001 0 0 0 8 1L8 4.484375L1.4179688 9.1855469 A 1.0001 1.0001 0 0 0 1 10L1 14 A 1.0001 1.0001 0 0 0 2 15L24 15 A 1.0001 1.0001 0 0 0 25 14L25 10 A 1.0001 1.0001 0 0 0 24.582031 9.1855469L18 4.4863281L18 1 A 1.0001 1.0001 0 0 0 17 0L9 0 z M 10 2L16 2L16 5 A 1.0001 1.0001 0 0 0 16.417969 5.8144531L23 10.513672L23 13L3 13L3 10.513672L9.5820312 5.8144531 A 1.0001 1.0001 0 0 0 10 5L10 2 z M 5.5 21C4.8457598 21 4.2978026 21.418077 4.0917969 22L1 22 A 1.0001 1.0001 0 0 0 0 23L0 45 A 1.0001 1.0001 0 0 0 1 46L47.095703 46 A 1.0001 1.0001 0 0 0 48.095703 45L48.095703 23 A 1.0001 1.0001 0 0 0 47.095703 22L21.908203 22C21.702197 21.418077 21.15424 21 20.5 21L5.5 21 z M 2 24L5.5 24L20.5 24L24.095703 24L24.095703 44L2 44L2 24 z M 26.095703 24L46.095703 24L46.095703 30L26.095703 30L26.095703 24 z M 5 26 A 1.0001 1.0001 0 0 0 4 27L4 41 A 1.0001 1.0001 0 0 0 5 42L21 42 A 1.0001 1.0001 0 0 0 22 41L22 27 A 1.0001 1.0001 0 0 0 21 26L5 26 z M 30 26 A 1.0001 1.0001 0 1 0 30 28L42 28 A 1.0001 1.0001 0 1 0 42 26L30 26 z M 6 28L20 28L20 40L6 40L6 28 z M 26.095703 32L46.095703 32L46.095703 44L26.095703 44L26.095703 32 z M 29.984375 34.986328 A 1.0001 1.0001 0 0 0 29 36L29 41 A 1.0001 1.0001 0 1 0 31 41L31 36 A 1.0001 1.0001 0 0 0 29.984375 34.986328 z"></path>
            {!place.perks.includes('kitchen') && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M-10 60 L40 5" />
              )}
            </g>
            <title>{place.perks.includes('kitchen') ? 'Kitchen included' : 'No kitchen'}</title>
            </svg>
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-xl mt-8 mb-2">Additional information</h2>
        <span className="text-gray-600">{place.extraInfo}</span>
      </div>
    </m.div>
  )
}