import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Chart } from 'highcharts-vue'
import { Options, SeriesPieOptions } from 'highcharts'
import { $debug } from '@/utils'

const colors = ["#01b8aa", "#28383c", "#df625e", "#f2c80f", "#5f6b6d", "#8ad4eb"]

@Component({
    components: {
        'hc-chart': Chart
    }
})
export default class PieChart extends Vue {
    @Prop({default: "Distribución de factores emocionales"})
    title !: string
    
    options: any = {
        chart: {
            type: 'pie',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
        },
        title: {
            text: this.title
        },
        colors: [
            this.$vuetify.theme.themes.light.chart1,
            this.$vuetify.theme.themes.light.chart2,
            this.$vuetify.theme.themes.light.chart3,
            this.$vuetify.theme.themes.light.chart4,
            this.$vuetify.theme.themes.light.chart5
        ],
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            borderRadius: 18
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        //colors: colors,
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
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
        Vue.set(this.options.series, 0, { name: "Análisis", data: this.data })
    }
}