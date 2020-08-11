export default {
  state: {
    asideCollapse: false,
    menu: {},
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
    }
  },
  actions: {},
}