<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-sheet class="bg-deep-purple pa-12" rounded>

        <v-card v-if="quotation" class="mx-auto px-6 py-8">
          <h5 class="text-left">Carrinho
            <v-icon color="secondary">mdi-cart</v-icon>
          </h5>
          <v-card class="mt-2">
            <v-card-text>
              <v-row>
                <v-col v-for="product in products"
                       :key="product.id"
                       cols="12"
                >
                  <v-card
                    class="text-left px-5"
                    style="width: 100%"
                    variant="flat">
                    <div class="d-inline-flex align-start">
                      <div class="justify-start" style="width: 200px">
                        <v-img
                          :src="`data:image/png;base64,${product.image}`">
                        </v-img>
                      </div>
                      <div class="ml-5">
                        <h6>{{ product.description }}</h6>
                        <p>Quantidade: {{ product.quantity }}</p>
                      </div>
                      <div class="ml-5 text-right">
                        <h6>{{ product.price }}</h6>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
              <div class="text-right">
                <p>Subtotal ({{ products.length }} {{ products.length > 1 ? 'produtos' : 'produto' }}):
                  {{ quotation.totalAmount }}</p>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="secondary"
                     :loading="checkoutLoading"
                     variant="outlined"
                     @click="checkout">Fechar pedido</v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
        <v-card v-else class="mx-auto px-6 py-8">
          <h5 class="text-left">Você ainda não adicionou nenhum item no carrinho!
            <v-icon color="secondary">mdi-cart</v-icon>
          </h5>
        </v-card>
      </v-sheet>
    </v-responsive>
  </v-container>
</template>

<script>
import {mapActions} from "pinia";
import {useProductStore} from "@/store/ProductStore";
import {useQuotationStore} from "@/store/QuotationStore";
import {useDialogStore} from "@/store/DialogStore";
import {usePurchaseStore} from "@/store/PurchaseStore";

export default {
  data() {
    return {
      checkoutLoading: false,
      products: [],
      quotationId: null,
      quotation: null
    }
  },

  methods: {
    ...mapActions(useProductStore, ['findProductsByQuotationId']),
    ...mapActions(useQuotationStore, ['findQuotationById']),
    ...mapActions(useDialogStore, ['setAlert']),
    ...mapActions(usePurchaseStore, ['checkoutQuotation']),

    async checkout() {
      this.checkoutLoading = true;
      try {
        if (localStorage.getItem('jwt-token')) {
          await this.checkoutQuotation({quotationId: this.quotationId});
          sessionStorage.removeItem('quotationId');
          this.$router.push({name: 'Home'});
          this.setAlert('Pedido concluído com sucesso!')
        } else {
          this.setAlert('Para concluir um pedido, você deve fazer login.');
          this.$router.push('/login?isQuotation=true');
        }
      } catch (e) {
        console.log(e);
        this.setAlert('Erro ao concluir pedido.');
      } finally {
        this.checkoutLoading = false;
      }

    },

    async findById() {
      const res = await this.findQuotationById(this.quotationId);
      this.quotation = res.data;
    },

    async findProductsByQuotation() {
      if (this.quotationId) {
        const res = await this.findProductsByQuotationId(this.quotationId);
        this.products = res.data;
      }
    }
  },

  created() {
    this.quotationId = sessionStorage.getItem('quotationId');
    if (this.quotationId) {
      this.findById();
      this.findProductsByQuotation();
    }
  }
}
</script>

<style scoped>
</style>
