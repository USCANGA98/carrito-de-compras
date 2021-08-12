<template>
  <div class="mt-16" style="height: 1200px">
    <v-slide-group show-arrows>
      <v-slide-item
        v-for="(item, i) in data"
        :key="i"
        class="pa-2 mb-5 mt-5"
      >
        <v-hover v-slot:default="{ hover }" open-delay="0">
          <v-scale-transition origin="top">
            <v-card
              max-width="200"
              :class="`elevation-${hover ? 8 : 1}`"
              class="ml-5 mr-5 transition-swing"
              link
            >
              <div @click="setImage(item)">
                <v-img height="240" contain :src="item.image" />
                <v-divider />
                <div class="pa-3">
                  <h4>{{ item.nombre }}</h4>
                  <span class="font-weight-bold" style="font-size: 24px">
                    {{
                      new Intl.NumberFormat("es-MX", {
                        style: "currency",
                        currency: "MXN",
                      }).format(item.precio)
                    }}
                  </span>
                  <v-rating
                    v-model="item.rating"
                    background-color="grey"
                    color="yellow accent-4"
                    dense
                    half-increments
                    hover
                    size="18"
                  ></v-rating>
                  <div style="width: 180px">
                    <span class="caption">
                      {{ item.descripcion }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-end">
                <v-tooltip color="grey darken-4" bottom>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                      @click="comprar(item)"
                      class="ma-1 btn__hover"
                      rounded
                      elevation="0"
                      color="green"
                      v-on="{ ...tooltip }"
                    >
                      <v-icon color="white">mdi-shopping-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Comprar ahora</span>
                </v-tooltip>
                <v-tooltip color="grey darken-4" bottom>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                      @click="carrito(item)"
                      class="ma-1 btn__hover"
                      rounded
                      elevation="0"
                      color="green"
                      v-on="{ ...tooltip }"
                    >
                      <v-icon color="white">mdi-cart-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Agrear al carrito</span>
                </v-tooltip>
              </div>
            </v-card>
          </v-scale-transition>
        </v-hover>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "Products",
  props: {
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    ...mapActions(["comprarProducto", "aumentarProducto"]),
    ...mapMutations(["setProduct"]),
    setImage(item) {
      this.setProduct(item);
      this.$router.push({ name: "ProductView" });
    },
    carrito(item) {
      this.aumentarProducto(item);
    },
    comprar(item) {
      this.comprarProducto(item);
      this.$router.push({ name: "Cart" });
    },
  },
  data() {
    return {
      rating: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
.btn__hover:hover {
  background-color: rgba(5, 53, 9, 0.637) !important;
  color: #ffff !important;
}
</style>