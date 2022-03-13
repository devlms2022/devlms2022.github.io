import { Book, People } from "@mui/icons-material";
import { Chip, Container, Skeleton, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import styledComponents from "styled-components";
import ButtonCustom from "../../components/Button/Button";
import BaseTabs from "../../components/Tabs";

const DetailStudy = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Detail>
      <img
        className="bg"
        src="https://cdn.techozu.com/wp/2020/11/JavaScript_Featured-1.jpg"
      />
      <div className="header">
        <img
          className="thumbnail"
          src="https://d17ivq9b7rppb3.cloudfront.net/original/academy/belajar_fundamental_aplikasi_android_logo_230421132359.jpg"
        />
        <div className="buttonHandle">
          <ButtonCustom
            variant="filled"
            height="10"
            width="200px"
            className="registButton"
            text="Regist Study"
          />
          <ButtonCustom
            variant="outlined"
            height="10"
            width="200px"
            className="backButton"
            text="Back to Studies"
          />
        </div>
        <div className="titleHead">
          <div className="title">
            <div className="chip">
              <Chip
                label="Teknik Informatika"
                className="chip-item"
                variant="filled"
                size="small"
              />
              <Chip
                label="Rekayasa Perangkat Lunak"
                className="chip-item"
                color="info"
                variant="filled"
                size="small"
              />
            </div>
            <h4>Full-Stack Javascript</h4>
          </div>
          <div className="info">
            <div className="teacher">
              <img
                className="photoTeacher"
                src="https://preview.redd.it/n4d19bp7pe471.jpg?auto=webp&s=16b6d44bc0ecce0c0ab1341042c95c4fbfd855ef"
              />
              <div className="nameTeacher">
                <p className="label">Teacher</p>
                <p className="name">Danu Mahendra</p>
              </div>
            </div>
            <div className="info-num">
              <div className="item">
                <People fontSize="medium" />
                <span>0</span>
              </div>
              <div className="item">
                <Book fontSize="medium" />
                <span>50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BaseTabs
        className="selectTabs"
        tabLabel={["Description", "Courses", "Students"]}
        tabPanel={[
          {
            content: loading ? (
              <Skeleton
                animation="wave"
                sx={{ height: 190 }}
                variant="rectangular"
              />
            ) : (
              <div>wdawd</div>
            ),
          },
          {
            content: loading ? (
              <Skeleton
                animation="wave"
                sx={{ height: 190 }}
                variant="rectangular"
              />
            ) : (
              <div className="listCourse">
                <h3 className="titleTabs">List courses</h3>
                <Grid container spacing={2}>
                  <Grid item md={4} sm={6} xs={12}>
                    <div className="course">
                      <img
                        className="thumbnailCourse"
                        src="https://res.cloudinary.com/practicaldev/image/fetch/s---Q0XxjSQ--/c_imagga_scale,f_auto,fl_progressive,h_1080,q_auto,w_1080/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8ij1uqqanvx6wuyxfx7e.jpg"
                      />
                      <div className="titleCourse">
                        <div className="infoCourse">
                          <h4>01. Javascript Beginner</h4>
                          <div className="item">
                            <b>50</b>
                            <p>Chapters</p>
                          </div>
                        </div>

                        <Chip
                          label="Mandatory"
                          className="chip-item"
                          variant="filled"
                          size="medium"
                          color="info"
                        />
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            ),
          },
        ]}
      />
    </Detail>
  );
};

export default DetailStudy;

const Detail = styledComponents.div`
padding: 0;
margin: 0;
position: relative;
margin-bottom: 15vh;
    
    .bg {
      height: 40vh;
      width: 100%;
      object-fit: cover;
    }

    .header {
      display: flex;
      margin-top: -13vh;
      gap: 18px;
      margin-left: 70px;
      margin-bottom: 35px;

      @media only screen and (max-width: 600px) {
        margin-left: 0;
        margin-top: -17vh;
        flex-direction: column;
        gap: 30px;
        align-items: center;
        margin-bottom: 30px;
      }

      .thumbnail {
        background: black;
        height: 200px;
        width: 200px;
        border-radius: 10px;
        object-fit: cover;
      }

      .titleHead {
        width: 100%;
        @media only screen and (max-width: 600px) {
          flex-direction: column;
          display: flex;
        }
        .title {
          .chip {
            display: flex;
            gap: 10px;
            @media only screen and (max-width: 600px) {
              justify-content: center;
            }
          }
          h4 {
            margin-top: 13px;
            font-size: 35px;
            @media only screen and (max-width: 600px) {
              margin-top: 15px;
              font-size: 30px;
              text-align: center;
            }
          }
        }

        .info {
          margin-top: 4vh;
          display: flex;
          gap: 20px;

          @media only screen and (max-width: 600px) {
            justify-content: space-between;
          }

          .teacher {
            display: flex;
            gap: 8px;
            align-items: center;

            .photoTeacher {
              background: black;
              height: 40px;
              width: 40px;
              border-radius: 50%;
              object-fit: cover;
            }

            .nameTeacher {
              display: flex;
              flex-direction: column;

              .label {
                font-size: 12px;
                color: #b7b7b7;
              }

              .name {
                font-size: 18px;
                font-weight: 500;
              }
            }
          }

          .info-num {
            display: flex;
            align-items: center;
            gap: 10px;

            .item {
              display: flex;
              align-items: center;
              gap: 3px;

              span {
                font-size: 16px;
              }
            }
          }
        }
      }
    }

    .titleTabs {
      font-size: 20px;
      margin-bottom: 3vh;
      margin-top: 5vh;
    }

    .listCourse {

      .course {
        background: white;
        box-shadow: 0px 25px 50px rgba(129, 129, 129, 0.1); 
        padding: 18px;
        border-radius: 10px;
        display: flex;
        gap: 10px;

        .thumbnailCourse {
          height: 100px;
          widht: 100px;
          border-radius: 10px;
        }

        .titleCourse {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          
          .infoCourse {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            
            h4 {
              font-size: 18px;

              @media only screen and (max-width: 600px) {
                font-size: 15px;
              }
            }

            .item {
              display: flex;
              gap: 3px;
              align-items: center;
              
              b {
                font-size: 16px;
                font-weight: 800;
              }

              p {
                font-size: 16px;
                color: #686868;
              }
            }
          }
        }
      }
    }

    .buttonHandle {
      position: absolute;
      right: 0;
      margin-top: 15vh;
      display: flex;
      flex-direction: column;
      gap: 10px;

       @media only screen and (max-width: 600px) {
         bottom: 0;
         position: fixed;
         flex-direction: row;
         justify-content: center;
         background: white;
         width: 100%;
         padding: 20px 0 40px 0;
         z-index: 8;
         box-shadow: 0px 25px 50px rgba(129, 129, 129, 0.5); 
         border-radius: 20px 20px 0 0;

         .backButton {
           width: auto;
         }
       }
    }
`;
