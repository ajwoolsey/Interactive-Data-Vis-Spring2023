/* CONSTANTS AND GLOBALS- have to make unique for dc map */
function dcInit() {

const dcwidth = window.innerWidth * 0.45,
  dcheight = window.innerHeight * 0.7,
  dcmargin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
 * LOAD DATA
 * Using a Promise.all([]), to load more than one dataset at a time
 * need reference json for projection to work
 * */
Promise.all([
    d3.json("../data/Bicycle_Lanes.json"),
    d3.json("../data/Metro_Lines_Regional.json"),
    d3.json("../data/DCNational_Parks.json"),
    d3.csv("../data/Metro_Bus_Stops.csv", d3.autoType),
]).then(([BikeLanes, MetroLines, DCNationalParks, MetroBus]) => {
console.log(MetroLines)
  // create an svg element for dc map
  dcsvg = d3
    .select("#dc")
    .append("svg")
    .attr("width", dcwidth)
    .attr("height", dcheight);
    
//making background color black
    dcsvg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "black");


  // SPECIFY PROJECTION
  // a projection maps from lat/long -> x/y values
  // so it works a lot like a scale!
  const dcprojection = d3.geoAlbersUsa()
    .fitSize([
      dcwidth - dcmargin.left - dcmargin.right,
      dcheight - dcmargin.top - dcmargin.bottom
    ], BikeLanes);

  // DEFINE PATH FUNCTION
  const dcpath = d3.geoPath(dcprojection)

  //variable for tooltip
//   var tooltip = d3.select("body")
//   .append("div")
//   .style("position", "absolute")
//   .style("z-index", "10")
//   .style("visibility", "hidden")
//   .text("a simple tooltip");
  // draw base layer path - Mesa county
// svg.selectAll("path.counties")
//     .data(geojson.features)
//     .join("path")
//     .attr("class", 'counties')
//     .attr("stroke", "black")
//     .attr("fill", "transparent")
//     .attr("d", path)

//Creating an array for color coding metro lines


//draw path for bike lanes- "features" from console.log array
if (showBikePath) {
  dcsvg.selectAll("path.lanes")
    .data(BikeLanes.features)
    .join("path")
    .attr("class", 'lanes')
    .attr('stroke-width', 1.5)
    .attr("stroke", "#d487a2")
    .attr("fill", "transparent")
    .attr("d", dcpath)
}
// draw path for metro- have to use "geometries" from console.log array
if (showLightRail) {
   dcsvg.selectAll("path.lines")
    .data(MetroLines.geometries)
    .join("path")
    .attr("class", 'lines')
    //seeing how data organizes metro lines using i as index
    .attr("stroke", 'white')
    .attr("fill", "transparent")
    .attr('stroke-width', 2)
    .attr("d", dcpath);
}

// Draw circle for each DC bus station (want hover function)
if(showBusStop) {
dcsvg.selectAll("circle.MetroBus")
    .data(MetroBus)
    .join("circle")
    .attr("r", 1)
    .attr("fill", "#eed467")
    .attr("transform", d=> {
        // use our projection to go from lat/long => x/y
        const coords = dcprojection([d.BSTP_LON, d.BSTP_LAT])
        // console.log(coords)
        //console log shows that x=0 and y=1
        if (coords[0] && coords[1]) {
          return `translate(${coords[0]}, ${coords[1]})`}

    })
  }

  if(showParks) {
    dcsvg.selectAll("path.parks")
    .data(DCNationalParks.features)
    .join("path")
    .attr("class", 'parks')
    .attr("stroke", "#7fb47d")
    .attr("opacity", .8)
    .attr('stroke-width', 1.75)
    .attr("fill", "transparent")
    .attr("d", dcpath);
  }
    

    //creating sizeScale for UGS
//     const sizeScale= d3.scaleSqrt()
//     //
//     .domain([d3.min(MesaParks.map(d => d.NumberofAcres)), d3.max(MesaParks.map(d => d.NumberofAcres))])
//     //smallest to largest dot radius
//     .range([1, 15])

// //Draw TREE/icon for each park, size scale for size of park
//     svg.selectAll("circle.MesaParks_Locations_And_Amenities")
//     .data(MesaParks)
//     .join("circle")
//     .attr("r", function (d) { console.log(d); return sizeScale(d.NumberofAcres)})
//     .attr("opacity", 1)
//     .attr("fill", "#008000")
//     .attr("transform", d=> {
//         // use our projection to go from lat/long => x/y
//         const coords = projection([d.Longitude, d.Latitude])
//         console.log(coords)
//         //can't read coords if coords is null, have to change to coords && coords[0]
//         if (coords && coords[0] && coords[1]) {
//           return `translate(${coords[0]}, ${coords[1]})`}

     
//   })
  //tooltip for hover function for parks
//   .on("mouseover", function(d){
//     console.log(d)
//     return tooltip.style("visibility", "visible").text("hello");})
// 	.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
// 	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
})
}
dcInit()