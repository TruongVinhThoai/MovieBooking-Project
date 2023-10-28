import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const SECTION_IDS = [
  {
    name: "Lịch Chiếu",
    id: "lichchieu",
  },
  {
    name: "Cụm Rạp",
    id: "cumrap",
  },
  {
    name: "Tin Tức",
    id: "tintuc",
  },
  {
    name: "Ứng Dụng",
    id: "ungdung",
  },
];
const MenuItem = ({ to, label, onClick, onClose }) => {
  const handleClick = () => {
    onClose && onClose();
    onClick();
  };

  return (
    <li className="flex lg:justify-start justify-center">
      <ScrollLink
        to={to}
        spy={true}
        smooth={true}
        offset={-110}
        duration={300}
        className="flex items-center text-white cursor-pointer px-4 -mb-1 border-b-2 hover:text-violet-400 border-transparent active:text-violet-400 focus:border-b-2 focus:text-violet-400 focus:border-violet-400"
        activeClass="!text-violet-400"
        onClick={handleClick}
      >
        {label}
      </ScrollLink>
    </li>
  );
};

const Menu = ({ onClose }) => {
  const navigate = useNavigate();

  const onClick = (section) => {
    navigate("/", { state: { scrollTo: section } });
    onClose && onClose();
  };

  return (
    <ul className="items-stretch lg:items-center lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-3 flex lg:top-0 lg:left-0 lg:-translate-y-0 lg:-translate-x-0 lg:relative absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {SECTION_IDS.map((section) => (
        <MenuItem
          key={section.id}
          to={section.id}
          label={section.name}
          onClose={onClose}
          onClick={() => onClick(section.id)}
        />
      ))}
    </ul>
  );
};

export default memo(Menu);
