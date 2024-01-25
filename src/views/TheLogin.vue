<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-sheet class="bg-deep-purple pa-12" rounded>
        <v-card class="mx-auto px-6 py-8" max-width="344">
          <v-form
            @submit.prevent="login">
            <v-text-field
              v-model="form.email"
              :readonly="loading"
              :rules="[required]"
              class="mb-2"
              clearable
              label="Email"
              placeholder="Digite seu email:"
              variant="outlined"
            >
            </v-text-field>
            <v-text-field
              :append-icon="passwordIcon"
              v-model="form.password"
              :readonly="loading"
              :rules="[required]"
              class="mb-2"
              label="Senha"
              :type="passwordInputType"
              placeholder="Digite sua senha:"
              variant="outlined"
              @click:append="togglePassword"
            >
            </v-text-field>
            <v-btn
              :loading="loading"
              block
              class="mb-5"
              color="primary"
              size="large"
              type="submit"
              variant="elevated">
              Entrar
            </v-btn>
            <v-btn
              block
              class="mb-5"
              color="secondary"
              size="large"
              type="submit"
              @click="this.$router.push({name: 'Register'})"
              variant="elevated">
              Cadastre-se
            </v-btn>
          </v-form>
        </v-card>
      </v-sheet>
    </v-responsive>
  </v-container>
</template>

<script>
import {mapActions} from "pinia";
import {useDialogStore} from "@/store/DialogStore";
import {useAuthStore} from "@/store/AuthStore";

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false,
      passwordVisible: false,
      passwordIcon: 'mdi-eye-off-outline',
      passwordInputType: 'password',
    }
  },

  methods: {
    ...mapActions(useDialogStore, ['setAlert']),
    ...mapActions(useAuthStore, ['entrar']),

    async login() {
      try {
        if (Object.values(this.form).every(v => v !== '')) {
          this.loading = true;
          const res = await this.entrar(this.form);
          await localStorage.setItem('jwt-token', JSON.stringify(res.data));
          this.$router.push({name: 'Home'})
        }
      } catch (e) {
        this.setAlert('Usuário ou senha incorretos.')
      } finally {
        this.loading = false
      }
    },
    required(v) {
      return !!v || 'Campo obrigatório'
    },
    togglePassword() {
      this.passwordVisible = !this.passwordVisible;
      this.passwordIcon = this.passwordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline';
      this.passwordInputType = this.passwordVisible ? 'text' : 'password';
    }
  }
}
</script>

<style scoped>
</style>
