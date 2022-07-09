<template>
  <section id="congrats" class="subparent divcol gap">
    <v-col cols="11" class="align gap">
      <h2 class="h4-em tcenter align" style="max-width:885px;">
        Blockchain y NEAR Protocol: Fundamentos {{approvated?'Felicidades!!!':null}}
      </h2>

      <span class="h7-em bold">
        {{approvated?'Con mucho gusto nos complace informarle que usted ha finalizado exitosamente la certificación de este curso con una calificación de:':
        'Le informamos que el resultado de su evaluación de certificación fue de:'}}
      </span>

      <h2 class="h4-em tcenter">20 Puntos</h2>

      <span class="h7-em bold">
        {{approvated?'Es por ello que usted tiene disponible el siguiente certificado.':
        'Esta puntuación está por debajo del mínimo requerido para optar por el certificado de Aprobación. Para poder optar por presentar  nuevamente  la prueba de certificación,  deberá honrar nuevamente el pago del costo del curso.'}}
      </span>
    </v-col>
    
    <v-col class="center">
      <img :src="certificadoPreview" alt="certificado" style="width:min(100%, 784px)">
    </v-col>

    <v-col class="center gap">
      <v-btn style="background-color:#D0BFAA !important;" height="30px" class="botones" rounded
        @click="botonLeft()">
        {{approvated?'DESCARGAR':'SALIR'}}
      </v-btn>
      <v-btn style="background-color:#D0BFAA !important" height="30px" class="botones" rounded
        @click="botonRight()">
        {{approvated?'MINTEAR':'CERTIFICARSE NUEVAMENTE'}}
      </v-btn>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "Congrats",
  data() {
    return {
      approvated: true,
      certificadoPreview: require("@/assets/images/rust.png")
    }
  },
  mounted () {
  },
  methods: {
    botonLeft() {
      if(this.approvated==true) {console.log('aprovado')}
      else {console.log('reprovado')}
    },
    botonRight() {
      if(this.approvated==true) {console.log('aprovado')}
      else {console.log('reprovado')}
    },
  }
};
</script>

<style src="./Congrats.scss" lang="scss" />
