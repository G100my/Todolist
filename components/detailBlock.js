import { datetimeIcon, fileIcon, commentIcon } from "../icon/icon.js";

// ==== detail block
function creatDetailBlock() {
	let detailBlock, div, deadlineText, deadlineDate, deadlineTime, file, comment, textarea;

	// create settingBlock (container)
	detailBlock = document.createElement('div');
	detailBlock.className = "setting-block";

	// Deadline
	div = document.createElement('div');
	div.innerHTML = datetimeIcon;
	deadlineText = document.createElement('span');
	deadlineText.textContent = 'Deadline';
	deadlineDate = document.createElement('input');
	deadlineDate.type = 'date';
	deadlineTime = document.createElement('input');
	deadlineTime.type = 'time';

	div.append(deadlineText, document.createElement('br'), deadlineDate, deadlineTime);

	// file
	file = document.createElement('div');
	file.innerHTML = fileIcon +
		'<span>File</span>' +
		'<label class="file-upload">+' +
		'<input type="file">' +
		'</label>' +
		'</div>';

	// comment
	comment = document.createElement('div');
	comment.innerHTML = commentIcon + '<span>Comment</span>'
	textarea = document.createElement('textarea');
	textarea.placeholder = "Type your memo here...";
	textarea.cols = 30;
	textarea.rows = 10;
	comment.append(textarea);

	detailBlock.append(div, file, comment);

	detailBlock.deadlineDate = deadlineDate;
	detailBlock.deadlineTime = deadlineTime;
	detailBlock.comment = textarea;

	return detailBlock;
}

export default creatDetailBlock;