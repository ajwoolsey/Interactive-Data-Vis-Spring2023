/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
   margin = { top: 10, bottom: 80, left: 60, right: 40 },
  radius = 5;
//   height = ,
//   margin = ,
//   radius = ;

/* LOAD DATA, d3.json is a promise */
d3.csv("../data/agegenderbmi.csv", d3.autoType)
  .then(data => {
    console.log(data)

    /* SCALES */
    //x scale
    const xScale= d3.scaleLinear()
    //Age, x axis
    .domain([0, 55])
    .range([60, 1000])
    
    //y scale BMI
    const yScale= d3.scaleLinear()
    .domain([0, 40])
    .range([height - margin.bottom, margin.top])

    //axis
    //var xAxis = d3.axisBottom(xScale)

    //var yAxis= d3.axisLeft(yScale);

    //color scale scale ordinal discrete values
    const color= d3.scaleOrdinal()
    .domain(["F", "M"])
    .range(["pink", "blue"])
    /* HTML ELEMENTS */
    
    //append svg
    var svg= d3.select("#container")
    .append("svg")
    //background color is style not attribute
    .style("background-color", "white")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + 200 + "," + margin.top + ")");

    //axis
  //svg.append("g")
 // .attr("class", "x axis")
  //.attr("transform", "translate(0, 650)")
  //  .call(xAxis);
  
 // svg.append("g")
 // .attr("transform", "translate(, 0)")
 //   .call(yAxis);
 const xAxis = d3.axisBottom(xScale)
 svg.append("g")
 .attr("transform", `translate(0,${height - margin.bottom})`)
 .call(xAxis);
 
 const sizeScale= d3.scaleSqrt()
 //domain is BMI range
 .domain([20, 40])
 //smallest to largest dot radius
 .range([5, 20])

 const yAxis = d3.axisLeft(yScale)
 svg.append("g")
   .attr("transform", `translate(${margin.left},0)`)
   .call(yAxis);
  
    //append circles, use dot to make it easier to understand
    svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return xScale(d.Age); } )
      .attr("cy", function (d) { return yScale(d.BMI); } )
      //Size based radius
      .attr("r", function (d) { console.log(d); return sizeScale(d.BMI) })
      .style("fill", function (d) { return color(d.Sex) } )

//Axis titles
//x axis
var circle= svg.append('text')
.attr('x', 375)
.attr('y', 560)
.text("Age")

var circle= svg.append('text')
.attr('x', 0)
.attr('y', 70)
.text("BMI")
//degrees, x axis, y axis percentages
.attr('transform', 'rotate(270,50,120)')

    
  });