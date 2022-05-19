<template>
  <section id="cursos" class="subparent divcol gap">
    <v-col class="align divwrap gap acenter">
      <a class="h8-em notdefault-clr hover-line" @click="clear()">Clear All</a>
      <v-text-field
        v-model="search"
        filled
        shaped
        hide-details
        prepend-inner-icon="mdi-magnify"
        placeholder="Search.."
      ></v-text-field>

      <div class="contFilters divrow gap spacemobile fill-wmobile">
        <v-select
          :items="filter.categories"
          label="Categorie"
          filled
          shaped
          hide-details
          background-color="var(--clr-card-2)"
          class="filterCategories"
        >
          <template v-slot:[`slotProps.item`]>
            <span>{{ slotProps.item }}</span>
          </template>
        </v-select>
        
        <v-select
          :items="filter.price"
          label="Price"
          filled
          shaped
          hide-details
          background-color="var(--clr-card-2)"
          class="filterPrice"
        >
          <template v-slot:[`slotProps.item`]>
            <span>{{ slotProps.item }}</span>
          </template>
        </v-select>
      </div>
    </v-col>

    <!-- bajo modificacion -->
    <v-col class="wrapper">
      <v-card v-for="(item,i) in dataCursos" :key="i" href="#/detalle-curso"
        color="var(clr-card)" class="cartas align divcol" v-ripple="{ class: 'activeRipple' }">
        <img :src="item.img" alt="Imagen curso">
        <div class="divcol astart">
          <aside class="divcol">
            <span class="h7-em bold">{{item.title}}</span>
            <a :href="item.to" class="h9-em semibold" style="color: #FF6B3B !important">
              Instructor {{item.instructor }}
            </a>
          </aside>

          <aside class="space fill-w gap divwrapmobile">
            <span class="h5-em bold">{{item.price }} 
              <span class="h10 normal">NEAR</span>
            </span>
            <v-rating
              v-model="item.rating"
              background-color="pink lighten-3"
              color="orange"
            ></v-rating>
          </aside>
        </div>
      </v-card>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "Cursos",
  data() {
    return {
      search: '',
      filter: {
        categories: ['Frontend', 'Backend', 'Cripto'],
        price: ['Low to High', 'High to Low'],
      },
      dataCursos: [
        {
          img: require("@/assets/images/python.jpg"),
          title: "Rust Basico",
          instructor: "IRON MAN",
          to: "#",
          price: "0.75",
          rating: "4",
        },
        {
          img: require("@/assets/images/python.jpg"),
          title: "Rust Basico",
          instructor: "IRON MAN",
          to: "#",
          price: "0.75",
          rating: "4",
        },
        {
          img: require("@/assets/images/python.jpg"),
          title: "Rust Basico",
          instructor: "IRON MAN",
          to: "#",
          price: "0.75",
          rating: "4",
        },
        {
          img: require("@/assets/images/python.jpg"),
          title: "Rust Basico",
          instructor: "IRON MAN",
          to: "#",
          price: "0.75",
          rating: "4",
        },
        {
          img: require("@/assets/images/python.jpg"),
          title: "Rust Basico",
          instructor: "IRON MAN",
          to: "#",
          price: "0.75",
          rating: "4",
        },
        {
          img: require("@/assets/images/python.jpg"),
          title: "Rust Basico",
          instructor: "IRON MAN",
          to: "#",
          price: "0.75",
          rating: "4",
        },
        {
          img: require("@/assets/images/python.jpg"),
          title: "Rust Basico",
          instructor: "IRON MAN",
          to: "#",
          price: "0.75",
          rating: "4",
        },
      ],
    }
  },
  methods: {
    clear() {
      console.log("clear")
    }
  }
};
</script>

<style src="./Cursos.scss" lang="scss" />
