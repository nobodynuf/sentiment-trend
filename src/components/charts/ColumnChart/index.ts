import {Component, Vue, Watch, Prop} from "vue-property-decorator"
import {Chart} from "highcharts-vue"
import {Options, SeriesColumnOptions} from "highcharts"
import {$debug} from "@/utils"

const colors = ["#233142", "#4f9da6", "#facf5a", "#ff5959"]

@Component({
    components: {
        "hc-chart": Chart,
    },
})
export default class ColumnChart extends Vue {

    @Prop({default: ''})
    title !: string

    options: any = {
        chart: {
            type: "bar",
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
            valueSuffix: "",
        },
        accessibility: {
            point: {
                valueDescriptionFormat: "%",
            },
        },
        legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle",
            itemMarginTop: 10,
            itemMarginBottom: 10,
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                },
            },
        },
        credits: {
            enabled: false
        },
        yAxis: {
            title: {
                text: "Manifestación emocional",
            },
        },
        xAxis: {
            categories: [""],
            title: {
                text: "Factor emocional",
            },
        },
        series: [
            {
                name: "",
                data: [{}],
            },
        ] as Array<SeriesColumnOptions>,
    }

    @Prop({default: () => []})
    data!: {name: string; data: number}[]

    @Watch("data")
    onChangeData() {
        this.$set(this.options, "series", this.data)
    }
}
