import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../layout-components/AccountNav";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import { motion as m } from "framer-motion";

export default function PlacesFormPage() {
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(100);


  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then(response => {
        const {data} = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      })
  }, [id])

  function inputHeader(text) {
    return (
    <h2 className="text-2xl mt-4">{text}</h2>
    )
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    )
  }
  function preInput(header, description) {
    return(
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }
  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title, address, addedPhotos, 
      description, perks, extraInfo, 
      checkIn, checkOut, maxGuests, price
    }
    if (id) {
      await axios.put('/places', {
        id, ...placeData
      });
    } else {
      await axios.post('/places', placeData);
    }
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return(
    <m.div 
          initial={{opacity: 0}} 
          animate={{opacity: 1}} 
          transition={{duration: 0.75, ease: 'easeOut'}}>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput('Title', 'Title for your place. Should be short and catchy.')}
        <input type="text" value={title} onChange={(ev) => {setTitle(ev.target.value)}} placeholder="Title, e.g: My lovely apartment" />

        {preInput('Address', 'Address for the place.')}
        <input type="text" value={address} onChange={(ev) => {setAddress(ev.target.value)}} placeholder="Address"/>

        {preInput('Photos', 'Photos of the place. For links, only JPEG images are accepted.')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput('Description', 'Description of the place.')}
        <textarea value={description} onChange={(ev) => {setDescription(ev.target.value)}} />

        {preInput('Perks', 'Select all the perks that describe your place.')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3  lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput('Extra information', 'Rules that you\'d like guests to follow and any additional information.')}
        <textarea value={extraInfo} onChange={(ev) => {setExtraInfo(ev.target.value)}} />

        {preInput('Check in/out times', 'Check in and out times. Remember to have a time window to clean the place between guests.')}
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check-in time</h3>
            <input type="text" value={checkIn} 
            onChange={(ev) => {setCheckIn(ev.target.value)}} 
            placeholder="14"/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check-out time</h3>
            <input type="text" value={checkOut} 
            onChange={(ev) => {setCheckOut(ev.target.value)}} 
            placeholder="11"/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Maximum number of guests</h3>
            <input type="number" value={maxGuests} 
            onChange={(ev) => {setMaxGuests(ev.target.value)}} />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input type="number" value={price} 
            onChange={(ev) => {setPrice(ev.target.value)}} />
          </div>
        </div>
        <div className="my-4">
          <button className="primary">Save and submit</button>
        </div>
      </form>
    </m.div>
  )
}