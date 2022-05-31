<template>
  <section id="exmamenCreator" class="subparent divcol gap">
    <v-snackbar v-model="snackbar.visible" auto-height :color="snackbar.color" :multi-line="snackbar.mode === 'multi-line'" :timeout="snackbar.timeout" :top="snackbar.position === 'top'">
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ snackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ snackbar.title }}</strong>
          </div>
          <div>{{ snackbar.text }}</div>
        </v-layout>
      </v-layout>
      <v-btn v-if="snackbar.timeout === 0" icon @click="snackbar.visible = false">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-snackbar>
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
                  v-model="id"
                  :items="lista_descripcion_categoria"
                  id="descripcion_categoria"
                  item-text="name"
                  item-value="id"
                  solo
                  v-on:change="change(id)"
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
                      <img class="referenceImg" src="@/assets/images/articulo.png" alt="examen">
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
                                    <label class="h9-em">TITULO</label>
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
                                          <img class="referenceImg" src="@/assets/images/articulo.png" alt="examen">
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
                  number
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
                Creado por: <span style="color: #FF6B3B">{{ accountId }}</span>
              </span>
              <v-card class="space divwrap" style="display:Flex">
                <div class="divcol">
                  <span class="h8-em">Precio Actual:</span>
                  <span class="number bold">{{publicar_precio}} 
                    <span class="h8 normal">NEAR <span class="h6">Ⓝ</span></span>
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
                <v-btn v-if="!progress" class="botones h8-em" rounded @click="Publicar()">
                  PUBLICAR
                </v-btn>

                <v-btn v-if="progress" class="botones h8-em" disabled rounded @click="Publicar()">
                  PUBLICAR

                  <v-progress-circular
                    :size="18"
                    :width="4"
                    indeterminate
                  ></v-progress-circular>
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
  name: "exmamenCreator",
  data() {
    return {
      progress: false,
      accountId: "",
      snackbar: {},
      stepWindow: 1,
      e6: 1,

      // descripcion
      descripcion_titulo: null,/*1*/
      descripcion_categoria: {},/*2*/
      lista_descripcion_categoria: [],
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
  mounted () {
  },
  methods: {
  }
};
</script>

<style src="./ExamenCreator.scss" lang="scss" />
