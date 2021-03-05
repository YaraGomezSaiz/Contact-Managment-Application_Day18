export async function myFetch(baseURL, path, method = "GET", body) {
	let fetchParams = {
		method: method,
		headers: { "Content-Type": "application/json" }
	};

	if (body !== null) {
		fetchParams = {
			method: method,
			body: body,
			headers: { "Content-Type": "application/json" }
		};
		console.log(fetchParams);
	}

	return fetch(baseURL + path, fetchParams).then(response => response.json());
}
