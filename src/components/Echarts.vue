<template>
  <div style="height: 100%" ref="chart">ECharts</div>
</template>

<script>
import echarts from "echarts";

export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
    isAxisChart: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      chart: null,
      axisOption: {
        legend: {},
        tooltip: {},
        xAxis: [
          {
            type: "category",
            data: [],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [],
      },
      normalOption: {
        tooltip: {},
        series: [],
      },
    };
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
  },
  watch: {
    chartData: {
      handler: function () {
        this.initChart();
      },
      deep: true,
    },
  },
  methods: {
    initChart() {
      this.setChartData();
      if (this.chart) {
        this.chart.setOption(this.options);
      } else {
        this.chart = echarts.init(this.$refs.chart);
        this.chart.setOption(this.options);
      }
    },
    setChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        this.normalOption.series = this.chartData.series;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>