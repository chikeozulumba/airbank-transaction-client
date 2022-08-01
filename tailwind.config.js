/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    `./components/**/*.{vue,js}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./views/**/*.vue`,
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
