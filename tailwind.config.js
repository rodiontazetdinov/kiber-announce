module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#ffd700",
          "secondary": "#ff4b4b",
          "accent": "#ffffff",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
} 