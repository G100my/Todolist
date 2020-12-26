import createTaskBlock from '../src/components/taskBlock.js';
import find from './findDifferance.js';
import { datetimeIcon, fileIcon, commentIcon, editIcon, starEmptyIcon, starFillIcon } from '../src/icon/icon.js';

document.body.innerHTML = `
	<nav>
		<div class="nav-container">
			<a id="my-tasks"  class="navItem sort" type="button"><span>My Tasks</span><span class="bottomLine"></sapn></a>
			<a id="in-progress"  class="navItem" type="button"><span>In Progress</span><span class="bottomLine"></sapn></a>
			<a id="completed"  class="navItem" type="button"><span>Completed</span><span class="bottomLine"></sapn></a>
		</div>
	</nav>
	<main>
		<div>
			<input id="add-new-task-block" class="task-title-input" type="text" placeholder="Add Task"></input>
		</div>
		<section id="star-task-area" class="task-display-area"></section>
		<section id="normal-task-area" class="task-display-area"></section>
	</main>
`;

require('../src/main.js');

describe('main', () => {
	
	test('add new Task, press enter', () => {
		const inputArea = document.querySelector('main>div');
		const newTaskInput = document.getElementById('add-new-task-block');
		newTaskInput.value = '安安';
		newTaskInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
		inputArea.querySelector('div[id]').id = '000';

		const testString = inputArea.innerHTML.trim();
		const incomeData = {
			id: "000",
			taskTitle: "安安",
		}
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
				</div>
			</div>

			<div class="accordion">
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
					<button class="submit-button">+ Add</button>
				</div>
			</div>
		</div>
	`.replace(new RegExp(/(\r\n|\t|\n)/, 'g'), '');

		find(testString, templateString)

		expect(testString).toMatch(`${templateString}<input id="add-new-task-block" class="task-title-input" type="text" placeholder="Add Task" hidden="">`);

	})
})
