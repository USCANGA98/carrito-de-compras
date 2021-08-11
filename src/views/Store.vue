<template>
  <div>
    <Carousel />
    <h1>Estas en la tienda</h1>
    <div style="width: 85%" class="ma-auto">
      
          <Products :data="products" />

          <!-- <v-hover v-slot:default="{ hover }" open-delay="0">
            <v-card
              :class="`elevation-${hover ? 4 : 1}`"
              class="pa-2 ma-5"
              ripple
              link
            >
              <v-img :src="item.image">
                <v-expand-transition>
                  <p v-show="hover">{{ item.descripcion }}</p>
                </v-expand-transition>
              </v-img>
            </v-card>
          </v-hover> -->
       
    </div>
  </div>
</template>
<script>
import { db } from "../services/firebase";
import Carousel from "@/components/Carousel";
import Products from "@/components/Products";
import { mapState } from "vuex";
export default {
  name: "Store",
  components: {
    Carousel,
    Products,
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      this.loading = true;
      try {
        const response = await db
          .collection("products").get();
        if (response.docs.length > 0) {
          response.docs.forEach((e) => {
            this.products.push(e.data());
            console.log(this.products);
          });
        }
      } catch (error) {
        console.warn(error);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss" scoped>
</style>
