<template>
  <div class="confirm-wrapper">
    <form v-if="fileData.actionType === 'edit-file'" @submit.prevent="changeName">
      <h4>Change name of the file</h4>
      <input type="text" v-model="fileName" ref="editNameInput">
      <div class="buttons">
        <button @click="hideConfirm" type="button">Cancel</button>
        <button>Change name</button>
      </div>
    </form>
    <div v-else-if="fileData.actionType === 'delete'">
      delete
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../main';

export default {
  props: ['fileData'],
  data() { return {
    fileName: this.fileData.fileName,
    fileExt: null
  }},
  methods: {
    changeName() {
      const newFile = {
        id: this.fileData.fileId,
        name: this.fileName + this.fileExt
      };
      // this.$store.dispatch('editFile', newFile);
    },
    hideConfirm() {
      eventBus.$emit('hideConfirm');
    },
    divideName() {
      const dotIndex = this.fileData.fileName.lastIndexOf('.');
      const name = this.fileData.fileName.slice(0, dotIndex);
      this.fileName = name;
      const ext = this.fileData.fileName.slice(dotIndex);
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

.confirm-wrapper {
  background: #000;
  width: 300px;
  height: 150px;
  margin-top: 50px;
  border-radius: 5px;
  padding: 10px;

  form {
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