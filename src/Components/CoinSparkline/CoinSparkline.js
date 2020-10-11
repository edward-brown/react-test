import React, { useEffect } from "react";
import { Chart } from "chart.js";
import { randomColor } from "randomcolor";

const CoinSparkline = ({ coin, graphData, ...props }) => {
	useEffect(() => {
		if (!!graphData && !!graphData.data) {
			console.log(graphData.data.map(d => d.open));
			const ctx = document.getElementById(`${coin}-sparkline`).getContext("2d");
			new Chart(ctx, {
				type: "line",
				data: {
					labels: new Array(graphData.data.length),
					datasets: [
						{
							data: graphData.data.map(d => d.open),
							backgroundColor: randomColor({ format: "rgba", alpha: 0.3 }),
						},
					],
				},
				options: {
					responsive: false,
					legend: {
						display: false,
					},
					elements: {
						line: {
							borderWidth: 1,
						},
						point: {
							radius: 0,
						},
					},
					tooltips: {
						enabled: false,
					},
					scales: {
						yAxes: [
							{
								display: false,
							},
						],
						xAxes: [
							{
								display: false,
							},
						],
					},
				},
			});
		}
	}, [graphData]);

	return <canvas id={`${coin}-sparkline`} width='100' height='50' />;
};

export default CoinSparkline;
