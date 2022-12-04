import axios from "axios";

//export it later to env variables
// const API_URL = "http://api.open-notify.org/iss-now.json";
const API_URL = "https://api.wheretheiss.at/v1/satellites/25544";
const getISSInfo = async () => {
  try {
    let res = await axios.get(API_URL);
    return res;
  } catch (e) {
    let errorMessage = e.response.data.message;
    return Promise.reject(new Error(errorMessage));
  }
};

export default {
  getISSInfo,
};
