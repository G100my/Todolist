module.exports = function findDifferance(elemnetString, templateString) {
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
