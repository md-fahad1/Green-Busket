"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const OfferPage = () => {
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState({
    OfferPicture: null,
    name: "",
    description: "",
  });

  const [details, setDetails] = useState([{ key: "", value: "" }]);

  // Fetch Offers
  const fetchOffers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/offers`
      );
      setOffers(response.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOffer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewOffer((prev) => ({
        ...prev,
        OfferPicture: file,
      }));
    }
  };

  // Handle dynamic key-value changes
  const handleDetailsChange = (index, field, value) => {
    const updated = [...details];
    updated[index][field] = value;
    setDetails(updated);
  };

  const handleAddDetailRow = () => {
    setDetails([...details, { key: "", value: "" }]);
  };

  const handleRemoveDetailRow = (index) => {
    const updated = [...details];
    updated.splice(index, 1);
    setDetails(updated);
  };

  // Handle add offer
  const handleAddOffer = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newOffer.name);
      formData.append("description", newOffer.description);
      formData.append("OfferPicture", newOffer.OfferPicture);

      // Convert dynamic key-value to object
      const detailsObject = {};
      details.forEach((item) => {
        if (item.key) {
          try {
            detailsObject[item.key] = JSON.parse(item.value); // Parse value as JSON
          } catch {
            detailsObject[item.key] = item.value; // If invalid JSON, keep as string
          }
        }
      });

      formData.append("Details", JSON.stringify(detailsObject));

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/offers/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Reset form
      setNewOffer({ OfferPicture: null, name: "", description: "" });
      setDetails([{ key: "", value: "" }]);
      fetchOffers();
    } catch (error) {
      console.error("Error adding offer:", error);
    }
  };

  // Handle delete offer

  const handleDeleteOffer = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/offers/${id}`
      );
      fetchOffers();
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Offers Management
      </Typography>

      {/* Add Offer Form */}
      <Box component="form" sx={{ mb: 3 }} noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Offer Name"
              variant="outlined"
              name="name"
              value={newOffer.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Offer Description"
              variant="outlined"
              name="description"
              value={newOffer.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {newOffer.OfferPicture && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {newOffer.OfferPicture.name}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Offer Details (Dynamic)
        </Typography>

        {details.map((item, index) => (
          <Grid
            container
            spacing={2}
            key={index}
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="Key"
                variant="outlined"
                value={item.key}
                onChange={(e) =>
                  handleDetailsChange(index, "key", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="Value"
                variant="outlined"
                value={item.value}
                onChange={(e) =>
                  handleDetailsChange(index, "value", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveDetailRow(index)}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        ))}

        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddDetailRow}
          sx={{ mt: 2 }}
        >
          + Add More
        </Button>

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleAddOffer}>
            Add Offer
          </Button>
        </Box>
      </Box>

      {/* Offer Table */}
      <Box sx={{ overflowY: "auto" }}>
        <TableContainer
          component={Paper}
          sx={{ width: "100%", overflow: "auto" }}
        >
          <Table aria-label="offers table">
            <TableHead className="bg-dash-primary">
              <TableRow>
                <StyledTableCell align="center">Image</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offers?.map((offer) => (
                <StyledTableRow key={offer.id}>
                  <StyledTableCell align="center">
                    {offer.image && (
                      <Image
                        src={offer.image}
                        alt={offer.name}
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">{offer.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {offer.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      onClick={() => handleDeleteOffer(offer.id)}
                      color="error"
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default OfferPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { styled } from "@mui/material/styles";
// import axios from "axios";
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   tableCellClasses,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   TextField,
//   Container,
//   Grid,
//   Typography,
// } from "@mui/material";
// import Image from "next/image";
// // import { useRouter } from "next/router";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
// }));

// const OfferPage = () => {
//   const [offers, setOffers] = useState([]);
//   const [attributes, setAttributes] = useState({});
//   const [newOffer, setNewOffer] = useState({
//     OfferPicture: "",
//     name: "",
//     description: "",
//   });
//   // const router = useRouter();

//   // Fetching offers data
//   const fetchOffers = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/offers`
//       );
//       setOffers(response.data);
//     } catch (error) {
//       console.error("Error fetching offers:", error);
//     }
//   };

//   useEffect(() => {
//     fetchOffers();
//   }, []);

//   // Handling input changes for new offer
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewOffer((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handling image upload
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewOffer((prev) => ({
//           ...prev,
//           image: reader.result,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handling add offer
//   const handleAddOffer = async () => {
//     try {
//       await axios.post(
//         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/offers/add`,
//         newOffer,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setNewOffer({ OfferPicture: "", name: "", description: "" });
//       fetchOffers(); // Refresh the offers list
//     } catch (error) {
//       console.error("Error adding offer:", error);
//     }
//   };

//   // Handling delete offer
//   const handleDeleteOffer = async (id) => {
//     try {
//       await axios.delete(
//         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/offers/delete/${id}`
//       );
//       fetchOffers(); // Refresh the offers list
//     } catch (error) {
//       console.error("Error deleting offer:", error);
//     }
//   };

//   // Handling edit offer
//   // const handleEditOffer = (id) => {
//   //   router.push(`/offer/${id}`); // Navigate to edit page for the offer
//   // };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Offers Management
//       </Typography>

//       {/* Add Offer Form */}
//       <Box component="form" sx={{ mb: 3 }} noValidate autoComplete="off">
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={4}>
//             <TextField
//               fullWidth
//               label="Offer Title"
//               variant="outlined"
//               name="title"
//               value={newOffer.title}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <TextField
//               fullWidth
//               label="Offer Description"
//               variant="outlined"
//               name="description"
//               value={newOffer.description}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             {newOffer.image && (
//               <Image
//                 src={newOffer.image}
//                 alt="Offer Preview"
//                 width={100}
//                 height={100}
//                 className="mt-2"
//               />
//             )}
//           </Grid>
//         </Grid>
//         <Button variant="contained" color="primary" onClick={handleAddOffer}>
//           Add Offer
//         </Button>
//       </Box>

//       {/* Offer Table */}
//       <Box sx={{ overflowY: "auto" }}>
//         <TableContainer
//           component={Paper}
//           sx={{ width: "100%", overflow: "auto" }}
//         >
//           <Table aria-label="offers table">
//             <TableHead className="bg-dash-primary">
//               <TableRow>
//                 <StyledTableCell
//                   align="center"
//                   className="font-semibold text-xl border-r border-white"
//                 >
//                   Image
//                 </StyledTableCell>
//                 <StyledTableCell
//                   align="center"
//                   className="font-semibold text-xl border-r border-white"
//                 >
//                   Title
//                 </StyledTableCell>
//                 <StyledTableCell
//                   align="center"
//                   className="font-semibold text-xl border-r border-white"
//                 >
//                   Description
//                 </StyledTableCell>
//                 <StyledTableCell
//                   align="center"
//                   className="font-semibold text-xl border-r border-white"
//                 >
//                   Actions
//                 </StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {offers?.map((offer) => (
//                 <StyledTableRow key={offer.Id}>
//                   <StyledTableCell align="center">
//                     <Image
//                       src={offer.image}
//                       alt={offer.title}
//                       width={50}
//                       height={50}
//                       className="rounded-full object-cover"
//                     />
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     {offer.title}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     {offer.description}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     <Button
//                       onClick={() => handleEditOffer(offer.Id)}
//                       color="primary"
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       onClick={() => handleDeleteOffer(offer.Id)}
//                       color="error"
//                     >
//                       Delete
//                     </Button>
//                   </StyledTableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Container>
//   );
// };

// export default OfferPage;
