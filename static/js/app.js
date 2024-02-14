// Get the Data from samples.json
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Update the restyled plot's values
function optionChanged(type, newdata) {
    Plotly.react(type, newdata);
}

// Function for data in Demographic info Panel
function panel(response, dataset){
    d3.json(url).then(response => console.log(response));
let demoArrKey = Object.keys(response.metadata.find(data => data.id == dataset));
        let demoArrVal = Object.values(response.metadata.find(data => data.id == dataset));        
        for (let i = 0; i< demoArrKey.length; i++){
            d3.select('#sample-metadata').append('div').text(demoArrKey[i] + ' : ' + demoArrVal[i])
            }
}

// Adding Options to Select tag with value attribute
d3.json(url).then(response =>{

    const names = Object.values(response.names);
    for(let i = 0; i < names.length;i++){
    d3.select('#selDataset').append('option').text(names[i]).attr('value', names[i]);
}})

// Display default visualization
function init(){
    // Fetch data
    d3.json(url).then(response => {
       
        // Extract required data from the response
        let sampleValues = response.samples[0].sample_values.sort((a, b) =>b-a).slice(0,10).reverse();
        let otuIds = response.samples[0].otu_ids.slice(0,10).reverse();
        let otuLabels = response.samples[0].otu_labels.slice(0,10).reverse();
        console.log(sampleValues);
        console.log(otuIds);
        console.log(otuLabels);
        // Create data object for Plotly Bar Chart
        let dataBar = [{
            x: sampleValues,
            y: otuIds.map(id => `OTU ${id}`),
            text: otuLabels,
            type: 'bar',
            orientation: 'h'
        }];

        let layoutBar = {
            width: 400,
            height: 600
        }

        // Create plot using Plotly
        Plotly.newPlot('bar', dataBar, layoutBar);

        let sampleValues1 = response.samples[0].sample_values.sort((a, b) =>b-a).reverse();
        let otuIds1 = response.samples[0].otu_ids.reverse();
        let otuLabels1 = response.samples[0].otu_labels.reverse();

        // Create data object for Plotly Bubble Chart
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

        }]

        let layoutBubble= {           
            height: 550,
            width: 1500,
            xaxis: {
                title: 'OTU ID'
            }
          };
          // Create plot using Plotly
          Plotly.newPlot('bubble', dataBubble, layoutBubble);
        
        panel(response, 940)
        console.log(Object.values(response.metadata[0]))
    
        let wfreq = response.metadata.filter(data => data.id == 940)[0].wfreq
        
        let gaugeChart = [{
            value: wfreq,
            title: {text: "<b> Belly Button Washing Frequency </b> <br></br> Scrubs Per Week"},
            type: "indicator",
            mode: "gauge+number+delta",
            gauge: {
                axis: { range: [null, 9] }},
            threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75}
            
    }]
        // Plot the gauge chart
        Plotly.newPlot('gauge', gaugeChart);
})}
// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

function getData(){
    // Fetch data
    d3.json(url).then(response => {
        let selection = d3.select('#selDataset');
        // Assign the value of the dropdown menu option to a letiable
        let dataset = selection.property('value');
        console.log(dataset)
         
        // Extract required data from the response
        let sampleData = response.samples.filter(data => data.id == dataset)[0];
        let sampleValues = sampleData.sample_values.sort((a, b) => b - a).slice(0, 10).reverse();
        let otuIds = sampleData.otu_ids.slice(0,10).reverse();
        let otuLabels = sampleData.otu_labels.slice(0,10).reverse();
        console.log(sampleValues);
        console.log(otuIds);
        console.log(otuLabels);
        // Create data object for Plotly Bar Chart
        let dataBar = [{
            x: sampleValues,
            y: otuIds.map(id => `OTU ${id}`),
            text: otuLabels,
            type: 'bar',
            orientation: 'h'
        }];
        optionChanged('bar', dataBar);

        let sampleValues1 = sampleData.sample_values.sort((a, b) =>b-a).reverse();
        let otuIds1 = sampleData.otu_ids.reverse();
        let otuLabels1 = sampleData.otu_labels.reverse();

        // Create data object for Plotly Bubble Chart
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
            
        }]

        optionChanged('bubble', dataBubble);
        
        let wfreq = response.metadata.filter(data => data.id == dataset)[0].wfreq;

        let gaugeChart = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: {text: "<b> Belly Button Washing Frequency </b> <br></br> Scrubs Per Week"},
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 9] }}
            
    }]
        optionChanged('gauge', gaugeChart)
               
        d3.select('#sample-metadata').html('')
        panel(response, dataset)
        console.log(Object.values(response.metadata.find(data => data.id == dataset)))
})}



  init();
