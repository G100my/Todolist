// ==== buttonBlock
// 生成底下兩個 button
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

	// 設成 object property，紀錄位置，這樣不必一直寫 querySelector...
	buttonBlock.submitButton = submitButton;
	buttonBlock.cancelButton = cancelButton;

	buttonBlock.append(cancelButton, submitButton);

	return buttonBlock;
}

export default createButtonBlock;
