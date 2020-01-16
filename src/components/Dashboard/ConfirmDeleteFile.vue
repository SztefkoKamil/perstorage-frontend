<template>
    <form @submit.prevent="deleteFile" class="delete-file-wrapper">
      <h4>Delete file {{ file.name }}?</h4>
      <div class="buttons">
        <button @click="hideConfirm" ref="cancelBtn" type="button">Cancel</button>
        <button>Delete file</button>
      </div>
    </form>
</template>

<script>
import { eventBus } from '../../main';

export default {
  props: ['data'],
  data() { return {
    file: null,
  }},
  methods: {
    deleteFile() {
      // this.$store.dispatch('deleteFile', this.file.id);
      console.log('delete file ' + this.file.id);
    },
    hideConfirm() { eventBus.$emit('hideConfirm'); },
    getFile() {
      this.$store.state.userFiles.map(file => { if(file.id === this.data.fileId) this.file = file; });
    }
  },
  created() {
    this.getFile();
  },
  mounted() {
    this.$refs.cancelBtn.focus();
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/flexMixins.scss";
@import "../../scss/variables.scss";

.delete-file-wrapper {
    @include flexColumn(space-around);
    height: 100%;

    h4 {
      font-weight: 500;
      max-width: 100%;
      overflow: hidden;
      line-height: 120%;
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