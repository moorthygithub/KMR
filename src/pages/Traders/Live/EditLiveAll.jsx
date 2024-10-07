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

const statusOptionsSubcategory = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const EditVendor = () => {
  const [vendor, setVendor] = useState({
    vendor_name: "",
    vendor_mobile: "",
    vendor_email: "",
    vendor_city: "",
    vendor_address: "",
    vendor_category: "",
    vendor_trader: "",
    vendor_no_of_products: "",
    vendor_status: "",
  });

  const [vendorProducts, setVendorProducts] = useState([
    {
      id: "",
      vendor_product_category_sub: "",
      vendor_product: "",
      vendor_product_size: "",
      vendor_product_rate: "",
      vendor_product_status: "",
    },
  ]);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");

    axios
      .get(`${baseURL}/panel-fetch-vendor-all-by-id/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setVendor(res.data.vendor);
        setVendorProducts(res.data.vendorSub);
      });
  }, [navigate]);

  // Fetch categories
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${baseURL}/panel-fetch-category`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCategories(res.data.category);
      });
  }, []);

  useEffect(() => {
    if (vendor.vendor_category) {
      const token = localStorage.getItem("token");
      axios
        .get(`${baseURL}/panel-fetch-sub-category/${vendor.vendor_category}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setSubCategories(res.data.categorySub);
        });
    }
  }, [vendor.vendor_category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendor((prevVendor) => ({ ...prevVendor, [name]: value }));
  };

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProducts = [...vendorProducts];
    updatedProducts[index] = { ...updatedProducts[index], [name]: value };
    setVendorProducts(updatedProducts);
  };
  //all
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = new URLSearchParams(window.location.search).get("id");

    const data = {
      ...vendor,
      vendorProduct_sub_data: vendorProducts,
    };
    try {
      const response = await axios.put(
        `${baseURL}/panel-update-vendor-all/${id}`,
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

  //single
  const handleSubmitSingle = async (e, index) => {
    e.preventDefault();

    const temData = [...vendorProducts];
    console.log("debug", temData[index]);
    let data = {
      vendor_product: temData[index].vendor_product,
      vendor_product_size: temData[index].vendor_product_size,
      vendor_product_rate: temData[index].vendor_product_rate,
      vendor_product_status: temData[index].vendor_product_status,
    };

    console.log("debugnew", data);

    try {
      const response = await axios.put(
        `${baseURL}/panel-update-vendor-live/${temData[index].id}`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data.code, "response");
      if (response.data.code === 200) {
        setLoadings(true);
        toast.success(response.data.msg || "Data inserted successfully", {
          position: "top-right",
        });
        setTimeout(() => {
          setLoadings(false);
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
      setLoadings(false);
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
      <ToastContainer autoClose={3000} />
      <ProfileTitle
        title="Edit Vendors All Live 
"
        backLink="/traders/live"
      />
      <form
        id="addIndiv"
        autoComplete="off"
        style={{
          padding: "5%",
          boxShadow: `rgba(0, 0, 0, 0.25) 0px 54px 55px,
          rgba(0, 0, 0, 0.12) 0px -12px 30px,
          rgba(0, 0, 0, 0.12) 0px 4px 6px,
          rgba(0, 0, 0, 0.17) 0px 12px 13px,
          rgba(0, 0, 0, 0.09) 0px -3px 5px`,
        }}
      >
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <TextField
              required
              label="Vendor"
              name="vendor_name"
              value={vendor.vendor_name}
              disabled
              fullWidth
              margin="normal"
              variant="standard"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid xs={12} md={4}>
            <TextField
              required
              label="Mobile"
              name="vendor_mobile"
              value={vendor.vendor_mobile}
              fullWidth
              margin="normal"
              variant="standard"
              disabled
              onChange={handleInputChange}
            />
          </Grid>
          <Grid xs={12} md={4}>
            <TextField
              required
              type="email"
              label="Email"
              name="vendor_email"
              variant="standard"
              value={vendor.vendor_email}
              fullWidth
              disabled
              margin="normal"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              required
              label="Address"
              name="vendor_address"
              variant="standard"
              value={vendor.vendor_address}
              fullWidth
              margin="normal"
              disabled
              onChange={handleInputChange}
            />
          </Grid>
          <Grid xs={12} md={3}>
            <TextField
              required
              label="City"
              name="vendor_city"
              variant="standard"
              value={vendor.vendor_city}
              fullWidth
              margin="normal"
              disabled
              onChange={handleInputChange}
            />
          </Grid>
          <Grid xs={12} md={3}>
            <TextField
              required
              label="Category"
              name="vendor_category"
              select
              variant="standard"
              value={vendor.vendor_category}
              fullWidth
              margin="normal"
              disabled
              onChange={handleInputChange}
            >
              {categories.map((option) => (
                <MenuItem key={option.id} value={option.category_name}>
                  {option.category_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid xs={12} md={2.5}>
            <TextField
              required
              label="Trader"
              name="vendor_trader"
              value={vendor.vendor_trader}
              disabled
              fullWidth
              margin="normal"
              variant="standard"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid xs={12} md={2.5}>
            <TextField
              required
              label="Status"
              name="vendor_status"
              select
              value={vendor.vendor_status}
              fullWidth
              margin="normal"
              variant="standard"
              disabled
              onChange={handleInputChange}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <hr />
        {vendorProducts.map((product, index) => (
          <Grid item key={index} container spacing={4}>
            <Grid xs={12} md={2}>
              <TextField
                required
                label="Sub Category"
                name="vendor_product_category_sub"
                select
                variant="standard"
                value={product.vendor_product_category_sub}
                fullWidth
                disabled
                margin="normal"
                onChange={(e) => handleProductChange(e, index)}
              >
                {subcategories.map((option) => (
                  <MenuItem key={option.id} value={option.category_sub_name}>
                    {option.category_sub_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} md={2}>
              {" "}
              <TextField
                required
                label="Product Name"
                name="vendor_product"
                value={product.vendor_product}
                fullWidth
                margin="normal"
                variant="standard"
                onChange={(e) => handleProductChange(e, index)}
              />
            </Grid>
            <Grid xs={12} md={2}>
              {" "}
              <TextField
                required
                label="Size"
                name="vendor_product_size"
                value={product.vendor_product_size}
                fullWidth
                margin="normal"
                variant="standard"
                onChange={(e) => handleProductChange(e, index)}
              />
            </Grid>
            <Grid sm={12} md={2}>
              {" "}
              <TextField
                required
                label="Rate"
                name="vendor_product_rate"
                value={product.vendor_product_rate}
                fullWidth
                margin="normal"
                variant="standard"
                onChange={(e) => handleProductChange(e, index)}
              />
            </Grid>
            <Grid xs={12} md={2}>
              <TextField
                required
                label="Status"
                name="vendor_product_status"
                select
                value={product.vendor_product_status}
                fullWidth
                margin="normal"
                variant="standard"
                onChange={(e) => handleProductChange(e, index)}
              >
                {statusOptionsSubcategory.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              xs={12}
              md={2}
              sx={{ textAlign: "center", marginTop: "25px" }}
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={(e) => handleSubmitSingle(e, index)}
              >
                {loadings ? "Updating..." : "Update"}
              </Button>{" "}
            </Grid>
          </Grid>
        ))}
        <Grid xs={12} sm={1} sx={{ textAlign: "center", padding: "25px" }}>
          <Button
            // type="submit"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            {loading ? "Updating All..." : "Update ALL"}
          </Button>
          <Button
            color="secondary"
            variant="contained"
            sx={{ marginLeft: 2 }}
            a
            onClick={() => {
              navigate("/traders/live");
            }}
          >
            Back
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default EditVendor;
