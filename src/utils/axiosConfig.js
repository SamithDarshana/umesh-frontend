export const base_url = "https://umesh-backend-1.onrender.com/api/";

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? localStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
