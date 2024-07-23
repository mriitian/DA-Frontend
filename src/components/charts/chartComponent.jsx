import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/material';

Chart.register(CategoryScale);

const ChartComponent = ({ chartdata }) => {
    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState(null);


    const generatedColors = (size) => {
        const arr = [];

        if(chartdata.multicolor){
            for(let i = 0; i<size;i++){
                arr.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`);
            }

            return arr;
        }

        arr.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`);

        return arr;
    }

    useEffect(() => {
        console.log('Chart component mounted or updated.');

        const { x_values, y_values, multiline, legend_names, title, plot_type,font_size } = chartdata;

        const datasets_values = () => {
            const values = [];
            if (multiline) {
                const size = y_values.length;
                for (let i = 0; i < size; i++) {
                    values.push({
                        label: legend_names[i],
                        data: y_values[i],
                        borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                        backgroundColor: generatedColors(x_values.length),
                    });
                }
            } else {
                values.push({
                    label: legend_names[0],
                    data: y_values,
                    borderColor: 'rgba(0,0,0,1)',
                    backgroundColor: generatedColors(x_values.length),
                    fill: plot_type !== 'line',
                });
            }
            return values;
        };

        setChartData({
            labels: x_values,
            datasets: datasets_values()
        });

        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: !!title,
                    text: title || undefined,
                    font: {
                        size: (font_size || 6)* 0.75,
                    },
                }
            },
            scales: {
                x: {
                  title: {
                    display: !!chartdata.x_label,
                    text: chartdata.x_label,
                    font: {
                      size: (font_size || 6)* 0.75,
                    },
                  },
                  ticks: {
                    font: {
                      size: (font_size || 6)* 0.75,
                    },
                  },
                },
                y: {
                  title: {
                    display: !!chartdata.y_label,
                    text: chartdata.y_label,
                    font: {
                      size: (font_size || 6)* 0.75,
                    },
                  },
                  ticks: {
                    font: {
                      size: (font_size || 6)* 0.75,
                    },
                  },
                },
            },
        });
    }, [chartdata]);

    const renderChart = () => {
        switch (chartdata.plot_type) {
            case 'line':
                return <Line data={chartData} options={chartOptions} />;
            case 'pie':
                return <Pie data={chartData} options={chartOptions} />;
            case 'bar':
                return <Bar data={chartData} options={chartOptions} />;
            case 'doughnut':
                return <Doughnut data={chartData} options={chartOptions} />;
            default:
                return <Line data={chartData} options={chartOptions} />;
        }
    };

    return (
        <Box 
            sx={{
                width: chartdata.width || "100%",
                height: chartdata.height || "100%",
            }}
        >
            {chartData && chartOptions && renderChart()}
        </Box>
    );
};

export default ChartComponent;
