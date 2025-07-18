import axios from "axios";
import { useEffect, useState } from "react";

const useProductAttributes = () => {
  const [pd, setPd] = useState({});
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search/5`
        );
        setPd(res.data);
        //console.log(res.data);

        const getAttribute = res.data?.json_attribute?.attributes;

        const newAttributes = [];
        for (let property in getAttribute) {
          newAttributes.push({ [property]: getAttribute[property] });
        }
        setAttributes(newAttributes);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProduct();
  }, []);

  return { attributes };
};

export default useProductAttributes;
