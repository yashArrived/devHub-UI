const DEFAULT_API_BASE_URL = "https://dev-hub-lyart.vercel.app";

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;

export const BASE_URL = configuredApiBaseUrl.endsWith("/")
	? configuredApiBaseUrl.slice(0, -1)
	: configuredApiBaseUrl;