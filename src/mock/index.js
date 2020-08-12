import Mock from 'mockjs';
import homeApi from './home';
import userApi from './user';
// 设置请求延时响应 200~2000ms
Mock.setup({
  timeout: '200-2000'
})

// 首页相关
// 拦截 Axios 请求，路径为 /home/getData
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData);

// 用户相关
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/\/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', userApi.batchremove)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)