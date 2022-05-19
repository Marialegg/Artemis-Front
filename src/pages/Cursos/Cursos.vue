<template>
  <section id="cursos" class="subparent divcol gap">
    <v-col class="align divwrap gap acenter">
      <a class="h8-em notdefault-clr hover-line" @click="clear()">Clear All</a>
      <v-text-field
        v-model="search"
        filled
        shaped
        hide-details
        prepend-inner-icon="mdi-magnify"
        placeholder="Search.."
      ></v-text-field>

      <div class="contFilters divrow gap spacemobile fill-wmobile">
        <v-select
          :items="filter.categories"
          label="Categorie"
          filled
          shaped
          hide-details
          background-color="var(--clr-card-2)"
          class="filterCategories"
        >
          <template v-slot:[`slotProps.item`]>
            <span>{{ slotProps.item }}</span>
          </template>
        </v-select>
        
        <v-select
          :items="filter.price"
          label="Price"
          filled
          shaped
          hide-details
          background-color="var(--clr-card-2)"
          class="filterPrice"
        >
          <template v-slot:[`slotProps.item`]>
            <span>{{ slotProps.item }}</span>
          </template>
        </v-select>
      </div>
    </v-col>

    <!-- bajo modificacion -->
    <v-col class="wrapper">
      <v-card v-for="(item,i) in dataCursos" :key="i" href="#/detalle-curso"
        color="var(clr-card)" class="cartas align divcol" v-ripple="{ class: 'activeRipple' }">
        <img :src="item.img" alt="Imagen curso">
        <div class="divcol astart">
          <aside class="divcol">
            <span class="h7-em bold">{{item.title}}</span>
            <a :href="item.to" class="h9-em semibold" style="color: #FF6B3B !important">
              {{item.instructor }}
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
    </v-col>
    <template>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="size_pagination"
            circle
            @input="pagination()"
          ></v-pagination>
        </div>
      </template>
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
      page: 1,
      size_pagination: null,
      len_pagination: 0,
      limit: 3,
      search: '',
      filter: {
        categories: ['Frontend', 'Backend', 'Cripto'],
        price: ['Low to High', 'High to Low'],
      },
      dataCursos: [],
    }
  },
  mounted () {
    this.getMarketCourses()
    this.sizePagination()
  },
  methods: {
    clear() {
      console.log("clear")
    },
    pagination() {
      if (this.page === 1) {
        this.len_pagination = 0
      } else {
        this.len_pagination = (this.page - 1) * this.limit
      }
      this.getMarketCourses()
    },
    async sizePagination() {
      const CONTRACT_NAME = 'contract.e-learning.testnet'
      // connect to NEAR
      const near = await connect(config)
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_course_size'],
        sender: wallet.account()
      })
      await contract.get_course_size()
        .then((response) => {
          this.size_pagination = response / this.limit
          this.size_pagination = Math.ceil(this.size_pagination)
          console.log(Math.ceil(this.size_pagination))
        })
    },
    async getMarketCourses() {
      this.dataCursos = []
      const CONTRACT_NAME = 'contract.e-learning.testnet'
      // connect to NEAR
      const near = await connect(config)
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_market_courses'],
        sender: wallet.account()
      })
      await contract.get_market_courses({
        from_index: this.len_pagination,
        limit: this.limit
      })
        .then((response) => {
          for (var i = 0; i < response.length; i++) {
            var item = {}
            item.id = response[i].id
            item.instructor = response[i].creator_id
            item.title = response[i].title
            item.desc = response[i].short_description
            item.price = response[i].price
            item.img = response[i].img
            if (response[i].reviews === null) {
              item.rating = 0
            }
            this.dataCursos.push(item)
          }
          this.dataCursos = this.dataCursos.sort()
        })
    },
  }
};
</script>

<style src="./Cursos.scss" lang="scss" />
