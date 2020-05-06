<template>
    <form @submit.prevent="deleteFile" @keydown.esc="hideConfirm" class="delete-file-wrapper">
      <h4>Delete file {{ file.name }}?</h4>
      <div class="buttons">
        <button @click="hideConfirm" ref="cancelBtn" type="button">Cancel</button>
        <button>Delete file</button>
      </div>
    </form>
</template>

<script>
import eventBus from '../../eventBus';

export default {
  props: ['data'],
  data() { return {
    file: null,
  }; },
  methods: {
    deleteFile() { this.$store.dispatch('deleteFile', this.file.id); },
    hideConfirm() { eventBus.$emit('hideConfirm'); },
    getFile() { this.$store.state.userFiles.map(file => { if(file.id === this.data.fileId) this.file = file; }); }
  },
  created() { this.getFile(); },
  mounted() { this.$refs.cancelBtn.focus(); }
};
</script>

<style lang="scss" scoped>
@import "../../scss/confirmComponentStyles.scss";

.delete-file-wrapper {
  @include ConfirmStyles;
}

</style>