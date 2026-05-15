import request from "../helpers/apiRequests";

export const fetchData = <T>({
	url,
	params,
	baseUrl
}: {
	url: string;
	params?: Record<string, string | number | boolean | null | undefined>;
	baseUrl?: string;
}) => {
	return request<T>({ url, params, baseUrl });
};

export const postData = <T, TPayload = unknown>({
	url,
	payload,
	params,
	baseUrl,
}: {
	url: string;
	payload: TPayload;
	params?: Record<string, string | number | boolean | null | undefined>;
	baseUrl?: string;
}) => {
	return request<T>({
		url,
		method: "POST",
		body: payload,
		params,
		baseUrl,
	});
};
