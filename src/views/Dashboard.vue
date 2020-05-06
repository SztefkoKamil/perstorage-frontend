<template>
  <div class="dashboard">
    <List></List>
    <Panel></Panel>
    <div v-if="gallery" class="gallery-container" @keydown.esc="hideGallery">
      <button @click="hideGallery" ref="galleryCloseBtn" class="close-gallery-btn fas fa-times-circle"></button>
      <Gallery :imageIndex="clickedImage"></Gallery>
    </div>
    <div v-if="confirm" class="confirm-container" @click.self="hideConf">
      <Confirm :data="data"></Confirm>
    </div>
  </div>
</template>

<script>
import eventBus from '../eventBus';
import Panel from '../components/Dashboard/Panel';
import List from '../components/Dashboard/List';
import Gallery from '../components/Dashboard/Gallery';
import Confirm from '../components/Dashboard/Confirm';

export default {
  name: 'dashboard',
  components: { Panel, List, Gallery, Confirm },
  data() { return {
    gallery: false,
    clickedImage: null,
    confirm: false,
    data: null
  }; },
  watch: {
    gallery(newValue) {
      if(newValue) this.$nextTick(() => this.$refs.galleryCloseBtn.focus());
    }
  },
  methods: {
    hideGallery() {
      this.gallery = false;
      eventBus.$emit('hideGallery');
    },
    hideConf() {
      eventBus.$emit('hideConfirm');
    }
  },
  created() {
    eventBus.$on('showGallery', (index) => {
      this.clickedImage = index;
      this.gallery = true;
    });
    eventBus.$on('showConfirm', data => {
      this.data = data;
      this.confirm = true;
    });
    eventBus.$on('hideConfirm', () => this.confirm = false);
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/flexMixins.scss";
@import "../scss/variables.scss";

.dashboard {
  width: 100%;
  background: $viewBackground;
  position: relative;
}
@media screen and (min-width: 1024px) {
  .dashboard {
    width: 80vw;
    margin-top: 50px;
    border-radius: 20px;
    overflow: hidden;
  }
}

.gallery-container {
  @include flexRow;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: hsla(0, 0%, 31%, 95%);

  .close-gallery-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100;
    color: #000;
    font-size: 40px;
    font-weight: 700;
    background: #000;
    border: none;
    border-radius: 50%;
    cursor: pointer;

    &::after {
      content: '';
      width: 30px;
      height: 30px;
      position: absolute;
      top: 5px;
      left: 5px;
      z-index: -2;
      background: #fff;
      border-radius: 50%;
    }
  }
}
@media screen and (min-width: 1024px) {
  .gallery-container {
    position: fixed;
    top: 0;
    left: 0;
  }
}

.confirm-container {
  @include flexRow(center, flex-start);
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: hsla(120, 0%, 50%, 90%);
  height: 100vh;
  width: 100vw;
}


</style>
