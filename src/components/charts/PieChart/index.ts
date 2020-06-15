import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Chart } from 'highcharts-vue'
import { Options, SeriesPieOptions } from 'highcharts'
import { $debug } from '@/utils'

@Component({
    components: {
        'hc-chart': Chart
    }
})
export default class PieChart extends Vue {
    options: any = {
        chart: {
            type: 'pie',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
        },
        title: {
            text: 'Distribución de factores emocionales'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },

        credits: {
            enabled: false
        },
        series: [] as Array<SeriesPieOptions>
    }

    @Prop({ default: () => [] })
    data !: { name: string, y: number, value: number }[]

    @Prop({default: false})
    loading !: boolean;

    @Watch('data')
    onChangeData() {
        $debug('log', this.data);
        Vue.set(this.options.series, 0, { name: "Data", data: this.data })
    }

    /**
     * data: [{
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
     */

}