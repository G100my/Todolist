import { datetimeIcon, fileIcon, commentIcon } from "../../../icon/icon.js";

// ==== statusBlock
function createStatusBlock() {
	let statusBlock, deadlineSpan, fileSpan, commentSpan;

	statusBlock = document.createElement('div');
	statusBlock.className = "status-block";

	// 設為 object property function，重新渲染資料用的
	statusBlock.setStatus = function ({ date, time, file, comment }) {
		// remove all children element, reset child one by one.
		// while (this.firstChild) { this.removeChild(this.firstChild) }
		this.textContent = '';
		
		// if no data, return undefined
		if (!date && !time && !file && !comment) { return };
		if (date || time ) {
			deadlineSpan = document.createElement('span');
			deadlineSpan.innerHTML = `${datetimeIcon} ${date ? date : ""} ${time ? time : ""}`.trim().replace('  ', ' ');
			statusBlock.appendChild(deadlineSpan);
		};
		if (file) {
			fileSpan = document.createElement('span');
			fileSpan.innerHTML = fileIcon;
			statusBlock.appendChild(fileSpan);
		};
		if (comment) {
			commentSpan = document.createElement('span');
			commentSpan.innerHTML = commentIcon;
			statusBlock.appendChild(commentSpan);
		};
	}

	return statusBlock;
}

export default createStatusBlock;