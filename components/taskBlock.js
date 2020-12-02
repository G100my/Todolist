import createButtonBlock from "./buttonBlock.js";
import creatDetailBlock from "./detailBlock.js";
import createStatusBlock from "./statusBlock.js";
import createTitleBlock from "./titleBlock.js";
import { starFillIcon, starEmptyIcon } from "../icon/icon.js";

function createTask(incomeData) {
	let task, titleBlock, statusBlock, detailBlock, buttonGroup, accordion;
	
	task = Object.assign(document.createElement('div'), {
		id: "",
		isComplete: false,
		isStar: false,
		taskTitle: "",
		deadlineDate: undefined,
		deadlineTime: undefined,
		file: null,
		comment: "",
		submitButton: undefined,
		cancelButton: undefined,
	});
	task.className = "task-container";
	task.draggable = true;
	task.getData = function () {
		return {
			id: this.id,
			isComplete: this.isComplete,
			isStar: this.isStar,
			taskTitle: this.taskTitle,
			deadlineDate: this.deadlineDate,
			deadlineTime: this.deadlineTime,
			file: this.file,
			comment: this.comment,
		}
	}

	titleBlock = createTitleBlock();
	titleBlock.checkbox.addEventListener("input", function () {
		task.isComplete = this.checked;
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

	function updateData () {
		task.taskTitle = titleBlock.taskMassage.textContent;
		task.deadlineDate = detailBlock.deadlineDate.value;
		task.deadlineTime = detailBlock.deadlineTime.value;
		task.comment = detailBlock.comment.value;
		reRender("all");
	}

	function cancelDetail () {
		titleBlock.taskMassage.textContent = task.taskTitle;
		detailBlock.deadlineDate.value = task.deadlineDate;
		detailBlock.deadlineTime.value = task.deadlineTime;
		detailBlock.comment.value = task.comment;
	}

	buttonGroup = createButtonBlock();
	buttonGroup.submitButton.addEventListener("click", updateData);
	buttonGroup.cancelButton.addEventListener("click", cancelDetail);

	accordion = document.createElement('div')
	accordion.className = "accordion";
	accordion.append(detailBlock, buttonGroup)

	task.append(titleBlock, accordion);

	if (incomeData) {
		task = Object.assign(task, incomeData);
	}
	reRender("all");

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
				})
				break;
			
			case "checkbox":
				titleBlock.checkbox.checked = task.isComplete;
				break;
			case "star":
				titleBlock.starButton.innerHTML = (task.isStar) ? starFillIcon : starEmptyIcon;
				break;
			case "taskMassage":
				titleBlock.taskMassage.textContent = task.taskTitle;
				break;
			case "deadlineDate":
				detailBlock.deadlineDate.value = task.deadlineDate;
				break;
			case "deadlineTime":
				detailBlock.deadlineTime.value = task.deadlineTime;
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
