export async function myFetch(baseURL, path, method, body) {
	let fetchParams = {
		method: method,
		headers: { "Content-Type": "application/json" }
	};

	if (body !== null) {
		fetchParams = {
			method: method,
			body: JSON.stringify(body),
			headers: { "Content-Type": "application/json" }
		};
	}

	return fetch(baseURL + path, fetchParams).then(response => response.json());
}
