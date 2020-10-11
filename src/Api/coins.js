import { getApiKey } from "./getApiKey";
import { get } from "./rest";

/**
 * Returns a list of the top 10 coins + info about them.
 * @param {String} currency Currency to get coin price for
 */
export const getCoins = async currency => {
	let result = await get(
		`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=${currency}&api_key=${getApiKey()}`
	);
	return result;
};

export const getHistorical = async (coin, currency) => {
	let result = await get(
		`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin}&tsym=${currency}&limit=10`
	);
	return result.data.Data;
};
