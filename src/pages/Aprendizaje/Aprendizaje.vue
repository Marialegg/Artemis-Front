<template>
  <section id="aprendizaje" class="subparent divcol gap">
    <v-col cols="11" class="align">
      <h2 class="h4-em">
        APRENDIZAJE
      </h2>

      <div class="jend divwrap gap">
        <span class="h7-em bold marginrighta">DESDE ACA PODRA GESTIONAR SUS EXAMENES</span>
        <aside class="divrow gap">
          <v-btn 
            class="botones h9-em" 
            rounded
            @click="newTest()"
          >
            NUEVO EXAMEN
          </v-btn>
        </aside>
      </div>
    </v-col>

    <v-col>
      <h3 class="h8-em">CURSOS ADQUIRIDOS:</h3>
      
      <section v-for="(item, i) in dataCursos" :key="i"
        class="wrapper">
        <aside class="firstAside divrow">
          <img :src="item.img" alt="imagen curso">
        </aside>

        <aside class="divcol">
          <h3 class="h7-em p alignmobile" style="margin-right: auto">LO QUE APRENDERAS</h3>
          <span class="h7-em tcentermobile">{{item.desc}}</span>
        </aside>
        
        <aside class="divcol">
          <h3 class="h6-em p">{{item.valoracion}}</h3>
          <span class="h7-em tcenter">Valoracion del curso</span>
        </aside>
        
        <aside class="divcol">
          <h3 class="h7-em p">Creado por:</h3>
          <span class="h7-em tcenter">IRON MAN</span>
        </aside>

        <v-btn class="botones h9-em" rounded>VER CURSO</v-btn>
      </section>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "Aprendizaje",
  data() {
    return {
      dataCursos: [
        {
          img: require('@/assets/images/rust.png'),
          desc: "Grundlagen der JavaScript-Programmierung:jekten, Arrays, orEa ...",
          valoracion: 4.5,
        },
      ],
    }
  },
  mounted () {
  },
  methods: {
    newTest() {
      this.$router.push('/examenCreator')
    },
  }
};
</script>

<style src="./Aprendizaje.scss" lang="scss" />
