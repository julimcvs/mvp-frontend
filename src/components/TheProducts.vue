<template>
  <v-container class="fill-height">
    <v-responsive class="align-start text-center fill-height">
      <div class="d-flex align-start justify-space-between">
        <v-card
          class="pa-5"
          variant="flat">
          <div>
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col v-for="product in products"
                         cols="12"
                         md="3"
                  >
                    <v-card
                      class="text-left"
                      style="width: 200px"
                      variant="flat"
                      @click="openProductDialog(product.id)">
                      <div>
                        <v-img
                          :src="`data:image/png;base64,${product.image}`">
                        </v-img>
                      </div>
                      <h5>{{ product.description }}</h5>
                      <p>{{ product.price }}</p>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </div>
        </v-card>
        <v-dialog
          v-model="dialogProduct"
          scrollable
          width="400">
          <v-card class="pa-5">

            <div class="d-flex justify-start mb-5">
              <div style="width: 200px">
                <v-img
                  :src="`data:image/png;base64,${selectedProduct.image}`">
                </v-img>
              </div>
              <div class="pa-5">
                <h5>{{ selectedProduct.description }}</h5>
                <p>{{ selectedProduct.price }}</p>
              </div>
            </div>
            <v-btn append-icon="mdi-cart"
                   color="secondary"
                   @click="addItemToChart(selectedProduct.id)"
                   variant="outlined">Adicionar ao carrinho</v-btn>
          </v-card>
        </v-dialog>
      </div>

    </v-responsive>
  </v-container>
</template>

<script>
import {mapActions} from "pinia";
import {useProductStore} from "@/store/ProductStore";

export default {
  computed: {},

  data() {
    return {
      products: [],
      selectedProduct: {},
      dialogProduct: false,
    }
  },
  methods: {
    ...mapActions(useProductStore, ['findProductsPaginate', 'findProductById']),

    async addItemToChart(id) {

    },

    async findProducts(options = {
      page: 1,
      rowsPerPage: 5,
      sortDirection: 'ASC',
      sortField: 'price'
    }) {
      const res = await this.findProductsPaginate({}, options);
      this.products = res.data.content;
    },

    async openProductDialog(id) {
      const res = await this.findProductById(id);
      this.selectedProduct = res.data;
      this.dialogProduct = true;
    }
  },
  created() {
    this.findProducts();
  }
}
</script>
<style>
.v-img__img--contain {
  border-radius: 8px;
}
</style>
