import * as d3 from 'd3'

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 }
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM

class D3Chart {
	constructor(element, data) {
		let vis = this

    vis.data = data;
		var xColumn = "Date"
		var yColumn = "Score"



		vis.g = d3.select(element)
			.append("svg")
				.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
				.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
			.append("g")
				.attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

		//const parseTime = d3.timeParse("%Y")

    //need to clean up data.
		vis.data.forEach(d => {
	    d.Year = d.Month.substr(0,4)
			d.Month = d.Month.substr(5,2)
			d.West = Number(d.West)
			d.Labrador = Number(d.Labrador)
	  })
		vis.data.forEach(d => {
			d.NewDate = new Date(d.Year, d.Month, '01')
		})

		// unpivot the data
		var newArray = []
		vis.data.forEach(d => {
			newArray.push({Date: d.NewDate, Score: d.West})
			//newArray.push({Date: d.NewDate, Breed: 'Labrador', Score: d.Labrador})
		})


		console.log(vis.data)
		//console.log(newArray)

		// scales
		vis.x = d3.scaleTime().range([0, WIDTH])
		vis.y = d3.scaleLinear().range([HEIGHT, 0])


		// axis generators
		vis.xAxisCall = d3.axisBottom()
		vis.yAxisCall = d3.axisLeft()
			.ticks(6)
			.tickFormat(d3.format('.3s'))

		// axis groups
		vis.xAxis = vis.g.append("g")
			.attr("class", "x axis")
			.attr("transform", `translate(0, ${HEIGHT})`)
		vis.yAxis = vis.g.append("g")
			.attr("class", "y axis")

		// Path generator

		vis.update(newArray)
	}

	update(data) {
		let vis = this

		vis.x.domain(d3.extent(data, d => d.Date))
		vis.y.domain([0, d3.max(data, d => d.Score)])

		// generate axes once scales have been set
		vis.xAxis.call(vis.xAxisCall.scale(vis.x))
		vis.yAxis.call(vis.yAxisCall.scale(vis.y))
		console.log(data)


	// line path generator
	const line = d3.line()
		.x(d => vis.x(d.Date))
		.y(d => vis.y(d.Score))

		vis.g.append("path")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
			.attr("d", line(data));


	}
}

export default D3Chart
