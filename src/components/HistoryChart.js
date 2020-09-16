import React from 'react';
import { Line } from '@ant-design/charts';

export default class HistoryChart extends React.Component {

  render() {
    const legend = {
        1: 'Calcio',
        2: 'Magnecio',
        3: 'Potasio',
        4: 'Salinidad',
        5: 'Densidad',
    }

    let data = []
    for (const row of this.props.dataSource) {
        for (const f of [1, 2, 3, 4, 5]) {
            data.push({
                date: row.fecha,
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
