<template>
  <section id="cursos" class="parent divcol gap">
    <v-col cols="11" class="align">
      <h2 class="h4-em">
        CURSOS
      </h2>

      <div class="space divwrap gap">
        <span class="h7-em bold">DESDE ACA USTED INSTRUCTOR PODRA CREAR SUS CURSOS</span>
        <v-btn class="marginlefta" rounded color="#F29627">NUEVO CURSO</v-btn>
      </div>
    </v-col>

    <v-col>
      <h3 class="h8-em">CURSOS PUBLICADOS POR EL INSTRUCTOR</h3>
      
      <section class="wrapper">
        <aside>
        <img src="" alt="imagen curso">
          <div class="divcol">
            <span class="h8-em">{{item.name}}</span>
            <span class="h8-em">{{item.price}}<span class="h9-em">NEAR</span></span>
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
