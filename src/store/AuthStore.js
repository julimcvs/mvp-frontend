import {defineStore} from "pinia";
import userServiceApi from "@/store/UserServiceApi";

export const useAuthStore = defineStore("AuthStore", {
  state: () => {
    return {
      user: null,
    }
  },
  actions: {
    async alterarSenha(data) {
      return await userServiceApi.post('auth/change-password', data);
    },
    async entrar(data) {
      return await userServiceApi.post('auth/login', data);
    },
    async registrar(data) {
      return await userServiceApi.post('auth/register', data);
    },
    async sair() {
      await localStorage.removeItem('jwt-token');
      window.location.reload();
    },
    redirecionarHome() {
      this.router.push("/")
    },
    async validarToken(token) {
      return await userServiceApi.post(`auth/validate-token`, {token});
    },
  }
});
