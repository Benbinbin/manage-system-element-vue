export default {
  state: {
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
    }
  },
  actions: {},
}