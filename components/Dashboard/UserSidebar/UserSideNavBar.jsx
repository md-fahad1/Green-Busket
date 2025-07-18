import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Toolbar } from "@mui/material";
import { MdDashboard } from "react-icons/md";
import { FaArrowsSpin, FaUserLarge } from "react-icons/fa6";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { FaAngleDown, FaGift, FaStar } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { HandlerContext } from "@/lib/providers/HandlerProvider";
import Link from "next/link";

export default function SideNavBar() {
  const { isToggleOpen, handleDrawerOpen } = useContext(HandlerContext);

  const pathname = usePathname();
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();

  // nav links
  const navItems = [
    // {
    //   id: 1,
    //   title: "Dashboard",
    //   href: "/dashboard",
    //   icon: <MdDashboard />,
    // },
    {
      id: 1,
      title: "My Order",
      href: "/userdashboard/order",
      icon: <FaArrowsSpin />,
      subCat: [],
    },
    {
      id: 2,
      title: "Profile",
      href: `/userdashboard/user/${currentUser.Id}`, // ✅ correct
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
      <Toolbar className="font-bold ">
        <Link href="/" className="text-inherit no-underline">
          Ceramicandfoodproducts
        </Link>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem
            key={item.id}
            disablePadding
            // sx={{ borderBottom: "1px solid #EAEAEA" }}
            className="!border-b dark:border-b-[#3d47514d]"
            onClick={() => router.push(item.href)}
          >
            <ListItemButton style={activeNav(item.href)}>
              <ListItemIcon
                // style={activeNav(item.href)}
                sx={{
                  fontSize: "18px",
                  justifyContent: "center",
                  rowGap: "20px",
                  // color: "#273c75",
                }}
                className={`${
                  pathname === item.href
                    ? "!text-[#2FB261]"
                    : "dark:!text-dark-color !text-secondary"
                }  `}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{ fontSize: "18px", fontWeight: "600" }}
                className={`${
                  pathname === item.href
                    ? ""
                    : "dark:text-dark-color text-secondary"
                }  `}
              />
              {item.subCat && (
                <FaAngleDown
                  className={`${
                    pathname === item.href
                      ? "!text-[#2FB261]"
                      : "dark:!text-dark-color !text-secondary"
                  }  `}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
      <Drawer
        variant="permanent"
        className="hidden lg:block [&_.MuiPaper-root]:dark:bg-dark-bg "
        sx={{
          // display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "calc(100% * 2/ 12)",
          },
        }}
        // open={open}
        // onClose={toggleDrawer(false)}
      >
        {drawer}
      </Drawer>
      <Drawer
        className="[&_.MuiPaper-root]:dark:bg-dark-bg"
        sx={{
          display: { sm: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
          },
        }}
        variant="temporary"
        open={isToggleOpen}
        onClose={() => handleDrawerOpen(false)}
      >
        {drawer}
      </Drawer>
    </div>
  );
}
