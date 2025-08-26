/** @type {import('tailwindcss').Config} */
export default {
content: ["./index.html", "./src/**/*.{ts,tsx}"],
theme: {
extend: {
colors: {
primary: {
50: "#eef2ff",
100: "#e0e7ff",
400: "#818cf8",
600: "#4f46e5"
},
accent: {
100: "#dcfce7",
400: "#34d399",
600: "#059669"
}
},
boxShadow: {
soft: "0 10px 25px -10px rgba(0,0,0,0.1)"
}
}
},
plugins: []
}
