"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const pathUrl = usePathname();

  return (
    <aside className={`aside ${open ? "open" : ""}`}>
      <div onClick={handleOpen} className="nav-toggler">
        <span />
      </div>
      <div className="aside-inner">
        <div className="logo">
          <Link href="/" onClick={handleClose}>
            Logo
          </Link>
        </div>
        <ul className="nav">
          <li onClick={handleClose}>
            <Link href="/" className={`${pathUrl == "/" && "active"}`}>
              <i className="fa fa-home" /> Dashboard
            </Link>
          </li>
          <li onClick={handleClose}>
            <Link
              href="/leaderboard"
              className={`${pathUrl == "/leaderboard" && "active"}`}
            >
              <i className="fa fa-user" /> Leaderboard
            </Link>
          </li>
          <li onClick={handleClose}>
            <Link
              href="/referral_program"
              className={`${pathUrl == "/referral_program" && "active"}`}
            >
              <i className="fa fa-list" /> Refereral program
            </Link>
          </li>
          <li onClick={handleClose}>
            <Link
              href="/create_token"
              className={`${pathUrl == "/create_token" && "active"}`}
            >
              <i className="fa fa-briefcase" /> Create Token
            </Link>
          </li>
        </ul>
        <div className="copyright">
          Created with ❤️ By{" "}
          <a href="http://alsiam.com" target="_blank" rel="noopener noreferrer">
            Al Siam
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;