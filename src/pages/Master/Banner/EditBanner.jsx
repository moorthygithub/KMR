import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, MenuItem, Grid, Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { baseURL } from "../../../api/api";
import "react-toastify/dist/ReactToastify.css";
import ProfileTitle from "../../common/ProfileTitle";
import { grey } from "@mui/material/colors";

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [banner, setBanner] = useState({
    slider_url: "",
    slider_images: "",
    slider_status: "",
  });
  //   const [selectedFile, setSelectedFile] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/panel-fetch-slider-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBanner(response.data.slider);
        console.log("debug", response.data.slider);
      } catch (error) {
        console.error("Error fetching banner data:", error);
        toast.error("Failed to fetch banner data.");
      }
    };

    fetchBanner();
  }, [id]);

  const onInputChange = (e) => {
    setBanner({
      ...banner,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("slider_url", banner.slider_url);
    data.append("slider_status", banner.slider_status);
    data.append("slider_images", banner.slider_images);
    console.log(data, "formData");

    try {
      setIsButtonDisabled(true);
      setLoading(true);
      const response = await axios.post(
        `${baseURL}/panel-update-slider/${id}?_method=PUT`,

        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Response data:", response.data);
      if (response.data.code == 200) {
        toast.success(response.data.msg || "Data updated successfully", {
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/banner");
        }, 2000);
      } else {
        toast.error(response.data.msg || "Duplicate Entry", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating banner:", error);
      toast.error("Failed to update banner.");
    } finally {
      setIsButtonDisabled(false);
      setLoading(false);
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
      <ProfileTitle title="Edit Banner" backLink="/banner" />
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

        <form autoComplete="off" onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Banner Url"
                name="slider_url"
                value={banner.slider_url}
                onChange={onInputChange}
                variant="standard"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="file"
                InputLabelProps={{ shrink: true }}
                label="Image"
                name="slider_images"
                onChange={onInputChange}
                variant="standard"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                select
                label="Status"
                name="slider_status"
                value={banner.slider_status}
                onChange={onInputChange}
                variant="standard"
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" gap={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isButtonDisabled || loading}
                >
                  {loading ? "Updating..." : "Update"}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/banner")}
                >
                  Back
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Edit;
