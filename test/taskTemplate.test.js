import createTaskBlock from '../src/components/taskBlock.js';
import { datetimeIcon, fileIcon, commentIcon, editIcon, starEmptyIcon, starFillIcon } from '../src/icon/icon.js';

function findDifferance(elemnetString, templateString) {
	const length = elemnetString.length > templateString.length ? elemnetString.length : templateString.length;
	for (let i = 0; i < length; i++) {
		if (elemnetString[i] != templateString[i]) {
			elemnetString = elemnetString.slice(0, i) + "\n\n" + elemnetString.slice(i, elemnetString.length)
			templateString = templateString.slice(0, i) + "\n\n" + templateString.slice(i, templateString.length)
			console.warn(`position: ${i}`, elemnetString, templateString);
			break;
		}
	}
}

describe('task block', () => {
	
	test('with income data', () => {
		const incomeData = {
			id: 1111111,
			isComplete: true,
			isStar: false,
			taskTitle: "安安",
			deadlineDate: "2020-02-20",
			deadlineTime: "00:00:00",
			file: null,
			comment: "Hello",
		}
		const taskBlock = createTaskBlock(incomeData)
		const templateString = `
			<div id="${incomeData.id}" class="task-container" draggable="true">
				<div class="title-block">
					<label class="checkbox-container">
						<input class="checkbox" type="checkbox">
						<span class="check-mark"></span>
					</label>
					<a class="edit">${editIcon}</a>
					<a class="star">${starEmptyIcon}</a>
					<span>${incomeData.taskTitle}</span>
					<div class="status-block">
						<span>${datetimeIcon} 2020-02-20 00:00:00</span>
						<span>${commentIcon}</span>
					</div>
				</div>

				<div class="accordion" hidden="">
					<div class="setting-block">
						<div>
							${datetimeIcon}
							<span>Deadline</span>
							<input type="date">
							<input type="time">
						</div>
						<div>
							${fileIcon}
							<span>File</span>
							<label class="file-upload">+<input type="file"></label>
						</div>
						<div>
							${commentIcon}
							<span>Comment</span>
							<textarea placeholder="Type your memo here..." cols="30" rows="10"></textarea>
						</div>
					</div>

					<div class="button-block">
						<button class="cancel-button">Cancel</button>
						<button class="submit-button">+ Save</button>
					</div>
				</div>
			</div>
		`.replace(new RegExp(/(\r\n|\t|\n)/, 'g'), '');

		findDifferance(taskBlock.outerHTML, templateString)
		expect(taskBlock.outerHTML).toMatch(templateString)
	})
})

