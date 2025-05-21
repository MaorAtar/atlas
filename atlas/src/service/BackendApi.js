export const GetPlaceDetailsFromBackend = (data) => {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/place-details`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());
};

export const GetPlacePhotoUrlFromBackend = (photoRef) => {
  return `${import.meta.env.VITE_BACKEND_URL}/api/place-photo?photoRef=${encodeURIComponent(photoRef)}`;
};
