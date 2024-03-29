<template>
  <v-app-bar app flat height="100">
    <v-app-bar-title app>
      <v-row class="toolbar">
        <v-row class="ma-5 d-flex">
          <v-col cols="12" md="4">
            <div>
              <v-img
                height="50px"
                src="@/assets/icon-ecommerce.png"
                @click="$router.push({name: 'Home'})"/>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              :items="products"
              append-inner-icon="mdi-magnify"
              hide-details
              item-title="description"
              item-value="description"
              placeholder="O que você procura?"
              type="text"
              variant="outlined"
              @update:search="findProducts"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item
                  :prepend-avatar="`data:image/png;base64,${item.raw.image}`"
                  :subtitle="item.raw.price"
                  :title="item.raw.description"
                  v-bind="props"
                >
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <div class="d-flex justify-center align-center">
              <v-btn
                color="primary"
                icon
                rounded
                @click="router.push($router.push('/login'))">
                <v-icon>mdi-account</v-icon>
              </v-btn>

              <v-btn color="secondary" icon
                     rounded
                     @click="this.$router.push({name: 'Quotation'})">
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-row>
    </v-app-bar-title>
    <template v-slot:extension>
      <v-row class="d-flex justify-center">
        <v-col cols="1">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </v-col>
        <v-col cols="7">
          <v-slide-group
            v-model="tab"
            align-with-title
            class="d-flex align-center mx-5 w-100"
          >
            <v-slide-group-item
              v-for="(tab) in tabs"
              :key="tab"
            >
              <v-menu
                class="tab-title tab"
                open-on-hover
              >
                <v-list>
                  <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                  >
                    <span>{{ tab }}</span>
                  </v-btn>
                </template>
              </v-menu>
            </v-slide-group-item>
          </v-slide-group>
        </v-col>
        <v-col cols="1">
        </v-col>
      </v-row>
    </template>
  </v-app-bar>
</template>

<script>
import router from "@/router";
import {mapActions} from "pinia";
import {useProductStore} from "@/store/ProductStore";

export default {
  methods: {
    ...mapActions(useProductStore, ['findProductsPaginate', 'findProductById']),

    async findProducts(options = {
      page: this.page,
      rowsPerPage: 5,
      sortDirection: 'ASC',
      sortField: 'price'
    }) {
      this.productsLoading = true;
      try {
        const res = await this.findProductsPaginate({}, options);
        this.products = res.data.content;
      } catch (e) {
        console.log(e);
        this.setAlert('Não foi possível buscar produtos.');
      } finally {
        this.productsLoading = false;
      }
    },

    router() {
      return router
    }
  },
  data() {
    return {
      tab: null,
      page: 1,
      products: [],
      tabs: ['Departamentos', 'Tendências', 'Ofertas', 'Projetos', 'Dicas', 'Serviços']
    }
  }
}
</script>

<style scoped>
:deep(.v-toolbar__extension) {
  justify-content: center;
}

.toolbar {
  justify-content: center;
}

.v-toolbar__content > .v-toolbar-title {
  margin-inline-start: 0px !important;
}

:deep(.v-slide-group__content) {
  justify-content: center;
}
</style>
