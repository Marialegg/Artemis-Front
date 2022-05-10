import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({

  namespace: true,
  state: {
    baseURL: process.env.BASE_URL,
    theme: "light",
    dataCursos: [
      {
        img: require("@/assets/images/ips.png"),
        name: "Rust Basico",
        price: "0.75",
        earned: "4,5",
        inscriptions: "10",
        rating: 4.5,
      },
      {
        img: require("@/assets/images/ips.png"),
        name: "Rust Basico",
        price: "0.75",
        earned: "4,5",
        inscriptions: "10",
        rating: 4.5,
      },
      {
        img: require("@/assets/images/ips.png"),
        name: "Rust Basico",
        price: "0.75",
        earned: "4,5",
        inscriptions: "10",
        rating: 4.5,
      },
    ]
  },
  mutations: {
    CambiarTheme(state, theme) {
      state.theme = theme
    },
    PublicarCurso(state, object) {
      state.dataCursos.push(object)
    },
    EliminarCurso(state, index) {
      state.dataCursos.splice(index, 1)
    }
  },
  actions: {
    CambiarTheme({state, commit}, {theme, element}) {
      element.href = `${state.baseURL}themes/${theme}/theme.css`;
      localStorage.setItem("theme", theme);
      commit( "CambiarTheme", theme)
    },
    PublicarCurso({commit}, {object}) {
      // localStorage.setItem("theme", theme);
      commit( "PublicarCurso", object)
    },
    EliminarCurso({commit}, {index}) {
      commit( "EliminarCurso", index)
    },
  },
});
