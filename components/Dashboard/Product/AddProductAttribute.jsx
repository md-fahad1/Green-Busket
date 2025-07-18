"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { MdAddCircleOutline } from "react-icons/md";
import { FiMinusCircle } from "react-icons/fi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddProductAttribute = ({ setAttributes, quantity }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rows, setRows] = useState([
    { attribute: "", name: [""], value: [""] },
  ]);
  const [quantityError, setQuantityError] = useState({});
  const [inputQuantity, setInputQuantity] = useState(0);

  // console.log(rows, quantity);

  const handleAddRow = () => {
    setQuantityError({});
    setRows([...rows, { attribute: "", name: [""], value: [""] }]);
  };

  const handleChangeValue = (e, rowIdx, subRowIdx) => {
    const { name, value } = e.target;
    const newRow = [...rows];

    if (name === "attribute") {
      newRow[rowIdx][name] = value;
    } else if (name === "name") {
      newRow[rowIdx].name[subRowIdx] = value;
    } else {
      newRow[rowIdx].value[subRowIdx] = parseInt(value);
      const rowQuantities = rows[rowIdx].value;
      const rowQuantity = rowQuantities.reduce((acc, cur) => {
        return (acc = acc + cur);
      }, 0);
      setInputQuantity(rowQuantity);
    }
    setRows([...newRow]);
  };

  const handleSave = () => {
    // console.log(quantity, inputQuantity);
    if (parseInt(quantity) !== inputQuantity) {
      setQuantityError({
        message: "quantity doesn't matched",
        error: true,
      });
      return;
    }
    setQuantityError({});

    const result = rows.reduce((acc, cur) => {
      const curAttribute = cur.attribute; //current attributes
      const names = cur.name; //current names
      const values = cur.value; //current values
      const attribute = {};
      names.forEach((name, idx) => {
        if (values[idx] !== "") {
          attribute[name] = values[idx];
        }
      });
      acc[curAttribute] = attribute;
      setOpen(false);
      return acc;
    }, {});

    setAttributes(result);
  };

  const handleAddMoreField = (rowIdx) => {
    const rowQuantities = rows[rowIdx].value;
    const rowQuantity = rowQuantities.reduce((acc, cur) => {
      return (acc = acc + cur);
    }, 0);
    setInputQuantity(rowQuantity);
    if (parseInt(quantity) <= rowQuantity) {
      setQuantityError({
        message: "Not allow over quantity items",
        error: true,
      });
      return;
    }

    setQuantityError({});

    const newRow = [...rows];
    newRow[rowIdx]?.name.push("");
    newRow[rowIdx]?.value.push("");
    setRows([...newRow]);
  };

  const handleRemoveField = (rowIdx) => {
    const newRow = [...rows];
    newRow.pop();
    setRows([...newRow]);
  };

  const handleRemoveSubField = (rowIdx, subRowIdx) => {
    const newRow = [...rows];

    if (subRowIdx === 0) {
      return;
    } else {
      newRow[rowIdx]?.name.pop();
      newRow[rowIdx]?.value.pop();
      setRows([...newRow]);
    }
  };

  return (
    <div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="rounded"
        >
          <Box sx={style} className="space-y-4 max-h-screen overflow-auto">
            <h3 className="font-oswald font-bold text-dash-primary text-xl">
              Product Attribute
            </h3>
            <div className=" space-y-4">
              {rows.map((row, rowIdx) => (
                <div key={rowIdx}>
                  <div className="flex gap-3 ">
                    <div className="relative">
                      <TextField
                        onChange={(e) => handleChangeValue(e, rowIdx)}
                        name="attribute"
                        value={row.attribute}
                        size="small"
                        sx={{
                          "& .MuiInputBase-input": {
                            paddingY: "4px",
                          },
                        }}
                        required
                      />
                      {rows.length - 1 === rowIdx && (
                        <div className="absolute flex flex-col -left-5 top-[6px]">
                          {rowIdx > 0 && (
                            <button onClick={() => handleRemoveField(rowIdx)}>
                              <FiMinusCircle className=" text-red-500 " />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-1">
                      <div className="space-y-2">
                        {row.name.map((subRow, subRowIdx) => (
                          <div key={subRowIdx} className="flex gap-1 relative">
                            <TextField
                              onChange={(e) =>
                                handleChangeValue(e, rowIdx, subRowIdx)
                              }
                              name="name"
                              value={subRow}
                              size="small"
                              sx={{
                                "& .MuiInputBase-input": {
                                  paddingY: "4px",
                                },
                              }}
                              required
                            />
                            <TextField
                              onChange={(e) =>
                                handleChangeValue(e, rowIdx, subRowIdx)
                              }
                              name="value"
                              size="small"
                              value={
                                isNaN(row.value[subRowIdx])
                                  ? ""
                                  : row.value[subRowIdx]
                              }
                              sx={{
                                "& .MuiInputBase-input": {
                                  paddingY: "4px",
                                },
                              }}
                              required
                            />

                            {row.name.length - 1 === subRowIdx && (
                              <div className="absolute flex flex-col -right-5 top-1/2 -translate-y-1/2">
                                {subRowIdx > 0 && (
                                  <button
                                    onClick={() =>
                                      handleRemoveSubField(rowIdx, subRowIdx)
                                    }
                                  >
                                    <FiMinusCircle className=" text-red-500 " />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleAddMoreField(rowIdx)}
                                >
                                  <MdAddCircleOutline className=" text-dash-primary" />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                        <span className="text-red-500">
                          {quantityError.message}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={handleAddRow}
              variant="contained"
              style={{
                backgroundColor: "#2FB261",
                marginTop: "8px",
                padding: "2px 8px",
              }}
              className=" text-white"
            >
              New Attribute
            </Button>
            <div className="border-t flex justify-between">
              <Button
                onClick={handleClose}
                variant="contained"
                style={{ backgroundColor: "#2FB261", marginTop: "8px" }}
                type="submit"
                className=" text-white"
              >
                Close
              </Button>
              <Button
                onClick={handleSave}
                variant="contained"
                style={{ backgroundColor: "#2FB261", marginTop: "8px" }}
                type="submit"
                className=" text-white"
              >
                Save
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{ backgroundColor: "#2FB261" }}
        className=" text-white"
      >
        Add Product Attribute
      </Button>
    </div>
  );
};

export default AddProductAttribute;
