import createTask from "./components/taskBlock.js";
import {updateTaskList} from "./store/store.js";

const starArea = document.getElementById("star-task-area");
const normalArea = document.getElementById("normal-task-area");
const addNewTaskInput = document.getElementById("add-new-task-block");

addNewTaskInput.addEventListener("keydown", function (event) {
	if (event.key !== "Enter") return;
	const initialData = {
		id: Date.now(),
		taskTitle: addNewTaskInput.value,
	};
	const newTask = createTask(initialData);
	newTask.querySelector(".accordion").hidden = false;
	const submitButton = newTask.querySelector(".submit-button");
	const cancelButton = newTask.querySelector(".cancel-button");

	function addHandler() {
		// starArea.append(newTask);
		newTask.querySelector(".accordion").hidden = true;
		this.innerHTML = "+ Save";
		addNewTaskInput.hidden = false;
		addNewTaskInput.value = "";
		starMove(newTask);
		newTask.querySelector(".star").addEventListener("click", () => starMove(newTask));
		cancelButton.removeEventListener("click", cancelHandler);
	}

	function cancelHandler() {
		newTask.remove();
		addNewTaskInput.hidden = false;
		addNewTaskInput.value = "";
	}

	submitButton.innerHTML = "+ Add";
	submitButton.addEventListener("click", addHandler, {once: true});
	cancelButton.addEventListener("click", cancelHandler);
	this.parentNode.insertBefore(newTask, this);
	this.hidden = true;
});

function starMove(task) {
	if (task.isStar) starArea.append(task);
	else normalArea.append(task);
}

// ==== drag

let tmpTarget, dragItem;

function getDragTarget(event) {
	if (event.target.id == "normal-task-area") return;
	if (event.target.hasAttribute("draggable")) return event.target;
	for (let i = 0; i < event.path.length; i++) {
		if (event.path[i].hasAttribute("draggable")) {
			return event.path[i];
		}
	}
}

normalArea.ondragstart = function (event) {
	dragItem = getDragTarget(event);
};

normalArea.ondragenter = function (event) {
	let target = getDragTarget(event);
	if (target && tmpTarget != target) {
		target.classList.add("drag-focus");
		if (tmpTarget) tmpTarget.classList.remove("drag-focus");
		tmpTarget = target;
	}
};

normalArea.ondragover = function (event) {
	let target = getDragTarget(event);
	if (target == normalArea.lastElementChild) {
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
normalArea.ondragleave = function (event) { event.preventDefault() };

normalArea.ondrop = function (event) {
	let target, sourceItem, sourceIndex, targetIndex;

	target = getDragTarget(event);
	sourceIndex = taskList.findIndex((i) => { return i.id == dragItem.id });
	sourceItem = taskList.splice(sourceIndex, 1)[0];

	if (target == normalArea.lastElementChild &&
		event.pageY > target.offsetTop + target.offsetHeight / 2) {
		dragItem.remove();
		normalArea.append(dragItem);
		targetIndex = taskList.length + 1;
		target.classList.remove("drag-focus-last");
	} else if (target.hasAttribute("draggable")) {
		normalArea.insertBefore(dragItem, target);
		targetIndex = taskList.findIndex((i) => { return i.id == target.id });
	};

	target.classList.remove("drag-focus");

	taskList.splice(targetIndex, 0, sourceItem);
	// saveToLocalStorage();
};

// ==== onload、create inputContainer

window.onload = function () {
	this.taskList = [];
	let string = localStorage.getItem("taskList");
	let storage = JSON.parse(string);

	if (Array.isArray(storage)) {
		this.taskList = storage;
		this.taskList.forEach((taskData) => {
			const task = createTask(taskData);
			starMove(task);
		});
	}

	window.addEventListener("taskUpdate", function (event) {
		localStorage.setItem("taskList", JSON.stringify(updateTaskList(this.taskList, event.detail)));
		// console.table(this.taskList);
	});
};

// 	// create inputBlock, diffirent from createTaskContainer()

