import axios from "axios";
import {useAuthStore} from "@/store/AuthStore";
import {useDialogStore} from "@/store/DialogStore";

const productServiceApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BACKEND_URL}/products`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

productServiceApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if ([400, 500].includes(error.response.status)) {
      console.log(error.response.data.message);
      const errorStore = useDialogStore();
      errorStore.setAlert(error.response.data.message)
    }
    if (401 === error.response.status) {
      localStorage.removeItem('user-details');
      const auth = useAuthStore();
      await auth.sair();
    }
    if (406 === error.response.status) {
      const auth = useAuthStore();
      auth.redirecionarHome()
    }
    return Promise.reject(error)
  },
)

export default productServiceApi;
