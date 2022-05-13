<template>
  <section id="instructor" class="subparent divcol gap">
    <v-col cols="11" class="align">
      <h2 class="h4-em">
        CURSOS
      </h2>

      <div class="jend divwrap gap">
        <span class="h7-em bold marginrighta">DESDE ACA USTED INSTRUCTOR PODRA CREAR SUS CURSOS</span>
        <aside class="divrow gap">
          <v-btn class="botones h9-em" rounded href="#/instructor-cursos">NUEVO CURSO</v-btn>
          <v-btn class="botones h9-em" rounded>ESTADÍSTICAS</v-btn>
        </aside>
      </div>
    </v-col>

    <v-col>
      <h3 class="h8-em">CURSOS PUBLICADOS POR EL INSTRUCTOR</h3>
      
      <section v-for="(item, i) in dataCursos" :key="i"
        class="wrapper">
        <aside class="divrow">
          <img :src="item.img" alt="imagen curso">
          <div class="divcol">
            <span class="h7-em">{{item.title}}</span>
            <span class="h7-em">{{item.price}}<span class="h8-em">Ⓝ</span></span>
          </div>
        </aside>

        <aside class="divcol">
          <h3 class="h5-em p">{{item.profits}} NEAR</h3>
          <span class="h7-em tcenter">Ganancias Totales</span>
        </aside>
        
        <aside class="divcol">
          <h3 class="h5-em p">{{item.inscriptions}}</h3>
          <span class="h7-em tcenter">Inscripciones Totales</span>
        </aside>
        
        <aside class="divcol">
          <div class="divrow acenter">
            <h3 class="h5-em p">{{item.rating}}</h3>
            <v-rating
              v-model="item.rating"
              background-color="pink lighten-3"
              color="orange"
              half-increments
            ></v-rating>
          </div>

          <span class="h8-em tcenter">Valoración del curso</span>

          <div class="spacee fill-Ⓝw">
            <v-btn class="botones h9-em" rounded href="#instructor-cursos" @click="Editar(item)">EDITAR</v-btn>
            <v-btn class="botones h9-em" rounded @click="Delete(item)">ELIMINAR</v-btn>
          </div>
        </aside>
      </section>
    </v-col>
  </section>
</template>

<script>
import * as nearAPI from 'near-api-js'
const { connect, keyStores, WalletConnection, Contract } = nearAPI

const keyStore = new keyStores.BrowserLocalStorageKeyStore()
const config = {
        networkId: "testnet",
        keyStore, 
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };
export default {
  name: "Cursos",
  data() {
    return {
      dataCursos: []
    }
  },
  mounted () {
    this.getCourcesInstructor()
  },
  methods: {
    async getCourcesInstructor() {
      this.lista_descripcion_categoria = []
      const CONTRACT_NAME = 'contract.e-learning.testnet'
      // connect to NEAR
      const near = await connect(config)
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_cources_intructor'],
        sender: wallet.account()
      })
      await contract.get_cources_intructor({
        user_id: wallet.getAccountId(),
      })
        .then((response) => {
          for (var i = 0; i < response.length; i++) {
            var item = {}
            item.title = response[i].title
            item.price = response[i].price
            item.img = response[i].img
            if (response[i].inscriptions === null) {
              item.profits = 0
              item.inscriptions = 0
            } else {
              item.inscriptions = response[i].inscriptions.length
              item.profits = response[i].inscriptions.length * response[i].price
            }
            if (response[i].reviews === null) {
              item.rating = 0
            }
            this.dataCursos.push(item)
          }
          this.dataCursos = this.dataCursos.reverse()
          //response.forEach((element) => {
          //  this.lista_descripcion_categoria.push({ id: element.id, name: element.name, img: element.img })
          //})
        })
    },
    Editar(item) {
      const index = this.$store.state.dataCursos.indexOf(item)
      let object = this.$store.state.dataCursos[index]
      this.$store.dispatch("EditarCurso", { object, index });
      this.$router.push({path: '/instructor-cursos-editable'})
    },
    Delete(item) {
      const index = this.$store.state.dataCursos.indexOf(item)
      this.$store.dispatch("EliminarCurso", { index });
    }
  }
};
</script>

<style src="./Instructor.scss" lang="scss" />
