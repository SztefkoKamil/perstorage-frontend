<template>
    <form @submit.prevent="changeName" class="edit-file-wrapper">
      <h4>Change name of the file</h4>
      <input type="text" v-model="fileName" ref="editNameInput">
      <div class="buttons">
        <button @click="hideConfirm" type="button">Cancel</button>
        <button>Change name</button>
      </div>
    </form>
</template>

<script>
import { eventBus } from '../../main';

export default {
  props: ['data'],
  data() { return {
    fileName: null,
    fileExt: null
  }},
  methods: {
    changeName() {
      const newFile = {
        id: this.data.fileId,
        name: this.fileName,
        ext: this.fileExt
      };
      this.$store.dispatch('editFile', newFile);
    },
    hideConfirm() {
      eventBus.$emit('hideConfirm');
    },
    divideName() {
      const dotIndex = this.data.fileName.lastIndexOf('.');
      const name = this.data.fileName.slice(0, dotIndex);
      this.fileName = name;
      const ext = this.data.fileName.slice(dotIndex);
      this.fileExt = ext;
    }
  },
  created() {
    this.divideName();
  },
  mounted() {
    this.$refs.editNameInput.focus();
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/confirmComponentStyles.scss";

.edit-file-wrapper {
  @include ConfirmStyles;

  input {
    text-align: center;
  }
}

</style>