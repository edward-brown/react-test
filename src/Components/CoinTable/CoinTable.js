import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { coinInfoToRows } from "../../Utility/CoinTableUtils";

const useStyles = makeStyles((Theme) => ({
    container: {
        height: "100%",
        width: "100%",
    },
}));

const CoinTable = ({ coins, currency }) => {
    const classes = useStyles();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const getRows = async () => {
            let values = await coinInfoToRows(coins, currency);
            setRows(values);
        };
        getRows();
    }, [coins]);

    const columns = [
        { field: "CoinName", headerName: "Coin Name", width: 150 },
        {
            field: "CurrentPrice",
            headerName: `Current Price (${currency})`,
            width: 150,
        },
        {
            field: "OpeningPrice",
            headerName: `Opening Price (${currency})`,
            width: 150,
        },
        { field: "PriceIncrease", headerName: `Price Increase`, width: 200 },
    ];

    return (
        <div className={classes.container}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
};

export default CoinTable;
