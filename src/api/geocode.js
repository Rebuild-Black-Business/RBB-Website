import Geocode from 'react-geocode';

async function handleLocationToCoords(location) {
  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY);

  if (!location.trim()) {
    return {};
  }

  try {
    const res = await Geocode.fromAddress(location);
    return res.results[0] ? res.results[0].geometry.location : {};
  } catch (error) {
    console.error(error);
    return {};
  }
}

export default {
  handleLocationToCoords,
};
export { handleLocationToCoords };
