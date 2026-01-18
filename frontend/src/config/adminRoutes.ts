const ADMIN_BASE = import.meta.env.VITE_ADMIN_BASE || '/admin';

const ADMIN_ROUTES = {
  BASE: ADMIN_BASE,
  LOGIN: `${ADMIN_BASE}/login`,
  SETTINGS: `${ADMIN_BASE}/settings`,
  CREATE: `${ADMIN_BASE}/create`,
  EDIT: (id: string) => `${ADMIN_BASE}/edit/${id}`,
};

export default ADMIN_ROUTES;