import React, { useState, useEffect, useRef } from "react";

import Link from "next/link";
import Image from "next/image";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { IoRocketOutline } from "react-icons/io5";
import { GiTrophyCup } from "react-icons/gi";
import { SlPresent } from "react-icons/sl";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { SiGitbook } from "react-icons/si";
import { IoIosClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

interface SidebarProps {
  onToggle: () => void;
  onPageChange: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onToggle, onPageChange }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [toggle, setToggle] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Function to handle click outside of sidebar
  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setToggle(false);
    }
  };

  const handleScroll = () => {
    setToggle(false);
  };

  // Add event listeners on mount to handle clicks and scrolls outside of sidebar
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleButtonClick = () => {
    setIsCollapsed((prevState) => !prevState);
    onToggle(); // Call the toggle function passed from the Main component
  };

  const handleClick = (page: string) => {
    setToggle(false);
    onPageChange(page); // Call onPageChange function with the page name
  };

  return (
    <>
      <div className="relative z-10 hidden h-screen flex-col items-center justify-between bg-[#272727] text-white lg:flex">
        <button
          onClick={handleButtonClick}
          className={`absolute ${isCollapsed ? "right-0" : "right-2"} ${
            isCollapsed ? "bg-black" : "bg-[#272727]"
          } z-10 flex w-[68px] p-2 ${
            isCollapsed ? "justify-center" : "justify-end"
          }`}
        >
          {isCollapsed ? (
            <MdKeyboardDoubleArrowRight size={25} />
          ) : (
            <MdKeyboardDoubleArrowLeft size={25} />
          )}
        </button>
        <div
          className={`bg-[#272727] ${isCollapsed ? "w-[68px]" : "w-[270px]"} ${
            isCollapsed ? "xl:w-[68px]" : "xl:w-[303px]"
          } transition-all duration-500`}
        >
          <ul className="list-none">
            <li>
              <Link href="/">
                <a className={`flex items-center gap-9 pl-12 pt-[50px] ${
                  isCollapsed ? "pl-[18px]" : "pl-12"
                } ${
                  isCollapsed ? "w-16" : "w-[274px]"
                } mb-[60px] text-[25px] font-bold`}><img
                src="/images/common/logo.png"
                alt=""
                className="w-[29px]"
              />
              {!isCollapsed && "BOOSTER"}</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a
                  className={`mb-6 flex gap-9 py-[13px] text-[16px] ${
                    isCollapsed ? "pl-[18px]" : "pl-12"
                  } ${
                    isCollapsed ? "w-16" : "w-[274px]"
                  } rounded-r-[19px] border border-transparent hover:border-t-[#9945FF] hover:border-r-[#9945FF] hover:bg-black hover:drop-shadow-[1px_5px_#9945FF] focus:border-t-[#9945FF] focus:border-r-[#9945FF] focus:bg-black focus:drop-shadow-[1px_5px_#9945FF]`}
                >
                  <IoRocketOutline size={26} />
                  {!isCollapsed && "Dashboard"}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/upload">
                <a
                  className={`mb-6 flex gap-9 py-[13px] text-[16px] ${
                    isCollapsed ? "pl-[18px]" : "pl-12"
                  } ${
                    isCollapsed ? "w-16" : "w-[274px]"
                  } rounded-r-[19px] border border-transparent hover:border-t-[#9945FF] hover:border-r-[#9945FF] hover:bg-black hover:drop-shadow-[1px_5px_#9945FF] focus:border-t-[#9945FF] focus:border-r-[#9945FF] focus:bg-black focus:drop-shadow-[1px_5px_#9945FF]`}
                >
                  <GiTrophyCup size={26} />
                  {!isCollapsed && "Leaderboard"}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/create">
                <a
                  className={`mb-6 flex gap-9 py-[13px] text-[16px] ${
                    isCollapsed ? "pl-[18px]" : "pl-12"
                  } ${
                    isCollapsed ? "w-16" : "w-[274px]"
                  } rounded-r-[19px] border border-transparent hover:border-t-[#9945FF] hover:border-r-[#9945FF] hover:bg-black hover:drop-shadow-[1px_5px_#9945FF] focus:border-t-[#9945FF] focus:border-r-[#9945FF] focus:bg-black focus:drop-shadow-[1px_5px_#9945FF]`}
                >
                  <SlPresent size={26} />
                  {!isCollapsed && "Referral program"}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/misc">
                <a
                  className={`mb-6 flex gap-9 py-[13px] text-[16px] ${
                    isCollapsed ? "pl-[18px]" : "pl-12"
                  } ${
                    isCollapsed ? "w-16" : "w-[274px]"
                  } rounded-r-[19px] border border-transparent hover:border-t-[#9945FF] hover:border-r-[#9945FF] hover:bg-black hover:drop-shadow-[1px_5px_#9945FF] focus:border-t-[#9945FF] focus:border-r-[#9945FF] focus:bg-black focus:drop-shadow-[1px_5px_#9945FF]`}
                >
                  <HiOutlineSquaresPlus size={26} />
                  {!isCollapsed && "Create token"}
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mb-[29px] flex flex-col items-center">
          <button className="flex gap-9 rounded-r-[19px] py-[13px] text-[16px]">
            <IoLogOutOutline size={26} />
            {!isCollapsed && "Logout"}
          </button>
          {!isCollapsed && (
            <div className="mt-[20px] flex justify-center gap-[25px]">
              <Link href="#">
                <a href="">
                  <FaTelegramPlane size={24} />
                </a>
              </Link>
              <Link href="#">
                <a href="">
                  <FaTwitter size={24} />
                </a>
              </Link>
              <Link href="#">
                <a href="">
                  <SiGitbook size={24} />
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="relaive flex h-11 bg-[#272727] lg:hidden">
        <Link href="/">
          <a className="flex items-center gap-2 pl-4 text-[25px] font-bold text-white">
            <img src="/images/common/logo.png" alt="" className="w-[25px]" />
            BOOSTER
          </a>
        </Link>
        <div className="absolute right-0 flex items-center justify-start border border-transparent text-white hover:border-l-black">
          {toggle ? (
            <IoIosClose
              size={40}
              className="z-30 m-1 object-contain"
              alt="close menu"
              onClick={(event) => {
                event.stopPropagation(); // Stop event propagation
                setToggle((previous) => !previous);
              }}
            />
          ) : (
            <IoMenu
              size={34}
              className="z-30 m-1 object-contain"
              alt="open menu"
              onClick={(event) => {
                event.stopPropagation(); // Stop event propagation
                setToggle((previous) => !previous);
              }}
            />
          )}
        </div>
        <div
          ref={sidebarRef}
          className={`${
            toggle ? "flex" : "hidden"
          } absolute top-11 left-0 z-30 h-[85px] w-full flex-col gap-1 bg-[#272727] p-2 text-white`}
        >
          <div className="flex w-full justify-center gap-2">
            <Link href="/">
              <a className="flex w-1/2 justify-center gap-4 rounded-[6px] border border-transparent bg-black p-1 text-[10px] hover:border-[#9945FF] xs:text-[16px]">
                <IoRocketOutline size={20} />
                Dashboard
              </a>
            </Link>
            <Link href="/">
              <a className="flex w-1/2 justify-center gap-4 rounded-[6px] border border-transparent bg-black p-1 text-[10px] hover:border-[#9945FF] xs:text-[16px]">
                <SlPresent size={20} />
                Referral program
              </a>
            </Link>
          </div>
          <div className="flex w-full justify-center gap-2">
            <Link href="/">
              <a className="flex w-1/2 justify-center gap-4 rounded-[6px] border border-transparent bg-black p-1 text-[10px] hover:border-[#9945FF] xs:text-[16px]">
                <GiTrophyCup size={20} />
                Leaderboard
              </a>
            </Link>
            <Link href="/">
              <a className="flex w-1/2 justify-center gap-4 rounded-[6px] border border-transparent bg-black p-1 text-[10px] hover:border-[#9945FF] xs:text-[16px]">
                <HiOutlineSquaresPlus size={20} />
                Create token
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
