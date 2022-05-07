<template>
  <section id="instructorCursos" class="parent divcol gap">
    <v-col>
      <h2 class="h4-em">
        CREAR CURSO
      </h2>

      <v-stepper
        v-model="e6"
        vertical
      >
        <!-- ////////////////////////////////// -->
        <v-stepper-step
          :complete="e6 > 1"
          step="1"
        >
          DESCRIPCIÓN
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card color="transparent" class="form">
            <label class="h9-em" for="descripcion_titulo">TITULO</label>
            <v-text-field
              v-model="descripcion_titulo"
              id="descripcion_titulo"
              solo
            >
            </v-text-field>
          </v-card>
          <v-card color="transparent" class="form">
            <label class="h9-em" for="descripcion_categoria">CATEGORIA</label>
            <v-select
              v-model="descripcion_categoria"
              :items="lista_descripcion_categoria"
              id="descripcion_categoria"
              solo
            >
            </v-select>
          </v-card>
          <v-card color="transparent" class="form">
            <label class="h9-em" for="descripcion_descripcion">DESCRIPCIÓN</label>
            <v-text-field
              v-model="descripcion_descripcion"
              id="descripcion_descripcion"
              solo
            >
            </v-text-field>
          </v-card>
          <v-card color="transparent" class="biografia form">
            <label class="h9-em" for="descripcion_aprendizaje">QUE APRENDERAN</label>
            <v-textarea
              v-model="descripcion_aprendizaje"
              id="descripcion_aprendizaje"
              solo
            >
            </v-textarea>
          </v-card>

          <v-col class="contimagen divrow">
            <aside class="divcol">
              <label>{{"Imagen".toUpperCase()}}</label>
              <v-card color="#F3F6F5">
                <img v-if="imagePreview" :src="descripcion_image" alt="Image uploaded">
              </v-card>
            </aside>

            <aside class="wrapper divcol fill-w">
              <div class="divcol">
                <label for="archivo">{{"Elige un archivo a subir".toUpperCase()}}</label>
                <input id="archivo" ref="fileInput" type="file" @input="pickFile();" />
              </div>
            </aside>
          </v-col>

          <v-btn class="botones h8-em" rounded @click="e6 = 2">
            CONTINUAR
          </v-btn>
        </v-stepper-content>
        <!-- ////////////////////////////////// -->

        <!-- ////////////////////////////////// -->
        <v-stepper-step
          :complete="e6 > 2"
          step="2"
        >
          CREAR CONTENIDO
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-card color="transparent" class="form">
            <label class="h9-em" for="contenido_titulo">CATEGORIA</label>
            <v-text-field
              v-model="contenido_titulo"
              id="contenido_titulo"
              solo
            >
            </v-text-field>
          </v-card>
          <v-card color="transparent" class="form">
            <label class="h9-em" for="contenido_descripcion">DESCRIPCIÓN</label>
            <v-text-field
              v-model="contenido_descripcion"
              id="contenido_descripcion"
              solo
            >
            </v-text-field>
          </v-card>
          <v-card color="transparent" class="form programa">
            <label class="h9-em">PROGRAMA</label>
            <section class="align" :class="{center: !selectedPanel}" style="gap: clamp(2em, 4vw, 4em)">
              <aside v-if="cont_video" class="divwrap acenter" style="gap: 1em">
                <img class="referenceImg" src="@/assets/images/video.png" alt="video"
                  @click.stop="PanelVideo()">
                <div v-if="panel_video" class="divwrap acenter gap">
                  <input type="file" accept="video/*" @change="handleFileUpload( $event )"/>
                  <video id="video-preview" controls v-show="file != ''"/>
                </div>
              </aside>

              <aside v-if="cont_articulo" class="divwrap acenter" style="gap: 1em">
                <img class="referenceImg" src="@/assets/images/articulo.png" alt="articulo"
                  @click.stop="PanelArticulo()">
                <div v-if="panel_articulo" class="divwrap acenter gap">
                  <!-- <input type="file" accept="video/*" @change="handleFileUpload( $event )"/>
                  <video id="video-preview" controls v-show="file != ''"/> -->
                </div>
              </aside>

              <aside v-if="cont_examen" class="divwrap acenter" style="gap: 1em">
                <img class="referenceImg" src="@/assets/images/examen.png" alt="examen"
                  @click.stop="PanelExamen()">
                <div v-if="panel_examen" class="divcol">
                  <label class="h9-em" for="file-input">SUBE UN EXAMEN</label>
                  <v-file-input
                    id="file-input"
                    class="file-input"
                    v-model="examen_file"
                    prepend-icon=""
                    solo
                    chips
                  ></v-file-input>
                </div>
              </aside>
            </section>
          </v-card>

          <v-btn class="botones h8-em" rounded @click="e6 = 3">
            CONTINUAR
          </v-btn>
          <v-btn text rounded @click="e6--">
            VOLVER
          </v-btn>
        </v-stepper-content>
        <!-- ////////////////////////////////// -->

        <!-- ////////////////////////////////// -->
        <v-stepper-step
          :complete="e6 > 3"
          step="3"
        >
          PUBLICAR
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
          ></v-card>

          <v-btn class="botones h8-em" rounded @click="e6 = 4">
            CONTINUAR
          </v-btn>
          <v-btn text rounded @click="e6--">
            VOLVER
          </v-btn>
        </v-stepper-content>
        <!-- ////////////////////////////////// -->
      </v-stepper>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "Cursos",
  data() {
    return {
      e6: 1,
      selectedPanel: false,
      cont_video: true,
      panel_video: false,
      cont_articulo: true,
      panel_articulo: false,
      cont_examen: true,
      panel_examen: false,
      // descripcion
      descripcion_titulo: "",
      descripcion_categoria: "",
      lista_descripcion_categoria: ["crypto", "musica", "tecnologia"],
      descripcion_descripcion: "",
      descripcion_aprendizaje: "",
      descripcion_image: "",
      imagePreview: false,
      // crear contenido
      contenido_titulo: "",
      contenido_descripcion: "",
      /* -esta es la informacion del archivo video- */
      file: "",
    }
  },
  methods: {
    pickFile () {
      let input = this.$refs.fileInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.descripcion_image = e.target.result
          this.imagePreview = true
        }
        reader.readAsDataURL(file[0])
      }
    },
    previewVideo(){
      let video = document.getElementById('video-preview');
      let reader = new FileReader();

      reader.readAsDataURL( this.file );
      reader.addEventListener('load', function(){
        // esta es la url
        video.src = reader.result;
        console.log(video.src)
      });
    },
    handleFileUpload( event ){
      // esta es la informacion del archivo
      this.file = event.target.files[0];
      console.log(this.file)
      this.previewVideo();
    },
    PanelVideo() {
      if (this.panel_video === false) {
        this.panel_video = true
        this.cont_articulo = false
        this.cont_examen = false
        this.selectedPanel = true
      } else {
        this.panel_video = false
        this.cont_articulo = true
        this.cont_examen = true
        this.selectedPanel = false
      }
    },
    PanelArticulo() {
      if (this.panel_articulo === false) {
        this.panel_articulo = true
        this.cont_video = false
        this.cont_examen = false
        this.selectedPanel = true
      } else {
        this.panel_articulo = false
        this.cont_video = true
        this.cont_examen = true
        this.selectedPanel = false
      }
    },
    PanelExamen() {
      if (this.panel_examen === false) {
        this.panel_examen = true
        this.cont_video = false
        this.cont_articulo = false
        this.selectedPanel = true
      } else {
        this.panel_examen = false
        this.cont_video = true
        this.cont_articulo = true
        this.selectedPanel = false
      }
    }
  }
};
</script>

<style src="./InstructorCursos.scss" lang="scss" />
