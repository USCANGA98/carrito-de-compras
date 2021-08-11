<template>
  <div>
    <v-slide-group :show-arrows="false">
      <v-slide-item v-for="(item, i) in data" :key="i" class="pt-1 pb-1">
        <v-hover v-slot:default="{ hover }" open-delay="0">
          <v-scale-transition origin="top">
            <v-card
              @click="setImage(item)"
              height="370"
              :class="`elevation-${hover ? 8 : 1}`"
              class="pa-2 ml-2 mr-2 mb-16 transition-swing"
              ripple
              link
            >
              <v-img height="240" contain :src="item.image" />
              <v-divider />
              <div style="height: 10px">
                <span class="font-weight-regular" style="font-size: 24px"
                  >${{ item.precio }}</span
                >
                <br />
                <v-rating
                  v-model="item.rating"
                  background-color="grey"
                  color="yellow accent-4"
                  dense
                  half-increments
                  hover
                  size="18"
                ></v-rating>
                <span>{{ item.nombre }}</span>

                <p class="caption" style="width: 200px">
                  {{ item.descripcion }}
                </p>
              </div>
            </v-card>
          </v-scale-transition>
        </v-hover>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
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
    ...mapMutations(["setProduct"]),
    setImage(item) {
      this.setProduct(item);
      this.$router.push({ name: "ProductView" });
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
</style>