import { useState } from "react";

export default function PlaceGallery({place}) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-white min-h-screen">
        <div className="grid gap-2"> 
          <div>
            <button onClick={() => setShowAllPhotos(false)} className="bg-white p-6 mb-4 min-w-full fixed">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center gap-4 px-24 pt-16 mb-8">
            {place?.photos?.length > 0 && place.photos.map(photo => (
              <div key={photo.id} className="w-4/5">
                <img src={"http://localhost:4000/uploads/" + photo} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return(
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
        <div className="">
          {place.photos?.[0] && (
            <div>
              <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover w-full" src={"http://localhost:4000/uploads/"+place.photos[0]} alt="" />
            </div>
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover w-full" src={"http://localhost:4000/uploads/"+place.photos[1]} alt="" />
          )}
          <div className="overflow-hidden"> 
            {place.photos?.[1] && (
              <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover relative top-2 w-full" src={"http://localhost:4000/uploads/"+place.photos[2]} alt="" />
            )}
          </div>
        </div>
      </div>
      <button onClick={() => setShowAllPhotos(true)} className="flex items-center gap-2 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        Show all photos
      </button>
    </div>
  );
}