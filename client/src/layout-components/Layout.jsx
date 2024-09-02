import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { motion as m } from "framer-motion";

export default function Layout() {
  return(
    <m.div 
      initial={{opacity: 0}} 
      animate={{opacity: 1}} 
      transition={{duration: 0.75}}
      className="flex flex-col min-h-screen justify-between">
      <div>
        <div className="py-4 px-8">
          <Header />
        </div>
        <div className="border-t border-gray-200"></div>
        <div className="px-8">
          <Outlet />
        </div>
      </div>
      <div>
        <div className="border-t border-gray-200 mt-12"></div>
        <div className="py-2">
          <Footer />
        </div>
      </div>
    </m.div>
  )
}