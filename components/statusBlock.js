import { datetimeIcon, fileIcon, commentIcon } from "../icon/icon.js";

// ==== statusBlock
function createStatusBlock() {
	let statusBlock, deadlineSpan, fileSpan, commentSpan;

	statusBlock = document.createElement('div');
	statusBlock.className = "status-block";

	statusBlock.setStatus = function (incomeData) {
		// remove all children element, reset child one by one.
		while (this.firstChild) { this.removeChild(this.firstChild) }

		// if no data, return undefined
		if (incomeData.date == '' && incomeData.time == '' && incomeData.file === undefined && incomeData.comment == '') { return };
		if (incomeData.date !== '' || incomeData.time !== '') {
			deadlineSpan = document.createElement('span');
			deadlineSpan.innerHTML = (datetimeIcon + ' ' + incomeData.date + ' ' + incomeData.time).trim().replace('  ', ' ');
			statusBlock.appendChild(deadlineSpan);
		};
		if (incomeData.file !== undefined) {
			fileSpan = document.createElement('span');
			fileSpan.innerHTML = fileIcon;
			statusBlock.appendChild(fileSpan);
		};
		if (incomeData.comment != '') {
			commentSpan = document.createElement('span');
			commentSpan.innerHTML = commentIcon;
			statusBlock.appendChild(commentSpan);
		};
	}

	return statusBlock;
}

export default createStatusBlock;