<template>
  <div>
    <v-app-bar app color="green" elevate-on-scroll dark>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <span
        class="font-weight-bold"
        style="font-size: 25px; font-family: Segoe UI"
        >{{ appBarTitle }}</span
      >
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
                class="mx-1 btn__hover"
                depressed
                rounded
                color="white"
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
              >
                <v-badge
                  :content="bagCounter"
                  :value="bagCounter"
                  color="error"
                  overlap
                  right
                  offset-x="1"
                >
                  <v-icon color="green">mdi-cart</v-icon>
                </v-badge>
              </v-btn>
            </template>
            <span>Notificaciones</span>
          </v-tooltip>
        </template>
        <v-card min-height="500" min-width="450" max-width="450">
          <div class="d-flex align-end">
            <span class="pl-2 pt-2 font-weight-bold" style="font-size: 25px"
              >Productos</span
            >
            <v-spacer></v-spacer>
            <v-btn
              class="mr-3"
              @click="$router.push({ name: 'Cart' })"
              color="green"
              depressed
              icon
            >
              <v-icon>mdi-cart</v-icon></v-btn
            >
          </div>
          <div v-show="bagCounter == 0">
            <h4 class="text-center">Tu carrito está vacío</h4>
            <v-img
              class="ma-auto"
              height="280"
              src="@/assets/sad-cart.png"
            ></v-img>
          </div>
          <v-list style="height: 500px;overflow-y: scroll" v-show="bagCounter !== 0" nav dense class="mx-n1">
            <v-list-item
              v-show="item.status == 'carrito' || item.cantidad !== 0"
              v-for="(item, i) in bag"
              :key="i"
              link
            >
              <v-badge class="mr-3" avatar bordered overlap>
                <template v-slot:badge>
                  <v-avatar>
                    <v-img :src="user.imagen"></v-img>
                  </v-avatar>
                </template>

                <v-avatar size="45">
                  <v-img
                    contain
                    transition="scale-transition"
                    :src="item.image"
                  ></v-img>
                </v-avatar>
              </v-badge>
              <v-list-item-content>
                <v-col cols="6">
                  <h4>{{ item.nombre }}</h4>
                  <span style="color: grey; font-size: 11px">
                    {{ item.descripcion }}
                    <v-chip color="red" class="white--text" x-small>{{
                      item.tipo
                    }}</v-chip>
                  </span>
                </v-col>
                <v-col cols="6" class="d-flex align-center justify-center">
                  <span>
                    <v-btn icon @click="disminuirProducto(item)">
                      <v-icon> mdi-minus-circle </v-icon>
                    </v-btn>
                    {{ item.cantidad }}
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
        </v-card>
      </v-menu>
      <v-menu
        rounded="xl"
        :close-on-content-click="true"
        transition="slide-y-transition"
        min-width="380"
        offset-y
        right
      >
        <template v-slot:activator="{ on: menu }">
          <v-btn class="btn__hover" icon depressed v-on="{ ...menu }">
            <v-avatar color="white" size="45">
              <v-img height="40" max-width="40" :src="user.imagen"> </v-img>
            </v-avatar>
          </v-btn>
        </template>

        <v-card class="pb-2" flat>
          <v-layout align-center class="px-3 pt-3 pb-2">
            <v-avatar size="50" color="grey" class="white--text">
              <v-img :src="user.imagen"> </v-img
            ></v-avatar>

            <v-flex class="ml-3">
              <div class="subtitle-2">{{ user.nombre }}</div>
              <div class="body-2 grey--text text--darken-1">
                {{ user.correoElectronico }}
              </div>
              <div class="body-2 grey--text text--darken-1">
                {{ user.ocupacion }}
              </div>
            </v-flex>
          </v-layout>

          <div class="caption pl-5 pt-4 pb-0">Compras</div>
          <v-list nav dense class="ml-2 mr-2 pt-0 pb-0">
            <v-list-item
              :to="{ name: item.path }"
              v-for="item in items2"
              :key="item.title"
              link
              exact
            >
              <div class="font-weight-black">{{ item.title }}</div>
            </v-list-item>
          </v-list>
          <div class="caption pl-5 pt-4 pb-0">Más opciones</div>
          <v-list nav dense class="ml-2 mr-2 pt-0 pb-0">
            <v-list-item @click="cerrarSesion" link exact>
              <div class="font-weight-black">Cerrar sesión</div>
              <v-spacer />
              <v-icon color="black">mdi-account-arrow-left-outline</v-icon>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      appBarTitle: "I-Shop!",
      items2: [
        {
          title: "Carrito",
          path: "Cart",
        },
        {
          title: "Ir a la tienda",
          path: "Store",
        },
      ],
    };
  },

  methods: {
    ...mapActions([
      "aumentarProducto",
      "disminuirProducto",
      "eliminarProducto",
      "finalizarCompra",
    ]),
    cerrarSesion() {
      this.$store.state.user = "";
      this.$router.push({ name: "Home" });
    },
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
.btn__hover:hover {
  background-color: rgba(233, 233, 233, 0.637) !important;
  color: #ffff !important;
}
</style>