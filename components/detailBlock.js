// ==== detail block
function creatDetailBlock() {
	let settingBlock, div, span, date, time, file, comment;

	// create settingBlock (container)
	settingBlock = document.createElement('div');
	settingBlock.className = "setting-block";

	// Deadline
	div = document.createElement('div');
	div.innerHTML = datetimeIcon;
	span = document.createElement('span');
	span.textContent = 'Deadline';
	date = document.createElement('input');
	date.type = 'date';
	time = document.createElement('input');
	time.type = 'time';

	div.append(span, document.createElement('br'), date, time);

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

	settingBlock.append(div, file, comment);

	// use it when create a new task
	settingBlock.setter = function (pushData) {
		date.value = pushData.date;
		time.value = pushData.time;
		// file.value = pushData.file;
		comment.lastElementChild.value = pushData.comment;
	}
	return settingBlock;
}

export default creatDetailBlock;