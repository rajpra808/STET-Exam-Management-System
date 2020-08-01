// export const API_URL =
//   "https://stet-web-sih2020.herokuapp.com" || "http://localhost:5000";

export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://stet-web-sih2020.herokuapp.com"
    : "http://localhost:5000";
