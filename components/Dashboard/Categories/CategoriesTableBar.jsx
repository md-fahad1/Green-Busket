import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";

import TableSearch from "../common/TableSearch";

const CategoriesTableBar = () => {
  const [showCountItems, setShowCountItems] = useState("");

  const showCountFilter = (event) => {
    setShowCountItems(event.target.value);
  };

  const handleCategoriesSearch = (event) => {};
  return (
    <div className="flex justify-between gap-6 items-center px-6 py-1 border-b">
      <div className="flex">
        <FormControl sx={{ m: 1 }} size="small">
          <Select
            className="text-white text-lg appearance-none font-medium outline-0 border-0 rounded-lg "
            value={showCountItems}
            onChange={showCountFilter}
            sx={{
              ".MuiSvgIcon-root ": {
                fill: "",
              },
              "& .MuiSelect-select": {
                paddingRight: 2,
                paddingLeft: 2,
                paddingTop: 0.5,
                paddingBottom: 0.5,
              },
            }}
            displayEmpty
          >
            <MenuItem value="">10</MenuItem>

            <MenuItem value={"20"} className="font-medium">
              20
            </MenuItem>
            <MenuItem value={"30"} className="font-medium">
              30
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <TableSearch searchHandler={handleCategoriesSearch} />
      </div>
    </div>
  );
};

export default CategoriesTableBar;
