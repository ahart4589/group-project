import React, { Component } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
// import PieCharts from './PieCharts';
// import Charts from '../CSS/Charts.css';

class LineCharts extends Component {
  constructor() {
    super()
    this.state = {
      data1: [],
      data2: []
    }
  }

  looper = maternal => {
    var dates = []
    for (let i = 0; i < maternal[0].series.length; i++) {
      if (maternal[0].series[i].end && maternal[0].series[i].value) {
        var date = maternal[0].series[i].end
        var stringDate = +date.substring(0, 4)
        var mortality = maternal[0].series[i].value
        dates.push({ date: stringDate, "Deaths (Per 100,000 Live Births)": mortality })
      }
    }
    return dates
  }

  looperTwo = children => {
    var dates = []
    for (let i = 0; i < children[0].series.length; i++) {
      if (children[0].series[i].end && children[0].series[i].value) {
        var date = children[0].series[i].end
        var stringDate = +date.substring(0, 4)
        var mortality = children[0].series[i].value
        dates.push({ date: stringDate, "Deaths (Per 1,000 Live Births)" : mortality })
      }
    }
    return dates
  }

  componentDidMount() {
    axios.get('https://redalert.bsvgateway.org/api/data/indicators/cross-section/?format=json&indicator_code=SH_STA_MMRT&location_id=122993951').then(response => {
      let data1 = this.looper(response.data)
      this.setState({
        data1
      })
    })

    axios.get('https://redalert.bsvgateway.org/api/data/indicators/cross-section/?format=json&indicator_code=SH_DYN_NMRT&location_id=122993951').then(response => {
      let data2 = this.looperTwo(response.data)
      this.setState({
        data2
      })
    })
  }
  render() {
    return (
      <div>
        <div className="charts-container">
        <LineChart width={600} height={300} data={this.state.data1}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis yAxisID />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip title="Maternal Mortality"/>
          <Legend />
          <Line type="monotone" dataKey="Deaths (Per 100,000 Live Births)" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
        <br/>
        <h3 style={{color: '#D8DBE7'}}>Neonatal Mortality Rates</h3>
        <LineChart width={600} height={300} data={this.state.data2}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis yAxisID />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Deaths (Per 1,000 Live Births)" stroke="green" activeDot={{ r: 8 }} />
        </LineChart>
        </div>
      </div>
    );
  }
}

export default LineCharts