import createDetailBlock from '../components/detailBlock.js';
import { datetimeIcon, fileIcon, commentIcon } from "../icon/icon.js";
import createButtonBlock from '../components/buttonBlock.js';


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
			<button class="submit-button">+ Save</button>
		</div>`.replace(new RegExp(/(\r\n|\t|\n)/, 'g'), '');

	test('plain DOM', () => {
		expect(buttonBlock.outerHTML).toMatch(templateString);
	});
});

