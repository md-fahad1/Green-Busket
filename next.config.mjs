// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["farseit.com", "i.pravatar.cc"],
//   },
//   crossOrigin: "anonymous",
//   async rewrites() {
//     return [
//       {
//         source: "/api/product/:path*",
//         destination: "http://testingbackend.farseit.com/Product/:path*", // Change to HTTPS if available
//       },
//     ];
//   },
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["farseit.com", "i.pravatar.cc", "testingbackend.farseit.com"], // Add testingbackend subdomain here
//   },
//   crossOrigin: "anonymous",
//   async rewrites() {
//     return [
//       {
//         source: "/api/product/:path*",
//         destination: "http://testingbackend.farseit.com/Product/:path*", // Change to HTTPS if available
//       },
//     ];
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  images: {
    domains: [
      "farseit.com",
      "i.pravatar.cc",
      "testingbackend.farseit.com",
      "ceramicandfoodproducts.com",
      "images.unsplash.com",
    ],
    unoptimized: true,
  },
  crossOrigin: "anonymous",
  async rewrites() {
    return [
      {
        source: "/api/product/:path*",
        destination: "https://testingbackend.farseit.com/Product/:path*",
      },
    ];
  },
};

export default nextConfig;
