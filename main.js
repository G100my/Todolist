import createTask from "./components/taskBlock.js";
import {updateTaskList} from "./store/store.js";
import bindDrag from "./utility/drag.js";

const starArea = document.getElementById("star-task-area");
const normalArea = document.getElementById("normal-task-area");
const addNewTaskInput = document.getElementById("add-new-task-block");
var taskList = [];

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

// ==== onload、create inputContainer

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
