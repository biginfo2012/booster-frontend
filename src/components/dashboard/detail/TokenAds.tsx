import React from "react";
import { BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";

const TokenAds = () => {
  return (
    <div className="text-white w-[316px] rounded-[8px] py-[20px] px-[25px] bg-[#0A0A0A] mt-[20px] border border-transparent hover:border-[#9945FF]">
      <BiHide />
      <div className="flex gap-[10px]">
        <Link>
          <FaXTwitter className="text-[#8D93B7] bg-[#272727] p-1" size={24} />
        </Link>
        <Link>
          <FaGlobe className="text-[#8D93B7] bg-[#272727] p-1" size={24} />
        </Link>
        <Link>
          <FaTelegramPlane
            className="text-[#8D93B7] bg-[#272727] p-1"
            size={24}
          />
        </Link>
      </div>
      <div className="flex pt-[17px] justify-between text-center">
        <div>
          <p className="text-[#8D93B7] text-[11px]">Price USD</p>
          <p className="text-[14px]">$0.0₅8929</p>
        </div>
        <div>
          <p className="text-[#8D93B7] text-[11px]">Liquidity</p>
          <p className="text-[14px]">$4.4K</p>
        </div>
        <div>
          <p className="text-[#8D93B7] text-[11px]">MKT Cap</p>
          <p className="text-[14px]">$8.92K</p>
        </div>
      </div>
    </div>
  );
};

export default TokenAds;
