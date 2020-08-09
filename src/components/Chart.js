import React from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = ({ data }) => {
  let chartOptions;
  if(data) {
    chartOptions = {
      title: {
        text: `${data.course} ${data.professor} ${data.semester.match(/^\d+01$/) ? `Spring ${data.semester.substring(0, 4)}` : `Fall ${data.semester.substring(0,4)}`}`,
      },
      legend: {},
      data: [
        {
          type: "stackedColumn",
          name: "minus grade",
          showInLegend: true,
          dataPoints: [
            { label: "A", y: data['A-']  },
            { label: "B", y: data['B-']  },
            { label: "C", y: data['C-']  },
            { label: "D", y: data['D-']  },
          ]
        },
        {
          type: "stackedColumn",
          name: "regular grade",
          showInLegend: true,
          dataPoints: [
            { label: "A", y: data.A  },
            { label: "B", y: data.B  },
            { label: "C", y: data.C  },
            { label: "D", y: data.D  },
            { label: "F", y: data.F  },
            { label: "W", y: data.W  },
            { label: "Other", y: data.Other },
          ]
        },
        {
          type: "stackedColumn",
          name: "plus grade",
          showInLegend: true,
          dataPoints: [
            { label: "A", y: data['A+']  },
            { label: "B", y: data['B+']  },
            { label: "C", y: data['C+']  },
            { label: "D", y: data['D+']  },
          ]
        },
      ]
    }
  }

  return (
    <div>
      {data ? <CanvasJSChart options={chartOptions}/> : ''}
    </div>
  );
}

export default Chart
