const URL = import.meta.env.VITE_API_KEY;

export const call = async (
  endpoint,
  method = "GET",
  body = null,
  token = null
) => {
  if (!URL) {
    throw new Error(
      "La URL de la API no está definida. Verifica el archivo .env."
    );
  }

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(`${URL}api/${endpoint}`, {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
    });

    const data = response.status !== 204 ? await response.json() : null;
    if (!response.ok) {
      const errorMessage = data?.errors
        ? Object.values(data.errors).flat().join(", ")
        : data?.message || "Error en la petición";
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error(
        "No se pudo conectar con el servidor. Verifica la conexión de red."
      );
    }
    throw new Error(error.message || "Error en la petición");
  }
};
