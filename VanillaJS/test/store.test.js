import {updateTaskList} from "/store/store.js";

describe("store", () => {

	const income = {
		id: "123",
		num: 123,
		isStar: false,
	}

	test("origin is empty", () => {
		let origin = []

		expect( updateTaskList(origin, income) ).toEqual([{
			id: "123",
			num: 123,
			isStar: false,
		}]);
	})

	test("origin has same data id", () => {
		let origin = [{
			id: "123",
			num: 0,
			isStar: true,
		}]

		expect( updateTaskList(origin, income) ).toEqual([{
			id: "123",
			num: 123,
			isStar: false,
		}]);
	})


	test("origin has same data, but differance", () => {
		let origin = [{
			id: "123",
			num: 0,
			isStar: true,
		}]

		expect(
			updateTaskList(origin, income)	
		).toEqual([{
			id: "123",
			num: 123,
			isStar: false,
		}]);
	})

	test("origin has many differance data", () => {
		let origin = [
			{
				id: "000",
				num: 0,
				isStar: true,
			},
			{
				id: "111",
				num: 0,
				isStar: true,
			}
		]

		expect(
			updateTaskList(origin, income)	
		).toEqual(
			[
				{
					id: "000",
					num: 0,
					isStar: true,
				},
				{
					id: "111",
					num: 0,
					isStar: true,
				}, {
					id: "123",
					num: 123,
					isStar: false,
				}
			]);
	})

});