<template>
  <form @submit.prevent="changeName" @keydown.esc="hideConfirm" class="edit-file-wrapper">
    <h4>Change name of the file</h4>
    <input type="text" v-model="fileName" ref="editNameInput" />
    <div class="buttons">
      <button @click="hideConfirm" type="button">Cancel</button>
      <button>Change name</button>
    </div>
  </form>
</template>

<script>
import eventBus from "../../eventBus";

export default {
  props: ["data"],
  data() {
    return {
      fileName: null,
      fileExt: null
    };
  },
  methods: {
    changeName() {
      const newFile = {
        id: this.data.fileId,
        name: this.fileName,
        ext: this.fileExt
      };
      if (this.data.fileName !== newFile.name + newFile.ext)
        this.$store.dispatch("editFile", newFile);
      else eventBus.$emit("hideConfirm");
    },
    hideConfirm() {
      eventBus.$emit("hideConfirm");
    },
    divideName() {
      const dotIndex = this.data.fileName.lastIndexOf(".");
      this.fileName = this.data.fileName.slice(0, dotIndex);
      this.fileExt = this.data.fileName.slice(dotIndex);
    }
  },
  created() {
    this.divideName();
  },
  mounted() {
    this.$refs.editNameInput.focus();
  }
};
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