import { API_URL, API_KEY } from '../config/api';

export async function apiClient(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'app-id': API_KEY,
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Error en petición: ${res.status}`);
  }

  return res.json();
}
