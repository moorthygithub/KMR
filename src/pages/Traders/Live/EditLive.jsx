import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../../api/api";
import Grid from "@mui/material/Unstable_Grid2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileTitle from "../../common/ProfileTitle";
import { grey } from "@mui/material/colors";

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const EditVendor = () => {
  const [vendor, setVendor] = useState({
    vendor_product_category_sub: "",
    vendor_product: "",
    vendor_product_size: "",
    vendor_product_rate: "",
    vendor_product_status: "",
  });

  const [subcategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");

    axios
      .get(`${baseURL}/panel-fetch-vendor-live-by-id/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setVendor(res.data.vendor);
        // setVendorProducts(res.data.vendorSub);
      });
  }, [navigate]);

  const InputChange = (e) => {
    setVendor({
      ...vendor,
      [e.target.name]: e.target.value,
    });
  };
  console.log(InputChange);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = new URLSearchParams(window.location.search).get("id");

    let data = {
      vendor_product: vendor.vendor_product,
      vendor_product_size: vendor.vendor_product_size,
      vendor_product_rate: vendor.vendor_product_rate,
      vendor_product_status: vendor.vendor_product_status,
    };
    try {
      const response = await axios.put(
        `${baseURL}/panel-update-vendor-live/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data.code, "response");
      if (response.data.code === 200) {
        setLoading(true);
        toast.success(response.data.msg || "Data inserted successfully", {
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/traders/live");
        }, 2000);
      } else if (response.data.code === 403) {
        toast.error(response.data.msg || "Duplicate Entry.", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "An error occurred", {
        position: "top-right",
      });
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
      <ProfileTitle title="Edit Vendor Live" backLink="/traders/live" />

      <Box
        className="textfields-wrapper"
        sx={{
          // marginTop: "100px",
          padding: "5%",
          boxShadow: `rgba(0, 0, 0, 0.25) 0px 54px 55px,
          rgba(0, 0, 0, 0.12) 0px -12px 30px,
          rgba(0, 0, 0, 0.12) 0px 4px 6px,
          rgba(0, 0, 0, 0.17) 0px 12px 13px,
          rgba(0, 0, 0, 0.09) 0px -3px 5px`,
        }}
      >
        <ToastContainer autoClose={3000} />

        <form id="addIndiv" autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid sm={12} md={4}>
              <TextField
                required
                label="Sub Category"
                name="vendor_product_category_sub"
                value={vendor.vendor_product_category_sub}
                disabled
                fullWidth
                margin="normal"
                variant="standard"
                onChange={InputChange}
              />
            </Grid>
            <Grid sm={12} md={4}>
              <TextField
                required
                label="Product"
                name="vendor_product"
                value={vendor.vendor_product}
                fullWidth
                margin="normal"
                variant="standard"
                onChange={InputChange}
              />
            </Grid>
            <Grid sm={12} md={4}>
              <TextField
                required
                label="Size"
                autoComplete="Name"
                name="vendor_product_size"
                value={vendor.vendor_product_size}
                variant="standard"
                fullWidth
                margin="normal"
                onChange={InputChange}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <TextField
                required
                label="Rate"
                autoComplete="Name"
                type="number"
                inputProps={{ min: 0 }}
                name="vendor_product_rate"
                value={vendor.vendor_product_rate}
                variant="standard"
                fullWidth
                margin="normal"
                onChange={InputChange}
              />
            </Grid>
            <Grid sm={12} md={4}>
              <TextField
                required
                label="Status"
                name="vendor_product_status"
                select
                value={vendor.vendor_product_status}
                fullWidth
                margin="normal"
                variant="standard"
                onChange={InputChange}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid xs={12} sm={1} sx={{ textAlign: "center", padding: "25px" }}>
            <Button type="submit" color="primary" variant="contained">
              {loading ? "Updating..." : "Update"}
            </Button>
            <Button
              color="secondary"
              variant="contained"
              sx={{ marginLeft: 2 }}
              onClick={() => {
                navigate("/traders/live");
              }}
            >
              Back
            </Button>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default EditVendor;
