import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { csv } from 'd3';
import data from './data/multiTimeline.csv';
import ChartWrapper from './components/ChartWrapper';
import Dropdown from './components/Dropdown';
import Table from './components/Table'
import SideNav from './components/SideNav';

const options = [
  {
    label: 'Retriever',
    value: 'Retriever',
  },
  {
    label: 'West Highland Terrier',
    value: 'West Highland Terrier',
  },
  {
    label: 'Dalmatian',
    value: 'Dalmatian',
  },
  { label: 'Cockapoo',
    value: 'Cockapoo',
  }
  ,
  { label: 'Labrador',
    value: 'Labrador',
  }
];

class App extends Component{

  state = {
    data: [],
    breed: [options[0],options[1]],
    open: false
  }

  setBreed = (newbreed) => {
    let { breed } = this.state
    breed.push(newbreed);
    this.setState({ breed: breed })
  }

  componentDidMount() {
    csv(data)
      .then(data => this.setState({ data }))
      .catch(error => console.log(error));
  }
  renderChart() {
    if (this.state.data.length == 0) {
      return "No data yet"
    }
    return <ChartWrapper data={this.state.data} breed={this.state.breed}/>
  }

  renderTable() {
    if (this.state.data.length == 0) {
      return "No data yet"
    }
    return <Table data={this.state.data} breed={this.state.breed}/>
  }

  toggle = () => {
    this.setState({
      open: !this.state.open
    });
  }


  render() {

    return (
      <Container>
      <div className="AppContainer" style={{fontFamily: 'OpenSans-Regular'}}>

          <SideNav classname = {this.state.open ? ' in' : ''}/>
          <div className="right-section">
          <Navbar bg="light">
          <div>
          { (this.state.open === false) ? <i onClick={this.toggle} class="arrow left icon"></i> : <i onClick={this.toggle} class="arrow right icon"></i>}
          </div>
            <Navbar.Brand>ReactForDataViz.NET</Navbar.Brand>
          </Navbar>
            <Row>
              <Col md={6} xs={12}>
              <Dropdown
                multiple
                label="Select a Breed"
                selected={this.state.breed}
                onSelectedChange={this.setBreed}
                options={options}
              />
              </Col>
            </Row>
            <Row>
              <Col md={12} xs={12}>
                {this.renderChart()}
        
                </Col>
            </Row>
            <Row>
              <Col md={12} xs={12}>{this.renderTable()}</Col>
            </Row>
          </div>
      </div>
      </ Container>

    );
  }
}

export default App;
