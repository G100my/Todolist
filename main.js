import createButtonBlock from "./components/buttonBlock.js";
import creatDetailBlock from "./components/detailBlock.js";
import createStatusBlock from "./components/statusBlock.js";
import createTitleBlock from "./components/titleBlock.js";

import { starEmptyIcon, starFillIcon } from "./icon/icon.js";


let taskList = [];
let disappearSwitch = false;

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

let navItems = document.querySelector(".nav-container").children;
let lastSelected = navItems[0];

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
navItems[0].onclick = function () { sort(false, false); switchStyle(this) }
// in progress
navItems[1].onclick = function () { sort(true, true); switchStyle(this) }
// completed
navItems[2].onclick = function () { sort(false, true); switchStyle(this) }


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