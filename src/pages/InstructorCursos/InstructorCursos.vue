<template>
  <section id="instructorCursos" class="parent divcol gap">
    <v-window v-model="stepWindow" touchless>
      <v-window-item :value="1">
        <v-col>
          <h2 class="h4-em">
            CREAR CURSO
          </h2>

          <v-stepper
            v-model="e6"
            vertical
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
                    <img v-if="imagePreview" :src="descripcion_image" alt="Image uploaded">
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
              CREAR CONTENIDO
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-card color="transparent" class="form">
                <label class="h9-em" for="contenido_titulo">TITULO</label>
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
                    <article @click.stop="PanelVideo()">
                      <img class="referenceImg" src="@/assets/images/video.png" alt="video">
                    </article>
                    <div v-if="panel_video" class="divwrap acenter gap">
                      <input type="file" accept="video/*" @change="handleFileUpload( $event )"/>
                      <video id="video-preview" controls v-show="file != ''" />
                    </div>
                  </aside>

                  <aside v-if="cont_examen" class="divwrap acenter" style="gap: 1em">
                    <article @click.stop="PanelExamen()">
                      <img class="referenceImg" src="@/assets/images/examen.png" alt="examen">
                    </article>
                    <div v-if="panel_examen" class="divcol">
                      <label class="h9-em" for="file-input">SUBE UN EXAMEN</label>
                      <v-file-input
                        id="file-input"
                        class="file-input"
                        v-model="examen_file"
                        prepend-icon=""
                        solo
                        chips
                        accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.presentation"
                      ></v-file-input>
                    </div>
                  </aside>
                </section>

                <div class="center fill-w">
                  <v-btn class="botones h8-em" style="margin-top: 2em" rounded @click="Grabar()">
                    GRABAR
                  </v-btn>
                  <!-- <v-btn style="position: fixed !important; left: 0; top: 0; background: green; color: black; z-index: 999">
                  {{editedItem.examen_file}}
                  </v-btn> -->
                </div>

                <!-- lista -->
                <v-data-table
                  class="data_table"
                  :headers="headers"
                  :items="desserts"
                  sort-by="orden"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-dialog
                        v-model="dialog"
                        max-width="max-content"
                      >
                        <v-card>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="6">
                                  <v-card color="transparent" class="form">
                                    <label class="h9-em">TTULO</label>
                                    <v-text-field
                                      v-model="editedItem.titulo"
                                      solo
                                    >
                                    </v-text-field>
                                  </v-card>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-card color="transparent" class="form">
                                    <label class="h9-em">DESCRIPCIÓN</label>
                                    <v-text-field
                                      v-model="editedItem.descripcion"
                                      solo
                                    >
                                    </v-text-field>
                                  </v-card>
                                </v-col>
                                <v-col cols="12">
                                  <v-card color="transparent" class="form programa">
                                    <label class="h9-em">PROGRAMA</label>
                                    <section class="align" :class="{center: !editedItem.selectedPanel}" style="gap: clamp(2em, 4vw, 4em)">
                                      <aside v-if="editedItem.cont_video" class="divwrap acenter" style="gap: 1em">
                                        <article @click.stop="PanelVideoEdited()">
                                          <img class="referenceImg" src="@/assets/images/video.png" alt="video">
                                        </article>
                                        <div v-if="editedItem.panel_video" class="divwrap acenter gap">
                                          <input type="file" accept="video/*" @change="handleFileUploadEdited( $event )"/>
                                          <video id="video-preview-edited" controls v-show="editedItem.file != ''" />
                                        </div>
                                      </aside>

                                      <aside v-if="editedItem.cont_examen" class="divwrap acenter" style="gap: 1em">
                                        <article @click.stop="PanelExamenEdited()">
                                          <img class="referenceImg" src="@/assets/images/examen.png" alt="examen">
                                        </article>
                                        <div v-if="editedItem.panel_examen" class="divcol">
                                          <label class="h9-em" for="file-input">SUBE UN EXAMEN</label>
                                          <v-file-input
                                            id="file-input"
                                            class="file-input"
                                            v-model="editedItem.examen_file"
                                            prepend-icon=""
                                            solo
                                            chips
                                            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.presentation"
                                          ></v-file-input>
                                        </div>
                                      </aside>
                                    </section>
                                  </v-card>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red" rounded text @click="close">
                              <span style="color: red !important">Cancelar</span>
                            </v-btn>
                            <v-btn color="#F29627" rounded text @click="save">
                              <span style="color: #F29627 !important">Guardar</span>
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                      <v-dialog v-model="dialogDelete" max-width="max-content">
                        <v-card>
                          <v-card-title class="text-h5">¿ QUIERES BORRAR ESTE CONTENIDO ?</v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red" rounded text @click="closeDelete">
                              <span style="color: red !important">Cancelar</span>
                            </v-btn>
                            <v-btn color="#F29627" rounded text @click="deleteItemConfirm">
                              <span style="color: #F29627 !important">Borrar</span>
                            </v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>

                  <template v-slot:[`item.actions`]="{ item }">
                    <v-btn icon @click="editItem(item)">
                      <v-icon small color="#F29627" class="notdefault-clr"> mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click="deleteItem(item)">
                      <v-icon small color="red" class="notdefault-clr">mdi-delete</v-icon>
                    </v-btn>
                  </template>

                  <template v-slot:no-data>
                    <span class="h8-em">NO HAY INFORMACION DISPONIBLE</span>
                  </template>
                </v-data-table>
              </v-card>
            </v-stepper-content>
            <!-- ////////////////////////////////// -->

            <!-- ////////////////////////////////// -->
            <v-stepper-step
              :complete="e6 > 3"
              step="3"
              editable
            >
              PUBLICAR
            </v-stepper-step>

            <v-stepper-content step="3">
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
                  :items="desserts"
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
                <v-btn class="botones h8-em" rounded @click="Publicar()">
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
      imagePreview: false,

      // crear contenido
      contenido_titulo: null,
      contenido_descripcion: null,
      contenido_tipo: null,/*6*/
      file: "",
      examen_file: null,
      // actions contenido
      selectedPanel: false,
      cont_video: true,
      panel_video: false,
      cont_examen: true,
      panel_examen: false,
      // lista
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'ORDEN', align: 'start', value: 'orden' },
        { text: 'TITULO', value: 'titulo' },
        { text: 'TIPO', value: 'tipo' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      headersPreview: [
        { text: 'ORDEN', align: 'start', value: 'orden' },
        { text: 'TITULO', value: 'titulo' },
        { text: 'TIPO', value: 'tipo' },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        orden: 0,
        titulo: "",
        descripcion: null,
        tipo: "",
        file: "",
        examen: null,
        // controls
        selectedPanel: false,
        cont_video: true,
        panel_video: false,
        cont_examen: true,
        panel_examen: false,
      },
      defaultItem: {
        orden: 0,
        titulo: "",
        descripcion: null,
        tipo: "",
        file: "",
        examen: null,
        // controls
        selectedPanel: false,
        cont_video: true,
        panel_video: false,
        cont_examen: true,
        panel_examen: false,
      },

      // publicar
      publicar_precio: null,/*7*/

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
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  created () {
    this.initialize()
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
        this.cont_examen = false
        this.selectedPanel = true
        this.contenido_tipo = "video"
      } else {
        this.panel_video = false
        this.cont_examen = true
        this.selectedPanel = false
        this.file = ''
        this.contenido_tipo = null
      }
    },
    PanelExamen() {
      if (this.panel_examen === false) {
        this.panel_examen = true
        this.cont_video = false
        this.selectedPanel = true
        this.contenido_tipo = "examen"
      } else {
        this.panel_examen = false
        this.cont_video = true
        this.selectedPanel = false
        this.examen_file = null
        this.contenido_tipo = null
      }
    },
    Grabar() {
      let object = {
        tipo: this.contenido_tipo,
        orden: this.desserts.length+1,
        titulo: this.contenido_titulo,
        descripcion: this.contenido_descripcion,
        file: this.file,
        examen: this.examen_file,
        // controls
        selectedPanel: this.selectedPanel,
        cont_video: this.cont_video,
        panel_video: this.panel_video,
        cont_examen: this.cont_examen,
        panel_examen: this.panel_examen,
      }

      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], object)
      } else {
        this.desserts.push(object)
      }
      this.close()
      
      // items
      this.contenido_titulo = null
      this.contenido_descripcion = null
      this.contenido_tipo = null
      this.file = ''
      this.examen_file = null
      // clear controls
      this.selectedPanel = false
      this.cont_video = true
      this.panel_video = false
      this.cont_examen = true
      this.panel_examen = false
    },

    // edited functions
    previewVideoEdited(){
      let video = document.getElementById('video-preview-edited');
      let reader = new FileReader();

      reader.readAsDataURL( this.editedItem.file );
      reader.addEventListener('load', function(){
        // esta es la url
        video.src = reader.result;
        console.log(video.src)
      });
    },
    handleFileUploadEdited( event ){
      // esta es la informacion del archivo
      this.editedItem.file = event.target.files[0];
      console.log(this.editedItem.file)
      this.previewVideoEdited();
    },
    PanelVideoEdited() {
      if (this.editedItem.panel_video === false) {
        this.editedItem.panel_video = true
        this.editedItem.cont_examen = false
        this.editedItem.selectedPanel = true
        this.editedItem.contenido_tipo = "video"
      } else {
        this.editedItem.panel_video = false
        this.editedItem.cont_examen = true
        this.editedItem.selectedPanel = false
        this.editedItem.file = ''
        this.editedItem.contenido_tipo = null
      }
    },
    PanelExamenEdited() {
      if (this.editedItem.panel_examen === false) {
        this.editedItem.panel_examen = true
        this.editedItem.cont_video = false
        this.editedItem.selectedPanel = true
        this.editedItem.contenido_tipo = "examen"
      } else {
        this.editedItem.panel_examen = false
        this.editedItem.cont_video = true
        this.editedItem.selectedPanel = false
        this.editedItem.examen_file = null
        this.editedItem.contenido_tipo = null
      }
    },

    // lista
    initialize () {
      this.desserts = []
    },
    editItem (item) {
      // problema para recibir info de programas
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.desserts.forEach(element => {
        element.orden = this.desserts.indexOf(element)+1
      });
      this.closeDelete()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
    Publicar() {
      let object = {
        name: this.descripcion_titulo,
        img: this.descripcion_image,
        price: this.publicar_precio,
        earned: null,
        inscriptions: null,
        rating: 0,
        //
        categoria: this.descripcion_categoria,
        descripcion: this.descripcion_descripcion,
        aprendizaje: this.descripcion_aprendizaje,
        contenidoTabla: this.desserts,
      }
      console.log(object)
      this.$store.dispatch("PublicarCurso", { object});
      this.$router.push({ path: '/instructor' })
    }
  }
};
</script>

<style src="./InstructorCursos.scss" lang="scss" />
