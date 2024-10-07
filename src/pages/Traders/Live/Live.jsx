import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  Tooltip,
  IconButton,
  Typography,
  Box
} from "@mui/material";
import { grey } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { baseURL } from "../../../api/api";
import axios from "axios";
import ProfileTitle from "../../common/ProfileTitle";
import Moment from "moment";

const TradersLive = () => {
  const [loader, setLoader] = useState(true);
  const [LiveList, setLiveList] = useState([]);
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
    "Vendor",
    "Sub Category",
    "Product",
    "Size",
    "Rate",
    "Date/Time",
    "Status",
    {
      name: "Actions",
      options: {
        filter: false,
        print: false,
        download: false,
        customBodyRender: (id) => (
          <>
            <Tooltip title="Edit" placement="top">
              <IconButton
                aria-label="Edit"
                onClick={() => navigate(`/traders/live/edit?id=${id}`)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit All" placement="top">
              <IconButton
                aria-label="Edit All"
                onClick={() => navigate(`/traders/live/editall?id=${id}`)}
              >
                <BorderColorIcon />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    },

    //edit alll
    // {
    //   name: "Edit All",
    //   options: {
    //     filter: false,
    //     print: false,
    //     download: false,
    //     customBodyRender: (id) => (
    //       <Tooltip title="Edit All" placement="top">
    //         <IconButton
    //           aria-label="Edit All"
    //           onClick={() => navigate(`/traders/live/editall?id=${id}`)}
    //         >
    //           <EditIcon />
    //         </IconButton>
    //       </Tooltip>
    //     ),
    //   },
    // },
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
    if (!token) {
      console.error("No token found, redirecting to login.");
      return;
    }

    try {
      const response = await axios.get(
        `${baseURL}/panel-fetch-vendor-live-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.vendor);
      const tempRows = response.data.vendor.map((item, index) => {
        const formattedDate =
          item.vendor_product_updated_date <= 0
            ? Moment(item.vendor_product_created_date).format("DD-MM-YYYY") +
              " / " +
              item.vendor_product_created_time
            : Moment(item.vendor_product_updated_date).format("DD-MM-YYYY") +
              " / " +
              item.vendor_product_updated_time;

        return [
          index + 1,
          item.vendor_name,
          item.vendor_product_category_sub,
          item.vendor_product,
          item.vendor_product_size,
          item.vendor_product_rate,
          formattedDate,
          item.vendor_product_status,
          item.id,
          item.id,
        ];
      });
      setLiveList(tempRows);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
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
  >      {loader ? (
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
          <ProfileTitle title="Vendors Live List" backLink="-1" />
          <MUIDataTable
            title={"Vendors Live List"}
            data={LiveList}
            columns={columnData}
            options={options}
          />
        </>
      )}
    </Box>
  );
};

export default TradersLive;
