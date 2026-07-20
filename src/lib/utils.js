import { pageTitleSeparator } from "../constants";

export const headPageTitle = (title, slogan) => {
  return `${title} ${pageTitleSeparator} ${slogan}`;
};
