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
          <v-btn class="botones" :disabled="pass_certification" rounded @click="passBuy()">COMPRAR PASE</v-btn>
          <v-btn class="botones" :disabled="!pass_certification" rounded @click="testInit=false">CERTIFICATE</v-btn>
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
import * as nearAPI from 'near-api-js'
const { connect, keyStores, WalletConnection, Contract, utils } = nearAPI

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
  name: "PresentarExamen",
  data() {
    return {
      testInit: true,
      course_id: this.$route.params.id,
      pass_certification: null,
      price_certification: null,
      disabled1: null,
      disabled2: null,
      title: null,
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
  mounted () {
    this.getCourse()
    this.getPass()
  },
  methods: {
    anyfunction() {
      console.log('hacer funcion')
    },
    async getCourse() {
      const CONTRACT_NAME = 'contract2.e-learning.testnet'
      // connect to NEAR
      const near = await connect(config)
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_course_id'],
        sender: wallet.account()
      })
      await contract.get_course_id({
        user_id: wallet.getAccountId(),
        course_id: parseInt(this.course_id),
      })
        .then((response) => {
          console.log(response)
          this.title = response.title
          this.price_certification = response.price_certification
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getPass() {
      const CONTRACT_NAME = 'contract2.e-learning.testnet'
      // connect to NEAR
      const near = await connect(config)
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_pass_certification'],
        sender: wallet.account()
      })
      await contract.get_pass_certification({
        user_id: wallet.getAccountId(),
        course_id: parseInt(this.course_id),
      })
        .then((response) => {
          this.pass_certification = response.pass_certification
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async passBuy () {
      const CONTRACT_NAME = 'contract2.e-learning.testnet'
      // connect to NEAR
      const near = await connect(config)
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ['pass_certification_buy'],
        sender: wallet.account()
      })
      await contract.pass_certification_buy({
        course_id: parseInt(this.course_id),
      }, '300000000000000', // attached GAS (optional)
      utils.format.parseNearAmount((Number(this.formatPrice(this.price_certification)) + 0.015).toString()))
    },
    formatPrice (price) {
      return utils.format.formatNearAmount(price.toLocaleString('fullwide', { useGrouping: false }))
    }
  }
};
</script>

<style src="./VerCurso.scss" lang="scss" />
