// ==== buttonBlock

function createButtonBlock() {
	let buttonBlock, cancelButton, submitButton;

	// buttonBlock (container)
	buttonBlock = document.createElement('div');
	buttonBlock.className = "button-block";

	// cancelButton
	cancelButton = document.createElement('button');
	cancelButton.className = "cancel-button";
	cancelButton.textContent = 'Cancel';

	submitButton = document.createElement('button');
	submitButton.className = "submit-button";
	submitButton.textContent = '+ Save';

	buttonBlock.submitButton = submitButton;
	buttonBlock.cancelButton = cancelButton;

	buttonBlock.append(cancelButton, submitButton);

	return buttonBlock;
}

export default createButtonBlock;
