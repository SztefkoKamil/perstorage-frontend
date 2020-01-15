<template>
<swiper :options="swiperConfig">
  <swiperSlide v-for="img of images" :key="img.id">
    <img :src="img.path" alt="">
  </swiperSlide>
  <div class="swiper-button-prev" slot="button-prev"></div>
  <div class="swiper-button-next" slot="button-next"></div>
  <div class="swiper-pagination" slot="pagination"></div>
</swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: { swiper, swiperSlide},
  props: ['imageIndex'],
  data() { return {
      images: this.$store.state.userFiles.filter(file => file.type === 'image'),
      swiperConfig: {
        direction: 'horizontal',
        loop: true,
        initialSlide: this.imageIndex,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        }
      }
  }}
}
</script>

<style lang="scss">
@import "../../scss/flexMixins.scss";

.swiper-container {
  width: 100%;
  height: 100%;

  .swiper-slide {
    @include flexRow;
  }

  img {
    max-width: 100%;
    max-height: 100%
  }

  .swiper-pagination {
    background: gray;
    width: 100px;
    border-radius: 5px;
    left: 50%;
    transform: translateX(-50%);
  }

}

</style>