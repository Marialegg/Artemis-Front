<template>
  <section id="certificados" class="subparent divcol gap">
    <v-col cols="11" class="align">
      <h2 class="h4-em">
        MIS CERTIFICADOS
      </h2>

      <div class="divwrap gap">
        <span class="h7-em bold marginrighta center">DESDE ACA PODRA USTEDE COMO ESTUDIANTE PODRA VER SUS CERTIFICADOS</span>
      </div>
    </v-col>

    <v-col>
      <h3 class="h8-em">CURSOS ADQUIRIDOS:</h3>

      <v-data-table
        id="datatable"
        :headers="headersTable"
        :items="dataTable"
        hide-default-footer
      >
        <template v-slot:[`item.curso`]="{ item }">
          <div class="divcol center" style="gap:1em">
            <img :src="item.img_course" alt="Course Image" width="164px">
            <h3 style="color:#0E1F2F !important" class="h7-em p">{{item.name}}</h3>
          </div>
        </template>

        <template v-slot:[`item.certificado`]="{ item }">
          <div class="center">
            <img :src="item.img_certificado" alt="Course Image" width="150px">
          </div>
        </template>

        <template v-slot:[`item.actions`]>
          <v-btn class="botones" rounded>MINTEAR</v-btn>
        </template>
      </v-data-table>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "Certificados",
  data() {
    return {
      headersTable: [
        { value: "curso", text: "CURSO", align: "center" },
        { value: "certificado", text: "CERTIFICADO", align: "center" },
        { value: "actions", sortable: false, align: "center" },
      ],
      dataTable: [
        {
          img_course: require("@/assets/images/rust.png"),
          name: "Rust Basico",
          img_certificado: require("@/assets/images/certificado.png"),
        },
        {
          img_course: require("@/assets/images/near-course.png"),
          name: "Rust Basico",
          img_certificado: require("@/assets/images/certificado.png"),
        },
      ],
    }
  },
  mounted () {
  },
  methods: {
  }
};
</script>

<style src="./Certificados.scss" lang="scss" />
