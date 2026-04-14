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
          accent: '#4f46e5',   // Indigo for buttons/actions
        }
      },
      // Adding custom animations for that "Active Defense" feel
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',  /* Firefox */
        },
      })
    }
  ],
}