<template>
  <section id="congrats" class="subparent divcol gap">
    <v-col cols="11" class="align gap">
      <h2 class="h4-em tcenter align" style="max-width:885px;">
        Blockchain y NEAR Protocol: Fundamentos Felicidades!!!
      </h2>

      <span class="h7-em bold">
        Con mucho gusto nos complace informarle que usted ha finalizado exitosamente 
        la certificación de este curso con una calificación de:
      </span>

      <h2 class="h4-em tcenter">20 Puntos</h2>

      <span class="h7-em bold">Es por ello que usted tiene disponible el siguiente certificado.</span>
    </v-col>
    
    <v-col class="center">
      <img :src="certificadoPreview" alt="certificado" style="width:min(100%, 784px)">
    </v-col>

    <v-col class="center gap">
      <v-btn style="background-color:#D0BFAA !important;" height="30px" class="botones" rounded>DESCARGAR</v-btn>
      <v-btn style="background-color:#D0BFAA !important" height="30px" class="botones" rounded>MINTEAR</v-btn>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "Congrats",
  data() {
    return {
      certificadoPreview: require("@/assets/images/rust.png")
    }
  },
  mounted () {
  },
  methods: {
  }
};
</script>

<style src="./Congrats.scss" lang="scss" />
