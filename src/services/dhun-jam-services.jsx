import axios from "axios";

const loginService = async (username, password) =>
  await axios.post("https://stg.dhunjam.in/account/admin/login", {
    username,
    password,
  });

const getAdminDetailsService = async (id) =>
  await axios.get(`https://stg.dhunjam.in/account/admin/${id}`);

const priceUpdateService = async (id, updatedAmount) =>
  await axios.put(`https://stg.dhunjam.in/account/admin/${id}`, {
    amount: updatedAmount,
  });

export { loginService, getAdminDetailsService, priceUpdateService };
