export const template2 = {
    "id": 1, //id of the template
    "template_name": "Template 1", // name of the template
    "template_type": "Data template", // type of the template
    "execution_time": null, 
    "executed_at": null,
    "template_slug_id": "search_performance_template", //slug id
    "chart_types": ["pie","line","bar","scatter"], // all the chart types the template will have

    "charts":[
        {
            "chart_id": 1, //id of a chart
            "plot_type":"line", //type of chart
            "title":"Chart1",
            "x_label":"",
            "y_label":"", 
            "multiline":false, // tell if multiline or not
            "multicolor":false, // tell if multiple bg colors or colors needed or not
            "backgroundColor":true, //tell if background color needed or not
            "x_values":[1,2,3,4,5,6,7,8,9,10], 
            "y_values":[1,2,3,4,5,10,9,8,7,6], // for multiline more than one subarray
            "legend_names":["line1"], //array which may contain many values depending on number of lines
            "pagination":true, //tell if pagination needed or not
            "font_size":"",
            "width":"100%",
            "height":"100%",
        },
        {
            "chart_id": 2, //id of a chart
            "plot_type":"line", //type of chart
            "title":"Chart2",
            "x_label":"X",
            "y_label":"Y", 
            "multiline":true, // tell if multiline or not
            "multicolor":false, // tell if multiple bg colors or colors needed or not
            "backgroundColor":true, //tell if background color needed or not
            "x_values":[1,2,3,4,5,6,7,8,9,10], 
            "y_values":[[1,2,3,4,5,6,7,8,9,10],[100,90,80,70,60,50,40,30,20,10]], // for multiline more than one subarray
            "legend_names":["line1","line2"], //array which may contain many values depending on number of lines
            "pagination":true, //tell if pagination needed or not,
            "font_size":"",
            "width":"100%",
            "height":"100%",
        },
        {
            "chart_id": 3, //id of a chart
            "plot_type":"pie", //type of chart
            "title":"Chart3",
            "x_label":"X",
            "y_label":"Y", 
            "multiline":false, // tell if multiline or not
            "multicolor":true, // tell if multiple bg colors or colors needed or not
            "backgroundColor":true, //tell if background color needed or not
            "x_values": [
                "2023-06-01",
                "2022-01-25",
                "2022-09-03",
                "2022-09-04",
                "2022-02-27",
                "2022-02-25",
                "2022-02-26"
            ],
            "y_values": [
                8,
                29,
                18654,
                21414,
                24769,
                29237,
                36239
            ],
            "legend_names":["pie1"], //array which may contain many values depending on number of lines
            "pagination":false, //tell if pagination needed or not,
            "font_size":"",
            "width":"100%",
            "height":"100%",
        },
        {
            "chart_id": 4, //id of a chart
            "plot_type":"bar", //type of chart
            "title":"Chart4",
            "x_label":"X",
            "y_label":"Y", 
            "multiline":false, // tell if multiline or not
            "multicolor":true, // tell if multiple bg colors or colors needed or not
            "backgroundColor":true, //tell if background color needed or not
            "x_values": [
                "ramen sandy springs",
                "ramen flamingo",
                "ramen bar",
                "ramen katy",
                "ramen salt lake city",
                "ramen arlington",
                "japanese ramen",
                "best ramen",
                "spicy ramen",
                "ramen near me",
                "japanese food",
                "jinya ramen"
            ],
            "y_values": [
                5.33,
                5.91,
                1712.93,
                1833.22,
                1847.23,
                4617.54,
                12075.55,
                12105.33,
                12537.94,
                13490.36,
                16621.64,
                31840.36
            ],
            "legend_names":["bar1"], //array which may contain many values depending on number of lines
            "pagination":true, //tell if pagination needed or not,
            "font_size":"12",
            "width":"100%",
            "height":"100%",
        },
    ]
}