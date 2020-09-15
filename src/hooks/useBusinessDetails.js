import { useQuery } from 'react-query';
import axios from 'axios';

const API_ENDPOINT = process.env.GATSBY_SEARCH_API_ENDPOINT;
const API_KEY = process.env.GATSBY_RBB_API_KEY;

const fetchBusiness = async (_, id) => {
  const businessFetchUrl = `${API_ENDPOINT}private/api/v1/businesses/airtable/${id}`;
  const { data } = await axios.get(businessFetchUrl, {
    headers: {
      'x-api-key': API_KEY,
    },
  });

  return data;
};

export const useBusinessDetails = airtableId => {
  return useQuery(['business-details', airtableId], fetchBusiness, {
    cacheTime: 1000 * 60 * 5, // cache results for up to 5 minutes
  });
};
