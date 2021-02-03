import { basePath, apiVersion } from './config';

export function uploadDocumentApi(token, document, userId) {
	const url = `${basePath}/${apiVersion}/upload-document/${userId}`;

	const formData = new FormData();
	formData.append('document', document, document.name);
	const params = {
		method: 'PUT',
		doc: 'Aqui',
		body: formData,
		headers: {
			Authorization: token,
		},
	};

	return fetch(url, params)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err.message;
		});
}

export function updateDocumentApi(token, document, userId) {
	const url = `${basePath}/${apiVersion}/update-document/${userId}`;

	const params = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify(document),
	};

	return fetch(url, params)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err.message;
		});
}

export async function getDocumentsByUserApi(token, document) {
	const url = `${basePath}/${apiVersion}/get-documents-user`;
	const params = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify(document),
	};

	return await fetch(url, params)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err.message;
		});
}

export function deleteDocumentsByIdApi(token, document) {
	const url = `${basePath}/${apiVersion}/delete-document`;

	const params = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify(document),
	};

	return fetch(url, params)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err.message;
		});
}

export function dowloadDocumentsApi(token, documentId) {
	const url = `${basePath}/${apiVersion}/download-document/${documentId}`;

	const params = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	};

	return fetch(url, params)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err.message;
		});
}
