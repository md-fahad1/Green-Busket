"use client";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import FeatureContainer from "./FeatureContainer";

const FeaturesTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    { id: 1, label: "Men's Wear" },
    { id: 2, label: "Women's Wear" },
    { id: 3, label: "Kids' Wear" },
    { id: 4, label: "Accessories" },
  ];

  return (
    <div className="flex justify-center items-center container mx-auto mt-12">
      <Box sx={{ width: "100%", bgcolor: "background.paper", marginX: "auto" }}>
        {/* <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          // centered={true}
          className="w-full md:w-[70%] lg:w-[50%] mx-auto "
          sx={{
            "& .MuiTabs-flexContainer": { justifyContent: "center" },
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.id} label={tab.label} />
          ))}
        </Tabs> */}
        {value === 1 && <FeatureContainer />}
        {value === 0 && <FeatureContainer />}
        {value === 2 && <FeatureContainer />}
        {value === 3 && <FeatureContainer />}
      </Box>
    </div>
  );
};

export default FeaturesTabs;
