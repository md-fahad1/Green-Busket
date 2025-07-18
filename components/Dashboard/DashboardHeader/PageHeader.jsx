import { Button } from "@mui/material";

const PageHeader = ({ title, href, btnName }) => {
  return (
    <div className="flex justify-between items-center px-6 ">
      <h3 className="text-xl font-bold text-secondary">{title}</h3>
      <Button
        variant="contained"
        style={{ backgroundColor: "#2FB261" }}
        href={href}
        className=" text-white"
      >
        {btnName}
      </Button>
    </div>
  );
};

export default PageHeader;
