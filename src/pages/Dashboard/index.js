import { Grid } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import {
  CourseIcon,
  DiscussionIcon,
  StudentIcon,
  TeacherWhiteIcon,
} from "../../assets/icons";
import Paper from "../../components/Paper";
import Table from "../../components/Table";

export default class Dashboard extends Component {
  render() {
    const boardData = [
      {
        label: "Teacher",
        icon: TeacherWhiteIcon,
        value: 50,
      },
      {
        label: "Student",
        icon: StudentIcon,
        value: 200,
      },
      {
        label: "Course",
        icon: CourseIcon,
        value: 20,
      },
      {
        label: "Discussion",
        icon: DiscussionIcon,
        value: 8,
      },
    ];

    const col = 12 / boardData.length;
    

    return (
      <WrapContent>
        <Paper className="paper">
          <Grid container spacing={4}>
            {boardData.map((itm, key) => {
              console.log(itm);
              return (
                <Grid key={key} item  sm={col}>
                  <div className="box">
                    <img src={itm.icon} alt={itm.label} />
                    <div className="value">
                      {itm.label}
                      <span>{itm.value}</span>
                    </div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
        <Table/>
      </WrapContent>
    );
  }
}

const WrapContent = styled.div`
  .paper {
    /* background: tomato; */
    padding: 25px 0;
    display: block;
    margin-bottom  :50px;
    .box {
        display: flex;
        justify-content:center;
        align-items:center;
        .value {
            display: flex;
            flex-direction:column;
            span {
                font-size : 40px
            }
        }
        
    }

  }
`;
