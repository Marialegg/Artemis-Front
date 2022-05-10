<template>
  <section id="instructorCursos" class="subparent divcol gap">
    <v-window v-model="stepWindow" touchless>
      <v-window-item :value="1">
        <v-col>
          <h2 class="h4-em">
            CREAR CURSO
          </h2>

          <v-stepper
            v-model="e6"
            non-linear
          >
            <!-- ////////////////////////////////// -->
            <v-stepper-step
              :complete="e6 > 1"
              step="1"
              editable
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

              <v-col class="contimagen divrow divwrapmobile">
                <aside class="divcol">
                  <label class="h9-em">IMAGEN</label>
                  <v-card color="#F3F6F5">
                    <img :src="descripcion_image" alt="Image uploaded">
                  </v-card>
                </aside>

                <aside class="wrapper divcol fill-w">
                  <div class="divcol">
                    <label for="archivo">{{"Elige un archivo a subir".toUpperCase()}}</label>
                    <input id="archivo" ref="fileInput" type="file" accept="image/*" @input="pickFile();" />
                  </div>
                </aside>
              </v-col>
            </v-stepper-content>
            <!-- ////////////////////////////////// -->

            <!-- ////////////////////////////////// -->
            <v-stepper-step
              :complete="e6 > 2"
              step="2"
              editable
            >
              PUBLICAR
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-card color="transparent" class="form">
                <label class="h9-em" for="publicar_precio">PRECIO</label>
                <v-text-field
                  v-model="publicar_precio"
                  id="publicar_precio"
                  solo
                  style="max-width: 10em"
                >
                </v-text-field>
              </v-card>

              <v-btn class="botones h8-em" rounded @click="stepWindow++">
                VISTA PREVIA
              </v-btn>
            </v-stepper-content>
            <!-- ////////////////////////////////// -->
          </v-stepper>
        </v-col>
      </v-window-item>



      <v-window-item :value="2">
        <v-col id="preview" class="divcol gap">
          <section class="divcolmobile">
            <img class="referenceImg alignmobile" :src="descripcion_image" alt="Reference Img">

            <aside class="divcol fill-w" style="gap: clamp(.5em, 1vw, 1em)">
              <h4 class="titulo h5-em bold tcentermobile">{{descripcion_titulo}}</h4>
              <span class="subtitulo h8-em notdefault-clr" style="color: #747A80">
                Creado por: <span style="color: #FF6B3B">IRON MAN</span>
              </span>
              <v-card class="space divwrap" style="display:Flex">
                <div class="divcol">
                  <span class="h8-em">Precio Actual:</span>
                  <span class="number bold">{{publicar_precio}} 
                    <span class="h8 normal">NEAR </span>◎
                  </span>
                </div>

                <v-rating
                  background-color="pink lighten-3"
                  color="orange"
                ></v-rating>
              </v-card>
            </aside>
          </section>

          <section class="divcolmobile">
            <aside class="divcol gap fill-wmobile">
              <h4 class="h7-em semibold fill-w notdefault-clr">LO QUE APRENDERAS</h4>
              <div class="divcol">
                <p>{{descripcion_aprendizaje}}</p>
              </div>
            </aside>

            <aside class="divcol jspace fill-w gap">
              <div clasS="divcol gap">
                <h4 class="h7-em semibold fill-w notdefault-clr">CONTENIDO DEL CURSO</h4>

                <!-- lista -->
                <v-data-table
                  class="data_table"
                  :headers="headersPreview"
                  :items="this.$store.state.editedCursos.contenidoTabla"
                  sort-by="orden"
                >
                  <template v-slot:no-data>
                    <span class="h8-em">NO HAY INFORMACION DISPONIBLE</span>
                  </template>
                </v-data-table>
              </div>

              <div class="spacee gap">
                <v-btn class="botones h8-em" rounded @click="stepWindow--">
                  REGRESAR
                </v-btn>
                <v-btn class="botones h8-em" rounded @click="PublicarEdited()">
                  PUBLICAR
                </v-btn>
              </div>
            </aside>
          </section>

          <section>
            <h4 class="h7-em fill-w semibold notdefault-clr">CURSOS PUBLICADOS POR EL INSTRUCTOR</h4>

            <section class="wrapper">
              <v-slide-group
                v-model="slider"
                center-active
                show-arrows
                class="fill-w"
              >
                <v-slide-item v-for="(item, index) in dataSlider" :key="index"
                  v-slot="{ toggle }">
                  <v-card color="var(clr-card)" class="cartas divcol" v-ripple="{ class: 'activeRipple' }"
                    @click="toggle">
                    <img :src="item.img" alt="Imagen curso">
                    <div class="divcol astart">
                      <aside class="divcol">
                        <span class="h7-em bold">{{item.title}}</span>
                        <a :href="item.to" class="h9-em semibold" style="color: #FF6B3B !important">
                          Instructor {{item.instructor }}
                        </a>
                      </aside>

                      <aside class="space fill-w gap divwrapmobile">
                        <span class="h5-em bold">{{item.price }} 
                          <span class="h10 normal">NEAR</span>
                        </span>
                        <v-rating
                          v-model="item.rating"
                          background-color="pink lighten-3"
                          color="orange"
                        ></v-rating>
                      </aside>
                    </div>
                  </v-card>
                </v-slide-item>
              </v-slide-group>
            </section>
          </section>
        </v-col>
      </v-window-item>
    </v-window>
  </section>
</template>

<script>
export default {
  name: "Cursos",
  mounted() {
    const edited = this.$store.state.editedCursos;
    // descripcion
    this.descripcion_titulo = edited.name
    this.descripcion_categoria = edited.categoria
    this.descripcion_descripcion = edited.descripcion
    this.descripcion_aprendizaje = edited.aprendizaje
    this.descripcion_image = edited.img
    // publicar
    this.publicar_precio = edited.price
  },
  data() {
    return {
      stepWindow: 1,
      e6: 1,

      // descripcion
      descripcion_titulo: null,/*1*/
      descripcion_categoria: null,/*2*/
      lista_descripcion_categoria: ["crypto", "musica", "tecnologia"],
      descripcion_descripcion: null,/*3*/
      descripcion_aprendizaje: null,/*4*/
      descripcion_image: null,/*5*/

      // publicar
      publicar_precio: null,/*7*/

      headersPreview: [
        { text: 'ORDEN', align: 'start', value: 'orden' },
        { text: 'TITULO', value: 'titulo' },
        { text: 'TIPO', value: 'tipo' },
      ],
      // slider
      slider: "",
      dataSlider: [
        {
          img: require("@/assets/images/python.jpg"),
          title: "Rust Basico",
          instructor: "IRON MAN",
          to: "#",
          price: "0.75",
          rating: "4",
        },
      ],
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
        }
        reader.readAsDataURL(file[0])
      }
    },
    PublicarEdited() {
      let object = {
        name: this.descripcion_titulo,
        img: this.descripcion_image,
        price: this.publicar_precio,
        earned: 0,
        inscriptions: 0,
        rating: 0,
        //
        categoria: this.descripcion_categoria,
        descripcion: this.descripcion_descripcion,
        aprendizaje: this.descripcion_aprendizaje,
        contenidoTabla: this.$store.state.editedCursos.contenidoTabla,
      }
      this.$store.dispatch("PublicarCursoEdited", { object });
      this.$router.push({ path: '/instructor' })
    }
  }
};
</script>

<style src="./InstructorCursos.scss" lang="scss" />
