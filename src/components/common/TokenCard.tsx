import React from "react";
import Link from "next/link";
import ProgressBar from "@ramonak/react-progress-bar";

interface TokenCardProps {
  tokenCardValues: {
    tokenImg: string;
    tokenName: string;
    tokenDescription: string;
    progress: string;
  };
}

const TokenCard: React.FC<TokenCardProps> = ({ tokenCardValues }) => {
  const truncateText = (text: string, maxChars: number) => {
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars) + "...";
  };

  return (
    <div className="bg-[#272727] rounded-[20px] p-2 2xl:p-4 flex items-center gap-4 m-auto hover:border-[#9945FF] transition duration-200 border-transparent border">
      <img src={tokenCardValues.tokenImg} className="w-[98px] h-[98px]" alt="" />
      <div>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-white text-[20px] xl:text-[25px]">{tokenCardValues.tokenName}</h2>
          </div>
          <Link href="#">
            <a className="text-[#9945FF] text-[10px] 2xl:text-[12px]">by <u>uKnowMe</u></a>
          </Link>
        </div>
        <p className="text-white text-sm pt-[10px] text-ellipsis">
          {truncateText(tokenCardValues.tokenDescription, 80)} {/* Truncate to approximately 3/4 of the second line */}
        </p>
        <div className="pt-3">
          <p className="text-white pb-1">Market cap: {((parseFloat(tokenCardValues.progress) / 100) * 59).toFixed(2)} K</p>
          <ProgressBar
            completed={parseFloat(tokenCardValues.progress)}
            height="8px"
            bgColor="#9945FF"
            className="rounded-[50px]"
            baseBgColor="#333333"
            labelSize="0px"
          />
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
