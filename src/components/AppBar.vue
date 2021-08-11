<template>
  <div>
    <v-app-bar
      height="100"
      app
      color="green"
      shrink-on-scroll
      elevate-on-scroll
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <v-menu
        rounded="xl"
        :close-on-content-click="false"
        transition="slide-y-transition"
        min-width="380"
        offset-y
        right
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip color="grey darken-3" bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                class="mx-1"
                color="grey"
                icon
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
              >
                <v-badge
                  :content="bagCounter"
                  :value="bagCounter"
                  color="error"
                  overlap
                  right
                  offset-x
                >
                  <v-icon color="white">mdi-cart</v-icon>
                </v-badge>
              </v-btn>
            </template>
            <span>Notificaciones</span>
          </v-tooltip>
        </template>
        <v-card min-height="500" min-width="450" max-width="450">
          <h2 class="pl-2 pt-2 mb-5">Notificaciones</h2>
          <v-list nav dense class="mx-n1">
            <v-list-item v-for="(item, i) in bag" :key="i" link>
              <v-badge class="mr-6" avatar bordered overlap>
                <template v-slot:badge>
                  <v-avatar v-if="item.nombre == item.nombre">
                    <v-img :src="user.image"></v-img>
                  </v-avatar>
                </template>

                <v-avatar size="45">
                  <v-img :src="item.image"></v-img>
                </v-avatar>
              </v-badge>
              <v-list-item-content>
                <h3 class="pb-1">{{ item.nombre }}</h3>
                <span class="caption mx-2" style="color: grey">
                  {{ item.descripcion }} <br />
                  <v-chip color="red" class="white--text" x-small>{{
                    item.tipo
                  }}</v-chip>
                  <v-chip color="blue" class="white--text" x-small>{{
                    item.cantidad
                  }}</v-chip>
                </span>
                <v-col class="d-flex align-center justify-center">
                  <span>
                    <v-btn icon @click="disminuirProducto(item)">
                      <v-icon> mdi-minus-circle </v-icon>
                    </v-btn>
                    {{ item.quantity }}
                    <v-btn icon @click="aumentarProducto(item)">
                      <v-icon> mdi-plus-circle </v-icon>
                    </v-btn>
                  </span>
                  <v-btn icon color="red" @click="eliminarProducto(item)">
                    <v-icon>mdi-cart-remove</v-icon>
                  </v-btn>
                </v-col>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-card-text v-show="bag.length == 0" class="caption text-center"
            >No hay notificaciones.</v-card-text
          >
        </v-card>
      </v-menu>
      <v-menu
        rounded="xl"
        :close-on-content-click="false"
        transition="slide-y-transition"
        min-width="380"
        offset-y
        right
      >
        <template v-slot:activator="{ on: menu }">
          <v-btn icon depressed v-on="{ ...menu }">
            <v-avatar color="white" size="45">
              <v-img height="40" max-width="40" :src="user.image"> </v-img>
            </v-avatar>
          </v-btn>
        </template>

        <v-card class="pb-2" flat>
          <v-layout align-center class="px-3 pt-3 pb-2">
            <v-avatar size="50" color="grey" class="white--text">
              <v-img :src="user.image"> </v-img
            ></v-avatar>

            <v-flex class="ml-3">
              <div class="subtitle-2">{{ user.nombre }}</div>
              <div class="body-2 grey--text text--darken-1">
                {{ user.ocupacion }}
              </div>
            </v-flex>
          </v-layout>

          <div class="caption pl-5 pt-4 pb-0">Cuentas</div>
          <v-list dense class="ml-2 mr-2 pt-0 pb-0">
            <v-list-item v-for="item in items2" :key="item.title" link exact>
              <div class="font-weight-black">{{ item.title }}</div>
            </v-list-item>
          </v-list>
          <div class="caption pl-5 pt-4 pb-0">Más opciones</div>
          <v-list dense class="ml-2 mr-2 pt-0 pb-0">
            <v-list-item v-for="item in items3" :key="item.title" link exact>
              <div class="font-weight-black">{{ item.title }}</div>
              <v-spacer />
              <v-icon color="black">{{ item.icon }}</v-icon>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <v-btn
        v-show="$route.name == 'CreateAccount'"
        outlined
        :to="{ name: 'Home' }"
        class="text-capitalize font-weight-bold white--text"
      >
        Cancelar
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      items2: [
        {
          title: "Agregar cuenta",
        },
        {
          title: "Convertir en cuenta para empresa",
        },
      ],
      items3: [
        {
          title: "Configuración",
        },
        {
          title: "Mejora tu feed de inicio",
        },
        {
          title: "Instalar la aplicación de Windows",
        },
        {
          title: "Obtener ayuda",
          icon: "mdi-arrow-top-right",
        },
        {
          title: "Ver condiciones y privacidad",
          icon: "mdi-arrow-top-right",
        },
        {
          title: "Salir",
        },
      ],
    };
  },
  methods: {
      ...mapActions([
        'aumentarProducto',
        'disminuirProducto',
        'eliminarProducto',
      ]),
  },
  computed: {
    ...mapState(["productSelected", "bag", "bagCounter", "user"]),
  },
};
</script>

<style lang="scss" scoped>
.shake {
  animation: shake 2s ease infinite;
}
@keyframes shake {
  5% {
    transform: rotate(10deg);
  }
  10% {
    transform: rotate(-10deg);
  }
  15% {
    transform: rotate(10deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  30% {
    transform: rotate(0deg);
  }
}
</style>