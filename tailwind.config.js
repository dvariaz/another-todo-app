module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Urbanist", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#E8EAFC",
          100: "#C2C7FB",
          200: "#6B68EC",
          DEFAULT: "#4C49CA",
          700: "#363485",
          900: "#252448",
        },
        success: {
          50: "#DBF8D3",
          100: "#BFFFAD",
          200: "#7DE261",
          DEFAULT: "#54C934",
          700: "#2A9E0A",
          900: "#196405",
        },
        danger: {
          50: "#FFEAE9",
          100: "#F8A4A0",
          200: "#ED5850",
          DEFAULT: "#CC352D",
          700: "#A42019",
          900: "#650904",
        },
        gray: {
          50: "#F4F4F4",
          100: "#EAEAF1",
          150: "#DDDFED",
          200: "#CDD0E4",
          300: "#818197",
          DEFAULT: "#46465C",
          700: "#28283B",
          900: "#0E0D27",
        },
      },
      minWidth: {
        sm: "150px",
        md: "300px",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
