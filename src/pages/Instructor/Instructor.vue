<template>
  <section id="instructor" class="parent divcol gap">
    <v-col cols="11" class="align">
      <h2 class="h4-em">
        CURSOS
      </h2>

      <div class="jend divwrap gap">
        <span class="h7-em bold marginrighta">DESDE ACA USTED INSTRUCTOR PODRA CREAR SUS CURSOS</span>
        <aside class="divrow gap">
          <v-btn class="botones h9-em" rounded href="#/instructor-cursos">NUEVO CURSO</v-btn>
          <v-btn class="botones h9-em" rounded>ESTADÍSTICAS</v-btn>
        </aside>
      </div>
    </v-col>

    <v-col>
      <h3 class="h8-em">CURSOS PUBLICADOS POR EL INSTRUCTOR</h3>
      
      <section v-for="(item, i) in dataCursos" :key="i"
        class="wrapper">
        <aside class="divrow">
          <img :src="item.img" alt="imagen curso">
          <div class="divcol">
            <span class="h7-em">{{item.name}}</span>
            <span class="h7-em">{{item.price}}<span class="h11-em">NEAR</span></span>
          </div>
        </aside>

        <aside class="divcol">
          <h3 class="h5-em p">{{item.earned}} NEAR</h3>
          <span class="h7-em tcenter">Ganado este Mes</span>
        </aside>
        
        <aside class="divcol">
          <h3 class="h5-em p">{{item.inscriptions}}</h3>
          <span class="h7-em tcenter">inscripciones de este mes</span>
        </aside>
        
        <aside class="divcol">
          <div class="divrow acenter">
            <h3 class="h5-em p">{{item.rating}}</h3>
            <v-rating
              v-model="item.rating"
              background-color="pink lighten-3"
              color="orange"
            ></v-rating>
          </div>

          <span class="h8-em tcenter">Valoración del curso</span>

          <div class="spacee fill-w">
            <v-btn class="botones h9-em" rounded href="#instructor-cursos" @click="Editar(item)">EDITAR</v-btn>
            <v-btn class="botones h9-em" rounded @click="Delete(item)">ELIMINAR</v-btn>
          </div>
        </aside>
      </section>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "Cursos",
  data() {
    return {
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
    }
  },
  methods: {
    Editar(item) {
      console.log(item)
    },
    Delete(item) {
      const index = this.dataCursos.indexOf(item)
      this.dataCursos.splice(index, 1)
    }
  }
};
</script>

<style src="./Instructor.scss" lang="scss" />
