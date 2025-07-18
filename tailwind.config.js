// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   darkMode: "class",
//   theme: {
//     extend: {
//       fontFamily: {
//         oswald: ["var(--font-oswald)"],
//         lato: ["var(--font-lato)"],
//         playfair: ["var(--font-playfair)"],
//         roboto: ["var(--font-roboto)"],
//       },
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
//       keyframes: {
//         fadeInUp: {
//           "0%": { transform: "translateY(20px)", opacity: 0 },
//           "100%": { transform: "rtranslateY(0px)", opacity: 1 },
//         },
//       },
//       animation: {
//         fadeInUp: "fadeInUp 0.3s ease-in-out",
//       },
//       // backgroundColor: {
//       //   primary: "#192a56",
//       //   secondary: "#273c75",
//       // },
//       // textColor: {
//       //   primary: "#192a56",
//       //   secondary: "#2F3336",
//       // },
//       colors: {
//         primary: "#192a56",
//         secondary: "#2F3336",
//         "dash-primary": "#2FB261",
//         "dark-color": "#e5e7eb",
//         "dark-bg": "#0f1214",
//       },
//     },
//   },
//   plugins: [],
// };

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        oswald: ["var(--font-oswald)"],
        lato: ["var(--font-lato)"],
        playfair: ["var(--font-playfair)"],
        roboto: ["var(--font-roboto)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeInUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0px)", opacity: 1 },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.3s ease-in-out",
      },
      colors: {
        primary: "#192a56",
        secondary: "#2F3336",
        "dash-primary": "#2FB261",
        "dark-color": "#e5e7eb",
        "dark-bg": "#0f1214",
      },
    },
  },
  plugins: [],
  purge: {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    options: {
      safelist: [
        // Ensure Material UI classes are safe from purging
        /^Mui.*/,
      ],
    },
  },
};
