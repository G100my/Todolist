// ==== TitleBlock
function createTitleBlock() {
	let titleBlock, checkBoxContainer, checkbox, checkMark, edit, star, taskTitle;

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
	checkMark.onclick = function () {
		updateTaskList(checkBoxContainer, "completed", !(checkbox.checked))
	}

	checkBoxContainer.append(checkbox, checkMark);

	// create edit
	edit = document.createElement('a');
	edit.className = 'edit';
	edit.innerHTML = '<svg width="24px" height="24px" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/></svg>';
	edit.onclick = function () {
		let newInput, targetSpan;
		targetSpan = this.nextElementSibling.nextElementSibling;
		newInput = document.createElement('input');
		newInput.type = 'text';
		newInput.onblur = function () {
			if (this.value == '') {
				this.replaceWith(targetSpan);
				return;
			}
			targetSpan.textContent = this.value;
			updateTaskList(this, "title", this.value);
			this.replaceWith(targetSpan);
		}
		targetSpan.replaceWith(newInput);
		newInput.focus();
	}

	// create star
	star = document.createElement('a');
	star.className = 'star';
	star.innerHTML = starEmptyIcon
	star.onclick = function () {
		switchStarStatus(titleBlock.parentElement);
		updateTaskList(this, "mark", titleBlock.parentElement.dataset.mark);
	}

	// create task title span
	taskTitle = document.createElement('span');

	titleBlock.append(checkBoxContainer, edit, star, taskTitle);

	// use this setter when create a new task
	titleBlock.setter = function (pushData) {
		(pushData.mark == "mark") ? star.innerHTML = starFillIcon : star.innerHTML.starEmpty;
		checkbox.checked = pushData.completed;
		cc('checkbox.checked', checkbox.checked)
		taskTitle.textContent = pushData.title;
	}

	// double click to open the settingBlock & buttonBlock
	titleBlock.ondblclick = function () {
		let settingBlock, buttonBlock;
		settingBlock = this.nextElementSibling;
		buttonBlock = settingBlock.nextElementSibling;
		settingBlock.classList.remove("disappear");
		buttonBlock.classList.remove("disappear");
	}

	return titleBlock;
}