<template>
  <v-dialog height="80vh"
            :width="isMobile ? '100%' : '50%'"
            v-model="alert">
    <v-card>
      <v-card-title>
        <span class="mdi mdi-information"></span>
        Atenção!
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            class="text-capitalize btn"
            color="primary"
            variant="tonal"
            @click="closeAlert">
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {useDialogStore} from "@/store/DialogStore";

export default {
  name: 'AlertError',
  computed: {
    ...mapState(useDialogStore, ['alert', 'message']),
    isMobile() {
      return this.$vuetify.display.smAndDown
    }
  },
  methods: {
    ...mapActions(useDialogStore, ['closeAlert'])
  }
}
</script>
