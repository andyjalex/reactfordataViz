import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default class Table extends Component {

  state = {
    data: []
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {

    this.wrangleData(this.props.data, this.props.breed)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    this.wrangleData(nextProps.data, nextProps.breed)
  }

  wrangleData(data, breed) {

    //simplify to an array
    var breedArray = breed.map((obj) => {
      return obj.value
    })

    data.forEach(d => {
	    d.year = d.Month.substr(0,4)
			d.month = d.Month.substr(5,2)
			d.west = Number(d.West_Highland_White_Terrier)
			d.retriever = Number(d.Golden_Retriever)
			d.labrador = Number(d.Labrador_Retriever)
			d.dalmatian = Number(d.Dalmatian)
			d.cockapoo = Number(d.Cockapoo)
			// d.labrador = Number(d.Labrador)
	  })
		data.forEach(d => {
			d.NewDate = d.year+d.month+'01'
    })

		// unpivot the data
		var newArray = []
		data.forEach(d => {
			//needs to be refactored to be dynamic
			//loop for var numOfDogs
			newArray.push({Date: d.NewDate, Breed: 'West Highland Terrier', Score: d.west})
			newArray.push({Date: d.NewDate, Breed: 'Retriever', Score: d.retriever})
			newArray.push({Date: d.NewDate, Breed: 'Labrador', Score: d.labrador})
			newArray.push({Date: d.NewDate, Breed: 'Dalmatian', Score: d.dalmatian})
			newArray.push({Date: d.NewDate, Breed: 'Cockapoo', Score: d.cockapoo})
		})

		const newData = newArray.filter(item => breedArray.includes(item.Breed))

		newData.forEach(d => {
			if(d.Score !== d.Score){
    		d.Score = 0;
			}
		});

    var table = this.coll2tbl(newData, 'Date', 'Breed', 'Score');
    console.log(table);

    this.setState({data: table })

  }

  get_prop(obj, prop) {
      return prop.split('.').reduce((o,k) => obj[k], obj);
  }


  coll2tbl(coll, row_header, col_header, cell) {
    var table = {};
    var row_headers = [];
    var cols = {};

    coll.forEach(a => {
        var h = this.get_prop(a, row_header);
        if (h in table === false) {
            table[h] = {};
            row_headers.push(h);
        }
        var c = this.get_prop(a, col_header);
        cols[c] = null;
        table[h][c] = this.get_prop(a, cell);
    });

    var cells = [];
    for (var row in table)
        cells.push(Object.values(table[row]));

    return { row_headers, col_headers: Object.keys(cols), cells };
}

  renderCols() {
    return (
    this.state.data.col_headers.map(function (item, i) {
      return(
        <Col md={2} xs={3}>{item}</Col>
      )
    })
    )
  }

  renderRows() {
   var cells = this.state.data.cells
   const background = "grey"
    return (
      this.state.data.row_headers.map(function (item, i) {
        return(
        <div>
        <Row
          key={i}
            style={{marginTop: "2px", backgroundColor: '#ccc' }}
          >
          <Col md={2} xs={3}>{item}</Col>
          {cells[i].map(function (cell, j)
          {
            return(
            <Col
              md={2} xs={3}
              key ={j}>
                {cell}
            </Col>
            )
          })}
          </Row>
          </div>

        )}
      )
    )
  }

  render() {

    if (this.state.data == 0) {
      return "No data yet"
    }

    return(
      <div class="someclass">
        <Row>
          <Col md={2} xs={3}>Month</Col>
          {this.renderCols()}
        </Row>
        {this.renderRows()}

      </div>
    )
  }

}
