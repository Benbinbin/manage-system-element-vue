import Cookie from 'js-cookie'

export default {
  state: {
    asideCollapse: false,
    menu: [],
    currentMenu: null
  },
  mutations: {
    selectMenu(state, val) {
      if (val.name !== "home") {
        state.currentMenu = val;
      } else {
        state.currentMenu = null;
      }
    },
    toggleAsideMenu(state) {
      state.asideCollapse = !state.asideCollapse;
    },
    setMenu(state, val) {
      state.menu = val;
      Cookie.set('menu', JSON.stringify(val));
    },
    addMenu(state, router) {
      if (!Cookie.get('menu')) {
        return
      }
      let menu = JSON.parse(Cookie.get('menu'));
      state.menu = menu;
      // 动态路由 router 参数
      let currentMenu = [
        {
          path: '/',
          component: () => import('@/views/Main'),
          children: []
        }
      ];
      // 基于 url 构建 router 的 component 属性
      menu.forEach(item => {
        if(item.children) {
          item.children = item.children.map(subItem => {
            subItem.component = () => import(`@/views/${subItem.url}`);
            return subItem;
          })
          currentMenu[0].children.push(...item.children);
        } else {
          item.component = () => import(`@/views/${item.url}`);
          currentMenu[0].children.push(item);
        }
      });
      console.log(state.menu);
      router.addRoutes(currentMenu);
    },
    clearMenu(state) {
      state.menu = [];
      Cookie.remove('menu')
    }
  },
  actions: {},
}