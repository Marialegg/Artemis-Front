<template>
  <section id="cursos" class="parent divcol gap">
    <v-col cols="11" class="align">
      <h2 class="h4-em">
        CURSOS
      </h2>

      <div class="space divwrap gap">
        <span class="h7-em bold">DESDE ACA USTED INSTRUCTOR PODRA CREAR SUS CURSOS</span>
        <v-btn class="botones" rounded>NUEVO CURSO</v-btn>
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
            <v-btn class="botones h8-em" rounded>EDITAR</v-btn>
            <v-btn class="botones h8-em" rounded>VER DETALLE</v-btn>
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
      // dataSlide: [],
      // image: "",
      // name: "",
      // imagePreview: false,
      // deleteBtn: false,
      // selected: {},
    }
  },
  methods: {
    // pickFile () {
    //   let input = this.$refs.fileInput
    //   let file = input.files
    //   if (file && file[0]) {
    //     let reader = new FileReader
    //     reader.onload = e => {
    //       this.image = e.target.result
    //       this.imagePreview = true
    //     }
    //     reader.readAsDataURL(file[0])
    //   }
    // },
    // Guardar() {
    //   if (this.image != "" && this.name != "") {
    //     let object = {name: this.name, img: this.image}
    //     this.dataSlide.push(object)
    //     this.image = ""
    //     this.name = ""
    //     this.imagePreview = false
    //     this.deleteBtn = false
    //   }
    // },
    // Editar(item) {
    //   this.imagePreview = true
    //   this.deleteBtn = true
    //   this.name = item.name
    //   this.image = item.img
      
    //   this.selected = item
    // },
    // Delete() {
    //   const index = this.dataSlide.indexOf(this.selected);
    //   if (this.selected.name == this.name && this.selected.img == this.image) {
    //     this.dataSlide.splice(index, 1);
    //     this.imagePreview = false
    //     this.deleteBtn = false
    //     this.image = ""
    //     this.name = ""
    //   }
    // }
  }
};
</script>

<style src="./Cursos.scss" lang="scss" />
