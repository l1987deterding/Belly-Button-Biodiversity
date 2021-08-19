function show_charts(select_data){
    d3.json("samples.json").then ((data)=> {
    each_choice = data.samples.filter(sample => sample.id == select_data)
    each_choice = each_choice[0]
    console.log(each_choice)
    var bar_data = [
        {
          x: each_choice.sample_values.slice(0,10).reverse(),
          y: each_choice.otu_ids.map(el => "OTU " + el).slice(0,10).reverse(),
          text: each_choice.otu_labels.slice(0,10).reverse(),
          type: 'bar',
          orientation: 'h'
        }
      ];
      var barlayout={
          title: "Top Ten OTUs"
      }
      Plotly.newPlot('bar', bar_data, barlayout)


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
      var bubble_layout={
          title: "Top Ten OTUs"
      }
      Plotly.newPlot('bubble', bubble_data, bubble_layout)

      //var demographics = {
      //    data.metadata.filter(sample => sample.id == select_data)
      //    demographics = demographics[0]
      //    console.log(demographics) 
      //}

      //Plotly.newPlot('sample-metadata', demographics)
    })



}

// Fetch the JSON data and console log it
d3.json("samples.json").then ((data)=> {
dropdown=d3.select("#selDataset")
    console.log(data);
data.names.forEach(element => {
    dropdown.append("option").text(element).property("value",element)
});
    show_charts(data.names[0])
});

function optionChanged(select_data){
    console.log(select_data)
    show_charts(select_data)
}

  
