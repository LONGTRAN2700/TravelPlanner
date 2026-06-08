// Travel Planner API Client Configuration
// This file bridges the frontend to the backend server

// Detect environment and set API URL accordingly
const API_URL = (() => {
  const host = window.location.hostname;
  const protocol = window.location.protocol;

  // Development
  if (host === "localhost" || host === "127.0.0.1") {
    return "http://localhost:3000";
  }

  // Production - use same host
  return `${protocol}//${host}`;
})();

console.log("🔗 API URL:", API_URL);

/**
 * Fetch wrapper with better error handling
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

/**
 * Trip API Methods
 */
const TripsAPI = {
  getAll: () => apiFetch("/api/trips"),
  getOne: (tripId) => apiFetch(`/api/trips/${tripId}`),
  create: (data) =>
    apiFetch("/api/trips", { method: "POST", body: JSON.stringify(data) }),
  update: (tripId, data) =>
    apiFetch(`/api/trips/${tripId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (tripId) => apiFetch(`/api/trips/${tripId}`, { method: "DELETE" }),
};

/**
 * Category API Methods
 */
const CategoriesAPI = {
  create: (tripId, data) =>
    apiFetch(`/api/trips/${tripId}/categories`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (tripId, categoryId, data) =>
    apiFetch(`/api/trips/${tripId}/categories/${categoryId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (tripId, categoryId) =>
    apiFetch(`/api/trips/${tripId}/categories/${categoryId}`, {
      method: "DELETE",
    }),
};

/**
 * Place API Methods
 */
const PlacesAPI = {
  create: (tripId, categoryId, data) =>
    apiFetch(`/api/trips/${tripId}/categories/${categoryId}/places`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (tripId, categoryId, placeId, data) =>
    apiFetch(
      `/api/trips/${tripId}/categories/${categoryId}/places/${placeId}`,
      { method: "PUT", body: JSON.stringify(data) },
    ),
  delete: (tripId, categoryId, placeId) =>
    apiFetch(
      `/api/trips/${tripId}/categories/${categoryId}/places/${placeId}`,
      { method: "DELETE" },
    ),
};

/**
 * Image API Methods
 */
const ImagesAPI = {
  upload: (tripId, categoryId, placeId, imageData) =>
    apiFetch(
      `/api/trips/${tripId}/categories/${categoryId}/places/${placeId}/images`,
      {
        method: "POST",
        body: JSON.stringify({ imageData }),
      },
    ),
  delete: (tripId, categoryId, placeId, imageId) =>
    apiFetch(
      `/api/trips/${tripId}/categories/${categoryId}/places/${placeId}/images/${imageId}`,
      { method: "DELETE" },
    ),
};

/**
 * Itinerary API Methods
 */
const ItineraryAPI = {
  addDay: (tripId, dayData) =>
    apiFetch(`/api/trips/${tripId}/itinerary/days`, {
      method: "POST",
      body: JSON.stringify(dayData),
    }),
  deleteDay: (tripId, dayId) =>
    apiFetch(`/api/trips/${tripId}/itinerary/days/${dayId}`, {
      method: "DELETE",
    }),
  addItem: (tripId, dayId, itemData) =>
    apiFetch(`/api/trips/${tripId}/itinerary/days/${dayId}/items`, {
      method: "POST",
      body: JSON.stringify(itemData),
    }),
  deleteItem: (tripId, dayId, itemId) =>
    apiFetch(`/api/trips/${tripId}/itinerary/days/${dayId}/items/${itemId}`, {
      method: "DELETE",
    }),
};

/**
 * State API Methods
 */
const StateAPI = {
  getFullState: () => apiFetch("/api/state"),
  getHealthStatus: () => apiFetch("/health"),
};

// Export for use in main app
window.TravelPlannerAPI = {
  TripsAPI,
  CategoriesAPI,
  PlacesAPI,
  ImagesAPI,
  ItineraryAPI,
  StateAPI,
  apiFetch,
  API_URL,
};
