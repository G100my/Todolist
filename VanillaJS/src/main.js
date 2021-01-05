import createTask from "./components/taskBlock.js";
import {updateTaskList} from "./store/store.js";
import bindDrag from "/utility/drag.js";

const starArea = document.getElementById("star-task-area");
const normalArea = document.getElementById("normal-task-area");
const addNewTaskInput = document.getElementById("add-new-task-block");
const myTasksButton = document.getElementById("my-tasks");
const inProgressButton = document.getElementById("in-progress");
const completedButton = document.getElementById("completed");
const navButtonGroup = document.querySelector('div.nav-container');
let taskList = [];
let whichSort = 'total';

// 在新增完任務名稱後按下 enter 時，建立新的 task block，插在 input 前面，input 隱藏
// 並且給予 task block 第一次建立時的 handler
function addTaskHandler(event) {
	if (event.key !== "Enter") return;

	const newTask = createTask({
		taskTitle: addNewTaskInput.value,
	});
	newTask.querySelector(".accordion").hidden = false;
	const submitButton = newTask.querySelector(".submit-button");
	const cancelButton = newTask.querySelector(".cancel-button");

	submitButton.innerHTML = "+ Add";
	submitButton.addEventListener("click", addHandler, {once: true});
	cancelButton.addEventListener("click", cancelHandler);
	this.parentNode.insertBefore(newTask, this);
	this.hidden = true;

	function addHandler() {
		newTask.id = Date.now();
		newTask.querySelector(".accordion").hidden = true;
		this.innerHTML = "+ Save";
		addNewTaskInput.hidden = false;
		addNewTaskInput.value = "";
		cancelButton.removeEventListener("click", cancelHandler);
		reFreshPage(newTask.getData());
		newTask.remove();
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
// 渲染時重新分配有標記 star 的區塊該出現的位置
function starMove(task) {
	if (task.isStar) starArea.append(task);
	else normalArea.append(task);
}
// ==== drag - Event Delegation
// 拖曳時改變資料 array 順序
function dealDragOrder(dragItem, insertBeforeItem) {
	const dragItemDataIndex = taskList.findIndex(item => item.id == dragItem.id);
	const dragItemData = taskList.splice(dragItemDataIndex, 1)[0];

	if (!insertBeforeItem) taskList.push(dragItemData)
	else {
		const insertBeforeIndex = taskList.findIndex(item => item.id == insertBeforeItem.id);
		taskList.splice(insertBeforeIndex, 0, dragItemData)
	}
	localStorage.setItem("taskList", JSON.stringify(taskList))
	reRenderTaskList();
}

bindDrag(normalArea, dealDragOrder);
bindDrag(starArea, dealDragOrder);

// ==== sort button

function sortReset(selfElement) {
	normalArea.textContent = "";
	starArea.textContent = "";
	Array.from(navButtonGroup.children).forEach(item => item.classList.remove('sort'));
	selfElement.classList.add('sort');
}

myTasksButton.addEventListener("click", function () {
	whichSort = 'total';
	sortReset(this);
	taskList.forEach(item => {
		starMove(createTask(item))
	})
})
inProgressButton.addEventListener("click", function () {
	whichSort = 'progress';
	sortReset(this);
	taskList.forEach(item => {
		if (!item.isComplete) starMove(createTask(item))
	})
})
completedButton.addEventListener("click", function () {
	whichSort = 'completed';
	sortReset(this);
	taskList.forEach(item => {
		if (item.isComplete) starMove(createTask(item))
	})
})
// ==== onload

function reFreshPage(changeData) {
	taskList = updateTaskList(taskList, changeData)
	console.log(taskList)
	localStorage.setItem("taskList", JSON.stringify(taskList));
		normalArea.textContent = "";
		starArea.textContent = "";
		switch (whichSort) {
			case 'total':
				taskList.forEach(item => {
					starMove(createTask(item))
				})
				break;
			case 'progress':
				taskList.forEach(item => {
					if (!item.isComplete) starMove(createTask(item))
				})
				break;
			case 'completed':
				taskList.forEach(item => {
					if (item.isComplete) starMove(createTask(item))
				})
				break;
			default:
				throw 'somethig wrong which resort tasklist'
		}
}

window.onload = function () {
	let string = localStorage.getItem("taskList");
	let storage = JSON.parse(string);

	if (Array.isArray(storage)) {
		taskList = storage;
		taskList.forEach((taskData) => {
			const task = createTask(taskData);
			starMove(task);
			// task.querySelector(".star").addEventListener("click", () => reRenderTaskList(task));
	});
	}

	window.addEventListener("taskUpdate", (event) => reFreshPage(event.detail));
};
