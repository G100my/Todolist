import createButtonBlock from "./buttonBlock.js";
import creatDetailBlock from "./detailBlock.js";
import createStatusBlock from "./statusBlock.js";
import createTitleBlock from "./titleBlock.js";
import {starFillIcon, starEmptyIcon} from "/icon/icon.js";

// 集結四個 block 成為一個 task block
function createTask(incomeData) {
	let task, titleBlock, statusBlock, detailBlock, buttonGroup, accordion;
	// 預設初始值
	task = Object.assign(document.createElement("div"), {
		id: "",
		isComplete: false,
		isStar: false,
		taskTitle: "",
		deadlineDate: "",
		deadlineTime: "",
		file: null,
		comment: "",
		submitButton: undefined,
		cancelButton: undefined,
	});
	task.className = "task-container";
	task.draggable = true;
	// 設為 object property function，取值用的
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
		};
	};
	// 如果建立時有 incomeData 則覆蓋 task 預設值
	if (incomeData) {
		task = Object.assign(task, incomeData);
	}

	// 建立 titleBlock，個別綁 handler
	// 因為 handler 有可能會影響到其他 block ，所以在這一層才綁 handler
	titleBlock = createTitleBlock();
	titleBlock.checkbox.addEventListener("input", function () {
		task.isComplete = this.checked;
		emitUpdate();
	});
	titleBlock.starButton.addEventListener("click", function () {
		task.isStar = !task.isStar;
		reRender("star");
		emitUpdate();
	});
	titleBlock.taskMassage.addEventListener("input", function () {
		task.taskTitle = this.textContent;
		reRender("taskMassage");
		emitUpdate();
	});
	titleBlock.editButton.addEventListener("click", function () {
		accordion.hidden = !accordion.hidden;
	});

	statusBlock = createStatusBlock();
	titleBlock.append(statusBlock);

	detailBlock = creatDetailBlock();

	function updateData() {
		task.taskTitle = titleBlock.taskMassage.textContent;
		task.deadlineDate = detailBlock.deadlineDate.value;
		task.deadlineTime = detailBlock.deadlineTime.value;
		task.comment = detailBlock.comment.value;
		reRender("all");
		emitUpdate();
		accordion.hidden = true;
	}

	function cancelDetail() {
		titleBlock.taskMassage.textContent = task.taskTitle;
		detailBlock.deadlineDate.value = task.deadlineDate;
		detailBlock.deadlineTime.value = task.deadlineTime;
		detailBlock.comment.value = task.comment;
		accordion.hidden = true;
	}

	buttonGroup = createButtonBlock();
	buttonGroup.submitButton.addEventListener("click", updateData);
	buttonGroup.cancelButton.addEventListener("click", cancelDetail);

	accordion = document.createElement("div");
	accordion.className = "accordion";
	accordion.append(detailBlock, buttonGroup);
	accordion.hidden = true;

	task.append(titleBlock, accordion);

	// 各區塊建立完成後先 rerander 一次，把 task 初始化的值變成畫面
	reRender("all");

	// 自訂 event 透過 event 傳值給 window
	function emitUpdate() {
		const Data = task.getData();
		const taskUpdateEvent = new CustomEvent("taskUpdate", {detail: Data});
		window.dispatchEvent(taskUpdateEvent);
	}

	// 有可能不必全部都 reRender，設成各別項
	function reRender(handler) {
		const handlerNames = [
			'checkbox',
			'star',
			'taskMassage',
			'deadlineDate',
			'deadlineTime',
			'comment',
			'status'
		];
		switch (handler) {
			case "all":
				handlerNames.forEach((caseName) => {
					reRender(caseName);
				});
				break;

			case "checkbox":
				titleBlock.checkbox.checked = task.isComplete;
				break;
			case "star":
				titleBlock.starButton.innerHTML = task.isStar ? starFillIcon : starEmptyIcon;
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
				statusBlock.setStatus({
					date: task.deadlineDate,
					time: task.deadlineTime,
					file: task.file,
					comment: task.comment,
				});
				break;

			default:
				console.log("error: " + handler);
				break;
		}
	}
	return task;
}

export default createTask;
