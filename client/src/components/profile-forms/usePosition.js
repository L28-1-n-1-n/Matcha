import { useState, useEffect } from 'react';
export const usePosition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  const onError = (error) => {
    setError(error.message);
  };
  useEffect(() => {
    const geo = navigator.geolocation;
    console.log(geo);
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);
  return { ...position, error };
};
