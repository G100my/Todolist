import { datetimeIcon, fileIcon, commentIcon } from "../icon/icon.js";

// ==== statusBlock
function createStatusBlock(pushData) {
	let statusBlock, deadlineSpan, fileSpan, commentSpan;

	statusBlock = document.createElement('div');
	statusBlock.className = "status-block";

	statusBlock.reset = function (Data) {
		// remove all children element, reset child one by one.
		while (this.firstChild) { this.removeChild(this.firstChild) }

		// if no data, return undefined
		if (Data.date == '' && Data.time == '' && Data.file === undefined && Data.comment == '') { return };
		if (Data.date !== '' || Data.time !== '') {
			deadlineSpan = document.createElement('span');
			deadlineSpan.innerHTML = (datetimeIcon + ' ' + Data.date + ' ' + Data.time).trim().replace('  ', ' ');
			statusBlock.appendChild(deadlineSpan);
		};
		if (Data.file !== undefined) {
			fileSpan = document.createElement('span');
			fileSpan.innerHTML = fileIcon;
			statusBlock.appendChild(fileSpan);
		};
		if (Data.comment != '') {
			commentSpan = document.createElement('span');
			commentSpan.innerHTML = commentIcon;
			statusBlock.appendChild(commentSpan);
		};
	}

	statusBlock.reset(pushData);

	return statusBlock;
}

export default createStatusBlock;