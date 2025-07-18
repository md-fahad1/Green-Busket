import Image from "next/image";
import { fetchAllOfferIds, fetchOfferById } from "@/lib/offerdata";

// ✅ Generate static paths for each offer ID
export async function generateStaticParams() {
  try {
    const offers = await fetchAllOfferIds();

    if (!offers || offers.length === 0) {
      return [{ id: "default" }];
    }

    return offers.map((offer) => ({
      id: offer.id.toString(), // ✅ Fixed
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [{ id: "default" }];
  }
}

const OfferDetails = async ({ params }) => {
  const { id } = params;

  let offer = null;
  try {
    offer = await fetchOfferById(id);
  } catch (error) {
    console.error("Error fetching offer by ID:", error);
  }

  if (!offer) {
    return (
      <div className="text-center text-red-500 py-10">
        অফার খুঁজে পাওয়া যায়নি বা লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 shadow-lg bg-white rounded-md mt-4">
      <h1 className="text-[15px] my-4 tracking-wider font-semibold text-center">
        {offer.name}
      </h1>

      <div className="relative w-full h-[300px] rounded overflow-hidden mb-6">
        <Image
          src={offer.image}
          alt={offer.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      <p className="text-[15px] my-4 font-medium text-center">
        {offer.description}
      </p>

      <h2 className="text-[15px] my-4 tracking-wider font-semibold text-center">
        বিস্তারিত অফার তথ্য:
      </h2>

      <ul className="list-disc pl-5 text-gray-700 space-y-1 text-[15px]">
        {offer.Details &&
          Object.entries(offer.Details).map(([key, value]) => (
            <li key={key}>
              <span className="font-semibold">{key}:</span>{" "}
              <span>{String(value)}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default OfferDetails;
