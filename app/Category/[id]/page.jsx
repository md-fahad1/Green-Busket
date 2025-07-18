// import { fetchAllCategoryIds } from "@/lib/FetchProduct";
// import CategoryPage from "@/app/(home)/Category/CategoryPage";
// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer/Footer";

// // Dynamically import the client component

// export async function generateStaticParams() {
//   try {
//     const categoryIds = await fetchAllCategoryIds();
//     console.log("categorises id", categoryIds);
//     return categoryIds.map((category) => ({
//       id: category.id.toString(), // Convert to string for dynamic routing
//     }));
//   } catch (error) {
//     console.error("Error generating static params:", error);
//     return [];
//   }
// }

// export default function Page({ params }) {
//   return (
//     <>
//       <Header />
//       <main>
//         <CategoryPage params={params} />
//       </main>
//       <Footer />
//     </>
//   );
// }

import { fetchAllCategoryIds } from "@/lib/FetchProduct";
import CategoryPage from "@/app/(home)/Category/CategoryPage";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export async function generateStaticParams() {
  try {
    const categoryIds = await fetchAllCategoryIds();

    if (!categoryIds || categoryIds.length === 0) {
      return [{ id: "default" }];
    }

    return categoryIds.map((category) => ({
      id: category.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [{ id: "default" }];
  }
}

export default function Page({ params }) {
  return (
    <>
      <Header />
      <main>
        <CategoryPage params={params} />
      </main>
      <Footer />
    </>
  );
}
