// Constants
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Function for displaying demographic info panel
function panel(response, dataset) {
    // Fetching data from the provided JSON URL
    d3.json(url).then(response => console.log(response));
    
    // Extracting keys and values from metadata for the selected dataset
    let demoArrKey = Object.keys(response.metadata.filter(data => data.id == dataset)[0]);
    let demoArrVal = Object.values(response.metadata.filter(data => data.id == dataset)[0]);        
    
    // Displaying demographic information in the panel
    for (let i = 0; i < demoArrKey.length; i++) {
        d3.select('#sample-metadata').append('div').text(`${demoArrKey[i]} : ${demoArrVal[i]}`)
    }
}

// Function to update the restyled plot's values
function optionChanged(type, newdata) {
    // Clearing existing content of the specified HTML element
    d3.select(type).html('');
    // Creating a new Plotly plot with updated data
    Plotly.newPlot(type, newdata);
}

// Function to fetch data and initialize default visualization
function init() {
    // Fetching data
    d3.json(url).then(response => {       
        // Plotting default visualization
        plot(response, 940);
        // Displaying demographic info panel for default dataset
        panel(response, 940);        
    });
}

// Function to handle data fetching and visualization update on dropdown change
function getData() {
    // Fetching data
    d3.json(url).then(response => {
        // Getting the selected dataset from the dropdown menu
        let selection = d3.select('#selDataset');
        let dataset = selection.property('value');
        console.log(dataset);
        // Updating the plots and demographic info panel with the selected dataset
        plot(response, dataset);        
        d3.select('#sample-metadata').html('');
        panel(response, dataset);
        console.log(Object.values(response.metadata.filter(data => data.id == dataset)[0]));
    });
}

// Function to plot data
function plot(response, dataset) {
    // Extracting required data from the response
    let sampleData = response.samples.filter(data => data.id == dataset)[0];
    let sampleValues = sampleData.sample_values.sort((a, b) => b - a).slice(0, 10).reverse();
    let otuIds = sampleData.otu_ids.slice(0,10).reverse();
    let otuLabels = sampleData.otu_labels.slice(0,10).reverse();
    console.log(sampleValues);
    console.log(otuIds);
    console.log(otuLabels);

    // Creating data object for Plotly Bar Chart
    let dataBar = [{
        x: sampleValues,
        y: otuIds.map(id => `OTU ${id}`),
        text: otuLabels,
        type: 'bar',
        orientation: 'h'
    }];
  
    // Updating the bar chart
    optionChanged('bar', dataBar);

    let sampleValues1 = sampleData.sample_values.sort((a, b) =>b-a).reverse();
    let otuIds1 = sampleData.otu_ids.reverse();
    let otuLabels1 = sampleData.otu_labels.reverse();

    // Creating data object for Plotly Bubble Chart
    let dataBubble =[{
        x : otuIds1,
        y: sampleValues1,
        text : otuLabels1,
        mode: 'markers',
        marker: {
            size: sampleValues1,
            color : otuIds1,
            colorscale: 'Viridis',
        }
        
    }];

    // Updating the bubble chart
    optionChanged('bubble', dataBubble);
    
    let wfreq = response.metadata.filter(data => data.id == dataset)[0].wfreq;
    console.log(wfreq)

    let gaugeChart = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: "<b> Belly Button Washing Frequency </b> <br></br> Scrubs Per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 9] },
            bar: { color: "#6699CC" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
                { range: [0, 1], color: "#D1E3F9" }, // Lightest blue
                { range: [1, 2], color: "#A3C7EE" }, // Light blue
                { range: [2, 3], color: "#75ABE3" }, // Blue
                { range: [3, 4], color: "#479FDE" }, // Dark blue
                { range: [4, 5], color: "#1B94D9" }, // Darker blue
                { range: [5, 6], color: "#007ACF" }, // Even darker blue
                { range: [6, 7], color: "#0062A6" }, // Very dark blue
                { range: [7, 8], color: "#004A7F" }, // Almost black blue
                { range: [8, 9], color: "#003258" }  // Blackish blue
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: wfreq
            }
        }
    }];
       
    // Updating the gauge chart
    optionChanged('gauge', gaugeChart);
}

// Event listener for dropdown change
d3.selectAll("#selDataset").on("change", getData);

// Adding Options to Select tag with value attribute
d3.json(url).then(response => {
    // Extracting names from the response
    const names = Object.values(response.names);
    // Adding options to the dropdown menu
    for (let i = 0; i < names.length; i++) {
        d3.select('#selDataset').append('option').text(names[i]).attr('value', names[i]);
    }
});

// Initialize the visualization
init();
