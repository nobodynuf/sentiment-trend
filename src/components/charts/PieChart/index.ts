import { Component, Vue, Watch } from 'vue-property-decorator'
import { Chart } from 'highcharts-vue'
import { Options, SeriesPieOptions } from 'highcharts'

@Component({
    components: {
        'hc-chart': Chart
    }
})
export default class PieChart extends Vue {
    options: Options = {
        chart: {
            type: 'pie',
        },
        title: {
            text: 'Market shares'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueDescriptionFormat: "%"
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
            },
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Brands',
            data: [{
                name: 'Chrome',
                y: 61.41,
                sliced: true,
                selected: true
            }, {
                name: 'Internet Explorer',
                y: 11.84
            }, {
                name: 'Firefox',
                y: 10.85
            }, {
                name: 'Edge',
                y: 4.67
            }, {
                name: 'Safari',
                y: 4.18
            }, {
                name: 'Sogou Explorer',
                y: 1.64
            }, {
                name: 'Opera',
                y: 1.6
            }, {
                name: 'QQ',
                y: 1.2
            }, {
                name: 'Other',
                y: 2.61
            }]
        }] as Array<SeriesPieOptions>
    }
}