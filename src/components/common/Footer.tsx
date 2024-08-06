import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const FOOTER_ITEMS = [
  {
    name: '오늘명언',
    src: '/icons/home.png',
    activeSrc: '/icons/home-click.png',
    to: '/',
  },
  {
    name: '나의명언',
    src: '/icons/plus.png',
    activeSrc: '/icons/plus-click.png',
    to: '/writeQuote',
  },
  {
    name: '둘러보기',
    src: '/icons/follow.png',
    activeSrc: '/icons/follow-click.png',
    to: '/userList',
  },
  {
    name: 'My',
    src: '/icons/profileMenu.png',
    activeSrc: '/icons/profileMenu-click.png',
    to: '/my',
  },
];

const Footer = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 w-screen max-w-md h-[80px] border border-t-gray-50 bg-yellow-FA flex px-[30px] justify-center items-center gap-[50px] z-10">
      {FOOTER_ITEMS.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <NavLink
            to={item.to}
            key={item.name}
            className={({ isActive }) =>
              isActive
                ? 'flex flex-col items-center gap-[8px] text-black'
                : 'flex flex-col items-center gap-[8px] text-gray-D1'
            }
          >
            <img
              className="w-[30px]"
              src={isActive ? item.activeSrc : item.src}
              alt={item.name}
            />
            <span className="text-xs font-bold">{item.name}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Footer;
