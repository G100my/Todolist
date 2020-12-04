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

// ==== drag - Event Delegation

bindDrag(normalArea, () => {console.log("hi")});

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

