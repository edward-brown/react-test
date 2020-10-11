import React, { useEffect, useState } from "react";
import {
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@material-ui/core";
import { coinInfoToRows } from "../../Utility/CoinTableUtils";
import { getHistorical } from "../../Api/coins";
import CoinSparkline from "../CoinSparkline/CoinSparkline";

const useStyles = makeStyles(Theme => ({
	container: {
		height: "100%",
		width: "100%",
	},
}));

const CoinTable = ({ coins, currency }) => {
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [graphData, setGraphData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			let values = await coinInfoToRows(coins, currency);
			setData(values);
		};
		getData();
	}, [coins]);

	useEffect(() => {
		const getGraphData = async () => {
			let newGraphData = [];
			for (var i = 0; i < data.length; i++) {
				let result = await getHistorical(data[i].CoinName, currency);
				newGraphData.push({
					id: data[i].CoinName,
					data: result.Data,
				});
			}

			setGraphData(newGraphData);
		};
		getGraphData();
	}, [data]);

	return (
		<div className={classes.container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Coin Name</TableCell>
						<TableCell>Current Price {currency}</TableCell>
						<TableCell>Opening Price {currency}</TableCell>
						<TableCell>Change</TableCell>
						<TableCell>Sparkline</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data &&
						data.map(row => {
							return (
								<TableRow>
									<TableCell>{row.CoinName}</TableCell>
									<TableCell>{row.CurrentPrice}</TableCell>
									<TableCell>{row.OpeningPrice}</TableCell>
									<TableCell>{row.PriceIncrease}</TableCell>
									<TableCell>
										<CoinSparkline
											coin={row.CoinName}
											graphData={graphData.find(
												graph => graph.id === row.CoinName
											)}
										/>
									</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
		</div>
	);
};

export default CoinTable;
