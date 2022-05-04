<template>
  <section id="creatorCategoria" class="parent divcol">
    <v-col>
      <h2 class="h4-em">
        {{"Categoria".toUpperCase()}}
      </h2>
    </v-col>

    <v-col class="contnombre divcol">
      <label for="nombre">{{"Nombre".toUpperCase()}}</label>
      <v-text-field
        v-model="name"
        solo
      ></v-text-field>
    </v-col>

    <v-col class="contimagen divrow">
      <aside class="divcol">
        <label>{{"Imagen".toUpperCase()}}</label>
        <v-card color="#F3F6F5">
          <img v-if="imagePreview" :src="image" alt="Image uploaded">
        </v-card>
      </aside>

      <aside class="wrapper divcol fill-w">
        <div class="divcol">
          <label for="archivo">{{"Elige un archivo a subir".toUpperCase()}}</label>
          <input id="archivo" ref="fileInput" type="file" @input="pickFile();" />
        </div>

        <div class="center">
          <v-btn rounded color="#F29627" class="h8-em" @click="Guardar()">GUARDAR</v-btn>
          <v-btn v-if="deleteBtn" rounded color="#F29627" class="h8-em" @click="Delete()">ELIMINAR</v-btn>
        </div>
      </aside>
    </v-col>

    <v-col class="contlista">
      <aside>
        <h3 class="h7-em">{{"Lista de categorias".toUpperCase()}}</h3>
      </aside>

      <v-slide-group
        center-active
        show-arrows
        class="fill-w"
      >
        <v-slide-item v-for="(item,i) in dataSlide" :key="i">
          <v-card color="#FFFFFF" @click="Editar(item)">
            <img :src="item.img" alt="image uplodaded">
            <span class="h8-em bold">{{ item.name }}</span>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "CreatorCategorias",
  data() {
    return {
      dataSlide: [],
      image: "",
      name: "",
      imagePreview: false,
      deleteBtn: false,
      selected: {},
    }
  },
  methods: {
    // selectImage () {
    //   this.$refs.fileInput.click()
    // },
    pickFile () {
      let input = this.$refs.fileInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.image = e.target.result
          this.imagePreview = true
        }
        reader.readAsDataURL(file[0])
      }
    },
    Guardar() {
      if (this.image != "" && this.name != "") {
        let object = {name: this.name, img: this.image}
        this.dataSlide.push(object)
        this.image = ""
        this.name = ""
        this.imagePreview = false
        this.deleteBtn = false
      }
    },
    Editar(item) {
      this.imagePreview = true
      this.deleteBtn = true
      this.name = item.name
      this.image = item.img
      
      this.selected = item
    },
    Delete() {
      const index = this.dataSlide.indexOf(this.selected);
      if (this.selected.name == this.name && this.selected.img == this.image) {
        this.dataSlide.splice(index, 1);
        this.imagePreview = false
        this.deleteBtn = false
        this.image = ""
        this.name = ""
        console.log(index)
      }
      // if (index) {
      //   this.dataSlide.splice(0, 1)
      //   this.img = ""
      //   this.name = ""
      //   console.log(index)
      // }
    }
  }
};
</script>

<style src="./CreatorCategoria.scss" lang="scss" />
