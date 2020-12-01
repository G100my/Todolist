import createButtonBlock from "./components/buttonBlock.js";
import creatDetailBlock from "./components/detailBlock.js";
import createStatusBlock from "./components/statusBlock.js";
import createTitleBlock from "./components/titleBlock.js";


let taskList = [];
let disappearSwitch = false;
const datetimeIcon = '<svg viewBox="0 0 16 16" class="bi bi-calendar-day" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4.684 11.523v-2.3h2.261v-.61H4.684V6.801h2.464v-.61H4v5.332h.684zm3.296 0h.676V8.98c0-.554.227-1.007.953-1.007.125 0 .258.004.329.015v-.613a1.806 1.806 0 0 0-.254-.02c-.582 0-.891.32-1.012.567h-.02v-.504H7.98v4.105zm2.805-5.093c0 .238.192.425.43.425a.428.428 0 1 0 0-.855.426.426 0 0 0-.43.43zm.094 5.093h.672V7.418h-.672v4.105z" /><path fill-rule="evenodd" d="M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z" /><path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z" /></svg>';
const fileIcon = '<svg viewBox="0 0 16 16" class="bi bi-file-earmark" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 1h5v1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6h1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z" /><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 0 1 9 4.5z" /></svg>';
const commentIcon = '<svg viewBox="0 0 16 16" class="bi bi-chat" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" /></svg>';
const starEmptyIcon = '<svg width="24px" height="24px" viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/></svg>';
const starFillIcon = '<svg width="24px" height="24px" viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73z"/></svg>';

const addTaskTitleInput = document.getElementById('js-task-title-input');
const taskDisplayArea = document.getElementById('js-task-display-area');
const starDisplayArea = document.getElementById('js-star-display-area');
// assigned in window.onload
let inputContainer;

addTaskTitleInput.onkeyup = function (event) {
	if (event.which === 13 && this.value.length != 0) {
		let inputTaskTitle;
		inputTaskTitle = document.getElementById('js-input-task-title-span');
		inputTaskTitle.textContent = this.value;
		this.value = '';
		addTaskInputDisappear();
	}
}

// ==== taskContainer
function createTaskContainer(pushData) {
	let taskContainer, titleBlock, statusBlock, settingBlock, buttonGroup;

	// task main container
	taskContainer = document.createElement('section');
	taskContainer.className = "task-container";
	taskContainer.dataset.mark = pushData.mark;
	taskContainer.draggable = true;

	titleBlock = createTitleBlock();
	titleBlock.setter(pushData);
	statusBlock = createStatusBlock(pushData);

	// L247
	if (statusBlock != undefined) titleBlock.appendChild(statusBlock);

	settingBlock = creatDetailBlock();
	settingBlock.setter(pushData);

	buttonGroup = createButtonBlock();

	settingBlock.classList.add("disappear");
	buttonGroup.classList.add("disappear");

	taskContainer.append(titleBlock, settingBlock, buttonGroup);

	return taskContainer;
}

// ==== feature function

function addTaskInputDisappear() {
	disappearSwitch = !disappearSwitch;

	if (disappearSwitch) {
		addTaskTitleInput.classList.add("disappear");
		inputContainer.classList.remove("disappear");
	} else {
		addTaskTitleInput.classList.remove("disappear");
		inputContainer.classList.add("disappear");
	}
}

function findI(id) {
	for (let i = 0; i < taskList.length; i++) {
		if (taskList[i].id == id) return i;
	}
}

function switchStarStatus(taskContainer) {
	let star;
	star = taskContainer.getElementsByClassName('star')[0];
	if (taskContainer.dataset.mark == "mark") {
		star.innerHTML = starEmptyIcon;
		taskContainer.dataset.mark = "none";

		let sourceIndex, targetId, TargetElement;
		sourceIndex = taskList.findIndex((element) => element.id == taskContainer.id);
		targetId = ((srcIndex) => {
			for (let i = srcIndex; i < taskList.length; i++) {
				if (taskList[i].mark == "none") return taskList[i].id;
			}
		})(sourceIndex);

		if (targetId == -1) {
			taskDisplayArea.append(taskContainer);
			return
		};
		TargetElement = document.getElementById(targetId);
		taskDisplayArea.insertBefore(taskContainer, TargetElement);

	} else {
		star.innerHTML = starFillIcon;
		taskContainer.dataset.mark = "mark";
		starDisplayArea.append(taskContainer);
	}
}

function updateTaskList(element, key, value) {
	let id, index;
	id = element.parentElement.parentElement.id;
	if (id === "js-input-container") {
		return;
	}

	index = findI(id)
	if (key) { taskList[index][key] = value }
	else { taskList[index] = value };
	saveToLocalStorage();
}

function saveToLocalStorage() {
	localStorage.setItem("taskList", JSON.stringify(taskList));
}

// ==== sort

let nav = document.getElementsByTagName("nav")[0].children;
let lastSelected = nav[0];

// value => checkbox Value, mode => just for control
function sort(value, mode) {
	let i, list, checkBox;
	list = taskDisplayArea.children;
	for (i = 0; i < list.length; i++) {
		checkBox = list[i].getElementsByClassName("checkBox")[0];
		if (checkBox.checked == value && mode) {
			list[i].classList.add("disappear");
		} else if (checkBox.checked == value && mode) {
			list[i].classList.remove("disappear");
		} else {
			list[i].classList.remove("disappear");
		}
	}
}

function switchStyle(target) {
	if (target == lastSelected) return;
	lastSelected.classList.remove('sort');
	target.classList.add("sort");
	lastSelected = target;
}

// all tasks
nav[0].onclick = function () { sort(false, false); switchStyle(this) }
// in progress
nav[1].onclick = function () { sort(true, true); switchStyle(this) }
// completed
nav[2].onclick = function () { sort(false, true); switchStyle(this) }


// ==== drag

let tmpTarget;

function getDragTarget(event) {
	if (event.target.id == "js-task-display-area") return;
	if (event.target.hasAttribute("draggable")) return event.target;
	for (let i = 0; i < event.path.length; i++) {
		if (event.path[i].hasAttribute("draggable")) {
			return event.path[i];
		}
	}
}

taskDisplayArea.ondragstart = function (event) {
	let i;
	dragItem = getDragTarget(event);
};

taskDisplayArea.ondragenter = function (event) {
	let target = getDragTarget(event);
	if (target && tmpTarget != target) {
		target.classList.add("drag-focus");
		if (tmpTarget) tmpTarget.classList.remove("drag-focus");
		tmpTarget = target;
	}
};

taskDisplayArea.ondragover = function (event) {
	let target = getDragTarget(event);
	if (target == taskDisplayArea.lastElementChild) {
		if (event.pageY > target.offsetTop + target.offsetHeight / 2) {
			target.classList.remove("drag-focus");
			target.classList.add("drag-focus-last");
		} else {
			target.classList.add("drag-focus");
			target.classList.remove("drag-focus-last");
		}
	}
	event.preventDefault();
};
taskDisplayArea.ondragleave = function (event) { event.preventDefault() };

taskDisplayArea.ondrop = function (event) {
	let target, sourceItem, sourceIndex, targetIndex;


	target = getDragTarget(event);
	sourceIndex = taskList.findIndex((i) => { return i.id == dragItem.id });
	sourceItem = taskList.splice(sourceIndex, 1)[0];

	if (target == taskDisplayArea.lastElementChild &&
		event.pageY > target.offsetTop + target.offsetHeight / 2) {
		dragItem.remove();
		taskDisplayArea.append(dragItem);
		targetIndex = taskList.length + 1;
		target.classList.remove("drag-focus-last");
	} else if (target.hasAttribute("draggable")) {
		taskDisplayArea.insertBefore(dragItem, target);
		targetIndex = taskList.findIndex((i) => { return i.id == target.id });
	};

	target.classList.remove("drag-focus");

	taskList.splice(targetIndex, 0, sourceItem);
	saveToLocalStorage();
};

// ==== onload、create inputContainer
window.onload = function () {

	// load localStorage's taskList, create task items, add into taskDisplayArea.
	let storage, i;
	storage = this.JSON.parse(this.localStorage.getItem("taskList"));
	if (storage) {
		taskList = storage;
		for (i = 0; i < storage.length; i++) {
			let data, task;
			data = storage[i];
			task = createTaskContainer(data)
			task.id = data.id;
			
			if (data.mark == "mark") {
				starDisplayArea.appendChild(task);
				continue;
			}
			taskDisplayArea.append(task);
		}
	};

	// create inputBlock, diffirent from createTaskContainer()

	let inputTitleBlock, inputSettingBlock,
		inputButtonGroup, cancelAddButton, addButton;
	inputContainer = document.createElement('section');
	inputContainer.classList.add("task-container", "disappear");
	inputContainer.id = "js-input-container";
	inputContainer.dataset.mark = "none";

	inputTitleBlock = createTitleBlock();
	inputTitleBlock.lastElementChild.id = 'js-input-task-title-span';

	inputTitleBlock.getElementsByClassName('star')[0].onclick = () => switchStarStatus(inputContainer);
	inputTitleBlock.getElementsByClassName("check-mark")[0].onclick = null;
	// test


	inputSettingBlock = creatDetailBlock();
	inputButtonGroup = createButtonBlock();

	// overwrite addButton.onclick
	addButton = inputButtonGroup.lastElementChild;
	addButton.textContent = '+ Add Task';
	addButton.onclick = function addNewTask() {
		let pushData, id, newTask;

		pushData = inputButtonGroup.getter();

		id = Date.now();
		pushData.id = id;
		taskList.splice(0, 0, pushData);
		// save into localStorage
		localStorage.setItem("taskList", JSON.stringify(taskList));

		addTaskInputDisappear();

		// add id on task main container
		newTask = createTaskContainer(pushData);
		newTask.id = id;

		if (newTask.dataset.mark == "mark") {
			starDisplayArea.appendChild(newTask);
			return;
		}

		taskDisplayArea.prepend(newTask);
	}

	cancelAddButton = inputButtonGroup.firstElementChild;
	// overwrite, not need to reset value, L178
	cancelAddButton.onclick = addTaskInputDisappear;

	inputContainer.append(inputTitleBlock, inputSettingBlock, inputButtonGroup);

	document.getElementById('js-main').insertBefore(inputContainer, taskDisplayArea);
}