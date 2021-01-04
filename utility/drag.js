// ==== drag - Event Delegation

// 事件委派, 事件是綁在 parent
function bindDrag(parent, callback) {
	let dragItem, overItem, isUpsideToDownside, currentRangeMinY, currentRangeMaxY, overPreviousY, parentId;
	// 過濾掉 target 是裡面的其他元件等情況
	function targetFilter(event) {
		if (event.target === parent) return;
		if (event.target.hasAttribute("draggable")) return event.target;
		for (let i = 0; i < event.path.length; i++) {
			if (event.path[i].hasAttribute("draggable")) {
				return event.path[i];
			}
		}
	}

	function dragstartHandler(event) {
		parent.style.border = 'gray 1px dashed';
		parentId = parent.id;
		dragItem = event.target;
		currentRangeMinY = dragItem.offsetTop;
		currentRangeMaxY = dragItem.offsetTop + dragItem.offsetHeight;
		dragItem.style.opacity = 0.3;
		dragItem.style.transform = `scale(0.95)`;
	}

	function dragenterHandler(event) {
		if (parent.id !== parentId) return;
		if (event.pageY > currentRangeMinY && event.pageY < currentRangeMaxY) return;

		const tmpTarget = targetFilter(event);
		if (tmpTarget === undefined) return;

		if (overItem) overItem.style.removeProperty("margin");

		overItem = tmpTarget;
		currentRangeMinY = overItem.offsetTop;
		currentRangeMaxY = overItem.offsetTop + overItem.offsetHeight;
		overPreviousY = event.pageY;
	}

	function dragoverHandler(event) {
		if (parent.id !== parentId) return;
		event.preventDefault();
		const tmpTarget = targetFilter(event);
		if (tmpTarget === dragItem || tmpTarget === undefined) return;

		isUpsideToDownside = overPreviousY < event.pageY;
		overItem.style.margin = isUpsideToDownside ? `0 0 ${overItem.offsetHeight}px` : `${overItem.offsetHeight}px 0 0`;
	}

	function dropHandler(event) {
		if (parent.id !== parentId) return;
		event.preventDefault();
		const insertBeforeItem = isUpsideToDownside ? overItem.nextSibling : overItem;
		// this.insertBefore(dragItem, insertBeforeItem); 改成資料驅動

		callback(dragItem, insertBeforeItem);
	}

	function dragendHandler() {
		if (parent.id !== parentId) return;
		dragItem.removeAttribute("style");
		overItem.removeAttribute("style");
		parentId = undefined;
	}

	parent.addEventListener("dragstart", dragstartHandler);
	parent.addEventListener("dragenter", dragenterHandler);
	parent.addEventListener("dragover", dragoverHandler);
	parent.addEventListener("drop", dropHandler);
	parent.addEventListener("dragend", dragendHandler);
}

export default bindDrag;
