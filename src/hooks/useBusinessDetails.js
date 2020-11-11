import { useQuery } from 'react-query';
import axios from 'axios';

const API_ENDPOINT = process.env.GATSBY_SEARCH_API_ENDPOINT;
const API_KEY = process.env.GATSBY_RBB_API_KEY;

const fetchBusiness = async (_, id) => {
  const businessFetchUrl = `${API_ENDPOINT}api/v1/businesses/${id}?apiKey=${API_KEY}`;

  const { data } = await axios.get(businessFetchUrl);

  return data;
};

export const useBusinessDetails = airtableId => {
  return useQuery(['business-details', airtableId], fetchBusiness, {
    cacheTime: 1000 * 60 * 5, // cache results for up to 5 minutes
    refetchOnWindowFocus: false,
  });
};
