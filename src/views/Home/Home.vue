<template>
  <el-row class="home" :gutter="15">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" alt="portrait" />
          <div class="user-info">
            <p class="name">Ben</p>
            <p class="access">超级用户</p>
          </div>
        </div>
        <div class="login-info">
          <p>
            上次登陆时间：
            <span>2020-8-10</span>
          </p>
          <p>
            上次登陆地点：
            <span>中国</span>
          </p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height: 522px; margin-top: 20px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            show-overflow-tooltip
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          shadow="hover"
          v-for="(item, index) in countData"
          :key="index"
          :body-style="{display: 'flex', padding: 0}"
        >
          <i :class="item.icon" class="icon" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="num">￥ {{ item.value }}</p>
            <p class="text">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover">
        <echarts class style="height: 280px" :chartData="echartsData.order"></echarts>
      </el-card>
      <div class="chart">
        <el-card shadow="hover">
          <echarts class style="height: 260px" :chartData="echartsData.user"></echarts>
        </el-card>
        <el-card shadow="hover">
          <echarts class style="height: 260px" :chartData="echartsData.video" :isAxisChart="false"></echarts>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echarts from "@/components/Echarts";
export default {
  data() {
    return {
      userImg: require("@/assets/images/user.png"),
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "el-icon-success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "el-icon-star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "el-icon-s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "el-icon-success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "el-icon-star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "el-icon-s-goods",
          color: "#5ab1ef",
        },
      ],
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      echartsData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  methods: {
    getTableData() {
      this.$http.get("/home/getData").then((res) => {
        // 卡片模拟统计数据
        this.tableData = res.data.data.tableData;

        // 订单折线图数据
        const order = res.data.data.orderData;
        // x 轴数据
        this.echartsData.order.xData = order.date;
        // series 数据
        // 取出键名
        let keyArray = Object.keys(order.data[0]);
        // 基于键名遍历数据构造 series 对象数组
        keyArray.forEach((key) => {
          this.echartsData.order.series.push({
            name: key === "wechat" ? "小程序" : key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        // 柱状图数据
        const user = res.data.data.userData;
        // x 轴数据
        user.forEach((item) => {
          this.echartsData.user.xData.push(item.date);
        });
        // series 数据
        let keyArray2 = ["new", "active"];
        // 基于键名遍历数据构造 series 对象数组
        keyArray2.forEach((key) => {
          this.echartsData.user.series.push({
            name: key,
            data: user.map((item) => item[key]),
            type: "bar",
          });
        });

        // 饼图数据
        const video = res.data.data.videoData;
        // series 数据
        this.echartsData.video.series = [
          {
            type: "pie",
            data: video,
          }
        ];
        console.log(this.echartsData.video)
      });
    },
  },
  components: {
    Echarts,
  },
  created() {
    this.getTableData();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/home";
</style>