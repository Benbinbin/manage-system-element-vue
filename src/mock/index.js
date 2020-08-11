import Mock from 'mockjs';
import homeApi from './home';

// 设置请求延时响应 200~2000ms
Mock.setup({
  timeout: '200-2000'
})

// 首页相关
// 拦截 Axios 请求，路径为 /home/getData
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)