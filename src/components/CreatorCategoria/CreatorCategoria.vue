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
        solo
      ></v-text-field>
    </v-col>

    <v-col class="contimagen divrow">
      <aside class="divcol">
        <label for="imagen">{{"Imagen".toUpperCase()}}</label>
        <v-card color="#F3F6F5">
          <img src="@/assets/images/ips.png" alt="Image uploaded">
        </v-card>
      </aside>

      <aside class="wrapper divcol fill-w">
        <div class="divrow">
          <div class="divcol">
            <label for="archivo">{{"Elige un archivo a subir".toUpperCase()}}</label>
            <v-btn rounded color="#D0BFAA" class="h8-em bold">{{"Selecciona archivo".toUpperCase()}}</v-btn>
          </div>

          <v-file-input></v-file-input>
        </div>

        <div class="center">
          <v-btn rounded color="#F29627" class="h8-em">GUARDAR</v-btn>
          <v-btn rounded color="#F29627" class="h8-em">ELIMINAR</v-btn>
        </div>
      </aside>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "CreatorCategorias",
  data() {
    return {
    }
  },
  methods: {
  }
};
</script>

<style src="./CreatorCategoria.scss" lang="scss" />
