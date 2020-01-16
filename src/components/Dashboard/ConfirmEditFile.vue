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
        name: this.fileName + this.fileExt
      };
      // this.$store.dispatch('editFile', newFile);
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
@import "../../scss/flexMixins.scss";
@import "../../scss/variables.scss";

.edit-file-wrapper {
    @include flexColumn(space-around);
    height: 100%;

    h4 {
      font-weight: 500;
    }

    input {
      padding: 5px;
      width: 200px;
      border-radius: 5px;
      border: 1px solid $colorOne;
      font-size: 14px;
    }
  

  .buttons {
    @include flexRow(space-between);
    width: 200px;

    button {
      border: 1px solid $colorTwo;
      background: $colorOne;
      padding: 5px 10px;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
      font-size: 14px;
    }
  }
}

</style>