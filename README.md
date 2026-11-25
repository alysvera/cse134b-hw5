# Part 4 - Shared Section

For Homework 5 I used Eleventy to create two pages from my existing portfolio. 

Home and About

Both pages share the same footer using `_includes/footer.njk`. This allowed me to update the footer in one place instead of changing it separately on each page.

## Install

Open the terminal inside the `part4` folder and run:

npm install

## Build

To generate the HTML pages run:

npx @11ty/eleventy

## Preview

To preview the pages run:

npx @11ty/eleventy --serve

Open these pages in your browser

- Home: http://localhost:8080/
- About: http://localhost:8080/about/

## Shared Footer

The shared footer is under `_includes/footer.njk`.

I tested it by changing the footer text and saving the file. Eleventy rebuilt both pages and the updated footer appeared on both generated pages.