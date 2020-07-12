import React from 'react';
import { Line } from '@ant-design/charts';

export default class HistoryChart extends React.Component {

  render() {
    const legend = {
        ca: 'Calcio',
        mg: 'Magnecio',
        k: 'Potasio'
    }

    let data = []
    for (const row of this.props.dataSource) {
        for (const f of ['mg', 'ca', 'k']) {
            data.push({
                date: row.date,
                type: legend[f],
                value: row[f],
            })
        }
    }

    const config = {
      padding: 'auto',
      forceFit: true,
      data,
      xField: 'date',
      yField: 'value',
      yAxis: {
        label: {
          formatter: v => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`),
        },
      },
      legend: {
        position: 'right-top',
      },
      seriesField: 'type',
      responsive: true,
    };
    return <Line {...config} />;
  }
};
