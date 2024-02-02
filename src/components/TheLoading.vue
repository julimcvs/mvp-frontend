<template>
  <div class="h-100 w-100">
    <v-dialog
      v-model="loading"
      persistent>
      <div class="d-flex justify-center align-center">
        <v-progress-circular
          color="primary"
          indeterminate
          size="50"
        ></v-progress-circular>
      </div>
    </v-dialog>
  </div>

</template>

<script>
export default {
  name: 'TheLoading',
  data() {
    return {
      loading: true
    }
  }
}
</script>
