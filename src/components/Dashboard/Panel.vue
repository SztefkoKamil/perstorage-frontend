<template>
  <nav id="panel" :class="{open: isPanelOpen}">
    <div class="btns-panel">
      <button>delete</button>
      <h4>{{ info }}</h4>
      <button @click="logout">logout</button>
    </div>
    <UploadForm></UploadForm>
    <button id="toggleBtn" @click="isPanelOpen = !isPanelOpen"></button>
  </nav>
</template>

<script>
import UploadForm from './UploadForm'
import { eventBus } from '../../main'

export default {
  components: { UploadForm },
  data() {
    return {
      navContainer: null,
      isPanelOpen: false,
      info: 'Hello, add some files',
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      eventBus.$emit('setView', 'Login');
    }
  },
  created() {
    eventBus.$on('changeInfo', (info) => { this.info = info; });
  },
  mounted() {
    this.navContainer = document.getElementById('panel');
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/flexMixins.scss";
@import "../../scss/variables.scss";

#panel {
  width: 100%;
  max-width: 500px;
  height: 120px;
  background: $colorOne;
  border-bottom-left-radius: 150px;
  border-bottom-right-radius: 150px;
  position: relative;
  transition: transform .2s linear;
  margin: 0 auto;

  &.open {
    transform: translateY(-100px);
  }
}

.btns-panel {
  @include flexRow(space-between);
  padding: 10px 0;


  h4 {
    font-weight: 400;
    font-size: 16px;
  }
  button {
    background: transparent;
    border: 1px solid $colorTwo;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    width: 60px;
    height: 20px;
    margin: 0 10px;
    cursor: pointer;
  }
}

#toggleBtn {
  width: 20px;
  height: 20px;
  background: yellow;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-10px);
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

</style>