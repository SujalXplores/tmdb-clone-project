import { env } from "../lib/env";

const getHeaders = () => ({
	"Content-Type": "application/json",
	Authorization: `Bearer ${env.VITE_BEARER_TOKEN}`,
	"Cache-Control": "no-cache",
});

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
				body: body ? JSON.stringify(body) : undefined,
				cache: "no-cache",
			},
		);
		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));

			throw {
				status_code: errorData.status_code ?? response.status,
				status_message: errorData.status_message || "Something went wrong",
				success: false,
			};
		}

		const data = await response.json();
		return data as T;
	} catch (error: unknown) {
		const isObject = typeof error === "object" && error !== null;
		const status_code =
			isObject &&
			"status_code" in error &&
			typeof (error as { status_code: unknown }).status_code === "number"
				? (error as { status_code: number }).status_code
				: 500;
		const status_message =
			isObject &&
			"status_message" in error &&
			typeof (error as { status_message: unknown }).status_message === "string"
				? (error as { status_message: string }).status_message
				: error instanceof Error
					? error.message
					: "Network error";

		throw {
			status_code,
			status_message,
			success: false,
		};
	}
};

export default request;
