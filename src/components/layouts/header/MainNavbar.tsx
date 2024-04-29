import React from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react"; // Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

const MainNavbar: React.FC = () => {
  const { connection } = useConnection();
  console.log("connection >>", connection);
  const wallet = useWallet();

  return (
    <nav className="flex items-center justify-center lg:justify-between px-4 md:px-8 xl:px-14">
      <div className="xs:flex ss:text-[12px] gap-[10px] text-[10px] md:gap-[22px] lg:text-[16px] text-black">
        <div className="xs:mb-0 xs:w-fit mb-2 flex w-[240px] justify-center gap-[4px] rounded-[15px] bg-[#FFE412] px-2 py-1 md:gap-[9px] md:px-4">
          <p>
            <u>e6lan</u>
          </p>
          <p>created</p>
          <p>
            <u>HP$UCKS</u>
          </p>
        </div>
        <div className="xs:w-fit flex min-w-[240px] justify-center gap-[4px] rounded-[15px] bg-[#00FF6C] px-2 py-1 md:gap-[9px] md:px-4">
          <p>
            <u>e6lan</u>
          </p>
          <p>bought 0.86 SOL</p>
          <p>
            <u>SLOWANA</u>
          </p>
        </div>
      </div>
      <div className="hidden lg:block">
        <WalletMultiButton className="btn btn-ghost mr-4" />
      </div>
    </nav>
  );
};

export default MainNavbar;
