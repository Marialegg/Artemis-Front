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
                <article @click.stop="PanelVideo()">
                  <img class="referenceImg" src="@/assets/images/video.png" alt="video">
                </article>
                <div v-if="panel_video" class="divwrap acenter gap">
                  <input type="file" accept="video/*" @change="handleFileUpload( $event )"/>
                  <video id="video-preview" controls v-show="file != ''" />
                </div>
              </aside>

              <aside v-if="cont_articulo" class="divwrap acenter" style="gap: 1em">
                <article @click.stop="PanelArticulo()">
                  <img class="referenceImg" src="@/assets/images/articulo.png" alt="articulo">
                </article>
                <div v-if="panel_articulo" class="divwrap acenter gap">
                  <wysiwyg v-model="articulo_file" />
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

          <v-btn v-if="grabarBtn" class="botones h8-em" rounded @click="Grabar()">
            GRABAR
          </v-btn>
          <v-btn v-else class="botones h8-em" rounded
            @click="e6 = 1, grabarBtn = true, volverBtn = true">
            CREAR NUEVO
          </v-btn>
          <v-btn v-show="volverBtn" text rounded @click="e6--">
            VOLVER
          </v-btn>
        </v-stepper-content>
        <!-- ////////////////////////////////// -->
      </v-stepper>


      <!-- lista -->
      <v-data-table
        id="data_table"
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
                      <v-col cols="12" sm="6" md="4">
                        <v-card color="transparent" class="form">
                          <label class="h9-em">TTULO</label>
                          <v-text-field
                            v-model="editedItem.titulo"
                            solo
                          >
                          </v-text-field>
                        </v-card>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-card color="transparent" class="form">
                          <label class="h9-em">CATEGORIA</label>
                          <v-select
                            v-model="editedItem.categoria"
                            :items="lista_descripcion_categoria"
                            solo
                          >
                          </v-select>
                        </v-card>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-card color="transparent" class="form">
                          <label class="h9-em">DESCRIPCIÓN</label>
                          <v-text-field
                            v-model="editedItem.descripcion"
                            solo
                          >
                          </v-text-field>
                        </v-card>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-card color="transparent" class="biografia form">
                          <label class="h9-em">QUE APRENDERAN</label>
                          <v-textarea
                            v-model="editedItem.aprendizaje"
                            solo
                          >
                          </v-textarea>
                        </v-card>
                      </v-col>

                      <v-col class="contimagen divrow">
                        <aside class="divcol">
                          <label class="h9-em">IMAGEN</label>
                          <v-card color="#F3F6F5">
                            <img :src="editedItem.image" alt="Image uploaded">
                          </v-card>
                        </aside>

                        <aside class="wrapper divcol fill-w">
                          <div class="divcol">
                            <label for="archivo">ELIGE UN ARCHIVO A SUBIR</label>
                            <input id="archivo" ref="fileInputEdited" type="file" accept="image/*" @input="pickFileEdited();" />
                          </div>
                        </aside>
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
                <v-card-title class="text-h5">¿ QUIERES BORRAR ESTE CURSO ?</v-card-title>
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
    </v-col>
  </section>
</template>

<script>
export default {
  name: "Cursos",
  data() {
    return {
      e6: 1,
      // actions
      selectedPanel: false,
      cont_video: true,
      panel_video: false,
      cont_articulo: true,
      panel_articulo: false,
      cont_examen: true,
      panel_examen: false,
      grabarBtn: true,
      volverBtn: true,

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
      articulo_file: null,
      examen_file: null,
      // publicar
      publicar_precio: null,/*7*/

      // lista
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'ORDEN', align: 'start', value: 'orden' },
        { text: 'TITULO', value: 'titulo' },
        { text: 'TIPO', value: 'tipo' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        orden: 0,
        titulo: "",
        tipo: "",
        //
        categoria: null,
        descripcion: null,
        aprendizaje: null,
        image: null,
        precio: null,
      },
      defaultItem: {
        orden: 0,
        titulo: "",
        tipo: "",
        //
        categoria: null,
        descripcion: null,
        aprendizaje: null,
        image: null,
        precio: null,
      },
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
    pickFileEdited () {
      let input = this.$refs.fileInputEdited
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.editedItem.image = e.target.result
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
        this.contenido_tipo = "video"
      } else {
        this.panel_video = false
        this.cont_articulo = true
        this.cont_examen = true
        this.selectedPanel = false
        this.file = ''
        this.contenido_tipo = null
      }
    },
    PanelArticulo() {
      if (this.panel_articulo === false) {
        this.panel_articulo = true
        this.cont_video = false
        this.cont_examen = false
        this.selectedPanel = true
        this.contenido_tipo = "articulo"
      } else {
        this.panel_articulo = false
        this.cont_video = true
        this.cont_examen = true
        this.selectedPanel = false
        this.articulo_file = null
        this.contenido_tipo = null
      }
    },
    PanelExamen() {
      if (this.panel_examen === false) {
        this.panel_examen = true
        this.cont_video = false
        this.cont_articulo = false
        this.selectedPanel = true
        this.contenido_tipo = "examen"
      } else {
        this.panel_examen = false
        this.cont_video = true
        this.cont_articulo = true
        this.selectedPanel = false
        this.examen_file = null
        this.contenido_tipo = null
      }
    },
    Grabar() {
      // console.log(this.desserts.length+1)
      let object = {
        orden: this.desserts.length+1,
        titulo: this.descripcion_titulo,
        categoria: this.descripcion_categoria,
        descripcion: this.descripcion_descripcion,
        aprendizaje: this.descripcion_aprendizaje,
        image: this.descripcion_image,
        tipo: this.contenido_tipo,
        precio: this.publicar_precio,
      }

      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], object)
      } else {
        this.desserts.push(object)
      }
      this.close()
      this.descripcion_titulo = null
      this.descripcion_categoria = null
      this.descripcion_descripcion = null
      this.descripcion_aprendizaje = null
      this.descripcion_image = null
      this.contenido_tipo = null
      this.publicar_precio = null
      //
      this.imagePreview = false
      this.cont_video = true
      this.panel_video = false
      this.cont_articulo = true
      this.panel_articulo = false
      this.cont_examen = true
      this.panel_examen = false
      this.selectedPanel = false
      this.file = ''
      this.articulo_file = null
      this.examen_file = null

      this.grabarBtn = false
      this.volverBtn = false
    },

    // lista
    initialize () {
      this.desserts = []
    },
    editItem (item) {
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
  }
};
</script>

<style src="./InstructorCursos.scss" lang="scss" />
