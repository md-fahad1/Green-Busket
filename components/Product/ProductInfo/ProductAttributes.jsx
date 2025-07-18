"use client";
import useProductAttributes from "@/lib/features/hooks/useProductAttributes";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const ProductAttributes = ({ inputAttribute, setInputAttribute }) => {
  //useProducthook
  const { attributes } = useProductAttributes();

  let pdInputAttributes = {};
  const onchange = (attr) => {
    // set to a state attribute input value;

    const keys = Object.keys(attr);
    const values = Object.values(attr);

    pdInputAttributes = { ...pdInputAttributes, [keys]: { [values]: 1 } };
    setInputAttribute({ ...inputAttribute, ...pdInputAttributes });
  };
  return (
    <div>
      {attributes.map((attribute, idx) => (
        <div key={idx}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              {Object.keys(attribute)[0]}
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              {Object.keys(Object.values(attribute)[0]).map((attr, idx) => (
                <FormControlLabel
                  onChange={(e) =>
                    onchange({
                      [Object.keys(attribute)[0]]: e.target.value,
                    })
                  }
                  key={idx}
                  value={attr}
                  control={<Radio />}
                  label={attr}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      ))}
    </div>
  );
};

export default ProductAttributes;
