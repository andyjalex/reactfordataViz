import * as d3 from 'd3'



class D3Chart {
	constructor(element, data, breed) {
		let vis = this

		vis.margin = {
      left: 50,
      right: 50,
      top: 10,
      bottom: 50
    }


    vis.data = data;
		var xColumn = "Date"
		var yColumn = "Score"

		const el = document.getElementById("container")
		vis.height = 350 - vis.margin.top - vis.margin.bottom
		vis.width = 800 - vis.margin.left - vis.margin.right


		vis.g = d3.select("div#container")
			.append("svg")
			.attr("preserveAspectRatio", "xMinYMin meet")
			.attr("viewBox", "0 0 " + (vis.width + vis.margin.left + vis.margin.right) + " " + (vis.height + vis.margin.top + vis.margin.bottom))
			.classed("svg-content", true)
			.append("g")
				.attr("transform", `translate(${vis.margin.left}, ${vis.margin.top})`)

		var numOfCols = Object.keys(vis.data[0]).length

		var numOfDogs = numOfCols-2

		// scales
		vis.x = d3.scaleTime()
			.range([0, vis.width])

		vis.y = d3.scaleLinear()
			.range([vis.height, 0])

		// axis groups
		vis.xAxis = vis.g.append("g")
			.attr("class", "x axis")
			.attr("transform", `translate(0, ${vis.height})`)
		vis.yAxis = vis.g.append("g")
			.attr("class", "y axis")

		// Path generator
		console.log(breed)
		vis.update(vis.data, breed)
	}

	update(data, breed) {
		let vis = this

		vis.g
		.attr('height', '500px')
		.attr('width', vis.width)

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
			d.NewDate = new Date(d.year, d.month, '01')
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


		console.log(newData)


		var lineColumn ='Breed';
		var xColumn = "Date";
		var yColumn = "Score";

		vis.y.domain([0, d3.max(newData, d => d.Score)])
		vis.x.domain(d3.extent(newData, d => d.Date))

		// generate axes once scales have been set
		vis.xAxisCall = d3.axisBottom()
		vis.xAxis.call(vis.xAxisCall.scale(vis.x))

		vis.yAxisCall = d3.axisLeft()
			.ticks(6)
			.tickFormat(d3.format('.3s'))
		vis.yAxis.call(vis.yAxisCall.scale(vis.y))

		var nested = Array.from(
		 d3.group(newData, d => d[lineColumn]), ([key, value]) => ({key, value})
	 );
		//console.log(nested)

		// set the colour scale
    var color = d3.scaleOrdinal(d3.schemeCategory10);

		// spacing for the legend
		var legendSpace = vis.width/nested.length;

		//nested.map((i) => console.log(i.value));

		var paths = vis.g.selectAll('.lineTest')
		.data(nested, d => d.Breed)

		console.log(paths)
		paths.exit().transition().duration(500).remove()

		// //update
		// paths.transition().duration(500)
		// .attr("d", function(d){
		// 				return d3.line()
		// 				.x(function(d) { return vis.x(d[xColumn]); })
		// 				.y(function(d) { return vis.y(d[yColumn]) })
		// 				(d.value)
		// 			})
		//enter
		paths.enter().append("path")
			.attr("fill", "none")
			.attr("stroke", function(d){ return color(d.key) })
			.attr("stroke-width", 2)
			.attr("class","lineTest")
			.merge(paths)
			.transition()
    .duration(1000)
			.attr("stroke", function(d){ return color(d.key) })
			.attr("d", function(d){
        return d3.line()
          .x(function(d) { return vis.x(d[xColumn]); })
          .y(function(d) { return vis.y(d[yColumn]) })
          (d.value)
      })



		vis.g.selectAll('.legend').remove()
		const legends = vis.g.selectAll('.legend')
		.data(nested, function(d){
    return d.key; // always try and use a key function to uniquely identify
  	});

		legends.enter().append("text")
			.attr("x", function(d, i){ return (legendSpace/2)+i*legendSpace})  // space legend
	      .attr("y", vis.height + (vis.margin.bottom/2)+ 20)
	      .attr("class", "legend")    // style the legend
	      .style("fill", function(d) { // Add the colours dynamically
	          return d.color = color(d.key); })
	      .text(function(d){return d.key;})


		// nested.forEach(function(d,i) {
		// 	// Add the Legend
    //   vis.g.append("text")
    //       .attr("x", (legendSpace/2)+i*legendSpace)  // space legend
    //       .attr("y", HEIGHT + (MARGIN.BOTTOM/2)+ 5)
    //       .attr("class", "legend")    // style the legend
    //       .style("fill", function() { // Add the colours dynamically
    //           return d.color = color(d.key); })
    //       .text(d.key);
		// })

	}
}

export default D3Chart
