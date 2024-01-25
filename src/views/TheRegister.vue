<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-sheet class="bg-deep-purple pa-12" rounded>

        <v-card class="mx-auto px-6 py-8">
          <h5 class="text-left">Cadastro</h5>

          <v-form class="pt-5"
                  @submit.prevent="register">
            <v-row>
              <v-col cols="12" md="9">
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
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="form.cpf"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-2"
                  clearable
                  label="CPF"
                  maxLength="11"
                  placeholder="Digite seu CPF:"
                  variant="outlined"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="9">
                <v-text-field
                  v-model="form.name"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-2"
                  clearable
                  label="Nome"
                  placeholder="Digite seu nome completo:"
                  variant="outlined"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="form.age"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-2"
                  clearable
                  type="number"
                  label="Idade"
                  placeholder="Digite sua idade:"
                  variant="outlined"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
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
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  :append-icon="passwordIcon"
                  v-model="form.confirmPassword"
                  :readonly="loading"
                  :rules="[required, passwordConfirmation]"
                  class="mb-2"
                  label="Confirme sua senha"
                  :type="passwordInputType"
                  placeholder="Confirme sua senha:"
                  variant="outlined"
                  @click:append="togglePassword"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="9">
                <v-text-field
                  v-model="form.address.street"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-2 mx-2"
                  clearable
                  label="Rua"
                  placeholder="Rua"
                  variant="outlined"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="form.address.number"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-2 mx-2"
                  clearable
                  label="Número"
                  placeholder="Número"
                  variant="outlined"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.address.zipCode"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-2 mx-2"
                  clearable
                  :maxLength="8"
                  label="CEP"
                  placeholder="CEP"
                  variant="outlined"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.address.neighborhood"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-2 mx-2"
                  clearable
                  label="Bairro"
                  placeholder="Bairro"
                  variant="outlined"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="9">
                <v-text-field
                  v-model="form.address.city"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-2 mx-2"
                  clearable
                  label="Cidade"
                  placeholder="Cidade"
                  variant="outlined"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-autocomplete
                  v-model="form.address.state"
                  :items="estados"
                  :readonly="loading"
                  :rules="[required]"
                  clearable
                  label="Estado"
                  variant="outlined">
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn
                :loading="loading"
                block
                class="mb-5"
                color="secondary"
                size="large"
                type="submit"
                variant="elevated">
                Salvar
              </v-btn>
            </v-card-actions>
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
import {StateEnum} from "@/shared/StateEnum";

export default {
  data() {
    return {
      form: {
        email: '',
        name: '',
        cpf: '',
        age: '',
        password: '',
        confirmPassword: '',
        address: {
          street: '',
          zipCode: '',
          state: '',
          number: '',

        }
      },
      loading: false,
      passwordVisible: false,
      passwordIcon: 'mdi-eye-off-outline',
      passwordInputType: 'password',
      estados: StateEnum.getLista
    }
  },

  methods: {
    ...mapActions(useDialogStore, ['setAlert']),
    ...mapActions(useAuthStore, ['registrar']),

    async register() {
      try {
          this.loading = true;
          const res = await this.registrar(this.form);
          await localStorage.setItem('jwt-token', JSON.stringify(res.data));
          this.$router.push({name: 'Home'})
      } catch (e) {
        this.setAlert('Erro ao cadastrar usuário.')
      } finally {
        this.loading = false
      }
    },
    required(v) {
      return !!v || 'Campo obrigatório'
    },
    passwordConfirmation() {
      return this.form.password === this.form.confirmPassword || 'Senha e confirmação de senha devem ser iguais.'
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
