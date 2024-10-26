import React, { useEffect, useState } from 'react'
import { FaClock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { RiSmartphoneFill } from 'react-icons/ri';
import GpayBanner from "../assets/images/gpaybanner.png"
import GpayFooter from "../assets/images/gpayfooter.webp"


const Home = () => {
  const navigate = useNavigate()
  const [number, setnumber] = useState()
  const [select, setselect] = useState("jio")
  const [error, setError] = useState(false)
  const [seconds, setSeconds] = useState(15 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const openOffer = () => {
    if (number?.length === 10) {
      localStorage.setItem("number", number)
      localStorage.setItem("np", select)
      navigate("/recharge")
    } else {
      setError(true)
    }
  }

  return (
    <div className="bg-white">
      <div className="px-2">
        <img src={GpayBanner} alt="" className="rounded-xl" />
      </div>
      <div>
        <div className="flex items-center justify-center py-1 px-4 mt-2 bg-blue-50 text-[13px]">
          <div className="text-slate-700 mr-2">Special Offer Ends In:</div>
          <div className="text-slate-700 flex items-center"><FaClock className="mr-[2px] mt-[1px]" />{minutes}:{remainingSeconds}</div>
        </div>
      </div>
      <div className="py-10 px-5">
        <div className="bg-white border border-slate-200 rounded-xl py-4 px-6 shadow-xl shadow-blue-100">
          <div className="text-blue-500 flex items-center text-[17px] font-bold w-fit mx-auto mb-8"><RiSmartphoneFill size={30} /><span>Mobile Recharge</span></div>
          <label className="text-[13px] ml-1 font-bold mt-5">Select Network Provider</label>
          <div className="mt-2 flex justify-between text-blue-500 text-[14px] font-bold">
            <div className="border-2 border-blue-500 rounded px-2 py-1"><input type="radio" id="jio" name="r1" value="jio" onChange={(e)=>setselect(e.target.value)} className="mr-1 mt-1" defaultChecked={select==="jio"} /><label for="jio">Jio</label> </div>
            <div className="border-2 border-blue-500 rounded px-2 py-1"><input type="radio" id="airtel" name="r1" value="airtel" onChange={(e)=>setselect(e.target.value)} className="mr-1 mt-1" defaultChecked={select==="airtel"} /><label for="airtel">Airtel</label> </div>
            <div className="border-2 border-blue-500 rounded px-2 py-1"><input type="radio" id="vi" name="r1" value="vi" onChange={(e)=>setselect(e.target.value)} className="mr-1 mt-1" defaultChecked={select==="vi"} /><label for="vi">VI</label> </div>
            <div className="border-2 border-blue-500 rounded px-2 py-1"><input type="radio" id="bsnl" name="r1" value="bsnl" onChange={(e)=>setselect(e.target.value)} className="mr-1 mt-1" defaultChecked={select==="bsnl"} /><label for="bsnl">Bsnl</label> </div>
          </div>
          <div className="mt-3">
            <label className="text-[13px] ml-1 font-bold">Mobile Number</label>
            <input
              type="number"
              onChange={(e) => setnumber(e.target.value)}
              value={number || ""}
              placeholder="+91 xxxxx xxxxx"
              className="bg-white mt-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            {error && <small className="text-red-500 my-1">Please enter valid mobile number!!</small>}
          </div>
          <div className="mt-5">
            <button onClick={openOffer} className="bg-blue-500 py-3 w-full text-[15px] rounded-xl font-bold text-white">Recharge</button>
          </div>
        </div>
      </div>
      <img src={GpayFooter} alt="" className="mt-3" />
    </div>
  )
}

export default Home
