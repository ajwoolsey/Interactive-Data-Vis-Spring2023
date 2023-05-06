d3.csv("../data/walkscore.csv", d3.autoType)
  .then(WalkScore => {
console.log(WalkScore)

const bikewidth = 400,
bikeheight = window.innerHeight * 0.9,
bikemargin = { top: 20, bottom: 50, left: 50, right: 20 };

bikesvg= d3
.select('#bikescore')
.append('svg')
.attr('width', bikewidth)
.attr('height', bikeheight);

//BikeScore ParkScore xScale
const bikexScale= d3.scaleLinear()
.domain([0, 100])
.range([bikemargin.left, bikewidth - 20])

// //y scale BikeScore ParkScore
const bikeyScale= d3.scaleLinear()
.domain([0, 100])
.range([bikeheight -  bikemargin.bottom, bikemargin.top])

var bikesvg= d3.select("#container")
.append("svg")
//background color is style not attribute
.style("background-color", "black")
.attr("width", bikewidth)
.attr("height", bikeheight)
.append("g")

// //Creating axes for ParkScore BikeScore Scatterplot
const bikexAxis = d3.axisBottom(bikexScale)
bikesvg.append("g")
.attr("transform", `translate(0,${bikeheight - bikemargin.bottom})`)
.attr('stroke', 'white')
.call(bikexAxis)
.select("path")
.attr('stroke', 'white')
.select("line")
.attr('stroke', 'white');

const bikeyAxis = d3.axisLeft(bikeyScale)
bikesvg.append("g")
.attr("transform", `translate(${bikemargin.left},0)`)
.attr('stroke', 'white')
.attr('fill', 'white')
.call(bikeyAxis)
.select("path")
.attr('stroke', 'white')
.select("line")
.attr('stroke', 'white');

// //Axes titles for ParkScore BikeScore

var bikexLabel = bikesvg.append("text")
.text("Park Score")
.attr("x", 150)
.attr("y", 660)
.style('fill', 'white');

// //y axis for bikescore
var bikeyLabel = bikesvg.append("text")
.text("Bike Score")
.attr("x", -200)
.attr("y", 200)
.attr('transform', 'rotate(270,-60,120)')
.style('fill', 'white');

//Appending g to add dots to plot
bikesvg.append('g')
.selectAll("dot")
.data(WalkScore)
.enter()
.append("circle")
.attr("cx", function (d) { return xScale(d.ParkScoreRating); } )
.attr("cy", function (d) { return yScale(d.Bikecore); } )
//Size based radius
.attr("r", (d) => {
if (d.CityName === 'Mesa, AZ' || d.CityName === 'Washington, DC') {
return 8
} else {
return 3
  }
})
//Ternerary function for mesa and dc dots
.attr("fill", (d) => { 
return d.CityName === 'Mesa, AZ'  ? 'red' : d.CityName === 'Washington, DC' ? 'orange' : 'purple'
})
  })