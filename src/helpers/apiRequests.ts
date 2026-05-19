import { env } from "../lib/env";

const getHeaders = () => ({
	"Content-Type": "application/json",
	Authorization: `Bearer ${env.VITE_BEARER_TOKEN}`,
	"Cache-Control": "no-cache",
});

class ApiError extends Error {
	constructor(
		public readonly status_code: number,
		public readonly status_message: string,
	) {
		super(`Error: ${status_message}, status code: ${status_code}`);
		this.name = "ApiError";
	}
}

const request = async <T>({
	url,
	method = "GET",
	params,
	body,
	baseUrl,
}: {
	url: string;
	method?: "GET" | "POST" | "PUT" | "DELETE";
	params?: Record<string, string | number | boolean | null | undefined>;
	body?: unknown;
	baseUrl?: string;
}): Promise<T> => {
	try {
		const queryString = params
			? `?${new URLSearchParams(
					Object.entries(params).reduce(
						(acc, [key, value]) => {
							if (value !== null && value !== undefined) {
								acc[key] = String(value);
							}
							return acc;
						},
						{} as Record<string, string>,
					),
				).toString()}`
			: "";

		const response = await fetch(
			`${baseUrl || env.VITE_BASE_API_URL}${url}${queryString}`,
			{
				method,
				headers: getHeaders(),
				body: body === undefined ? undefined : JSON.stringify(body),
				cache: "no-cache",
			},
		);
		if (!response.ok) {
			const errorData = (await response.json().catch(() => ({}))) as Partial<{
				status_code: number;
				status_message: string;
			}>;

			throw new ApiError(
				errorData.status_code ?? response.status,
				errorData.status_message ?? response.statusText,
			);
		}

		const data = await response.json() as unknown;
		return data as T;
	} catch (error: unknown) {
		if (error instanceof ApiError) throw error;
		const isObject = typeof error === "object" && error !== null;
		const status_code =
			isObject &&
			"status_code" in error &&
			typeof error.status_code === "number"
				? (error as { status_code: number }).status_code
				: 500;
		const status_message =
			isObject &&
			"status_message" in error &&
			typeof error.status_message === "string"
				? (error as { status_message: string }).status_message
				: error instanceof Error
					? error.message
					: "Network error";

		throw new Error(`Error: ${status_message}, status code: ${status_code}`);
	}
};

export default request;
