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
		taskTitle: this.value,
	});

	const accordion = newTask.querySelector(".accordion")
	const submitButton = newTask.querySelector(".submit-button");
	const cancelButton = newTask.querySelector(".cancel-button");

	this.value = "";
	accordion.hidden = false;
	submitButton.innerHTML = "+ Add";
	submitButton.addEventListener("click", addHandler, {once: true});
	cancelButton.addEventListener("click", cancelHandler);

	this.parentNode.insertBefore(newTask, this);
	this.hidden = true;

	function addHandler() {
		newTask.id = Date.now();
		accordion.hidden = true;
		this.innerHTML = "+ Save";
		addNewTaskInput.hidden = false;
		
		cancelButton.removeEventListener("click", cancelHandler);
		reFreshPage(newTask.getData());
		newTask.remove();
	}
	
	function cancelHandler() {
		newTask.remove();
		addNewTaskInput.hidden = false;
	}
}

addNewTaskInput.addEventListener("keydown", addTaskHandler);

// 按照 isStar 在對應區塊 append
function appendElementDependOnStar(task) {
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

	// 這裡也可以另外抽出 reFreshPage 整個重新抽換 element 再生成。
	// 
	// tmpObject 所記錄的只有目前頁面上的 task element index，
	// 如果是在只顯示 In Progress / Completed 的狀態時，
	// 不會重新渲染全部的 task element
	let tmpObject = {};
	Array.from(normalArea.childNodes).forEach(item => tmpObject[item.id] = item)
	Array.from(starArea.childNodes).forEach(item => tmpObject[item.id] = item)

	taskList.forEach((data) => {
		appendElementDependOnStar(tmpObject[data.id]);
	});
}

bindDrag(normalArea, dealDragOrder);
bindDrag(starArea, dealDragOrder);

// ==== sort button

function refreshActivePage(selfElement) {
	normalArea.textContent = "";
	starArea.textContent = "";
	Array.from(navButtonGroup.children).forEach(item => item.classList.remove('sort'));
	selfElement.classList.add('sort');
}

myTasksButton.addEventListener("click", function () {
	whichSort = 'all';
	refreshActivePage(this);
	taskList.forEach(item => {
		appendElementDependOnStar(createTask(item))
	})
})
inProgressButton.addEventListener("click", function () {
	whichSort = 'progress';
	refreshActivePage(this);
	taskList.forEach(item => {
		if (!item.isComplete) appendElementDependOnStar(createTask(item))
	})
})
completedButton.addEventListener("click", function () {
	whichSort = 'completed';
	refreshActivePage(this);
	taskList.forEach(item => {
		if (item.isComplete) appendElementDependOnStar(createTask(item))
	})
})
// ==== onload

function reFreshPage(changeData) {
	taskList = updateTaskList(taskList, changeData)
	localStorage.setItem("taskList", JSON.stringify(taskList));
	normalArea.textContent = "";
	starArea.textContent = "";
	switch (whichSort) {
		case 'total':
			taskList.forEach(item => {
				appendElementDependOnStar(createTask(item))
			})
			break;
		case 'progress':
			taskList.forEach(item => {
				if (!item.isComplete) appendElementDependOnStar(createTask(item))
			})
			break;
		case 'completed':
			taskList.forEach(item => {
				if (item.isComplete) appendElementDependOnStar(createTask(item))
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
			appendElementDependOnStar(task);
			// task.querySelector(".star").addEventListener("click", () => reRenderTaskList(task));
		});
	}

	window.addEventListener("taskUpdate", (event) => reFreshPage(event.detail));
};
