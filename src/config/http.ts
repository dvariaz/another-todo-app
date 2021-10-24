import axios from "axios";

import { API_URL } from "@config/consts";

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});
