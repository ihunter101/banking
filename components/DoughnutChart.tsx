"use client";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'


ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({ accounts }:  DoughnutChartProps) => {

    const data = {
        datasets: [// datasets is an array with an object 
            {
                label: 'banks',// the label of the dataset
                data: [1250, 2000, 3500],// the data of the dataset
                backgroundColor: [ // the background color of the dataset
                    '#0747b6', '#2265d8', "#2191fa"
                ]
            }
        ],
        labels : ['Bank 1', 'Bank 2', 'Bank 3']
    }
  return <Doughnut 
                    data={data}
                    options= {{
                        cutout:'60%',
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }}
                    />
}

export default DoughnutChart