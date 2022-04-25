<template>
  <v-col id="profile">
    <h2 class="h4-em">
      PERFIL
    </h2>

    <section class="contForm">
      <v-card color="transparent">
        <label class="h9-em" for="nombre">NOMBRE</label>
        <v-text-field
          v-model="profile.name"
          id="nombre"
          solo
        >
        </v-text-field>
      </v-card>
      <v-card color="transparent">
        <label class="h9-em" for="apellido">APELLIDO</label>
        <v-text-field
          v-model="profile.last_name"
          id="apellido"
          solo
        >
        </v-text-field>
      </v-card>
      <v-card color="transparent">
        <label class="h9-em" for="dni">DNI</label>
        <v-text-field
          v-model="profile.dni"
          id="dni"
          solo
        >
        </v-text-field>
      </v-card>
      <v-card color="transparent">
        <label class="h7-em" for="wallet">WALLET</label>
        <v-text-field
          v-model="accountId"
          solo
          disabled
        >
        </v-text-field>
      </v-card>
      <v-card color="transparent">
        <label class="h7-em" for="discord">DISCORD</label>
        <v-text-field
          v-model="profile.discord"
          id="discord"
          solo
        >
        </v-text-field>
      </v-card>
      <v-card color="transparent">
        <label class="h7-em" for="email">EMAIL</label>
        <v-text-field
          v-model="profile.email"
          id="email"
          solo
        >
        </v-text-field>
      </v-card>
      <v-card color="transparent" class="profesion">
        <label class="h7-em" for="profesion">PROFESION</label>
        <v-text-field
          v-model="profile.profession"
          id="profesion"
          solo
        >
        </v-text-field>
      </v-card>
      <v-card color="transparent" class="biografia">
        <label class="h7-em" for="biografia">BIOGRAFIA</label>
        <v-textarea
          v-model="profile.biography"
          id="biografia"
          solo
        >
        </v-textarea>
      </v-card>
      <v-card color="transparent">
        <label class="h7-em" for="pais">PAIS</label>
        <v-text-field
          v-model="profile.country"
          id="pais"
          solo
        >
        </v-text-field>
      </v-card>
    </section>

    <v-col align="center">
      <v-btn 
        v-if="newProfile"
        class="h7-em" 
        rounded
        @click="setData()">
        GUARDAR
      </v-btn>
      <v-btn 
        v-else
        class="h7-em" 
        rounded
        @click="setDataEdit()">
        GUARDAR
      </v-btn>
    </v-col>
  </v-col>
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
  name: "Profile",
  data() {
    return {
      newProfile: true,
      profile: {},
      accountId: null,
      wallet: null,
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async setData () {
      const CONTRACT_NAME = 'contract.e-learning.testnet'
      // connect to NEAR
      const near = await connect(config);
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ['set_profile'],
        sender: wallet.account()
      })
      if (wallet.isSignedIn()) {
        await contract.set_profile({
          name: this.profile.name,
          last_name: this.profile.last_name,
          dni: this.profile.dni,
          profession: this.profile.profession,
          biography: this.profile.biography,
          discord: this.profile.discord,
          email: this.profile.email,
          country: this.profile.country,
        })
      }
    },
    async setDataEdit () {
      const CONTRACT_NAME = 'contract.e-learning.testnet'
      // connect to NEAR
      const near = await connect(config);
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ['put_profile'],
        sender: wallet.account()
      })
      if (wallet.isSignedIn()) {
        await contract.put_profile({
          name: this.profile.name,
          last_name: this.profile.last_name,
          dni: this.profile.dni,
          profession: this.profile.profession,
          biography: this.profile.biography,
          discord: this.profile.discord,
          email: this.profile.email,
          country: this.profile.country,
        })
      }
    },
    async getData () {
      const CONTRACT_NAME = 'contract.e-learning.testnet'
      // connect to NEAR
      const near = await connect(config);
      // create wallet connection
      const wallet = new WalletConnection(near)
      this.accountId = wallet.getAccountId()
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_profile'],
        sender: wallet.account()
      })
      if (wallet.isSignedIn()) {
        // console.log(wallet.account())
        await contract.get_profile({
          user_id: wallet.getAccountId()
        }).then((res) => {
          this.profile = res
          this.newProfile = false
        }).catch(() => {
        })
      }
    }
  }
};
</script>

<style src="./Profile.scss" lang="scss" />
