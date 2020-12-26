import createTask from "./components/taskBlock.js";
import {updateTaskList} from "./store/store.js";
import bindDrag from "./utility/drag.js";

const starArea = document.getElementById("star-task-area");
const normalArea = document.getElementById("normal-task-area");
const addNewTaskInput = document.getElementById("add-new-task-block");
const myTasksButton = document.getElementById("my-tasks");
const inProgressButton = document.getElementById("in-progress");
const completedButton = document.getElementById("completed");
var taskList = [];

function addTaskHandler(event) {
	if (event.key !== "Enter") return;
	
	const initialData = {
		id: Date.now(),
		taskTitle: addNewTaskInput.value,
	};

	const newTask = createTask(initialData);
	newTask.querySelector(".accordion").hidden = false;
	const submitButton = newTask.querySelector(".submit-button");
	const cancelButton = newTask.querySelector(".cancel-button");

	submitButton.innerHTML = "+ Add";
	submitButton.addEventListener("click", addHandler, {once: true});
	cancelButton.addEventListener("click", cancelHandler);
	this.parentNode.insertBefore(newTask, this);
	this.hidden = true;

	function addHandler() {
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
}

addNewTaskInput.addEventListener("keydown", addTaskHandler);

// view rander

function reRenderTaskList() {
	let tmpObject = {};
	let tmpElementList = Array.from(normalArea.childNodes).concat(Array.from(starArea.childNodes));
	tmpElementList.forEach(item => tmpObject[item.id] = item)

	taskList.forEach((data) => {
		starMove(tmpObject[data.id]);
	});
}

function starMove(task) {
	if (task.isStar) starArea.append(task);
	else normalArea.append(task);
}
// ==== drag - Event Delegation

function dealDragOrder(dragItem, insertBeforeItem) {
	const dragItemDataIndex = taskList.findIndex(item => item.id === dragItem.id);
	const dragItemData = taskList.splice(dragItemDataIndex, 1)[0];
	if (insertBeforeItem === null)
		taskList.push(dragItemData)
	else {
		const insertBeforeIndex = taskList.findIndex(item => item.id === insertBeforeItem.id);
		taskList.splice(insertBeforeIndex, 0, dragItemData)
	}
	localStorage.setItem("taskList", JSON.stringify(taskList))
	reRenderTaskList();
}

bindDrag(normalArea, dealDragOrder);
bindDrag(starArea, dealDragOrder);

// ==== sort button

myTasksButton.addEventListener("click", () => {
	normalArea.textContent = "";
	starArea.textContent = "";
	taskList.forEach(item => {
		starMove(createTask(item))
	})
})
inProgressButton.addEventListener("click", () => {
	normalArea.textContent = "";
	starArea.textContent = "";
	taskList.forEach(item => {
		if (!item.isComplete) starMove(createTask(item))
	})
})
completedButton.addEventListener("click", () => {
	normalArea.textContent = "";
	starArea.textContent = "";
	taskList.forEach(item => {
		if (item.isComplete) starMove(createTask(item))
	})
})
// ==== onload

window.onload = function () {
	let string = localStorage.getItem("taskList");
	let storage = JSON.parse(string);

	if (Array.isArray(storage)) {
		taskList = storage;
		taskList.forEach((taskData) => {
			const task = createTask(taskData);
			starMove(task);
			task.querySelector(".star").addEventListener("click", () => reRenderTaskList(task));
		});
	}

	window.addEventListener("taskUpdate", function (event) {
		localStorage.setItem("taskList", JSON.stringify(updateTaskList(taskList, event.detail)));
	});
};
