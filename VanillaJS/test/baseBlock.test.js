import createTitleBlock from '../src/components/titleBlock.js';
import createStatusBlock from '../src/components/statusBlock.js';
import createDetailBlock from '../src/components/detailBlock.js';
import createButtonBlock from '../src/components/buttonBlock.js';
import { datetimeIcon, fileIcon, commentIcon, editIcon } from '../src/icon/icon.js';

describe('title block', () => {
	const titleBlock = createTitleBlock();

	const templateString = `
		<div class="title-block">
			<label class="checkbox-container">
				<input class="checkbox" type="checkbox">
				<span class="check-mark"></span>
			</label>
			<a class="edit">${editIcon}</a>
			<a class="star"></a>
			<span></span>
		</div>
	`.replace(new RegExp(/(\r\n|\t|\n)/, 'g'), '');

	test('plain Dom', () => {
		expect(titleBlock.outerHTML).toMatch(templateString);
	});
});

describe('status block', () => {
	const statusBlock = createStatusBlock();

	const templateString = `
	<div class="status-block"></div>
	`.replace(new RegExp(/(\r\n|\t|\n)/, 'g'), '');

	test('plain DOM', () => {
		expect(statusBlock.outerHTML).toMatch(templateString);
	});

	test('inject date', () => {
		const date = '2020-02-20';
		statusBlock.setStatus({ date });
		expect(statusBlock.innerHTML).toMatch(`<span>${datetimeIcon} ${date}</span>`);
	});

	test('inject time', () => {
		const time = '10:10:10';
		statusBlock.setStatus({ time });
		expect(statusBlock.innerHTML).toMatch(`<span>${datetimeIcon} ${time}</span>`);
	});

	test('inject date & time', () => {
		const date = '2020-02-20';
		const time = '10:10:10';
		statusBlock.setStatus({ date, time });
		expect(statusBlock.innerHTML).toMatch(`<span>${datetimeIcon} ${date} ${time}</span>`);
	});

	test('inject file', () => {
		const file = 'pretend something...';
		statusBlock.setStatus({ file });
		expect(statusBlock.innerHTML).toMatch(`<span>${fileIcon}</span>`);
	});

	test('inject comment', () => {
		const comment = 'pretend something...';
		statusBlock.setStatus({ comment });
		expect(statusBlock.innerHTML).toMatch(`<span>${commentIcon}</span>`);
	});

	test('inject date & comment', () => {
		const date = '2020-02-20';
		const comment = 'pretend something...';
		statusBlock.setStatus({ date, comment });
		expect(statusBlock.innerHTML).toMatch(`<span>${datetimeIcon} ${date}</span><span>${commentIcon}</span>`);
	});
});

describe('detail block', () => {
	const detailBlock = createDetailBlock();

	const templateString = `
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
	`.replace(new RegExp(/(\r\n|\t|\n)/, 'g'), '');

	test('plain DOM', () => {
		expect(detailBlock.outerHTML).toMatch(templateString);
	});
});

describe('button block', () => {
	const buttonBlock = createButtonBlock();
	// replace + regExp, contructor 可以 new RegExp('	', 'g') 這樣使用 如果忘記 tab 是什麼的話...
	const templateString = `
		<div class="button-block">
			<button class="cancel-button">Cancel</button>
			<button class="submit-button"></button>
		</div>`.replace(new RegExp(/(\r\n|\t|\n)/, 'g'), '');

	test('plain DOM', () => {
		expect(buttonBlock.outerHTML).toMatch(templateString);
	});
});
