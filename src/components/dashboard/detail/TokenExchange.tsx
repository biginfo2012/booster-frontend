import React, { useState, useEffect, useRef } from "react";
import SolanaIcon from "../../../assets/images/dashboard/solana.png";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { MdSell } from "react-icons/md";

const TokenExchange = ({ token }) => {
  const [isSellClicked, setIsSellClicked] = useState(false); // State to track whether Sell button is clicked
  const buyButtonRef = useRef(null); // Ref for the Buy button

  useEffect(() => {
    // Focus the Buy button when the component mounts
    buyButtonRef.current.focus();
  }, []); // Run this effect only once on component mount

  return (
    <div className="text-white w-[316px] rounded-[8px] py-[20px] px-[25px] bg-[#0A0A0A] mt-[20px] border border-transparent hover:border-[#9945FF]">
      <div className="flex gap-[16px] text-[14px] pb-[20px]">
        <button
          onClick={() => setIsSellClicked(false)}
          ref={buyButtonRef}
          className="flex gap-[6px] items-center w-1/2 justify-center p-[9px] border border-[#F87171] rounded-[10px] hover:bg-[#27AE60] hover:border-transparent focus:bg-[#27AE60] focus:border-transparent text-[#8D93B7] hover:text-white focus:text-white"
        >
          <BsFillLightningChargeFill />
          Buy
        </button>
        <button
          className="flex gap-[6px] items-center w-1/2 justify-center p-[9px] border border-[#F87171] rounded-[10px] hover:bg-[#27AE60] hover:border-transparent focus:bg-[#27AE60] focus:border-transparent text-[#8D93B7] hover:text-white focus:text-white"
          onClick={() => setIsSellClicked(true)}
        >
          <MdSell />
          Sell
        </button>
      </div>
      <div className="relative">
        <input
          type="text"
          className="w-full h-[34px] rounded-[10px] border border-[#222222] bg-transparent outline-none"
        />
        <div className="absolute right-[14px] top-[7px] flex items-center gap-[10px]">
          {!isSellClicked && (
            <>
              <p>sol</p>
              <img src={SolanaIcon} alt="" className="w-[16px] h-[16px]" />
            </>
          )}
          {isSellClicked && (
            <>
              <p>{token.tokenName}</p>
              <img src={token.tokenImg} alt="" className="w-[16px] h-[16px]" />
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-[13px] mt-[13px]">
        <button className="flex gap-[6px] items-center w-1/3 border border-[#222222] justify-center p-[9px] rounded-[10px] text-[13px] hover:border-[#9945FF] focus:border-[#9945FF]">
          <img
            src={!isSellClicked ? SolanaIcon : token.tokenImg}
            alt=""
            className="w-[11px] h-[11px]"
          />
          0.25
        </button>
        <button className="flex gap-[6px] items-center w-1/3 border border-[#222222] justify-center p-[9px] rounded-[10px] text-[13px] hover:border-[#9945FF] focus:border-[#9945FF]">
          <img
            src={!isSellClicked ? SolanaIcon : token.tokenImg}
            alt=""
            className="w-[11px] h-[11px]"
          />
          0.5
        </button>
        <button className="flex gap-[6px] items-center w-1/3 border border-[#222222] justify-center p-[9px] rounded-[10px] text-[13px] hover:border-[#9945FF] focus:border-[#9945FF]">
          <img
            src={!isSellClicked ? SolanaIcon : token.tokenImg}
            alt=""
            className="w-[11px] h-[11px]"
          />
          1
        </button>
      </div>
      <button className="flex gap-[6px] items-center w-full justify-center p-[9px] rounded-[10px] bg-[#9945FF] mt-[20px]">
        <BsFillLightningChargeFill />
        Buy
      </button>
    </div>
  );
};

export default TokenExchange;
