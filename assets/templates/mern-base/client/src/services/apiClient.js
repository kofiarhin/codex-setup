const FALLBACK_API_URL = '__API_URL__';

function normalizeBaseUrl(value) {
  return (value || FALLBACK_API_URL).replace(/\/+$/, '');
}

function createUrl(pathname) {
  const baseUrl = normalizeBaseUrl(import.meta.env.VITE_API_URL);
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;

  return `${baseUrl}${normalizedPath}`;
}

export async function apiRequest(pathname, options = {}) {
  const { headers, ...restOptions } = options;

  const response = await fetch(createUrl(pathname), {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  const payload = await response.json().catch(() => ({
    success: false,
    message: 'Invalid JSON response received from the API.',
  }));

  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || 'Request failed.');
  }

  return payload;
}

export { createUrl, normalizeBaseUrl };
