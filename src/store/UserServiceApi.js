import axios from "axios";
import {useDialogStore} from "@/store/DialogStore";
import {useAuthStore} from "@/store/AuthStore";

    const userServiceApi = axios.create({
        baseURL: `${import.meta.env.VITE_API_BACKEND_URL}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
      withCredentials: true
    });

    userServiceApi.interceptors.response.use(
        (response) => response,
        (error) => {
            if ([400, 500].includes(error.response.status)) {
                console.log(error.response.data.message);
                const errorStore = useDialogStore();
                errorStore.setAlert(error.response.data.message)
            }
            if (401 === error.response.status) {
                localStorage.removeItem('user-details');
                const auth = useAuthStore();
                auth.sair();
            }
            if (406 === error.response.status) {
                const auth = useAuthStore();
                auth.redirecionarHome()
            }
            return Promise.reject(error)
        },
    )

export default userServiceApi;
