import React from "react";
import Cup from "../../assets/images/leaderboard/cup.png"

export default function LeaderboardHeader() {

  return (
    <div className="flex justify-center items-center text-white">
      <div>
        <h1 className="text-[22px] xs:text-[25px] md:text-[40px] lg:text-[50px] font-bold tracking-widest leading-tight">
          BOOSTER <br /> LEADERBOARD
        </h1>
        <p className="text-[10px] xs:text-[12px] md:text-[15px] w-full lg:w-[480px] pt-3 leading-relaxed">
          TOP 500 OF 5.4M TRADERS WORLDWIDE <br />
          Your adventure awaits. Learn, share
          and connect with Booster’s best of the best.
        </p>
      </div>
      <img src={Cup} alt="" className="drop-shadow-[1px_1px_50px_#00FF6C] w-[90px] xs:w-[120px] md:w-[150px] lg:w-[240px]"/>
    </div>
  );
}
