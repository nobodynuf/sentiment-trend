import { Component, Vue, Watch } from 'vue-property-decorator'
import { Chart } from 'highcharts-vue'
import { Options, SeriesLineOptions } from 'highcharts'

@Component({
    components: {
        'hc-chart': Chart
    }
})
export default class LineChart extends Vue {
    options: Options = {
        chart: {
            type: 'line',
        },
        title: {
            text: 'Monthly Average Temperature'
        },
        tooltip: {
            valueSuffix: ' m/s'
        },
        accessibility: {
            point: {
                valueDescriptionFormat: "%"
            }
        },
        legend: {
            enabled: true,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },    
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            },
            series: {
                marker: { 
                    enabled: true,
                    symbol: "circle"
                }
            }
        },
        credits: {
            enabled: false
        },   
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }] as Array<SeriesLineOptions>
    }
}