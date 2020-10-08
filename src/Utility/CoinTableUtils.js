/**
 * Helper function for fetching coin info, and formatting into rows for displaying in a table.
 * @param {Array} coins Array of coin identifiers
 */
export const coinInfoToRows = (coins, currency) => {
    return coins.map((coin, index) => {
        // If a coin doesn't have data for the given currency
        if (coin["RAW"] === undefined) {
            return {
                id: index,
                CoinName: coin.CoinInfo.Name,
                CurrentPrice: "-",
                OpeningPrice: "-",
                PriceIncrease: "-",
            };
        }

        let increase = getPriceDifference(
            coin.RAW[currency].PRICE,
            coin.RAW[currency].OPENDAY
        );

        return {
            id: index,
            CoinName: coin.CoinInfo.Name,
            CurrentPrice: coin.DISPLAY[currency].PRICE,
            OpeningPrice: coin.DISPLAY[currency].OPENDAY,
            PriceIncrease: `${increase.percentage.toFixed(3)}% (${
                coin.DISPLAY[currency].TOSYMBOL
            }${increase.dif.toFixed(4)})`,
        };
    });
};

/**
 * Returns an object (dif, percentage) of the price difference and percentage change.
 * @param {Number} current Current price
 * @param {Number} open Opening price
 */
export const getPriceDifference = (current, open) => {
    let dif = current - open;
    return {
        dif,
        percentage: (dif / open) * 100,
    };
};
