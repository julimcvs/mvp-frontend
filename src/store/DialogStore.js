import {defineStore} from "pinia";

export const useDialogStore = defineStore("DialogStore", {
    state: () => {
        return {
            alert: false,
            message: ''
        }
    },
    actions: {
        setAlert(message) {
            this.alert = true;
            this.message = message;
        },
        closeAlert() {
            this.alert = false;
            this.message = '';
        }
    }
});
