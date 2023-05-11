/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

legendsvg = d3
  .select('#legend')
  .append("svg")
  .attr("width", 100)
  .attr("height", 200);


/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
Promise.all([
  d3.json("../data/usState.json"),
  d3.json("../data/tl_2019_us_cbsa.json"),
  d3.csv("../data/usHeatExtremes.csv", d3.autoType),
  d3.csv("../data/stateCapitals.csv", d3.autoType),
  d3.csv("../data/windfarmusa.csv", d3.autoType),
]).then(([geojson, transitline, heat, stateCapitals, windfarm]) => {

console.log(transitline)
  // create an svg element in our main `d3-container` element
  svg = d3
    .select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // SPECIFY PROJECTION
  // a projection maps from lat/long -> x/y values
  // so it works a lot like a scale!
  const projection = d3.geoAlbersUsa()
    .fitSize([
      width - margin.left - margin.right,
      height - margin.top - margin.bottom
    ], geojson);

  // DEFINE PATH FUNCTION
  const path = d3.geoPath(projection)

  // draw base layer path - one path for each state
  const states = svg.selectAll("path.states")
    .data(geojson.features)
    .join("path")
    .attr("class", 'states')
    .attr("stroke", "white")
    .attr("fill", "transparent")
    .attr("d", path)
  
   const transit = svg.selectAll("path.lanes")
  .data(transitline.features)
  .join("path")
  .attr("class", 'lanes')
  .attr("stroke", '#e75480')
  .attr('stroke-width', 1.5)
  .attr("fill", "transparent")
  .attr("d", path)

  // draw point for DC Apartment
  const DCApartment =  { latitude: 38.916810, longitude: -77.015480 };
  svg.selectAll("circle.point")
    .data([DCApartment])
    .join("circle")
    .attr("r", 10)
    .attr("fill", "gold")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })

    const sizeScale= d3.scaleSqrt()
    //domain is heat range- use heat map function to find the min and max of Changein95percentDays
    .domain([d3.min(heat.map(d => d.Changein95percentDays)), d3.max(heat.map(d => d.Changein95percentDays))])
    //smallest to largest dot radius
    .range([1, 25])
   
  svg.selectAll("circle.stateCapitals")
    .data(stateCapitals)
    .join("circle")
    .attr("r", 5)
    .attr("fill", 'red')
    .attr("transform", d=> {
        // use our projection to go from lat/long => x/y
        const coords = projection([d.longitude, d.latitude])
        //console log shows that x=0 and y=1
        if (coords[0] && coords[1]) {
          return `translate(${coords[0]}, ${coords[1]})`}
        })

// if(showstateCapitals)   {
          svg.selectAll("circle.windfarm")
            .data(windfarm)
            .join("circle")
            .attr("r", 5)
            .attr("fill", 'green')
            .attr("transform", d=> {
                // use our projection to go from lat/long => x/y
                const coords = projection([d.Longitude, d.Latitude])
                //console log shows that x=0 and y=1
                if (coords[0] && coords[1]) {
                  return `translate(${coords[0]}, ${coords[1]})`}
        
            })

    });
