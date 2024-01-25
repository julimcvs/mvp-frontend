import {defineStore} from "pinia";
import purchaseServiceApi from "@/store/PurchaseServiceApi";

export const usePurchaseStore = defineStore("PurchaseStore", {
  state: () => {
    return {}
  },
  actions: {
    async checkoutQuotation(data) {
      return await purchaseServiceApi.post('/checkout', data);
    }
  }
});
