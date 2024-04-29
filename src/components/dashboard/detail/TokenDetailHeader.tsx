import React from "react";
import { FaCopy } from "react-icons/fa";

const TokenDetailHeader = ({ tokenImg, tokenName }) => {
  return (
    <div className="flex text-white items-center gap-[12px] pt-[30px] pb-[22px]">
      <div className="flex items-center gap-[12px]">
        <img src={tokenImg} alt="" className="w-[32px] h-[32px]"/>
        <p>{tokenName}</p>
      </div>
      <div className="flex items-center">
        <button className="flex items-center gap-1 px-2 border border-transparent border-r-[#8D93B7] h-[16px]">Token<FaCopy size={14} className="text-[#8D93B7]"/></button>
        <button className="flex items-center gap-1 px-2 border border-transparent border-r-[#8D93B7] h-[16px]">Pair<FaCopy size={14} className="text-[#8D93B7]"/></button>
        <p className="text-[#00FF6C] text-base px-2 border border-transparent border-r-[#8D93B7] h-[16px] flex items-center">Market cap: $8 846,43</p>
        <p className="text-[#00FF6C] text-base px-2">Liquidity: $23 507,09</p>
      </div>
    </div>
  );
};

export default TokenDetailHeader;
