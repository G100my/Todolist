import { datetimeIcon, fileIcon, commentIcon } from "../icon/icon.js";

// ==== detail block
function creatDetailBlock() {
	let detailBlock, div, deadlineText, deadlineDate, deadlineTime, file, comment;

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
	comment.innerHTML = commentIcon + '<span>Comment</span>' +
		'<textarea name="comment" cols="30" rows="10" placeholder="Type your memo here..."></textarea>';

	detailBlock.append(div, file, comment);

	// use it when create a new task
	detailBlock.setDetail = function (pushData) {
		deadlineDate.value = pushData.date;
		deadlineTime.value = pushData.time;
		// file.value = pushData.file;
		comment.lastElementChild.value = pushData.comment;
	}

	detailBlock.deadlineDate = deadlineDate;
	detailBlock.deadlineTime = deadlineTime;
	detailBlock.comment = comment;

	return detailBlock;
}

export default creatDetailBlock;