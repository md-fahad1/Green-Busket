// lib/FetchUser.js
import axios from "axios";

// ✅ Fetch all offer IDs for generateStaticParams
export async function fetchAllOfferIds() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/offers`
    );
    const offers = res.data;

    return offers.map((offer) => ({
      id: offer.id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching offer IDs:", error.message);
    return [];
  }
}

// ✅ Fetch single offer by ID
export async function fetchOfferById(id) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/offers/${id}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching offer by ID:", error.message);
    return null;
  }
}
