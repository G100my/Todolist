import { editIcon } from "../icon/icon.js";

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
	// star.innerHTML = starEmptyIcon
	
	// create task title span
	taskMassage = document.createElement('span');

	titleBlock.append(checkBoxContainer, edit, star, taskMassage);

	// set these as element property
	titleBlock.editButton = edit;
	titleBlock.checkbox = checkbox;
	titleBlock.starButton = star;
	titleBlock.taskMassage = taskMassage;

	return titleBlock;
}

export default createTitleBlock;