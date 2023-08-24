
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { select} from "d3-selection";
import { zoom, zoomTransform} from "d3-zoom";
import { ResponsiveLine } from '@nivo/line';
import './Style.css';
import MouseBackground from './MouseBackground';
import clickSound from './audioclick.mp3';
import { useTooltip } from "@nivo/tooltip";
export default function Main() {

  const MyChart2 = ()  => {

    //variables 
    const { showTooltipFromEvent, showTooltipAt, hideTooltip } = useTooltip();
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipData, setTooltipData] = useState(null);
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

    //Code of Zomm

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

  //BD
    const chartData = [
      {
          id: 'negative :)',
          data: [
            { x: 0, y: 10 },
            { x: 1, y: 10 },
            { x: 2, y: 10 },
            { x: 10, y: 2 },
            { x: 16, y: 10 },
            { x: 17, y: 2 },
            { x: 18, y: 10},
            { x: 21, y: 10 },
            { x: 22, y: 2 },
            { x: 23, y: 10},
            { x: 24, y: 10 },
            { x: 25, y: 10},
            { x: 26, y: 2},
            { x: 27, y: 10 },
            { x: 28, y: 2},
            { x: 31, y: 10 },
  
  
          ],
        },
        {
          id: 'positive :(',
          data: [
           { x: 0, y: -10 },
            { x: 3, y: -2 },
            { x: 5, y: -10 },
            { x: 6, y: -2},
            { x: 7, y: -10},
            { x: 18, y: -10 },
            { x: 19, y: -10 },
            { x: 20, y: -10 },
            { x: 21, y: -2 },
            { x: 22, y: -10 },
            { x: 23, y: -2 },
            { x: 25, y: -10},
            { x: 26, y: -10 },
            { x: 27, y: -2 },
            { x: 28, y: -10 },
            { x: 29, y: -10 },
            { x: 30, y: -2 },
            { x: 31, y: -10 },
            
          ],
        },
    ];

  //New Tooltip 

  const renderTooltip = useMemo(
    () => () => {
      if (tooltipData) {
        return (
          <div>
            {<div
 
              style={{
              background: 'rgba(128, 128, 128, 0.9)',
              color: '#fff',
              padding: '8px',
              borderRadius: '4px',
              fontSize: '14px',
              border: '2px solid #333', 
              boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.5)',
              cursor:'none',

              }}
              >
            <div>
            <div><p><p>Opening time: Ms</p></p></div>
            <div><p>Runtime: Ms</p></div>
            <div><p>Profit: Points</p></div>
            <div><p>Profit:  $</p></div>
            <div><p>Stop Loss: Points</p></div>
            <div><p>Stop Loss: $</p></div>
            <div><p> &Delta;P:</p></div>
            <div><p>Ticket:</p></div>
            </div>
            </div>
              }
            </div>
              );
              }
            return null;
              },[tooltipData]);

    //Hand Set false the tooltip
      
    const handleMouseLeave = useCallback(() => {
      hideTooltip();
      setTooltipVisible(false);
      setTooltipData(null);
    }, [hideTooltip]);

    
    //Point Symbol
    const renderPointSymbol = ({ x, y, size, color }) => {
      const adjustedX = x + 5; 
      const adjustedY = y - 10; 

      return (
        <circle
          cx={adjustedX}
          cy={adjustedY}
          r={size}
          fill={color}
          stroke="black"
        />
      );
    };

    //Audio Player
    const [playAudio, setPlayAudio] = useState(false);
    useEffect(() => {
      if (playAudio) {
        const audio = new Audio(clickSound); 
        audio.play(); 
        setPlayAudio(false); 
      }
    }, [playAudio]);
    
    //Click Call Tooltip
  const handlePointClick = useCallback(
  (point, event) => {
    console.log("TOOLTIP FOI CLICADO");
    console.log("Ponto clicado:", point);
    setPlayAudio(true);

    if (tooltipVisible && tooltipData === point) {
      // if the smae point are click
      hideTooltip();
      setTooltipVisible(false);
      setTooltipData(null);
    } else {
      // if a new point are click
      setTooltipVisible(true);
      setTooltipData(point);
      showTooltipFromEvent(renderTooltip(), event);
    }
  },
  [tooltipVisible, tooltipData, hideTooltip, showTooltipFromEvent, renderTooltip]
);

    //Create line
    
    return (
      <div  ref={ganttContainerRef} style={{ height: '500px', width: '1000px', background: 'rgb(55 65 81)', color: 'white', textColor:'white'}}>
      <g ref={scrollGroupRef}>
      <ResponsiveLine
      
        data={chartData}
        margin={{ top: 20, right: 120, bottom: 60, left: 120 }}
        xScale={{ type: 'linear' }}
        yScale={{ type: 'linear', min: -10, max: 10, stacked: false }}
        curve="linear"
        colors={['rgb(244, 117, 96)', 'rgb(97, 205, 187)']}
        pointSymbol={(props) => renderPointSymbol(props)}
        pointSize={8}
        pointBorderWidth={1}
        enableGridX
        gridYValues={[0,2,-2]}
        pointBorderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
        pointLabelYOffset={-15}
        enablePointLabel
        enableCrosshair={false}
        enableArea
        tooltip={renderTooltip}
        useMesh
        animate
        onClick={(point, event) => handlePointClick(point, event)}
        onMouseLeave={handleMouseLeave}
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
              cursor:'none',
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
      >
      </ResponsiveLine>
        </g>
        //Mouse Editor
        <MouseBackground></MouseBackground> 
      </div>
    );
  };

  //Call All
  return (
  
    <main>
      <div>
	      </div>
          <MyChart2></MyChart2>
      <div>
      </div>
    </main>

  )
}