# belly-button-challenge
![Screenshot 2024-02-16 192422](https://github.com/s0uravk/belly-button-challenge/assets/144293972/f656ff72-7ac1-4ae4-a0c3-764def168190)

**Background**
---
In this assignment, an interactive dashboard was built to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels in JSON format. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

**Functions**
---
The data was retrieved using D3 and plotted into a Bar chart, a Bubble chart, and a bonus Gauge chart using Plotly as well the demographic data was updated in the Demographic info panel which changed based on the selection of test subject ID from the dropdown menu. it was done in the following steps:

1. The init() function gets the response using D3.js and then the response is passed into getData() and panel function(). Where the getData function is responsible for preparing the data passed for plotting charts and plots the visualizations with the use of the optionChanged() function and the panel() function is responsible for updating the panel based on the value passed.
2. The optionChanged() function then plots the data using Plot, which accepts the id of the HTML element where the chart is being plotted and the data to be plotted. HTML elements are first cleared before calling the plot and panel function to clear the existing visualization or information in the demographic panel to make space for new selections.
3. The panel() function retrieves the required data and adds that data to the demographics panel.
4. Apart from functions options are added to the dropdown along with the value as an attribute.

**Visualizations**
---
1. The bar chart displays the top 10 OTUs found in that individual based on the selected Test Subject ID.
2. The bubble chart displays the otu_ids on the x-axis and the sample_values on the y-axis and the size of the marker is also determined by the sample_values. Markers are colored based on the otu_ids and have hover text of otu_labels.
3. The gauge chart shows the number of times the test subjects washed their belly button per week.
