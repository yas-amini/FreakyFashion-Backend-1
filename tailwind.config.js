/** @type {import('tailwindcss').Config} */
module.exports = {
  // The 'content' array tells Tailwind which files to scan for CSS classes
  content: [
    // Look in all .ejs files in the views directory and its subdirectories
    // The ** means "look in all subdirectories"
    // The * means "match any filename"
    "./views/**/*.ejs",

    // Look in all .js and .css files in the public directory and its subdirectories
    // The {js,css} means "match files ending in either .js or .css"
    "./public/**/*.{js,css}",
  ],

  // The 'theme' object lets you customize Tailwind's default design system
  theme: {
    // 'extend' lets you add to Tailwind's defaults without overriding them
    extend: {
      // Example add a custom color
      // colors: {'custom-blue': '#1fb6ff' }
    },
  },

  // The 'plugins' array is where you can add Tailwind plugins forms, typography, animations, etc.
  plugins: [],
};
