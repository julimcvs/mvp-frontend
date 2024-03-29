<template>
  <v-container class="fill-height">
    <v-responsive class="align-start text-center fill-height">
      <div class="d-flex align-start justify-center">
        <v-card
          class="pa-5"
          variant="flat">
          <div>
            <v-card>
              <v-card-text>
                <v-row>
                  <TheLoading v-if="productsLoading"></TheLoading>
                  <v-col
                    v-for="product in products"
                    v-else
                    :key="product.id"
                    cols="12"
                    md="3"
                    sm="6"
                  >
                    <v-card
                      class="text-left pa-2"
                      style="width: 200px; height: 200px"
                      variant="flat"
                      @click="openProductDialog(product.id)">
                      <div class="d-flex justify-center">
                        <v-img
                          :src="`data:image/png;base64,${product.image}`"
                          height="150"
                          width="200">
                        </v-img>
                      </div>
                    </v-card>
                    <v-card-actions>
                      <div class="text-left">
                        <h6>{{ product.description }}</h6>
                        <p>{{ product.price }}</p>
                      </div>
                    </v-card-actions>
                  </v-col>
                </v-row>
                <v-row>
                </v-row>
                <v-pagination
                  v-model="page"
                  :length="totalAmount"
                  rounded
                  @update:model-value="findProducts()"></v-pagination>
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
            <v-row class="d-inline-flex justify-center align-center">
              <v-col cols="12"
                     md="3">
                <v-text-field
                  v-model="quotationForm.product.quantity"
                  :disabled="selectedProduct.type === 'SERVICE' || selectedProduct.type === 'COMBO'"
                  label="Quantidade"
                  type="number"
                  variant="underlined">
                </v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="9">
                <v-btn :loading="itemAddLoading"
                       append-icon="mdi-cart"
                       color="secondary"
                       variant="outlined"
                       @click="addItemToChart">Adicionar ao carrinho
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </div>

    </v-responsive>
  </v-container>
</template>

<script>
import {mapActions} from "pinia";
import {useProductStore} from "@/store/ProductStore";
import {useQuotationStore} from "@/store/QuotationStore";
import {useDialogStore} from "@/store/DialogStore";
import TheLoading from "@/components/TheLoading.vue";

export default {
  components: {TheLoading},
  computed: {},

  data() {
    return {
      products: [],
      totalAmount: 1,
      page: 1,
      selectedProduct: {},
      dialogProduct: false,
      itemAddLoading: false,
      productsLoading: false,
      quotationForm: {
        product: {
          quantity: 1,
          id: null,
        },
        id: null,
      }
    }
  },
  methods: {
    ...mapActions(useProductStore, ['findProductsPaginate', 'findProductById']),
    ...mapActions(useQuotationStore, ['addItemQuotation']),
    ...mapActions(useDialogStore, ['setAlert']),

    async addItemToChart() {
      this.itemAddLoading = true;
      try {
        const res = await this.addItemQuotation(this.quotationForm);
        sessionStorage.setItem('quotationId', res.data.id);
        this.setAlert('Produto adicionado ao carrinho!')
      } catch (e) {
        console.log(e);
        this.setAlert('Erro ao adicionar item ao carrinho.');
      } finally {
        this.itemAddLoading = false;
        this.dialogProduct = false;
      }

    },

    async findProducts(options = {
      page: this.page,
      rowsPerPage: 100,
      sortDirection: 'ASC',
      sortField: 'price'
    }) {
      this.productsLoading = true;
      try {
        const res = await this.findProductsPaginate({}, options);
        this.totalAmount = Math.ceil(res.data.totalElements / options.rowsPerPage)
        this.products = res.data.content;
      } catch (e) {
        console.log(e);
        this.setAlert('Não foi possível buscar produtos.');
      } finally {
        this.productsLoading = false;
      }
    },

    async openProductDialog(id) {
      const res = await this.findProductById(id);
      this.selectedProduct = res.data;
      this.dialogProduct = true;
      this.quotationForm.id = sessionStorage.getItem('quotationId');
      this.quotationForm.product.id = res.data.id;
      this.quotationForm.product.quantity = '1';
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
