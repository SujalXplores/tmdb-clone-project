import type { RequiredEnv } from "../types/common";

const REQUIRED_KEYS: Array<keyof RequiredEnv> = [
	"VITE_BEARER_TOKEN",
	"VITE_BASE_API_URL",
];

const validateEnv = (): RequiredEnv => {
	const missing: string[] = [];
	const env = import.meta.env;

	for (const key of REQUIRED_KEYS) {
		if (!env[key] || typeof env[key] !== "string") {
			missing.push(key);
		}
	}

	if (missing.length > 0) {
		const message = `Missing required environment variable(s): ${missing.join(
			", ",
		)}. Check your .env file and Vite configuration.`;
		throw new Error(message);
	}

	return {
		VITE_BEARER_TOKEN: env.VITE_BEARER_TOKEN,
		VITE_BASE_API_URL: env.VITE_BASE_API_URL,
	};
};

export const env = validateEnv();
