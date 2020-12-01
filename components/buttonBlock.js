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
	// press 'tab' from comment(textarea), will jump to submitButton
	cancelButton.tabIndex = -1;
	cancelButton.onclick = function () {
		let id, index;
		id = buttonBlock.parentElement.id;
		index = findI(id);
		// reset origin value
		buttonBlock.previousElementSibling.setter(taskList[index]);
		addDisappear();
	};

	submitButton = document.createElement('button');
	submitButton.className = "submit-button";
	submitButton.textContent = '+ Save';
	submitButton.onclick = function () {
		let id, pushData, index, statusBlock;
		id = buttonBlock.parentElement.id;
		pushData = buttonBlock.getter();
		updateTaskList(this, false, pushData);
		addDisappear();

		// change statusBlock's status display
		statusBlock = buttonBlock.previousElementSibling.previousElementSibling.lastElementChild;
		statusBlock.reset(pushData);
	}

	// return all the settingBlock's value
	buttonBlock.getter = function () {
		let id, settingBlock, checkboxElement, markElement, titleElement,
			dateElement, timeElement, fileElement, commentElement, pushData;
		id = this.parentElement.id;
		settingBlock = this.previousElementSibling;
		checkboxElement = settingBlock.previousElementSibling.firstElementChild.firstElementChild;
		titleElement = checkboxElement.parentElement.parentElement.children[3];
		markElement = settingBlock.parentElement;
		dateElement = settingBlock.firstElementChild.children[3];
		timeElement = dateElement.nextElementSibling;
		// fileElement = settingBlock.children[1].lastElementChild.lastElementChild;
		commentElement = settingBlock.lastElementChild.lastElementChild;

		pushData = {
			id: id,
			title: titleElement.textContent,
			completed: checkboxElement.checked,
			mark: markElement.dataset.mark,
			date: dateElement.value,
			time: timeElement.value,
			file: undefined,
			comment: commentElement.value
		}

		return pushData;
	}

	function addDisappear() {
		buttonBlock.classList.add("disappear")
		buttonBlock.previousElementSibling.classList.add("disappear");
	}

	buttonBlock.append(cancelButton, submitButton);

	return buttonBlock;
}