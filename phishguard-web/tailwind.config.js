/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // PhishGuard specific colors for security branding
        brand: {
          danger: '#ef4444',   // Malicious
          warning: '#f59e0b',  // Suspicious
          success: '#10b981',  // Safe
          primary: '#0f172a',  // Dark blue (SOC style)
        }
      },
    },
  },
  plugins: [],
}