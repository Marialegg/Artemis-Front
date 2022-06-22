<template>
  <section id="verCurso" class="subparent divcol gap">
    <h2 class="h4-em tcenter">{{title}}</h2>
    <h3 class="h5-em tcenter">CERTIFICACIÓN</h3>

    <section class="sectionTop">
      <v-card v-if="testInit" class="warning warningExamnen divcol" style="display:flex">
        <p>
          Esta a punto de iniciar la prueba de certificación la cual consta de 10 preguntas.
          Cada pregunta tiene una valoración de 2 puntos, siendo la nota minima aprobatoria de 20 puntos.
          Una vez iniciado el proceso de evaluación no se podrá cancelar.
          Tenga la prevision de contar con internet y energía eléctrica.
          Solo tendrá un intento para completar toda la prueba y culmina en el tiempo 
          establecido de 10 minutos a partir de dar click al botón CERTIFICATE de esta pantalla.
        </p>

        <v-card-action class="center gap">
          <v-btn class="botones2" rounded to="/aprendizaje">CANCELAR</v-btn>
          <v-btn class="botones" rounded @click="testInit=false">CERTIFICATE</v-btn>
        </v-card-action>
      </v-card>

      <v-window v-else v-model="PresentacionExamen" touchless>
        <v-window-item v-for="(item,i) in dataPresentacionExamen" :key="i" :value="i+1">
          <aside class="divcol">
            <h5>PREGUNTA # {{i+1}}</h5>
            <span>{{item.question}}</span>
          </aside>

          <aside class="divcol">
            <div class="space">
              <h5>OPCIONES</h5>
              <h5>SELECCIÓN</h5>
            </div>
            <ul class="divcol">
              <li v-for="(item2,i) in item.options" :key="i"
                class="space">
                <span>{{item2.option}}</span>
                <v-checkbox
                  v-model="item2.isSelected"
                  hide-details
                  @click="item.options.forEach(element=>{element.isSelected=false});item2.isSelected=true"
                  style="margin-top: 0"
                ></v-checkbox>
              </li>
            </ul>
          </aside>

          <aside class="contControls spacee gap">
            <v-btn rounded v-if="i >= 1" @click="PresentacionExamen--">ANTERIOR</v-btn>
            <v-btn v-if="PresentacionExamen == dataPresentacionExamen.length" rounded
              @click="anyfunction()">Finalizar</v-btn>
            <v-btn v-else rounded @click="PresentacionExamen++">SIGUIENTE</v-btn>
          </aside>
        </v-window-item>
      </v-window>
    </section>
  </section>
</template>

<script>
export default {
  name: "PresentarExamen",
  data() {
    return {
      testInit: true,
      course_id: this.$route.params.id,
      title: 'Blockchain y NEAR Protocol: Fundamentos Esenciales',
      PresentacionExamen: 1,
      dataPresentacionExamen: [
        {
          question: "¿Qué casos reales de uso tienen hoy los 'smart contracts'?",
          options: [
            {
              option: "Deuda en la biblioteca",
              isSelected: false,
            },
            {
              option: "Non Funfile Tokens",
              isSelected: false,
            },
            {
              option: "Lavado de Autos",
              isSelected: false,
            },
            {
              option: "Estudios Universitarios",
              isSelected: false,
            },
          ],
        },
        {
          question: "pregunta 2?",
          options: [
            {
              option: "Deuda en la biblioteca",
              isSelected: false,
            },
            {
              option: "Non Funfile Tokens",
              isSelected: false,
            },
            {
              option: "Lavado de Autos",
              isSelected: false,
            },
            {
              option: "Estudios Universitarios",
              isSelected: false,
            },
          ],
        },
      ],
      feedback: { rating: null, coment: null }
    }
  },
  methods: {
    anyfunction() {
      console.log('hacer funcion')
    }
  }
};
</script>

<style src="./VerCurso.scss" lang="scss" />
