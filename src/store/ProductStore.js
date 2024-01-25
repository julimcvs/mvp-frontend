import {defineStore} from "pinia";
import productServiceApi from "@/store/ProductServiceApi";

export const useProductStore = defineStore("ProductStore", {
  state: () => {
    return {}
  },
  actions: {
    async findProductsPaginate(data, paginacao) {
      return await productServiceApi.post('', data, {
        params: {
          page: paginacao.page,
          rowsPerPage: paginacao.rowsPerPage,
          sortDirection: paginacao.sortDirection,
          sortField: paginacao.sortField
        }
      });
    },

    async findProductById(id) {
      return await productServiceApi.get(`/${id}`);
    },

    async findProductsByQuotationId(id) {
      return await productServiceApi.get(`/quotation/${id}`);
    }
  }
});
