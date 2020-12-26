function findTaskIndex(array, incomeTask) {
	return array.findIndex(item => {
		return item.id === incomeTask.id
	})
}


function updateTaskList(array, income) {
	if (!Array.isArray(array)) throw "targetArray is not array";
	if (typeof array !== "object") throw "income is not object";

	const index = findTaskIndex(array, income)

	if (index === -1) array.push(income);
	else array[index] = income;
	
	return array
}

export {
	findTaskIndex,
	updateTaskList,
};