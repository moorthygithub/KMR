import React, { useState } from "react";
import {
  TextField,
  Button as MUIButton,
  Box,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { baseURL } from "../../../api/api";
import { ArrowBack } from "@mui/icons-material";

const AddBanner = () => {
  const navigate = useNavigate();

  const [banner, setBanner] = useState({
    slider_url: "",
    slider_images: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onInputChange = (e) => {
    setBanner({
      ...banner,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("slider_url", banner.slider_url);
    if (selectedFile) {
      formData.append("slider_images", selectedFile);
    }

    const isFormValid = document
      .getElementById("addbannerform")
      .checkValidity();
    document.getElementById("addbannerform").reportValidity();

    if (isFormValid) {
      setIsButtonDisabled(true);

      axios({
        url: `${baseURL}/panel-create-slider`,
        method: "POST",
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (res.data.code === 200) {
            setLoading(true);
            toast.success(res.data.msg || "Data inserted successfully", {
              position: "top-right",
            });
            setTimeout(() => {
              navigate("/banner");
            }, 2000);
          } else {
            toast.error(res.data.msg || "Duplicate Entry", {
              position: "top-right",
            });
            setIsButtonDisabled(false);
          }
        })
        .catch((err) => {
          toast.error(err.response?.data?.msg || "An error occurred", {
            position: "top-right",
          });
          setIsButtonDisabled(false);
          setLoading(false);
        });
    }
  };

  return (
    <Box
      className="data-table-wrapper"
      sx={{
        bgcolor: grey[100],
        marginTop: "100px",
        padding: "16px",
        marginLeft: "0px",
        borderRadius: "15px",
        height: "80vh",
      }}
    >
      {" "}
      <Box display="flex" alignItems="center" mb={2}>
        <Link to="/banner">
          <IconButton aria-label="Back">
            <ArrowBack />
          </IconButton>
        </Link>
        <Typography variant="h6" sx={{ marginLeft: "8px" }}>
          Create Banner
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "5%",
          boxShadow: `rgba(0, 0, 0, 0.25) 0px 54px 55px,
              rgba(0, 0, 0, 0.12) 0px -12px 30px,
              rgba(0, 0, 0, 0.12) 0px 4px 6px,
              rgba(0, 0, 0, 0.17) 0px 12px 13px,
              rgba(0, 0, 0, 0.09) 0px -3px 5px`,
        }}
      >
        <ToastContainer autoClose={3000} />

        <form id="addbannerform" autoComplete="off" onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Url"
                name="slider_url"
                variant="standard"
                value={banner.slider_url}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="file"
                InputLabelProps={{ shrink: true }}
                label="Image"
                variant="standard"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                accept=".jpg, .png"
              />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="center">
              <MUIButton
                type="submit"
                variant="contained"
                color="primary"
                disabled={isButtonDisabled}
                sx={{ marginRight: 2 }}
              >
                {loading ? "Submitting..." : "Submit"}
              </MUIButton>

              <MUIButton
                component={Link}
                to="/banner"
                variant="contained"
                color="secondary"
              >
                Back
              </MUIButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default AddBanner;
