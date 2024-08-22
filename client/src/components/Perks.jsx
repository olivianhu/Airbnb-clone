export default function Perks({selected, onChange}) {
  function handleCbClick(ev) {
    const {checked, name} = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter(selectedName => selectedName !== name)])
    }
  }
  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCbClick}/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
        </svg>
        <span>WiFi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCbClick}/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
        <span>Free parking</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('tv')} name="tv" onChange={handleCbClick}/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
        <span>TV</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('pets')} name="pets" onChange={handleCbClick}/>
        <svg className="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <path d="M19.0993 10.6602C20.2113 11.9744 19.98 13.5815 19.9801 15C19.9801 18.9062 14.7132 20 12 20C9.28677 20 4.01994 18.9062 4.01994 15C4.01995 13.5815 3.78875 11.9744 4.90066 10.6602M19.0993 10.6602C18.9048 10.4303 18.6692 10.2094 18.384 10M19.0993 10.6602C19.7993 11.0634 19.9781 9.55469 19.9801 9.0625V7.18761C19.9801 5.56261 18.8629 5.00011 17.9053 5.00011C16.9477 5.00011 15.0324 6.5625 14.394 6.5625C13.6279 6.5625 13.4804 6.40636 12 6.40636C10.5197 6.40636 10.3721 6.5625 9.60601 6.5625C8.9676 6.5625 7.05236 5 6.09476 5C5.13715 5 4.01995 5.5625 4.01995 7.1875V9.0625C4.02188 9.55469 4.20072 11.0634 4.90066 10.6602M4.90066 10.6602C5.09519 10.4303 5.33082 10.2094 5.61599 10" stroke="#000000"></path> <path d="M12.8258 16C12.8258 16.1726 12.4647 16.3125 12.0193 16.3125C11.574 16.3125 11.2129 16.1726 11.2129 16C11.2129 15.8274 11.574 15.6875 12.0193 15.6875C12.4647 15.6875 12.8258 15.8274 12.8258 16Z" stroke="#000000" ></path> <path d="M15.5 13.5938C15.5 14.0252 15.2834 14.375 15.0161 14.375C14.7489 14.375 14.5323 14.0252 14.5323 13.5938C14.5323 13.1623 14.7489 12.8125 15.0161 12.8125C15.2834 12.8125 15.5 13.1623 15.5 13.5938Z" stroke="#000000" ></path> <path d="M9.5 13.5938C9.5 14.0252 9.28336 14.375 9.01613 14.375C8.74889 14.375 8.53226 14.0252 8.53226 13.5938C8.53226 13.1623 8.74889 12.8125 9.01613 12.8125C9.28336 12.8125 9.5 13.1623 9.5 13.5938Z" stroke="#000000" ></path> <path d="M22.0004 15.4688C21.5165 15.1562 19.4197 14.375 18.6133 14.375" stroke="#000000"></path> <path d="M20.3871 17.9688C19.9033 17.6562 18.7742 16.875 17.9678 16.875" stroke="#000000"></path> <path d="M2 15.4688C2.48387 15.1562 4.58065 14.375 5.3871 14.375" stroke="#000000"></path> <path d="M3.61279 17.9688C4.09667 17.6562 5.2257 16.875 6.03215 16.875" stroke="#000000"></path> </g></svg>
        <span>Pets allowed</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('check-in')} name="check-in" onChange={handleCbClick}/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
        </svg>
        <span>Self check-in</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('kitchen')} name="kitchen" onChange={handleCbClick}/>
        <svg fill="#000000" className="size-6" viewBox="0 -1.05 48.095 48.095" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" data-name="Слой 1" stroke="#000000" ><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"><path d="M9 0 A 1.0001 1.0001 0 0 0 8 1L8 4.484375L1.4179688 9.1855469 A 1.0001 1.0001 0 0 0 1 10L1 14 A 1.0001 1.0001 0 0 0 2 15L24 15 A 1.0001 1.0001 0 0 0 25 14L25 10 A 1.0001 1.0001 0 0 0 24.582031 9.1855469L18 4.4863281L18 1 A 1.0001 1.0001 0 0 0 17 0L9 0 z M 10 2L16 2L16 5 A 1.0001 1.0001 0 0 0 16.417969 5.8144531L23 10.513672L23 13L3 13L3 10.513672L9.5820312 5.8144531 A 1.0001 1.0001 0 0 0 10 5L10 2 z M 5.5 21C4.8457598 21 4.2978026 21.418077 4.0917969 22L1 22 A 1.0001 1.0001 0 0 0 0 23L0 45 A 1.0001 1.0001 0 0 0 1 46L47.095703 46 A 1.0001 1.0001 0 0 0 48.095703 45L48.095703 23 A 1.0001 1.0001 0 0 0 47.095703 22L21.908203 22C21.702197 21.418077 21.15424 21 20.5 21L5.5 21 z M 2 24L5.5 24L20.5 24L24.095703 24L24.095703 44L2 44L2 24 z M 26.095703 24L46.095703 24L46.095703 30L26.095703 30L26.095703 24 z M 5 26 A 1.0001 1.0001 0 0 0 4 27L4 41 A 1.0001 1.0001 0 0 0 5 42L21 42 A 1.0001 1.0001 0 0 0 22 41L22 27 A 1.0001 1.0001 0 0 0 21 26L5 26 z M 30 26 A 1.0001 1.0001 0 1 0 30 28L42 28 A 1.0001 1.0001 0 1 0 42 26L30 26 z M 6 28L20 28L20 40L6 40L6 28 z M 26.095703 32L46.095703 32L46.095703 44L26.095703 44L26.095703 32 z M 29.984375 34.986328 A 1.0001 1.0001 0 0 0 29 36L29 41 A 1.0001 1.0001 0 1 0 31 41L31 36 A 1.0001 1.0001 0 0 0 29.984375 34.986328 z"></path></g></svg>
        <span>Kitchen</span>
      </label>
    </>
  );
}