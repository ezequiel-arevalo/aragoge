import { call } from "./callFetch";

// Función para el marketplace (todas las planificaciones)
export const fetchMarketplacePlannings = (searchTerm = "") => {
  const queryParam = searchTerm ? `?search=${searchTerm}` : "";
  return call(`plannings${queryParam}`, "GET");
};

// Función para planificaciones del profesional
export const getPlanningsByUserId = (userId, token) => {
  return call(`users/${userId}/plannings`, "GET", null, token);
};

export const fetchPlanningById = (id, token) => {
  return call(`plannings/${id}`, "GET", null, token);
};

export const createPlanning = (planningData, token) => {
  return call("plannings", "POST", planningData, token);
};

export const updatePlanning = (id, planningData, token) => {
  return call(`plannings/${id}`, "POST", planningData, token);
};

export const deletePlanning = (id, token) => {
  return call(`plannings/${id}`, "DELETE", null, token);
};

export const fetchSubscriptionsByPlanningId = (planningId, token) => {
  return call(`plannings/${planningId}/subscriptions`, "GET", null, token);
};
