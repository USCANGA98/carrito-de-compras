<template>
  <div>
    <v-container>
      <div class="d-flex justify-space-between">
        <h1 class="mb-10">Productos en el carrito</h1>
        <v-btn
          @click="$router.push({ name: 'Store' })"
          color="primary"
          depressed
        >
          <v-icon left>mdi-format-list-text</v-icon>
          Seguir comprando</v-btn
        >
      </div>
    </v-container>
    <v-row v-if="bagCounter > 0">
      <v-col cols="6">
        <div>
          <v-container>
            <v-card
              ripple=""
              elevation="1"
              max-height="140"
              class="mb-5 ml-5 mr-5"
              v-for="(item, i) in bag"
              :key="i"
            >
              <v-row>
                <v-col cols="3" class="d-flex align-center justify-center">
                  <v-avatar color="white" size="60">
                    <v-img contain :src="item.image"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="6">
                  <h3 class="ma-0 font-weight-bold">{{ item.nombre }}</h3>
                  <v-chip link x-small color="red" class="white--text">{{
                    item.tipo
                  }}</v-chip>
                  <p class="ma-0">
                    <small>{{ item.descripcion }}</small>
                  </p>
                  <p class="ma-0 subtitle-2">
                    Precio:
                    {{
                      new Intl.NumberFormat("es-MX", {
                        style: "currency",
                        currency: "MXN",
                      }).format(item.precio)
                    }}
                  </p>
                </v-col>
                <v-col class="d-flex align-center justify-center">
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
              </v-row>
            </v-card>
          </v-container>
        </div>
      </v-col>
      <v-col cols="6">
        <div
          style="
            background-color: #f5f5f5;
            border: 1px solid #eee;
            width: 500px;
            margin: auto;
          "
        >
          <v-card class="pl-10 pr-10" flat color="rgba(0,0,0,0)">
            <div
              style="
                height: 50vh;
                width: 300px;
                margin: auto;
                padding-top: 40px;
              "
            >
              <span class="font-weight-medium">Resumen de compra</span>
              <v-divider class="mt-2 mb-4"></v-divider>
              <div class="d-flex justify-space-between mb-4">
                <span class="font-weight-light">Productos</span>
                &nbsp;
                <span class="font-weight-light">({{ bagCounter }})</span>
                <span class="font-weight-regular ml-auto">
                  {{
                    new Intl.NumberFormat("es-MX", {
                      style: "currency",
                      currency: "MXN",
                    }).format(total)
                  }}
                </span>
              </div>
              <div class="d-flex justify-space-between">
                <span class="font-weight-light">Envío</span>
                &nbsp;
                <span class="font-weight-regular green--text">Gratis</span>
              </div>
              <v-divider class="mt-2 mb-4"></v-divider>
              <div class="d-flex justify-space-between mb-4">
                <span class="font-weight-light">Total</span>
                <span class="font-weight-regular ml-auto">
                  {{
                    new Intl.NumberFormat("es-MX", {
                      style: "currency",
                      currency: "MXN",
                    }).format(total)
                  }}
                </span>
              </div>
            </div>
            <div class="text-right mb-2">
              <v-btn
                @click="showPay = true"
                class="text-none"
                depressed
                color="primary"
                :loading="loading"
                >Finalizar compra</v-btn
              >
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <div class="justify-center" v-if="bagCounter === 0">
      <p class="text-center font-weight-bold">Tu carrito está vacío</p>
      <figure class="d-flex justify-center">
        <v-img contain max-width="40%" src="../assets/sad-cart.png"> </v-img>
      </figure>
    </div>
    <Pay :total="total" @cancel="showPay = false" :showPay="showPay" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Pay from "@/components/Pay";
export default {
  name: "Cart",
  data() {
    return {
      loading: false,
      showPay: false,
    };
  },
  components: {
    Pay,
  },

  methods: {
    ...mapActions([
      "aumentarProducto",
      "disminuirProducto",
      "eliminarProducto",
      "finalizarCompra",
    ]),
  },
  computed: {
    ...mapState(["bag", "bagCounter"]),
    total() {
      let total = 0;
      for (const property in this.bag) {
        let subtotal = this.bag[property].cantidad * this.bag[property].precio;
        total += subtotal;
      }
      return total;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>