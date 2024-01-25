import {defineStore} from "pinia";
import quotationServiceApi from "@/store/QuotationServiceApi";

export const useQuotationStore = defineStore("QuotationStore", {
  state: () => {
    return {}
  },
  actions: {
    async addItemQuotation(data) {
      return await quotationServiceApi.post('/add', data);
    },
    async findQuotationById(id) {
      return await quotationServiceApi.get(`/${id}`);
    },
  }
});
