<template>
  <router-view />
  <alert-error />
</template>

<script>
import '@/assets/app.css';
import AlertError from "@/components/AlertError.vue";
export default {
  components: {AlertError},

}
</script>
