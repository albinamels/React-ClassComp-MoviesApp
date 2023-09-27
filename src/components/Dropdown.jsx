import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export const DropMenu = ({ direction, handleMenu }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex p-5">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
        <DropdownToggle caret size="lg">
          Filter by...
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handleMenu("series")}>
            Series
          </DropdownItem>
          <DropdownItem onClick={() => handleMenu("movie")}>Movie</DropdownItem>
          <DropdownItem onClick={() => handleMenu("game")}>Game</DropdownItem>
          <DropdownItem onClick={() => handleMenu("all")}>All</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
