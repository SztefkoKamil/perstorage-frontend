<template>
  <nav id="panel" :class="{open: isPanelOpen}">
    <button id="toggleBtn" @click="isPanelOpen = !isPanelOpen"></button>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navContainer: null,
      isPanelOpen: false
    }
  },
  mounted() {
    this.navContainer = document.getElementById('panel');
  }
}
</script>

<style lang="scss" scoped>

#panel {
  width: 100%;
  height: 120px;
  background: red;
  border-bottom-left-radius: 150px;
  border-bottom-right-radius: 150px;
  position: relative;
  transition: transform .2s linear;

  &.open {
    transform: translateY(-100px);
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