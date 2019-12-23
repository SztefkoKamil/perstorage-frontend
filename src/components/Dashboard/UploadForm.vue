<template>
  <form class="upload-form">
    <div class="upload-input">
      <span class="fake-btn">Choose file</span>
      <input type="file">
    </div>
    <button class="upload-btn" type="submit">Upload</button>
  </form>
</template>

<script>
export default {

  data() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../scss/flexMixins.scss";
@import "../../scss/variables.scss";

.upload-form {
  @include flexRow;
  padding: 10px 0;


  .upload-btn {
    background: transparent;
    border: 1px solid $colorTwo;
    border-radius: 5px;
    color: #fff;
    width: 87px;
    height: 23px;
    font-size: 14px;
  }
}

.upload-input {
  overflow: hidden;
  width: 87px;
  position: relative;
  border: 1px solid $colorTwo;
  border-radius: 5px;
  margin-right: 10px;

  input {
    opacity: 0;
    cursor: pointer;
  }

  .fake-btn {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    font-size: 14px;
    @include flexRow;
  }
}

</style>