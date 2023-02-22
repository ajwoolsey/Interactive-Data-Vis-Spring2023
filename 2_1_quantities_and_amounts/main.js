
/* CONSTANTS AND GLOBALS */
// const width = ;
// const height = ;

const data = [
  { day: 'Sunday', crashes: 13664},
  { day: 'Monday', crashes: 17279},
  { day: 'Tuesday', crashes: 17337},
  { day: 'Wednesday', crashes:  17394},
  { day: 'Thursday', crashes: 17394},
  { day: 'Friday', crashes: 19147},
  { day: 'Saturday', crashes: 15714}
];

//create svg to hold bar chart
<svg width= "500" height= "400"></svg>

//creating svg with preselected container div. selecter for div id is #
const svg= d3.select('#container')
  margin = 200,
  width = svg.attr("width") - margin,
  height = svg.attr("height") - margin

//Scale
  const x= d3.ScaleBand ()
    .domain(d3.range(data, length))
    .range(margin.left, width - margin.right)
    .padding(0.1);
  
  const y= d3.ScaleLinear()
    .domain([10000, 20000])
    .range([height - margin.bottom, margin.top]);

//ready to add rectangles
svg
  .append('g')
  .attr('fill', 'purple')
  .selectAll('rect')
  .data(data.sort((a, b) => d3.descending(a.score, b,score)))
  .join('rect')
   