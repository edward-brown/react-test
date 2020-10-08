import React, { useEffect, useState } from "react";
import { Grid, MenuItem, Select } from "@material-ui/core";

import CoinTable from "./Components/CoinTable/CoinTable";
import { getCoins } from "./Api/coins";

function App() {
    const [coins, setCoins] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState("USD");

    useEffect(() => {
        const init = async () => {
            let coinInfos = await getCoins(selectedCurrency);
            setCoins(coinInfos.data.Data);
        };
        init();
    }, [selectedCurrency]);

    return (
        <Grid container style={{ height: "100vh" }} spacing={2}>
            <Grid item xs={12}>
                <Select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12}>
                <CoinTable coins={coins} currency={selectedCurrency} />
            </Grid>
        </Grid>
    );
}

export default App;
