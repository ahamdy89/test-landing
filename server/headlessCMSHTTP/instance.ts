import axios from "axios";
import qs from "qs";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_CMS_BASE_URL!}/api`,
  headers: {
    Authorization: `Bearer ${process.env.CMS_TOKEN!}`,
  },
  paramsSerializer: {
    serialize: (params) => {
      return qs.stringify(params, {
        encodeValuesOnly: true,
      });
    },
  },
});

export default instance;
