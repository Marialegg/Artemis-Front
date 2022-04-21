<template>
  <section id="home" class="parent">
    <v-col id="hero" class="spacea divwrap">
      <h1 class="divcol h1-em">
        CON NEAR EL ESTUDIO E-LEARNING ES AHORA MAS FACIL
        <h6>Disponibles 24/7</h6>
      </h1>
      <img src="@/assets/images/img-intro.png" alt="Image background">
    </v-col>

    <v-card color="#E5E5E5" class="contInfo">
      <aside v-for="(item, index) in dataInfo" :key="index"
        class="divrow acenter">
        <img :src="item.icon" alt="Icon About Info">
        <div class="divcol jcenter">
          <h3 class="h4-em p">{{ item.title }}</h3>
          <span class="h10-em">{{ item.desc }}</span>
        </div>
      </aside>
    </v-card>

    <v-col class="contDestacado">
      <h2 class="h4-em tcenter">LO MAS DESTACADO</h2>
      <aside class="contslider">
        <v-carousel
          v-model="carouselDestacado"
          hide-delimiters
          show-arrows-on-hover
        >
          <template v-for="(item, index) in sliderDestacado">
            <v-carousel-item
              v-if="(index + 1) % columnsDestacado === 1 || columnsDestacado === 1"
              :key="index"
            > 
              <v-row class="fill-height spacea divpadd">
                <template v-for="(n,i) in columnsDestacado">
                  <template v-if="(+index + i) < sliderDestacado.length">
                    <v-col :key="i">
                      <v-card color="var(clr-card)" class="cartas divcol">
                        <img :src="sliderDestacado[+index + i].img" alt="Imagen curso">
                        <div class="divcol astart">
                          <a :href="sliderDestacado[+index + i].to" class="h7-em bold"
                            style="color: #FF6B3B !important">
                            {{sliderDestacado[+index + i].title }}
                          </a>
                          <p class="h8-em p">{{sliderDestacado[+index + i].desc}}</p>
                          <v-rating
                            v-model="sliderDestacado[+index + i].rating"
                            background-color="pink lighten-3"
                            color="orange"
                            hover
                          ></v-rating>
                        </div>
                      </v-card>
                    </v-col>
                  </template>
                </template>
              </v-row>
            </v-carousel-item>
          </template>
        </v-carousel>
      </aside>
    </v-col>
    
    <v-col class="contDestacado">
      <h2 class="h4-em tcenter">LO MAS RECIENTE</h2>
      <aside class="contslider">
        <v-carousel
          v-model="carouselReciente"
          hide-delimiters
          show-arrows-on-hover
        >
          <template v-for="(item, index) in sliderReciente">
            <v-carousel-item
              v-if="(index + 1) % columnsReciente === 1 || columnsReciente === 1"
              :key="index"
            > 
              <v-row class="fill-height spacea divpadd">
                <template v-for="(n,i) in columnsReciente">
                  <template v-if="(+index + i) < sliderReciente.length">
                    <v-col :key="i">
                      <v-card color="var(clr-card)" class="cartas divcol">
                        <img :src="sliderReciente[+index + i].img" alt="Imagen curso">
                        <div class="divcol astart">
                          <a :href="sliderReciente[+index + i].to" class="h7-em bold">
                            {{sliderReciente[+index + i].title }}
                          </a>
                          <p class="h8-em p">{{sliderReciente[+index + i].desc}}</p>
                        </div>
                      </v-card>
                    </v-col>
                  </template>
                </template>
              </v-row>
            </v-carousel-item>
          </template>
        </v-carousel>
      </aside>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      dataInfo: [
        {
          icon: require("@/assets/icons/idiomas.png"),
          title: "+ de 500",
          desc: "PROFESIONALES DE MÚLTIPLES IDIOMAS"
        },
        {
          icon: require("@/assets/icons/acceso.png"),
          title: "Acceso",
          desc: "ILIMITADO"
        },
        {
          icon: require("@/assets/icons/cursos.png"),
          title: "100K",
          desc: "CURSOS ONLINE"
        }
      ],
      carouselDestacado: 0,
      sliderDestacado: [
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
      ],
      carouselReciente: 0,
      sliderReciente: [
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
        {
          img: require("@/assets/images/cursos.png"),
          title: "Lunaroid",
          desc: "Lunaroid is the first high art-intensive NFT hitting the block...",
          to: "#",
          rating: ""
        },
      ],
    }
  },
  computed: {
    columnsDestacado() {
      if (this.$vuetify.breakpoint.xl) {
        return 5;
      }

      // if (this.$vuetify.breakpoint.lg && window.innerWidth < 1306) {
      //   return 3;
      // }
      if (this.$vuetify.breakpoint.lg) {
        return 5;
      }

      if (this.$vuetify.breakpoint.md) {
        return 4;
      }

      if (this.$vuetify.breakpoint.sm) {
        return 2;
      }

      return 1;
    },
    columnsReciente() {
      if (this.$vuetify.breakpoint.xl) {
        return 5;
      }

      // if (this.$vuetify.breakpoint.lg && window.innerWidth < 1306) {
      //   return 3;
      // }
      if (this.$vuetify.breakpoint.lg) {
        return 5;
      }

      if (this.$vuetify.breakpoint.md) {
        return 4;
      }

      if (this.$vuetify.breakpoint.sm) {
        return 2;
      }

      return 1;
    },
  },
  methods: {
    SelectCardDestacado(item) {
      console.log(item)
    },
  }
};
</script>

<style src="./Home.scss" lang="scss" />
