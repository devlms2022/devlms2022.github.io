import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;

  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &.active {
    color: var(--primary-color);
    border-left: 4px solid var(--primary-color);
  }
  &:hover {
    color: var(--primary-color);
    border-left: 4px solid var(--primary-color);
    cursor: pointer;
  }
  .label {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  height: 50px;
  padding-left: 1.2rem;
  margin-left: 1.8rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 18px;
  &.active {
    border-left: medium solid var(--primary-color);
    color: var(--primary-color);
  }
  &:hover {
    border-left: medium solid var(--primary-color);
    color: var(--primary-color);
    cursor: pointer;
  }
`;

const MenuItem = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const { pathname } = useLocation();

  const submenuActive =
    item.subNav && item.subNav.find((item) => item.path === pathname);
  useEffect(() => {
    if (submenuActive) {
      setSubnav(!subnav);
    }
  }, []);

  const showSubnav = (e) => {
    e.preventDefault();
    setSubnav(!subnav);
  };

  return (
    <>
      <SidebarLink
        className={
          item.subNav
            ? subnav && submenuActive
              ? "active"
              : ""
            : item.path === pathname
            ? "active"
            : ""
        }
        to={item.path}
        onClick={item.subNav && showSubnav}
      >
        <div className="label">
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink
              className={item.path === pathname ? "active" : ""}
              to={item.path}
              key={index}
            >
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default MenuItem;
