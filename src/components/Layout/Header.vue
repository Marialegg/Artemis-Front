<template>
  <section>
    <!-- mobile -->

    <!-- desktop -->
    <v-app-bar
    id="headerApp"
    height="100px"
    fixed
  >
    <v-row>
      <v-col cols="12" sm="11" class="space align paddbottomdel">
        <aside class="contleft divrow acenter">
          <!-- toggle -->
          <v-btn class="toggle vermobile" width="2.8em" height="2.8em" rounded
            @click.stop="ShowDrawer()">
            <v-icon size="clamp(1.5em, 2vw, 2em)" color="#FFFFFF !important">mdi-menu</v-icon>
          </v-btn>
          <!-- logo -->
          <router-link to="/" class="eliminarmobile">
            <img class="logo" src="@/assets/logos/logo.png"
              alt="Logo">
          </router-link>
        </aside>

        <v-col class="jend padd eliminarmobile">
          <!-- content -->
          <v-col class="contmiddle end padd">
            <a :href="item.link" v-for="(item, index) in dataHeader" :key="index"
              class="h9-em openMenuCollections notdefault-hover">
              {{ item.title }}
            </a>
          </v-col>
        </v-col>

        <aside class="contright">
          <v-btn class="walletButton" color="#F29627" rounded>
            Connect Wallet
          </v-btn>
        </aside>
      </v-col>
    </v-row>
  </v-app-bar>

  <MenuHeader ref="menu"></MenuHeader>
  </section>
</template>

<script>
import MenuHeader from "./MenuHeader.vue"

let scrollValue =
document.body.scrollTop || document.documentElement.scrollTop;
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 80);
  }
}
export default {
  name: "Header",
  components: {
    MenuHeader
  },
  i18n: require("./i18n"),
  // created() {
  //   this.element = document.getElementById("theme");
  //   const theme = localStorage.getItem("theme");
  //   if (theme) {
  //     this.CambiarTheme(theme);
  //   }
  //   if (theme == "light") {
  //     this.themeButton = true;
  //   }
  //   if (theme == "dark") {
  //     this.themeButton = false;
  //   }
  // },
  data() {
    return {
      // themeButton: true,
      dataHeader: [
        {
          title: "Inicio",
          link: "#"
        },
        {
          title: "Cursos",
          link: "#"
        },
        // {
        //   title: "Mi Perfil",
        //   link: "#"
        // },
        {
          title: "Instructor",
          link: "#"
        },
        {
          title: "Mi Aprendizaje",
          link: "#"
        },
        {
          title: "Contact",
          link: "#"
        }
      ]
    };
  },
  methods: {
    ShowDrawer() {
      this.$refs.menu.ShowDrawer();
    },
    // CambiarTheme(theme) {
    //   this.$store.dispatch("CambiarTheme", { theme, element: this.element });
    //   this.themeButton = !this.themeButton;
    // },
    // CambiarTheme2(theme) {
    //   this.$refs.menu.OverlayMethod(theme);
    // },
    OcultarHeader() {
      // in top
      let Desplazamiento_Actual = window.pageYOffset;
      if (Desplazamiento_Actual > scrollValue) {
        document.getElementById("headerApp").style.background = "#FFFFFF";
      } else {
        document.getElementById("headerApp").style.background = "transparent";
      }
    },
    scrollListener() {
      resizeThrottler(this.OcultarHeader);
    }
  },
  mounted() {
    document.getElementById("headerApp").style.background = "transparent";
    document.addEventListener('scroll', this.scrollListener);
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.scrollListener);
  }
};
</script>

<style src="./Layout.scss" lang="scss" />
