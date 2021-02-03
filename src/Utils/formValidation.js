export function minLengthValidation(inputData, minLength) {
	const { value } = inputData;
	const valueInput = value;

	removeClassErrorSucccess(inputData);

	if (valueInput.length >= minLength) {
		inputData.classList.add('success');
		return true;
	} else {
		inputData.classList.add('error');
		return false;
	}
}

export function emailValidation(inputData) {
	/* eslint-disable */
	const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	const { value } = inputData;

	removeClassErrorSucccess(inputData);

	const resultValidation = emailValid.test(value);
	if (resultValidation) {
		inputData.classList.add('success');
		return true;
	} else {
		inputData.classList.add('error');
		return false;
	}
}

function removeClassErrorSucccess(inputData) {
	inputData.classList.remove('success');
	inputData.classList.remove('error');
}
