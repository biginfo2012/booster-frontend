import React from "react";
import TextAbbreviation from "../common/TextAbbreviation";
import { BsFillLightningChargeFill } from "react-icons/bs";

const Value = ({ traderdata, number, displayValue, displayTotalPoint }) => {
  return (
    <div className="flex py-[15px] border border-transparent border-b-[#333333]">
      <div className="w-[19%] flex justify-center items-center">{number}</div>
      <div className="w-[33%] flex justify-center items-center gap-2 md:gap-[18px]">
        <img src={traderdata.userImage} alt="" className="w-[24px] h-[24px] md:w-[39px] md:h-[39px]" />
        <TextAbbreviation text={traderdata.walletAddress} />
        <BsFillLightningChargeFill size={20} className="text-[#9945FF]" />
      </div>
      <div className="w-[19%] flex justify-center items-center">{displayValue}</div>
      <div className="w-[19%] flex justify-center items-center">{displayTotalPoint}</div>
      <div className="w-[10%] flex justify-center items-center">
        <button className="bg-[#00FF6C] rounded-[10px] text-black w-full md:w-3/4 max-w-[100px] px-1">
          Copy
        </button>
      </div>
    </div>
  );
};

export default Value;
