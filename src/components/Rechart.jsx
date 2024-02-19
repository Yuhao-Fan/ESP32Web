import { h, Component } from 'preact';
import React from 'preact/compat';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

export class ChartComponent extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.chartContentOffset = 65;
    this.inspectChartPlottingArea();
    
  }
  state = {
    data: [],
    showTemperature: true,
    referenceLineX: 1000, // Initial position of the ReferenceLine in X-axis terms
  };

  componentDidMount() {
    this.generateData();
  }

  generateData() {
    const newData = [];
    for (let i = 0; i < 20; i++) {
      newData.push({
        time: i * 100,
        voltage: Math.random() * 2500,
        temperature: Math.random() * 200,
      });
    }
    this.setState({ data: newData });
  }

  toggleTemperature = () => {
    this.setState(prevState => ({ showTemperature: !prevState.showTemperature }));
  };

  handleMouseDown = (e) => {
    this.dragging = true;
    // 获取图表元素的引用，这可能需要你在渲染方法中给图表元素添加一个ref
    const chartElement = this.chartRef.current;
    // 获取图表元素的位置
    this.chartRect = chartElement.getBoundingClientRect();
    // console.log('chartRef:', this.chartRect.left);
    
  };
  inspectChartPlottingArea = () => {
    // const chartSvg = this.chartRef.current.querySelector('svg');
    // if (chartSvg) {
    //   // Example: Find the group (`g`) element that contains the plotting area
    //   // Note: The actual element to select can vary; this is just a conceptual example
    //   const plottingArea = chartSvg.querySelector('.recharts-surface');
    //   if (plottingArea) {
    //     const { x, width } = plottingArea.getBBox();
    //     console.log(`Plotting area x: ${x}, width: ${width}`);
    //     // Now you have the x position and width of the plotting area
    //     // You can use this to calculate offsets or positions relative to the chart's container
    //   }
    // }
  }
  
  handleMouseMove = (e) => {
    if (!this.dragging) return;
    // 计算鼠标位置相对于图表的x坐标
    const relativeX = e.clientX - this.chartRect.left - this.chartContentOffset;
    // console.log('relativeX:', relativeX);
    // 假设每个数据点占据相同的水平空间（这简化了计算）
    // 你可能需要根据图表的具体比例尺调整这个逻辑
    const chartWidth = 770;
    const dataIndex = Math.round(relativeX / (chartWidth / (this.state.data.length-1)));
    console.log('dataIndex:', dataIndex);
    // 确保dataIndex在数据范围内
    if (dataIndex >= 0 && dataIndex < this.state.data.length) {
      const newPosition = this.state.data[dataIndex].time;
      this.setState({ referenceLineX: newPosition });
    }
  };
  

  handleMouseUp = () => {
    this.dragging = false;
  };

  render() {
    const { data, showTemperature, referenceLineX } = this.state;

    return (
      <div ref={this.chartRef}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        style={{ userSelect: 'none' }}>
          
        <h2>Dynamic Data Chart</h2>
        <label>
          <input type="checkbox" checked={showTemperature} onChange={this.toggleTemperature} />
          Show Temperature
        </label>
        <LineChart width={900} height={600} data={data}
                // margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
           <CartesianGrid strokeDasharray="3 3"/>
           <XAxis dataKey="time"/>
           <YAxis yAxisId="Voltage" orientation="left" />
           <YAxis yAxisId="Temp" orientation="right" />
           <Tooltip/>
           <Legend />
           <Line yAxisId="Voltage" type="monotone" dataKey="voltage" stroke="#8884d8" activeDot={{r: 8}}/>
           {showTemperature && <Line yAxisId="Temp" type="monotone" dataKey="temperature" stroke="#82ca9d" />}
           <ReferenceLine  strokeWidth={10} yAxisId="Voltage" x={referenceLineX} stroke="green" label="Drag me" ifOverflow="extendDomain" 
            onMouseDown={this.handleMouseDown} />

        </LineChart>
      </div>
    );
  }
}
