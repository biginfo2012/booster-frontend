import { AppProps } from "next/app";
import Head from "next/head";
import { FC, useState } from "react";
import { ContextProvider } from "../contexts/ContextProvider";
import MainNavbar from "../components/layouts/header/MainNavbar";
import Notifications from "../components/Notification";
import { Sidebar } from "components/layouts/sidebar/SideBar";

require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

// Define the token card values with the imported token images
const tokenCardValues = [
  {
    tokenImg: "images/common/token1.png",
    tokenName: "$LOWA...",
    tokenDescription:
      "Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun.",
    progress: "40",
  },
  {
    tokenImg: "images/common/token2.png",
    tokenName: "DEBB",
    tokenDescription:
      "Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun.",
    progress: "25",
  },

  {
    tokenImg: "images/common/token3.png",
    tokenName: "LADA$$",
    tokenDescription:
      "Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun.",
    progress: "22",
  },

  {
    tokenImg: "images/common/token4.png",
    tokenName: "SUSSY",
    tokenDescription:
      "Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun.",
    progress: "25",
  },

  {
    tokenImg: "images/common/token5.png",
    tokenName: "CATTY",
    tokenDescription:
      "Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun.",
    progress: "28",
  },

  {
    tokenImg: "images/common/token6.png",
    tokenName: "BRED",
    tokenDescription:
      "Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun.",
    progress: "31",
  },

  {
    tokenImg: "images/common/token7.png",
    tokenName: "FURY",
    tokenDescription:
      "Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun.",
    progress: "19",
  },

  {
    tokenImg: "images/common/token8.png",
    tokenName: "BOBBY",
    tokenDescription:
      "Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun.",
    progress: "30",
  },

  {
    tokenImg: "images/common/token9.png",
    tokenName: "BLUON",
    tokenDescription:
      "Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun.",
    progress: "20",
  },

  {
    tokenImg: "images/common/token10.png",
    tokenName: "QUACK",
    tokenDescription:
      "Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun.",
    progress: "20",
  },

  {
    tokenImg: "images/common/token11.png",
    tokenName: "PFCHU",
    tokenDescription:
      "Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun.",
    progress: "20",
  },

  {
    tokenImg: "images/common/token12.png",
    tokenName: "CHTRA",
    tokenDescription:
      "Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun and engaging meme coin. Merged with a vision to be a fun and engaging. Merged with a vision to be a fun.",
    progress: "20",
  },
];
const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [activePage, setActivePage] = useState<string>("dashboard");
  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  return (
    <>
      <Head>
        <title>Solana Token Creator</title>
      </Head>

      <ContextProvider>
        <div className="flex h-screen flex-col bg-black">
          <Notifications />
          <div className="relative lg:fixed">
            <Sidebar
              onToggle={handleToggleSidebar}
              onPageChange={handlePageChange}
            />
          </div>
          <div
            className={`${isCollapsed ? "lg:ml-[68px]" : "lg:ml-[270px]"} ${
              isCollapsed ? "xl:ml-[68px]" : "xl:ml-[303px]"
            } relative z-20 min-h-screen h-full py-3 pt-6 transition-all duration-500 md:py-6 `}
          >
            <MainNavbar/>
            <Component {...pageProps} tokenCardValues={tokenCardValues} />
          </div>
        </div>
      </ContextProvider>
    </>
  );
};

export default App;
