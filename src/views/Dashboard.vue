<template>
  <div class="dashboard">
    <List></List>
    <Panel></Panel>
    <div v-if="gallery" class="gallery-container">
      <Gallery :imageIndex="clickedImage"></Gallery>
      <button @click="hideGallery" class="close-gallery-btn">X</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { eventBus } from '../main'
import Panel from '../components/Dashboard/Panel';
import List from '../components/Dashboard/List';
import Gallery from '../components/Dashboard/Gallery';

export default {
  name: 'dashboard',
  components: { Panel, List, Gallery },
  data() { return {
    gallery: false,
    clickedImage: null
  }},
  methods: {
    hideGallery() {
      this.gallery = false;
      eventBus.$emit('hideGallery');
    }
  },
  created() {
    eventBus.$on('showGallery', (index) => {
      this.clickedImage = index;
      this.gallery = true;
      });
  }
}
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
    width: 40px;
    height: 40px;
    z-index: 100;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    background: #000;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
}

</style>
