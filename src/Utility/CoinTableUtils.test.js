import { coinInfoToRows, getPriceDifference } from "./CoinTableUtils";

describe("CoinTableUtils", () => {
	it("Formats rows correctly", () => {
		let coins = [
			{
				CoinInfo: {
					Name: "BTC",
				},
				RAW: {
					USD: {
						PRICE: 100,
						OPENDAY: 200,
					},
				},
				DISPLAY: {
					USD: {
						PRICE: "$100",
						OPENDAY: "$200",
						TOSYMBOL: "$",
					},
				},
			},
			{
				CoinInfo: {
					Name: "ETH",
				},
				RAW: {
					USD: {
						PRICE: 1000,
						OPENDAY: 2000,
					},
				},
				DISPLAY: {
					USD: {
						PRICE: "$1000",
						OPENDAY: "$2000",
						TOSYMBOL: "$",
					},
				},
			},
		];

		let result = coinInfoToRows(coins, "USD");

		// Map over result, if you want to add more test data above / have a generator
		result.map((row, index) => {
			let increase = getPriceDifference(
				coins[index].RAW.USD.PRICE,
				coins[index].RAW.USD.OPENDAY
			);

			expect(row.id).toEqual(index);
			expect(row.CoinName).toEqual(coins[index].CoinInfo.Name);
			expect(row.CurrentPrice).toEqual(coins[index].DISPLAY.USD.PRICE);
			expect(row.OpeningPrice).toEqual(coins[index].DISPLAY.USD.OPENDAY);
			expect(row.PriceIncrease).toEqual(
				`${increase.percentage.toFixed(3)}% (${
					coins[index].DISPLAY.USD.TOSYMBOL
				}${increase.dif.toFixed(4)})`
			);
		});
	});

	it("Calculates price difference correctly", () => {
		let current = 222;
		let open = 111;

		let dif = getPriceDifference(current, open);

		expect(dif.dif).toEqual(111);
		expect(dif.percentage).toEqual(100);
	});
});
