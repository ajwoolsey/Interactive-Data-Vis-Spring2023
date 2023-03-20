const margin = {top: 20, right: 30, bottom: 40, left: 120},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#container")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Parse the Data
d3.csv('../data/squirrelActivities.csv', d3.autoType)
.then(data => {
//X scale and axis
  const xScale = d3.scaleLinear()
    .domain([0, 1500])
    .range([ 0, width]);
  //have to put style after the call
    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).tickSize(0))
    .style('font-size', '14')
    .select(".domain").remove()
    
    

  // Y Scale and Axis
  const y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(d => d.activity))
    .padding(.1)
  //axis label 
  svg.append("g")
    .call(d3.axisLeft(y).tickSize(1))
    .style('font-size', '14')
    
    var colorScale = d3.scaleOrdinal()
    .domain(["running", "chasing", "climbing", "eating", "foraging"])
    .range(["red", "orange", "green", "blue", "purple"]);
  //Bars
  svg.selectAll("myRect")
    .data(data)
    .join("rect")
    .attr("x", xScale(0) )
    .attr("y", d => y(d.activity))
    .attr("width", d => xScale(d.count))
    .attr("height", y.bandwidth())
    .attr("fill", function (d) { return colorScale(d.activity)})
    
 //Color Scale
 

    //Axis labels
    var circle= svg.append('text')
    .attr('x', 100)
    .attr('y', 375)
    .text("Count")

    var circle= svg.append('text')
    // .attr('x', 0)
    // .attr('y', 100)
    .text("Activity")
    //degrees, x axis, y axis percentages
    .attr('transform', 'rotate(270,50,150)')
    
})



