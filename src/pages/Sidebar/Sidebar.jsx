import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Collapse,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import Dashboard from "../../Icons/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CustomListItem from "./CustomListItem";
import MasterSvg from "../../Icons/Master";
import Traders from "../../Icons/Traders";
import mainLogo from "../../Icons/Mainlogo.jpg";
import CircleIcon from "@mui/icons-material/Circle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
// import Header from "../Navabar/Navbar";
import "./Sidebar.css";
<Box
  component="img"
  src={mainLogo}
  alt="Main Logo"
  sx={{ width: "100%", maxWidth: "300px" }}
/>;

const Sidebar = ({
  isCollapsed,
  handleDrawerToggle,
  openDrawer,
  setIsCollapsed,
  setOpenMasterMenu,
  openMasterMenu,
  openTradersMenu,
  setOpenTradersMenu,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery((theme) =>
    theme.breakpoints.between("md")
  );

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    if (isSmallScreen) {
      handleDrawerToggle();
    }
    if (!isSmallScreen && isMediumScreen) {
      setIsCollapsed((prev) => !prev);
    }
  };

  const toggleMasterMenu = () => {
    setOpenMasterMenu((prev) => !prev);
    setOpenTradersMenu(false);
  };

  const toggleTradersMenu = () => {
    setOpenTradersMenu((prev) => !prev);
    setOpenMasterMenu(false);
  };

  const handleDrawerForMaster = (e) => {
    e.stopPropagation();
    // handleDrawerToggle();
    setOpenMasterMenu(false);
  };

  const handleDrawerForTrade = (e) => {
    e.stopPropagation();
    // handleDrawerToggle();
    setOpenTradersMenu(false);
  };

  const hadleDashbord = () => {
    // handleDrawerToggle();
    setOpenTradersMenu(false);
    setOpenMasterMenu(false);
    handleListItemClick(0);
  };
  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"}
      open={isSmallScreen ? openDrawer : true}
      onClose={isSmallScreen ? handleDrawerToggle : undefined}
      sx={{
        width: isSmallScreen ? 260 : isCollapsed ? 0 : 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isSmallScreen ? 260 : isCollapsed ? 0 : 260,
          boxSizing: "border-box",
          overflowX: "hidden",
          marginTop: isSmallScreen ? 0 : "104px",
          border: "none",
          transition: "width 0.3s ease",
          boxShadow: "none",
          // padding: "16px",
          backgroundColor: "aliceblue",
        },
      }}
    >
      <List>
        <Box
          component="img"
          src={mainLogo}
          alt="Main Logo"
          sx={{
            display: isSmallScreen ? "flex" : "none",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            mb: 2,

            maxWidth: "8.5rem",
          }}
        ></Box>

        <CustomListItem
          button
          isSelected={selectedIndex === 0}
          onClick={hadleDashbord}
          component={NavLink}
          to="/dashboard"
          isCollapsed={isCollapsed}
          style={{ maxWidth: "230px", marginLeft: "10px" }}
        >
          <ListItemIcon>
            <DashboardIcon sx={{ color: "#5e35b1" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </CustomListItem>

        <CustomListItem
          style={{ cursor: "pointer", maxWidth: "230px", marginLeft: "10px" }}
          onClick={toggleMasterMenu}
          isSelected={selectedIndex === 1}
        >
          <ListItemIcon onClick={handleDrawerForMaster}>
            <PersonIcon sx={{ color: "#5e35b1" }} />
          </ListItemIcon>
          <ListItemText primary="Master" />
          {openMasterMenu ? <ExpandLess /> : <ExpandMore />}
        </CustomListItem>

        <Collapse in={openMasterMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Box
              sx={{
                maxWidth: "230px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ml: "3.8rem",
              }}
            >
              <CustomListItem
                button
                onClick={() => handleListItemClick(1)}
                // isSelected={selectedIndex === 1}
                component={NavLink}
                to="/register/category"
                style={{
                  maxWidth: "230px",
                  marginLeft: "10px",
                  backgroundColor: "transparent",
                }}
              >
                <CircleIcon sx={{ fontSize: "10px", mr: "5px" }} />

                <ListItemText primary="Category" />
              </CustomListItem>
            </Box>
            <Box
              sx={{
                maxWidth: "230px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ml: "3.8rem",
              }}
            >
              <CustomListItem
                button
                onClick={() => handleListItemClick(2)}
                component={NavLink}
                to="/subcategory"
                sx={{ pl: 4 }}
                // isSelected={selectedIndex === 2}
                style={{
                  maxWidth: "230px",
                  marginLeft: "10px",
                  backgroundColor: "transparent",
                }}
              >
                <CircleIcon sx={{ fontSize: "10px", mr: "5px" }} />

                <ListItemText primary="SubCategory" />
              </CustomListItem>
            </Box>

            <Box
              sx={{
                maxWidth: "230px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ml: "3.8rem",
              }}
            >
              <CustomListItem
                button
                onClick={() => handleListItemClick(3)}
                // isSelected={selectedIndex === 3}
                component={NavLink}
                to="/news"
                style={{
                  maxWidth: "230px",
                  marginLeft: "10px",
                  backgroundColor: "transparent",
                }}
              >
                <CircleIcon sx={{ fontSize: "10px", mr: "5px" }} />

                <ListItemText primary="News" />
              </CustomListItem>
            </Box>

            <Box
              sx={{
                maxWidth: "230px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ml: "3.8rem",
              }}
            >
              <CustomListItem
                button
                onClick={() => handleListItemClick(4)}
                // isSelected={selectedIndex === 4}
                component={NavLink}
                to="/vendor"
                style={{
                  maxWidth: "230px",
                  marginLeft: "10px",
                  backgroundColor: "transparent",
                }}
              >
                <CircleIcon sx={{ fontSize: "10px", mr: "5px" }} />

                <ListItemText primary="Vendor" />
              </CustomListItem>
            </Box>

            <Box
              sx={{
                maxWidth: "230px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ml: "3.8rem",
              }}
            >
              <CustomListItem
                button
                onClick={() => handleListItemClick(5)}
                // isSelected={selectedIndex === 5}
                component={NavLink}
                to="/vendoruser"
                style={{
                  maxWidth: "230px",
                  marginLeft: "10px",
                  backgroundColor: "transparent",
                }}
              >
                <CircleIcon sx={{ fontSize: "10px", mr: "5px" }} />

                <ListItemText primary="VendorUser" />
              </CustomListItem>
            </Box>
            <Box
              sx={{
                maxWidth: "230px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ml: "3.8rem",
              }}
            >
              <CustomListItem
                button
                onClick={() => handleListItemClick(6)}
                component={NavLink}
                // isSelected={selectedIndex === 6}
                to="/banner"
                style={{
                  maxWidth: "230px",
                  marginLeft: "10px",
                  backgroundColor: "transparent",
                }}
              >
                <CircleIcon sx={{ fontSize: "10px", mr: "5px" }} />

                <ListItemText primary="Banner" />
              </CustomListItem>
            </Box>
          </List>
        </Collapse>

        {/* Traders Menu */}
        <CustomListItem
          style={{ cursor: "pointer", maxWidth: "230px", marginLeft: "10px" }}
          onClick={toggleTradersMenu}
          isSelected={selectedIndex === 7}
          // onClick={() => handleListItemClick(7)}
        >
          <ListItemIcon onClick={handleDrawerForTrade}>
            <ReceiptIcon sx={{ color: "#5e35b1" }} />
          </ListItemIcon>
          <ListItemText primary="Traders" />
          {openTradersMenu ? <ExpandLess /> : <ExpandMore />}
        </CustomListItem>

        <Collapse
          in={openTradersMenu}
          timeout="auto"
          unmountOnExit
          sx={{ ml: "4px", maxWidth: "230px", marginLeft: "15px" }}
        >
          <List component="div" disablePadding>
            <Box
              sx={{
                maxWidth: "230px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ml: "3.8rem",
              }}
            >
              <CustomListItem
                button
                component={NavLink}
                to="/traders/live"
                onClick={() => handleListItemClick(7)}
                // isSelected={selectedIndex === 7}
                // style={{
                //   maxWidth: "230px",
                //   display: "flex",
                //   justifyContent: "center",
                // }}
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <CircleIcon sx={{ fontSize: "10px", mr: "5px" }} />
                <ListItemText primary="Live" />
                {/* sx={{ ml: "3.8rem" }} */}
              </CustomListItem>
            </Box>

            <Box
              sx={{
                maxWidth: "230px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ml: "3.8rem",
              }}
            >
              <CustomListItem
                button
                component={NavLink}
                to="/traders/rates"
                style={{ maxWidth: "230px", backgroundColor: "transparent" }}
                onClick={() => handleListItemClick(8)}
                // isSelected={selectedIndex === 8}
              >
                <CircleIcon sx={{ fontSize: "10px", mr: "5px" }} />

                <ListItemText primary="Rates" />
              </CustomListItem>
            </Box>
            <Box
              sx={{
                maxWidth: "230px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ml: "3.8rem",
                // backgroundColor: "transparent",
              }}
            >
              <CustomListItem
                button
                component={NavLink}
                to="/traders/spotrates"
                style={{ maxWidth: "230px", backgroundColor: "transparent" }}
                onClick={() => handleListItemClick(9)}
                // isSelected={selectedIndex === 9}
              >
                <CircleIcon sx={{ fontSize: "10px", mr: "5px" }} />

                <ListItemText primary="Spot Rates" />
              </CustomListItem>
            </Box>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
