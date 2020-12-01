import createButtonBlock from "./buttonBlock.js";
import creatDetailBlock from "./detailBlock.js";
import createStatusBlock from "./statusBlock.js";
import createTitleBlock from "./titleBlock.js";

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

export default createTaskContainer;
