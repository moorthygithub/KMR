import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Link, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

import {
  Button,
  CircularProgress,
  Tooltip,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { baseURL } from "../../../api/api";
import axios from "axios";
import ProfileTitle from "../../common/ProfileTitle";

const NewListBanner = () => {
  const [loader, setLoader] = useState(true);
  const [bannerData, setBannerData] = useState([]);
  const navigate = useNavigate();

  const columnData = [
    {
      name: "#",
      options: {
        filter: false,
        print: false,
        download: false,
      },
    },
    {
      name: "Images",
      options: {
        filter: false,
        print: false,
        download: false,
        customBodyRender: (imageUrl) => (
          <img
            src={
              imageUrl
                ? `https://kmrlive.in/storage/app/public/slider_images/${imageUrl}`
                : "https://kmrlive.in/storage/app/public/no_image.jpg"
            }
            alt="Category"
            style={{ width: "40px", height: "40px" }}
          />
        ),
      },
    },
    "Url",
    "Status",
    {
      name: "Actions",
      options: {
        filter: false,
        print: false,
        download: false,
        customBodyRender: (id) => (
          <Tooltip title="Edit" placement="top">
            <IconButton
              aria-label="Edit"
              onClick={() => navigate(`/banner/edit?id=${id}`)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    },
  ];

  const options = {
    print: false,
    download: false,
    filterType: "dropdown",
    selectableRows: "none",
    textLabels: {
      body: {
        noMatch: (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              width: "100%",
              marginTop: "20px",
            }}
          >
            Sorry, no data available
          </Typography>
        ),
      },
    },
  };

  const getData = async () => {
    const token = localStorage.getItem("token");
    // if (!token) {
    //   console.error("No token found, redirecting to login.");
    //   return;
    // }

    try {
      const response = await axios.get(`${baseURL}/panel-fetch-slider-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data, "Full API Response");
      if (
        response.data &&
        response.data.slider &&
        Array.isArray(response.data.slider)
      ) {
        const tempRows = response.data.slider.map((item, index) => [
          index + 1,
          item.slider_images,
          item.slider_url,
          item.slider_status,
          item.id,
        ]);
        setBannerData(tempRows);
      }
      setBannerData(tempRows);
    } catch (error) {
      console.error("Error fetching data:");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      className="data-table-wrapper"
      sx={{
        bgcolor: grey[100],
        marginTop: "100px",
        padding: "16px",
        marginLeft: "0px",
        borderRadius: "15px",
        maxHeight: "max-content",
      }}
    >
      {" "}
      {loader ? (
        <CircularProgress
          disableShrink
          style={{
            marginLeft: "600px",
            marginTop: "300px",
            marginBottom: "300px",
          }}
          color="secondary"
        />
      ) : (
        <>
          <ProfileTitle
            title="Banner List"
            backLink="-1"
            buttonLabel="+ Add Banner"
            buttonLink="/banner/add"
          />

          <MUIDataTable
            title={"Banner List"}
            data={bannerData}
            columns={columnData}
            options={options}
          />
        </>
      )}
    </Box>
  );
};

export default NewListBanner;
