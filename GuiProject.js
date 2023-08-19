import React from "react";
import { ResponsiveLine } from '@nivo/line';



export default function Inicio() {
  const MyChart2 = () => {
    const chartData = [
      {
          id: 'positive :)',
          data: [
            { x: 0, y: 0.7 },
            { x: 1, y: 0.9 },
            { x: 2, y: 0.8 },
            { x: 10, y: -0.8 },
            { x: 16, y: 0.4 },
            { x: 17, y: 0 },
            { x: 18, y: 0.6 },
            { x: 21, y: 0.5 },
  
  
          ],
        },
        {
          id: 'negative :(',
          data: [
           { x: 0, y: -0.6 },
            { x: 3, y: -0.5 },
            { x: 5, y: 0.5 },
            { x: 6, y: -0.3 },
            { x: 7, y: -0.5 },
            { x: 18, y: -0.4 },
            { x: 19, y: -0.2 },
            { x: 20, y: -0.1 },
            { x: 21, y: -0.5 },
          ],
        },
    ];
  
    const CustomTooltip = ({ point }) => (
      <div
        style={{
      background: 'rgba(128, 128, 128, 0.9)',
        color: '#fff',
        padding: '8px',
        borderRadius: '4px',
        fontSize: '14px',
        border: '2px solid #333', 
        boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.5)',  
        }}
      >
        <div>This is the X: {point.data.x}</div>
        <div>This is the Y: {point.data.y}</div>
        <div>This is a buy: {point.data.y}</div>
        <div>This is a sell: {point.data.y}</div>
  
      </div>
    );
  
    return (
      <div style={{ height: '500px', width: '1000px', background: 'rgb(55 65 81)', color: 'white', textColor:'white'}}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 20, right: 120, bottom: 60, left: 120 }}
        xScale={{ type: 'linear' }}
        yScale={{ type: 'linear', min: -2, max: 2, stacked: false }}
        curve="linear"
        colors={['rgb(97, 205, 187)', 'rgb(244, 117, 96)']}
        pointSize={14}
        pointBorderWidth={1}
        pointBorderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
        pointLabelYOffset={-20}
        enablePointLabel
        enableArea
        tooltip={CustomTooltip}
        useMesh
        animate
        axisLeft={false}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Axis Right',
          legendOffset: 40,
          legendPosition: 'middle',
          format: (value) => value.toFixed(0),
          tickTextColor: 'white',
          legendTextColor: 'white',
        }}
        theme={{
          axis: {
            textColor: 'white',
            tickColor: 'white',
            legend: {
              text: {
                fontWeight: 'bolder',
                fontSize: 20,
                textColor: 'white',
                color:'white',
              },
            },
          },
          grid: {
            line: {
              stroke: 'rgba(255, 255, 255, 0.1)',
              color:'white',
            },
          },
          legends: {
              text: {
                textColor:'white',
                fontWeight: 'bolder',
                fontSize: 20,
                color:'white',
              },
            },
        }}
      />
    </div>
    );
  };

  return (
    <body>
    <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Graph Nivo</h1>
          </div>
        </header>
        <main className="flex flex-row">
          <div>
            <MyChart2></MyChart2>
          </div>

        </main>
    </body>
  )
}