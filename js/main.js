

var svg = d3.select('svg'),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr('width') - margin.left - margin.right,
    height = +svg.attr('height') - margin.top - margin.bottom,
    g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top +  ')');


var x = d3.scaleBand()
          .rangeRound([0, width])
          .paddingInner(0.05)
          .align(0.1);

var y = d3.scaleLinear()
          .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
          .range(['#0000ff', '#ff0000']);

d3.json("https://sheets.googleapis.com/v4/spreadsheets/1yeqDUPudGxJH6dum24U0MLSTVDuI2D4P92eiGCebNDg/values/CMReport?key=AIzaSyACJJ5rSN1hRbpHu5nosMdB8TokAZ7m83o").then(function(data) {

    const transformedData = data.values
    .slice(1)
    .map((el) => ({
        'Month': el[0],
        'BillableHours': el[1],
        'AvailableHours': el[2]
    }))
    // console.log(transformedData)
    var keys = [];
    var barHeight = [];
    transformedData.map(function (el){
      keys.push(el.Month);
      delete el.Month
      barHeight.push(+el.AvailableHours + +el.BillableHours)
    });

    console.log(barHeight)

    x.domain(keys.map(function (d){ return d }));
    y.domain([0, d3.max(data, function(d){
      return barHeight
    })]).nice();

});
