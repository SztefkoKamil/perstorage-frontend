<template>
  <div :class="messageType" class='notification'>
    <span>{{ info.message }}</span>
  </div>
</template>

<script>
export default {
  props: ['info'],
  data() { return {
    messageType: null
  }},
  beforeMount() {
    if(this.info.error) this.messageType = 'error';
    else this.messageType = 'message';
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";

.notification {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 400px;
  background: #3c3c3c;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 130%;

  &.message { border: 2px solid green; }
  &.error { border: 2px solid red; }
}
@media screen and (min-width: 500px) {
  .notification { font-size: 18px; }
}

</style>


