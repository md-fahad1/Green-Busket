"use client";

import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      {
        color: [],
      },
      { background: [] },
    ],
    [{ size: [] }],

    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      { script: "super" },
      { script: "sub" },
      { align: [] },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
  "align",
  "direction",
  "color",
  "background",
  "script",
  "super",
  "sub",
];

const AddProductDesc = ({
  description,
  setDescription,
  error,
  setFormError,
}) => {
  const handleDescription = (desc) => {
    setDescription(desc);
    setFormError({ ...error, description: "" });
  };

  return (
    <div>
      <ReactQuill
        className="h-[300px] mb-32 lg:mb-16"
        theme="snow"
        value={description}
        onChange={handleDescription}
        modules={modules}
        formats={formats}
      />
      {error?.description && (
        <span className="text-red-500 -mt-16">{error.description}</span>
      )}
    </div>
  );
};

export default AddProductDesc;
