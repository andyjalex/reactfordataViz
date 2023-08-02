import React, { Component } from 'react';
import D3Chart from './D3Chart'

export default class ChartWrapper extends Component {

  componentDidMount() {
    console.log(this.props.data)

    this.setState({
      chart: new D3Chart(this.refs.chart, this.props.data, this.props.breed )
    })


  }
  componentDidUpdate() {
    console.log(this.refs.chart.clientWidth)
  }


  UNSAFE_componentWillReceiveProps (nextProps) {
    this.state.chart.update(nextProps.data, nextProps.breed)
  }

  render() {
    //console.log(this.ref.chart)
    return <div className ="svg-container" ref="chart" id="container" ></div>
  }

}
