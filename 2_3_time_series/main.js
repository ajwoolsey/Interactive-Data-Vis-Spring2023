const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 100, right: 60 }



/* LOAD DATA */
d3.csv('../data/collisioncount.csv', d => {
  // use custom initializer to reformat the data the way we want it
  // ref: https://github.com/d3/d3-fetch#dsv
  return {
    year: new Date(+d.Year, 0, 1),
    count: +d.Count
  }
}).then(data => {
  console.log('data :>> ', data);

  // + SCALES
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([margin.right, width - margin.left])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.count))
    .range([height - margin.bottom, margin.top])

  // CREATE SVG ELEMENT
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr('margin', 50)

  // BUILD AND CALL AXES
  const xAxis = d3.axisBottom(xScale)
 svg.append("g")
 .attr("transform", `translate(0,${height - margin.bottom})`)
 .style("font", "14px times")
 .call(xAxis);

 const yAxis = d3.axisLeft(yScale)
 svg.append("g")
 .attr("transform", `translate(58,0)`)
 .style("font", "14px times")
 .call(yAxis);

 svg.append("text")
    .attr("class", "x label")
    .attr("x", 400)
    .attr("y", height - 6)
    .attr("font-weight", "900")
    .attr("font-size", "24")
    .style("font", "20px times")
    .text("Year");

  svg.append("text")
  var circle= svg.append('text')
  .attr('x', -100)
  .attr('y', 98)
  .text("Collision Count")
  //degrees, x axis, y axis percentages
  .attr('transform', 'rotate(270,35,120)')
  .attr("font-weight", "900")
    .attr("font-size", "24")
    .style("font", "20px times")

  //LINE GENERATOR FUNCTION
  const lineGen = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.count))

  // DRAW LINE
  svg.selectAll(".line")
    .data([data]) // data needs to take an []
    .join("path")
    .attr("class", 'line')
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("d", d => lineGen(d))

    //area function NOT WORKING
  // const areaGen = d3.area()
  //           .x((p) => p.x)
  //           .y0((p) => 0)
  //           .y1((p) => p.y);
    
            
            svg.append("path")
            .data([data])
            .attr("fill", "green")
            .attr("stroke", "black")
            .attr("d", d3.area()
              .x(function(d) { console.log(d); return xScale(d.year) })
              .y0(yScale(0))
              .y1(function(d) { return yScale(d.count) })
               );
            

});


//  /* CONSTANTS AND GLOBALS */
// const width = window.innerWidth * 0.7,
// height = window.innerHeight * 0.7,
// margin = {top: 20, left: 60, bottom: 60, right: 20};
// //   height = ,
// //   margin = ;

// /* LOAD DATA */
// d3.csv('../data/annual.csv', d => {
//   return {
//     Year: new Date(+d.Year, 0, 1),
//     Mean: +d.Mean
//   }
// }).then(data => {
//   console.log('data :>> ', data);

//   // SCALES
// const xScale = d3.scaleTime()
// //define minimum and maximum from the data
// .domain(d3.extent(data, d => d.year))
// .range([margin.left, width- margin.right])

// //y scale
// const yScale= d3.scaleLinear()
// .domain(d3.extent(data, d => d.mean))
// .range([height - margin.bottom, margin.top])
//   // CREATE SVG ELEMENT
// const svg= d3.select("#container")
// .append('svg')
// .attr("width", width)
// .attr("height", height)
//   // BUILD AND CALL AXES

//   // LINE GENERATOR FUNCTION
// const lineGen = d3.line()
// //default is [[x,y], [x,y]] have to tell D3 how to look at the data
// .x(d => xScale(d.year))
// .y(d => yScale(d.mean))
//   // DRAW LINE
// const line = svg.selectAll('.line')
//   .data([data])
//   .join("path")
//   .attr("class", "line")
//   .attr("d", d => lineGen(d))
//   .attr("stroke", "black")
//   .attr("fill", "none")
// });

