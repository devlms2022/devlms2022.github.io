import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Search from "../../../components/Form/Search";

const StudentList = () => {
  return (
    <Content>
      <Search placeholder="Enter Search" name="search" width="60%" />
      <div className="listStudent">
        <div className="student">
          <img />
          <Typography variant="h5">
            Danu <br /> Mahendra
          </Typography>
        </div>
        <div className="student">
          <img />
          <Typography variant="h5">
            Danu <br /> Mahendra
          </Typography>
        </div>
        <div className="student">
          <img />
          <Typography variant="h5">
            Danu <br /> Mahendra
          </Typography>
        </div>
        <div className="student">
          <img />
          <Typography variant="h5">
            Danu <br /> Mahendra
          </Typography>
        </div>
        <div className="student">
          <img />
          <Typography variant="h5">
            Danu <br /> Mahendra
          </Typography>
        </div>
        <div className="student">
          <img />
          <Typography variant="h5">
            Danu <br /> Mahendra
          </Typography>
        </div>
        <div className="student">
          <img />
          <Typography variant="h5">
            Danu <br /> Mahendra
          </Typography>
        </div>
        <div className="student">
          <img />
          <Typography variant="h5">
            Danu <br /> Mahendra
          </Typography>
        </div>
        <div className="student">
          <img />
          <Typography variant="h5">
            Danu <br /> Mahendra
          </Typography>
        </div>
        <div className="student">
          <img />
          <Typography variant="h5">
            Danu <br /> Mahendra
          </Typography>
        </div>
      </div>
    </Content>
  );
};

const Content = styled.div`
  padding: 0 20px;

  .listStudent {
    margin-top: 25px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 35px;
    flex-wrap: wrap;
  }

  .student {
    display: flex;
    flex-direction: column;
    gap: 10px;

    img {
      width: 72px;
      height: 72px;
      background-color: black;
      object-fit: cover;
      border-radius: 50%;
    }

    h5 {
      font-size: 12pt;
      font-weight: 500;
      text-align: center;
    }
  }
`;

export default StudentList;
