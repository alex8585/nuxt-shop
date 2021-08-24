<template>
  <div>
    <v-container class="">
      <h1 class="text-center">Shop</h1>
      <v-row align="center" no-gutters>
        <v-col
          v-for="item in products"
          :key="item.id"
          style="flex-grow: 0; padding-right:10px"
        >
          <v-card class="pa-2 mb-7" outlined tile style="width: 350px">
            <v-img
              :src="item.base_image.path"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="280px"
            >
            </v-img>
            <v-card-text>{{ item.name }}</v-card-text>
            <v-card-title>{{ item.price.formatted }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <div class="text-center">
      <v-pagination v-model="currentPage" :length="pages"></v-pagination>
    </div>
  </div>
</template>

<script>
const perPage = 6

export default {
  head() {
    return {
      title: "Shop page",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "You can buy products here",
        },
      ],
    }
  },
  data: () => ({}),
  computed: {
    pages() {
      return this.$store.state.products.pages
    },
    currentPage: {
      get: function() {
        return this.$store.state.products.currentPage
      },

      set: function(newPage) {
        this.$store.commit("products/setPage", newPage)
        this.$fetch()
      },
    },

    products() {
      return this.$store.state.products.products
    },
  },
  methods: {
    arrayToQueryString(params) {
      return Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&")
    },
  },

  async fetch() {
    const url = this.$config.API_URL
    let context = this.$nuxt.context

    let queryObj = { perPage }

    if (process.server) {
      queryObj.page = 1
    } else {
      queryObj.page = this.currentPage
    }

    let queryString = this.arrayToQueryString(queryObj)
    let responce = await this.$http.$get(`${url}/products/?${queryString}`)
    this.$store.commit("products/setProducts", responce.products)
  },
}
</script>
<style scoped>
.row.no-gutters.align-center {
  justify-content: center;
}
</style>
