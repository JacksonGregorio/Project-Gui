
import React, { useEffect, useRef } from "react";
import { select} from "d3-selection";
import { zoom, zoomTransform} from "d3-zoom";
import { ResponsiveLine } from '@nivo/line';

export default function Inicio() {

  const MyChart2 = () => {
    
    
    const scrollGroupRef = useRef();
    const ganttContainerRef = useRef();

    const defaultTranslate = 0;
    const yAxisWidth = 50;
    const lineWidth = 2; 
    const chartWidth = 900; 
    const scrollXDisabled = useRef(false);
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const isXPanRef = useRef(false);
    const isYPanRef = useRef(false);

    const onZoom = (event, scrollGroup, ganttContainer) => {
  
      const ganttContainerWidth = ganttContainerRef.current.getBoundingClientRect().width;
      const marginLeft = yAxisWidth + lineWidth;
      const transform = zoomTransform(scrollGroupRef.current);
      const { type, deltaY, wheelDeltaX } = event;
      const maxStartTranslate = chartWidth / 2;
      const maxEndTranslate = ganttContainerWidth - chartWidth / 2 - marginLeft;
  
      if (type === "wheel") {
        if (deltaY !== 0) return null;
        transform.x += wheelDeltaX;
      }
  
      transform.x = Math.max(transform.x, maxEndTranslate);
      transform.x = Math.min(transform.x, maxStartTranslate);

      const translateX = defaultTranslate + transform.x; 
      scrollGroup.attr("transform", `translate( ${translateX} , 0)`); 
  
     
      const d3Zoom = zoom()
      .scaleExtent([1, 10]) 
      .on("zoom", (event) => {
        transform.x = event.transform.x;
        onZoom(event, scrollGroup, ganttContainer);
      });

      select(ganttContainer)
      .call(d3Zoom)
      .on("wheel.zoom", () => {
        onZoom(event, scrollGroup, ganttContainer);
      });


   
  };
        
const onTouchStart = (event) => {
  const touch = getTouchObject(event);
  startXRef.current = touch.pageX;
  startYRef.current = touch.pageY;
  
};

const onTouchMove = (event) => {

  const touch = getTouchObject(event);
  const diffX = startXRef.current - touch.pageX;
  const diffY = startYRef.current - touch.pageY;

  if (diffX >= 10 || diffX <= -10) {
    isXPanRef.current = true;
  }

  if (diffY >= 3 || diffY <= -3) {
    isYPanRef.current = true;
  }

  if (!isXPanRef.current && isYPanRef.current &&   !scrollXDisabled.current) {
    select(ganttContainerRef.current).on(".zoom", null);
    scrollXDisabled.current = true;
  }
  if (scrollXDisabled) window.scrollBy(0, diffY);
  
};

const getTouchObject = (event) => {
  if (event.touches && event.touches.length > 0) {
    return event.touches[0];
  }
  return { pageX: 0, pageY: 0 };
};

const onTouchEnd = zoomBehavior => {
  select(ganttContainerRef.current).call(zoomBehavior);
  scrollXDisabled.current = false;
  isXPanRef.current = false;
  isYPanRef.current = false;
};

useEffect(() => {
  const scrollGroup = select(scrollGroupRef.current);
  const ganttContainer = ganttContainerRef.current;

  const d3Zoom = zoom()
    .scaleExtent([1, 10])
    .on("zoom", (event) => {
      onZoom(event, scrollGroup, ganttContainer);
    });

  select(ganttContainer)
    .call(d3Zoom)
    .on("touchstart", onTouchStart, true)
    .on("touchmove", onTouchMove, true)
    .on("touchend", () => onTouchEnd(d3Zoom), true);

  scrollGroup.attr("transform", `translate(${defaultTranslate}, 0)`);
}, []);

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
            { x: 22, y: 0.7 },
            { x: 23, y: 0.9 },
            { x: 24, y: 0.8 },
            { x: 25, y: -0.8 },
            { x: 26, y: 0.4 },
            { x: 27, y: 0 },
            { x: 28, y: 0.6 },
            { x: 31, y: 0.5 },
  
  
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
            { x: 22, y: -0.6 },
            { x: 23, y: -0.5 },
            { x: 25, y: 0.5 },
            { x: 26, y: -0.3 },
            { x: 27, y: -0.5 },
            { x: 28, y: -0.4 },
            { x: 29, y: -0.2 },
            { x: 30, y: -0.1 },
            { x: 31, y: -0.5 },
            
          ],
        },
    ];
  
    const handlePointClick = (event, point) => {
      console.log("TOOLTIP FOI CLICADO");
      console.log("Ponto clicado:", point);
    };

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
      <div ref={ganttContainerRef}>
      <svg>
      <g ref={scrollGroupRef}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 20, right: 120, bottom: 60, left: 120 }}
        xScale={{ type: 'linear' }}
        yScale={{ type: 'linear', min: -2, max: 2, stacked: false }}
        curve="linear"
        colors={['rgb(97, 205, 187)', 'rgb(244, 117, 96)']}
        pointSize={14}
        pointBorderWidth={1}
        enableGridX
        gridYValues={[0,2,-2]}
        pointBorderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
        pointLabelYOffset={-20}
        enablePointLabel
        enableArea
        tooltip={CustomTooltip}
        useMesh
        animate
        onClick={handlePointClick}
        axisLeft={false}
        enablePan={true}
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
              strokeWidth: 3,
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
       </g>
      </svg>
      </div>
    </div>
    );
  };


  return (
  
    <div>
          <MyChart2></MyChart2>
    </div>

  )
}