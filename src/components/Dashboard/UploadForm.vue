<template>
  <form class="upload-form" @submit.prevent="sendFiles" enctype="multipart/form-data">
    <div class="upload-input">
      <span class="fake-btn">Choose file</span>
      <input type="file" name="files" multiple @change="addFiles" :disabled="formDisabled" ref="inputFile">
    </div>
    <button class="upload-btn" type="submit" :disabled="formDisabled">Upload</button>
  </form>
</template>

<script>
import eventBus from './../../eventBus';

export default {

  data() { return {
    formDisabled: false
  }; },
  methods: {
    addFiles(e) { this.$store.commit('setFilesToUpload', Array.from(e.target.files)); },
    sendFiles() {
      this.$refs.inputFile.value = '';
      this.$store.dispatch('postFiles');
    }
  },
  created() { eventBus.$on('disableUploadForm', value => this.formDisabled = value); }
};
</script>

<style lang="scss" scoped>
@import "../../scss/flexMixins.scss";
@import "../../scss/variables.scss";

.upload-form {
  @include flexRow;
  padding: 5px 0;


  .upload-btn {
    background: transparent;
    border: 1px solid $colorTwo;
    border-radius: 5px;
    color: $fontColorOne;
    width: 87px;
    height: 23px;
    font-size: 14px;
    cursor: pointer;
  }
}

.upload-input {
  overflow: hidden;
  width: 87px;
  position: relative;
  border: 1px solid $colorTwo;
  border-radius: 5px;
  margin-right: 10px;

  input { opacity: 0; }

  .fake-btn {
    @include flexRow;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 14px;
  }
}

</style>