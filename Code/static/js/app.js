// create the function that will pull the data from samples through d3
function show_charts(select_data){
    d3.json("samples.json").then ((data)=> {
    // code to pull up data for each sample (which I called "each_choice")
    each_choice = data.samples.filter(sample => sample.id == select_data)
    each_choice = each_choice[0]
    console.log(each_choice)
    // create bar chart
    var bar_data = [
        {
          x: each_choice.sample_values.slice(0,10).reverse(),
          y: each_choice.otu_ids.map(el => "OTU " + el).slice(0,10).reverse(),
          text: each_choice.otu_labels.slice(0,10).reverse(),
          type: 'bar',
          orientation: 'h'
        }
      ];
      //give bar chart a title
      var barlayout={
          title: "Top Ten OTUs"
      }
      //show bar chart on webpage
      Plotly.newPlot('bar', bar_data, barlayout)

    // create bubble chart
    var bubble_data = [
        {
          x: each_choice.otu_ids,
          y: each_choice.sample_values,
          text: each_choice.otu_labels,
          mode: "markers",
          marker: {
              size: each_choice.sample_values, 
              color: each_choice.otu_ids,
              text: each_choice.otu_labels,
          }
        }
      ];
      //give bubble chart a title
      var bubble_layout={
          title: "Top Ten OTUs"
      }
      // show bubble chart on webpage
      Plotly.newPlot('bubble', bubble_data, bubble_layout)

      //demographics = data.metadata.filter(sample => sample.id == select_data)
      //demographics = demographics[0]
      //console.log(demographics) 
      
      //Plotly.newPlot('sample-metadata', demographics)
    })
}


// Fetch the JSON data and put it into the dropdown menu
d3.json("samples.json").then ((data)=> {
dropdown=d3.select("#selDataset")
    console.log(data);
// change number in dropdown menu
data.names.forEach(element => {
    dropdown.append("option").text(element).property("value",element)
});
// show first sample and its data when webpage loads
    show_charts(data.names[0])
});

// change charts for each selection
function optionChanged(select_data){
    console.log(select_data)
    show_charts(select_data)
}

  
