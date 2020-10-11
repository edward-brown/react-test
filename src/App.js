import React, { useEffect, useState } from "react";
import { Grid, MenuItem, Select, Typography } from "@material-ui/core";

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
		<Grid
			container
			style={{ height: "99vh", width: "99vw" }}
			justify={"center"}
			spacing={2}
		>
			<Grid item xs={12}>
				<Typography variant='h2' style={{ textAlign: "center" }}>
					Russo & Brown
				</Typography>
			</Grid>
			<Grid item xs={1}>
				<Select
					fullWidth
					value={selectedCurrency}
					onChange={e => setSelectedCurrency(e.target.value)}
				>
					<MenuItem value='USD'>USD</MenuItem>
					<MenuItem value='GBP'>GBP</MenuItem>
				</Select>
			</Grid>
			<Grid item container xs={12} justify={"center"}>
				<Grid item xs={6}>
					<CoinTable coins={coins} currency={selectedCurrency} />
				</Grid>
			</Grid>
		</Grid>
	);
}

export default App;
