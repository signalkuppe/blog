import { pageTitleSeparator } from "../constants";

export const headPageTitle = (title, slogan) => {
  return `${title} ${pageTitleSeparator} ${slogan}`;
};

// "Alba sulle Langhe" -> "alba-sulle-langhe" (accents dropped), for filenames
export const slugify = (text) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
