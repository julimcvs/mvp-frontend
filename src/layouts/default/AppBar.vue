<template>
  <v-app-bar flat height="100" app>
    <v-app-bar-title app>
      <v-row class="toolbar">
        <v-row class="ma-5 d-flex">
          <v-col cols="12" md="4">
            <div>
                <v-img
                  @click="$router.push({name: 'Home'})"
                  height="50px"
                  src="@/assets/icon-ecommerce.png" />
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              type="text"
              placeholder="O que você procura?"
              append-inner-icon="mdi-magnify"
              hide-details
              variant="outlined"
              @click:append="searchProduct"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <div class="d-flex justify-center align-center">
              <v-btn
                @click="router.push($router.push('/login'))"
                icon
                color="primary"
                rounded>
                <v-icon>mdi-account</v-icon>
              </v-btn>

              <v-btn icon color="secondary" rounded>
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-row>
    </v-app-bar-title>
    <template v-slot:extension>
      <v-row class="d-flex justify-center">
        <v-col cols="1">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </v-col>
        <v-col cols="7">
          <v-slide-group
            v-model="tab"
            align-with-title
            class="d-flex align-center mx-5 w-100"
          >
            <v-slide-group-item
              v-for="(tab) in tabs"
              :key="tab"
            >
              <v-menu
                open-on-hover
                class="tab-title tab"
              >
                <v-list>
                  <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                  >
                    <span>{{ tab }}</span>
                  </v-btn>
                </template>
              </v-menu>
            </v-slide-group-item>
          </v-slide-group>
        </v-col>
        <v-col cols="1">
        </v-col>
      </v-row>
    </template>
  </v-app-bar>
</template>

<script>
import router from "@/router";

export default {
  methods: {
    router() {
      return router
    }
  },
  data() {
    return {
      tab: null,
      tabs: ['Departamentos', 'Tendências', 'Ofertas', 'Projetos', 'Dicas', 'Serviços']
    }
  }
}
</script>

<style scoped>
:deep(.v-toolbar__extension) {
  justify-content: center;
}

.toolbar {
  justify-content: center;
}

.v-toolbar__content > .v-toolbar-title {
  margin-inline-start: 0px !important;
}

:deep(.v-slide-group__content) {
  justify-content: center;
}
</style>
