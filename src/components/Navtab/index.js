import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import * as React from "react";
import styled from "styled-components";


const Tab = styled(TabUnstyled)`
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: ${(props)=>props.active ? "white" : "transparent"};
  width: 100%;
  padding: 5px 6px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: var(--primary-color);
  }

  &.${tabUnstyledClasses.selected} {
    background-color:white;
    color: var(--primary-color);
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;



const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: var(--primary-color);
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

const Navtab = (props) => {
  const { tabsData , onClick, navIndexActive } = props;

  return (
    <TabsUnstyled value={navIndexActive} >
      <TabsList >
        {tabsData.map((tab,index) => {
          return (
            <Tab key={tab.name} onClick={(e) => onClick(e,index)} name={tab.name}>
              {tab.label}
            </Tab>
          );
        })}
      </TabsList>
    </TabsUnstyled>
  );
};

export default Navtab;
