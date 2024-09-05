export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brightColor: "#F4511F",
        backgroundColor: "#b7bca9",
        lightTest: "#959595",
        primary:"#854d3d",
        secondary:"#4a1e1b",
        brandDark:"#270c03",
      },
      container:{
        center:true,
        padding:{
          DEFAULT:"1rem",
          sm:"2rem",
          
        }
       }
    },
  },
  plugins: [],
}
