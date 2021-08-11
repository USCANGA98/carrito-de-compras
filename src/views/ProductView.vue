<template>
  <div style="width: 1000px; margin: auto">
    <v-card
      rounded="xl"
      elevation="10"
      :min-height="productSelected.image"
      class="pa-1 mt-10 mb-16"
    >
      <v-row>
        <v-col cols="6">
          <v-card rounded="xl" flat ripple="">
            <v-img
              height="500"
              contain
              style="
                border-top-left-radius: 30px;
                border-bottom-left-radius: 30px;
              "
              class="image"
              :src="productSelected.image"
            >
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-container>
            <span style="font-size: 14px" class="grey--text"
              >{{ productSelected.tiempoDeVida }} |
              {{ productSelected.cantidadVendida }} vendidos</span
            >
            <h1>
              {{ productSelected.nombre }}
            </h1>
            <h2>
              {{ productSelected.descripcion }}
            </h2>
            <v-rating
              v-model="productSelected.rating"
              background-color="grey"
              color="yellow accent-4"
              dense
              half-increments
              size="18"
            ></v-rating>
            <h1 style="font-size: 40px" class="font-weight-light mb-16">
              $ {{ productSelected.precio }}
            </h1>
            <v-col cols="8">
              <v-btn
                x-large
                depressed
                class="mb-2 text-capitalize white--text"
                color="blue"
                block
              >
                Comprar Ahora
              </v-btn>
              <v-btn
                @click="carrito(productSelected)"
                x-large
                outlined
                class="text-capitalize blue--text"
                block
              >
                Agregar al carrito
              </v-btn>
            </v-col>
          </v-container>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "ProductView",
  data() {
    return {};
  },
  computed: {
    ...mapState(["productSelected"]),
  },
  methods: {
    ...mapMutations(["setToShoppingCar"]),
    carrito(productSelected) {
      this.setToShoppingCar(productSelected);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>