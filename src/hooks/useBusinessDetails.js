import { useQuery } from 'react-query';
import axios from 'axios';

const API_ENDPOINT = process.env.GATSBY_SEARCH_API_ENDPOINT;
const API_KEY = process.env.GATSBY_RBB_API_KEY;

const fetchBusiness = async (_, id) => {
  const businessFetchUrl = `${API_ENDPOINT}api/v1/businesses/${id}`;
  const { data } = await axios.get(businessFetchUrl, {
    headers: {
      'x-api-key': API_KEY,
    },
  });

  return data;
};

export const useBusinessDetails = id => {
  return useQuery(['business-details', id], fetchBusiness, {
    cacheTime: 1000 * 60 * 5, // cache results for up to 5 minutes
  });
};
