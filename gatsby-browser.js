import '@reach/skip-nav/styles.css';

// On the route update we can access the current path and add a state to each navigation, which we call prevLocation.
// Defaults to the home route as thats where we start
export const onRouteUpdate = ({ location, prevLocation }) => {
  if (location && location.state) {
    location.state.referrer = prevLocation ? prevLocation.pathname : '/';
  }
};
