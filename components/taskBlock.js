import createButtonBlock from "./buttonBlock.js";
import creatDetailBlock from "./detailBlock.js";
import createStatusBlock from "./statusBlock.js";
import createTitleBlock from "./titleBlock.js";
import { starFillIcon, starEmptyIcon } from "../icon/icon.js";

function createTask(incomeData) {
	let task, titleBlock, statusBlock, detailBlock, buttonGroup, accordion;
	
	task = Object.assign(document.createElement('div'), {
		taskData: {
			id: 0,
			isComplate: false,
			isStar: false,
			taskTitle: undefined,
			deadlineDate: undefined,
			deadlineTime: undefined,
			file: null,
			comment: undefined,
			submitButton: undefined,
			cancelButton: undefined,
		}
	});
	task.className = "task-container";
	task.draggable = true;
	

	titleBlock = createTitleBlock();
	titleBlock.checkbox.addEventListener("input", function () {
		task.isComplate = this.checked;
	})
	titleBlock.starButton.addEventListener("click", function () {
		task.isStar = !task.isStar;
		reRender("star");
	})
	titleBlock.taskMassage.addEventListener("input", function () {
		task.taskTitle = this.textContent;
		reRender("taskMassage");
	})
	titleBlock.editButton.addEventListener("click", function () {
		accordion.hidden = !accordion.hidden
	})
	
	statusBlock = createStatusBlock();
	titleBlock.append(statusBlock);

	detailBlock = creatDetailBlock();

	buttonGroup = createButtonBlock();
	buttonGroup.submitButton.addEventListener("click", function () {
		task.deadlineDate = detailBlock.deadlineDate.value;
		task.deadlineTime = detailBlock.deadlineTime.value;
		task.comment = detailBlock.comment.value;
		reRender("all");
	});
	buttonGroup.cancelButton.addEventListener("click", function () {
		detailBlock.deadlineDate.value = task.deadlineDate;
		detailBlock.deadlineTime.value = task.deadlineTime;
		detailBlock.comment.value = task.comment;
	});

	accordion = document.createElement('div')
	accordion.append(detailBlock, buttonGroup)
	accordion.hidden = true;

	task.append(titleBlock, accordion);

	if (incomeData) {
		task = Object.assign(task, incomeData);
		reRender("all");
	}

	function reRender(handler) {
		const handlerNames = [
			"checkbox",
			"star",
			"taskMassage",
			"deadlineDate",
			"deadlineTime",
			"comment",
			"status",
		]
		switch (handler) {
			case "all":
				handlerNames.forEach((caseName) => {
					reRender(caseName);
					console.log(caseName)
					console.count("foreach")
				})
				console.warn("refresh all")
				break;
			
			case "checkbox":
				titleBlock.checkbox.checked = task.isComplate;
				break;
			case "star":
				titleBlock.starButton.innerHTML = (task.isStar) ? starFillIcon : starEmptyIcon;
				break;
			case "taskMassage":
				titleBlock.taskMassage.textContent = task.taskTitle;
				break;
			case "deadlineDate":
				detailBlock.deadlineDate.value = task.deadlineDate;
				console.log(detailBlock.deadlineDate.value)
				break;
			case "deadlineTime":
				detailBlock.deadlineTime.value = task.deadlineTime;
				console.log(detailBlock.deadlineTime.value)
				break;
			case "comment":
				detailBlock.comment.value = task.comment;
				break;
			case "status":
				statusBlock.setStatus(task.deadlineDate, task.deadlineTime, task.file, task.comment);
				break;
			
			default:
				console.log("error: " + handler)
				break;
		}
	}
	return task;
}

export default createTask;
