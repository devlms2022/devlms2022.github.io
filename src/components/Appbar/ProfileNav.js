import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProfileNav = (props) => {
  const { onProfileClick } = props;
  return (
    <DivStyled>
      <li className="list-item">
        <Link to="/profile">Profile</Link>
      </li>
      <li className="list-item">
        <Typography className="logout" onClick={() => onProfileClick("logout")} textAlign="center">
         Logout
        </Typography>
      </li>
    </DivStyled>
  );
};

const DivStyled = styled.div`
    li {
        margin : 0px 18px 12px 18px;
        .logout {
            &:hover {
                cursor:pointer;
            }
        }
    }

`;

export default ProfileNav;
