import { starEmptyIcon, starFillIcon, editIcon } from "../icon/icon.js";

// ==== TitleBlock
function createTitleBlock() {
	let titleBlock, checkBoxContainer, checkbox, checkMark, edit, star, taskMassage;

	// create title block container
	titleBlock = document.createElement('div');
	titleBlock.className = 'title-block';

	// create checkBox
	checkBoxContainer = document.createElement("label");
	checkBoxContainer.className = "checkbox-container";

	checkbox = document.createElement("input");
	checkbox.className = 'checkbox';
	checkbox.type = 'checkbox';
	checkbox.checked = false;
	
	checkMark = document.createElement('span');
	checkMark.className = "check-mark";

	checkBoxContainer.append(checkbox, checkMark);

	// create edit
	edit = document.createElement('a');
	edit.className = 'edit';
	edit.innerHTML = editIcon;
	
	// create star
	star = document.createElement('a');
	star.className = 'star';
	star.innerHTML = starEmptyIcon
	
	// create task title span
	taskMassage = document.createElement('span');

	titleBlock.append(checkBoxContainer, edit, star, taskMassage);

	// use this setter when create a new task
	titleBlock.setter = function (pushData) {
		(pushData.mark == "mark") ? star.innerHTML = starFillIcon : star.innerHTML.starEmpty;
		checkbox.checked = pushData.completed;
		taskMassage.textContent = pushData.title;
	}

	// double click to open the settingBlock & buttonBlock
	// titleBlock.ondblclick = function () {
	// 	let settingBlock, buttonBlock;
	// 	settingBlock = this.nextElementSibling;
	// 	buttonBlock = settingBlock.nextElementSibling;
	// 	settingBlock.classList.remove("disappear");
	// 	buttonBlock.classList.remove("disappear");
	// }

	// checkMark.onclick = function () {
	// 	updateTaskList(checkBoxContainer, "completed", !(checkbox.checked))
	// }

	// edit.onclick = function () {
	// 	let newInput, targetSpan;
	// 	targetSpan = this.nextElementSibling.nextElementSibling;
	// 	newInput = document.createElement('input');
	// 	newInput.type = 'text';
	// 	newInput.onblur = function () {
	// 		if (this.value == '') {
	// 			this.replaceWith(targetSpan);
	// 			return;
	// 		}
	// 		targetSpan.textContent = this.value;
	// 		updateTaskList(this, "title", this.value);
	// 		this.replaceWith(targetSpan);
	// 	}
	// 	targetSpan.replaceWith(newInput);
	// 	newInput.focus();
	// }
	
	// star.onclick = function () {
	// 	switchStarStatus(titleBlock.parentElement);
	// 	updateTaskList(this, "mark", titleBlock.parentElement.dataset.mark);
	// }

	return titleBlock;
}

export default createTitleBlock;