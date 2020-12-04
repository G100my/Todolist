// ==== drag - Event Delegation

function bindDrag(parent, callback) {
	let dragItem, overItem, isUpsideToDownside, currentRangeMinY, currentRangeMaxY, overPreviousY;

	function targetFilter(event) {
		if (event.target.id == "normal-task-area") return;
		if (event.target.hasAttribute("draggable")) return event.target;
		for (let i = 0; i < event.path.length; i++) {
			if (event.path[i].hasAttribute("draggable")) {
				return event.path[i];
			}
		}
	}

	function dragstartHandler(event) {
		dragItem = event.target;
		currentRangeMinY = dragItem.offsetTop;
		currentRangeMaxY = dragItem.offsetTop + dragItem.offsetHeight;
		dragItem.style.opacity = 0.3;
		dragItem.style.transform = `scale(0.8)`;
	}

	function dragenterHandler(event) {
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
		event.preventDefault();
		const tmpTarget = targetFilter(event);
		if (tmpTarget === dragItem || tmpTarget === undefined) return;

		isUpsideToDownside = overPreviousY < event.pageY;
		console.log(isUpsideToDownside);
		overItem.style.margin = isUpsideToDownside ? `0 0 ${overItem.offsetHeight}px` : `${overItem.offsetHeight}px 0 0`;
	}

	function dragleaveHandler(event) {
		event.preventDefault();
		const tmpTarget = targetFilter(event);
		if (tmpTarget === dragItem || tmpTarget === undefined) return;
	}

	function dropHandler(event) {
		event.preventDefault();
		const insertBeforeItem = isUpsideToDownside ? overItem.nextSibling : overItem;
		this.insertBefore(dragItem, insertBeforeItem);
		
		callback(dragItem, insertBeforeItem);
	}

	function dragendHandler() {
		dragItem.removeAttribute("style");
		overItem.removeAttribute("style");
	}

	parent.addEventListener("dragstart", dragstartHandler);
	parent.addEventListener("dragenter", dragenterHandler);
	parent.addEventListener("dragover", dragoverHandler);
	parent.addEventListener("dragleave", dragleaveHandler);
	parent.addEventListener("drop", dropHandler);
	parent.addEventListener("dragend", dragendHandler);
}

export default bindDrag;
