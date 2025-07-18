"use client";
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { MdDashboard } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaArrowsSpin, FaUserLarge } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import { FaAngleDown } from "react-icons/fa6";
const { currentUser } = useSelector((state) => state.user);

const drawerWidth = 240;

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const [isClosing, setIsClosing] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  // nav links
  const navItems = [
    {
      id: 1,
      title: "Dashboard",
      href: "/dashboard",
      icon: <MdDashboard />,
    },
    {
      id: 2,
      title: "Order",
      href: "/dashboard/order",
      icon: <FaArrowsSpin />,
      subCat: [],
    },
    {
      id: 3,
      title: "Products",
      href: "/dashboard/products",
      icon: <BsFillBoxSeamFill />,
      subCat: [],
    },
    {
      id: 4,
      title: "Categories",
      href: "/dashboard/categories",
      icon: <BiSolidCategory />,
      subCat: [],
    },
    {
      id: 5,
      title: "User",
      href: "/dashboard/users",
      icon: <FaUserLarge />,
      subCat: [],
    },
    {
      id: 6,
      title: "Rating",
      href: "/dashboard/rating",
      icon: <FaStar />,
      subCat: [],
    },
  ];

  //active route style

  const activeNav = (activePathName) => {
    if (pathname === activePathName) {
      return { color: "#2FB261" };
    } else {
      return { color: "#181818" };
    }
  };

  const drawer = (
    <div>
      <Toolbar>Ceramicandfoodproducts</Toolbar>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{ borderBottom: "1px solid #EAEAEA" }}
            onClick={() => router.push(item.href)}
          >
            <ListItemButton style={activeNav(item.href)}>
              <ListItemIcon
                style={activeNav(item.href)}
                sx={{
                  fontSize: "18px",
                  justifyContent: "center",
                  color: "#273c75",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{ fontSize: "18px", fontWeight: "600" }}
              />
              {item.subCat && <FaAngleDown />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        // PaperProps={{
        //   sx: {
        //     backgroundColor: "pink",
        //     color: "red",
        //   },
        // }}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            position: "static",
            minHeight: "100vh",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </div>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default Sidebar;
