// import * as RootNavigation from '../../navigation/rootNavigation';
import * as d3 from 'd3';
import React from 'react';
import { G, Rect, Svg, Text } from 'react-native-svg';
import { connect } from 'react-redux';
import { colors } from '../../constants/styles';

const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 20;

const BarChart = (props: any) => {
  const {appTheme, round = '', dataSend = ''} = props;
  // const {name = '', type = '', bookingDate = ''} = data.item;
  // Dimensions
  const SVGHeight = 250;
  const SVGWidth = 300;
  const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
  const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;
  let data = dataSend;

  // X scale point
  const xDomain = data.map((item) => item.label);
  const xRange = [0, graphWidth];
  const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

  // Y scale linear
  const maxValue = d3.max(data, (d) => d.value);
  const topValue = Math.ceil(maxValue / round) * round;
  const yDomain = [0, topValue];
  const yRange = [0, graphHeight];
  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  // top axis and middle axis

  return (
    <Svg width={SVGWidth} height={SVGHeight} style={{}}>
      <G y={graphHeight + GRAPH_MARGIN}>
        {/* Top value label */}
        {/* <Text
          x={graphWidth}
          textAnchor="end"
          y={y(topValue) * -1 - 5}
          fontSize={12}
          fill="black"
          fillOpacity={0.4}>
          {topValue + ' ' + unit}
        </Text> */}
        {/* top axis */}
        {/* <Line
          x1="0"
          y1={y(topValue) * -1}
          x2={graphWidth}
          y2={y(topValue) * -1}
          stroke={colorss.axis}
          strokeDasharray={[3, 3]}
          strokeWidth="0.5"
        /> */}
        {/* middle axis */}
        {/* <Line
          x1="1"
          y1={y(middleValue) * -1}
          x2={graphWidth}
          y2={y(middleValue) * -1}
          // stroke={colorss.axis}
          strokeDasharray={[3, 3]}
          strokeWidth="0.5"
        /> */}
        {/* bottom axis */}
        {/* <Line
          x1="0"
          y1="2"
          x2={graphWidth}
          y2="2"
          stroke={colorss.axis}
          strokeWidth="0.5"
        /> */}
        {/* {data.map(
          item =>
            item.rushHour && (
              <Line
                x1="200"
                y1="-180"
                x2="20"
                y2="200000"
                stroke="red"
                strokeDasharray={[3, 3]}
                strokeWidth="1"
              />
              // </Svg>
            ),
        )} */}
        {data.map(
          (item) =>
            item.rushHour && (
              <Text
                key={'label' + item.label}
                fontSize="20"
                x={x(item.label)}
                y="-200"
                textAnchor="middle">
                {item.rushHour}
              </Text>
            ),
        )}
        {/* bars */}
        {data.map((item) => (
          <Rect
            key={'bar' + item.label}
            x={x(item.label) - GRAPH_BAR_WIDTH / 2}
            y={y(item.value) * -1}
            rx={2.5}
            width={GRAPH_BAR_WIDTH}
            height={y(item.value)}
            fill={item.svg.fill}
          />
        ))}
        {/* labels */}
        {data.map((item) => (
          <Text
            key={'label' + item.label}
            fontSize="12"
            x={x(item.label)}
            y="15"
            textAnchor="middle">
            {item.label}
          </Text>
        ))}
      </G>
    </Svg>
  );
};

const mapStateToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStateToProps, {})(BarChart);
