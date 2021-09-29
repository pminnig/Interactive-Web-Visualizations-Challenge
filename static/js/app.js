function init() {
	d3.json("samples.json")
		.then(data => {
			var myData = data.samples[0];
			var myMetaData = data.metadata[0];
			console.log(myMetaData)

			// assign arrays of interest to variables
			var samples = Object.values(myData.sample_values)
			var ids = Object.values(myData.otu_ids)
			var labels = Object.values(myData.otu_labels)

			// put arrays into objects for easy use
			var items = ids.map((id, index) => {
			  return {
				id: id,
				samples: samples[index],
				labels: labels[index]
			  }
			});
					
			// sort by sample values
			let sortedData = items.sort((a, b) => b.samples - a.samples);
			// slice the top 10
			slicedData = sortedData.slice(0, 10);
			
			// Build the bar plot	
			
			data = [{
				x: slicedData.map(object => object.id),
				y: slicedData.map(object => object.samples),
				text: slicedData.map(object => object.labels), 
				type: 'bar',
				title: "Top 10 OTU's",
				orientation: "h"}];
			Plotly.newPlot("bar", data);
			
			// Build the bubble chart
			var trace = {
				x: slicedData.map(object => object.id),
				y: slicedData.map(object => object.samples),
				text: slicedData.map(object => object.labels), 
			    mode: 'markers',
			    marker: {
				  size: slicedData.map(object => object.samples),
				  color: slicedData.map(object => object.id)
			    }
			};
			
			Plotly.newPlot('bubble', [trace])
			
			// transform metadata
			var mdArray = Object.entries(myMetaData);
			console.log(mdArray)
			
			// insert metadata
			var md = d3.select("#sample-metadata").append("ul");

			md.selectAll('li')
			.data(mdArray)
			.enter()
			.append('li')
			.html(String);
		})
			 

};

// On change to the DOM, call getData	
d3.selectAll("#selDataset").on("change", getData);
// Function called by DOM changes
function getData() {
	var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
	var dataset = dropdownMenu.property("value");
	d3.json("samples.json")
		.then(data => {
			var myData = data.samples[dataset];
			var myMetaData = data.metadata[dataset];
			console.log(myMetaData)

			// assign arrays of interest to variables
			var samples = Object.values(myData.sample_values)
			var ids = Object.values(myData.otu_ids)
			var labels = Object.values(myData.otu_labels)

			// put arrays into objects for easy use
			var items = ids.map((id, index) => {
			  return {
				id: id,
				samples: samples[index],
				labels: labels[index]
			  }
			});
					
			// sort by sample values
			let sortedData = items.sort((a, b) => b.samples - a.samples);
			// slice the top 10
			slicedData = sortedData.slice(0, 10);
			
			// Build the bar plot	
			
			data = [{
				x: slicedData.map(object => object.id),
				y: slicedData.map(object => object.samples),
				text: slicedData.map(object => object.labels), 
				type: 'bar',
				title: "Top 10 OTU's",
				orientation: "h"}];
			Plotly.newPlot("bar", data);
			
			// Build the bubble chart
			var trace = {
				x: slicedData.map(object => object.id),
				y: slicedData.map(object => object.samples),
				text: slicedData.map(object => object.labels), 
			    mode: 'markers',
			    marker: {
				  size: slicedData.map(object => object.samples),
				  color: slicedData.map(object => object.id)
			    }
			};
			
			Plotly.newPlot('bubble', [trace])
			
			// transform metadata
			var mdArray = Object.entries(myMetaData);
			console.log(mdArray)
			
			// insert metadata
			var md = d3.select("#sample-metadata").append("ul");

			md.selectAll('li')
			.data(mdArray)
			.enter()
			.append('li')
			.html(String);

			// Call function to update the chart
			updatePlotly(data);
  })

}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("bar", newdata);
}



init();