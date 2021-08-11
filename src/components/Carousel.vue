<template>
  <div>
    <v-carousel
      interval="3000"
      cycle
      show-arrows-on-hover
      height="330"
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.image"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          image:
            "https://firebasestorage.googleapis.com/v0/b/carritodecompras-deb85.appspot.com/o/images-publicidad%2FD_NQ_604731-MLA47032643423_082021-OO.webp?alt=media&token=6fb73b0a-b839-48ca-accf-137150e3627e",
        },
        {
          image:
            "https://firebasestorage.googleapis.com/v0/b/carritodecompras-deb85.appspot.com/o/images-publicidad%2FD_NQ_685794-MLA46978667661_082021-OO.webp?alt=media&token=2f78d9be-4af2-47da-94cb-42bb6d7ff56b",
        },
        {
          image:
            "https://firebasestorage.googleapis.com/v0/b/carritodecompras-deb85.appspot.com/o/images-publicidad%2FD_NQ_730578-MLA46929466026_072021-OO.webp?alt=media&token=29edfb78-2c71-4303-9bc6-cc9d346d57f3",
        },
        {
          image:
            "https://firebasestorage.googleapis.com/v0/b/carritodecompras-deb85.appspot.com/o/images-publicidad%2FD_NQ_851326-MLA46996395074_082021-OO.webp?alt=media&token=7bc26987-ae40-4020-a0be-9bfd19d31e68",
        },
        {
          image:
            "https://firebasestorage.googleapis.com/v0/b/carritodecompras-deb85.appspot.com/o/images-publicidad%2FD_NQ_977686-MLA46273574544_062021-OO.webp?alt=media&token=2fdf807f-684c-432c-abd4-b6b02f95658e",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
