import { FC } from "react";
import Link from "next/link";

import ProgressBar from "@ramonak/react-progress-bar";
import { FaUserCircle } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";

export const TokenKingCard: FC = () => {
  return (
    <div className="relative m-auto flex w-full items-center gap-4 rounded-[20px] border border-[#9945FF] p-3 ss:p-5 md:w-[479px]">
      <img
        src="/images/common/token1.png"
        className="h-[80px] w-[80px] xs:h-[90px] xs:w-[90px] md:h-[114px] md:w-[114px]"
        alt=""
      />
      <div className="flex w-full flex-col justify-between text-white">
        <h2 className="text-[20px] md:text-[25px]">$LOWANA</h2>
        <div className="flex items-center justify-start gap-[8px] pt-1 md:pt-0">
          <p className="pr-2 text-[12px] xs:text-[15px]">Created by</p>
          <FaUserCircle size={23} />
          <Link href="#">
            <a className="text-[12px] xs:text-[14px]">
              <u>uKnowMe</u>
            </a>
          </Link>
        </div>
        <div className="pt-3">
          <p className="pb-1 text-white">
            Market cap: {((40 / 100) * 59).toFixed(2)} K
          </p>
          <ProgressBar
            completed={40}
            height="8px"
            bgColor="#9945FF"
            className="rounded-[50px]"
            baseBgColor="#333333"
            labelSize="0px"
          />
        </div>
      </div>
      <div className="absolute top-0 right-0 rounded-bl-[20px] border border-transparent border-l-[#9945FF] border-b-[#9945FF] p-2 text-[#9945FF] md:p-4">
        <BsFillLightningChargeFill size={25} />
      </div>
    </div>
  );
};
