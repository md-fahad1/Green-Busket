import Image from "next/image";
import Link from "next/link";
import SectionTitle from "../SectionTitle";
import { fetchFeatureProducts } from "@/lib/FetchProduct";
import ProductCard from "@/components/Product/ProductCard";
import FeaturesTabs from "./FeaturesTabs";

const Features = async () => {
  // // const [features, setFeatures] = useState([]); //will be active for real data
  // const fetchFeatures = async () => {
  //   const res = await axios.get(
  //     `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search`
  //   );
  //   //will be active for real data
  //   // setFeatures(res.data);
  // };

  // useEffect(() => {
  //   fetchFeatures();
  // }, []);
  let features = [];

  try {
    const data = await fetchFeatureProducts();
    features = [...data];
  } catch (error) {
    console.log(error.message);
  }

  return (
    <div className="container mx-auto">
      <SectionTitle
        title="Featured Products"
        description="Explore our specially selected products that combine quality, style, and innovation to elevate your everyday living."
      />

      <FeaturesTabs />
      <div className="flex flex-col  md:flex-row gap-1  justify-between mt-0 lg:mt-6">
        {/* {features?.slice(0, 8).map((product) => (
          <div key={product?.id}>
            <Link href={`/products/product-info/${product.id}`}>
              <Image
                src={feature?.image}
                alt="feature image"
                width={500}
                height={300}
                className="rounded-lg h-[150px] lg:h-[200px] object-cover"
              />
              <ProductCard product={product} />
            </Link>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Features;

const features = [
  { id: 1, href: "products/product-info/2", image: "/img/banner1.jpg" },
  { id: 2, href: "products/product-info/7", image: "/img/banner4.jpg" },
  { id: 3, href: "products/product-info/2", image: "/img/banner5.jpg" },
];
