/** @type {import('tailwindcss').Config} */
module.exports = {
  // The 'content' array tells Tailwind which files to scan for CSS classes
  content: [
    "./views/**/*.ejs", // Only watch EJS files in views
  ],

  // The 'theme' object lets you customize Tailwind's default design system
  theme: {
    extend: {
      // Example add a custom color
      // colors: {'custom-blue': '#1fb6ff' }
    },
  },

  // The 'plugins' array is where you can add Tailwind plugins forms, typography, animations, etc.
  plugins: [],
};
