<template>
    <form @submit.prevent="deleteUser" @keydown.esc="hideConfirm" class="delete-file-wrapper">
      <h4>Sure to delete Your account?</h4>
      <div class="buttons">
        <button @click="hideConfirm" ref="cancelBtn" type="button">Cancel</button>
        <button>Delete account</button>
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
    deleteUser() { this.$store.dispatch('deleteUser'); },
    hideConfirm() { eventBus.$emit('hideConfirm'); }
  },
  mounted() {
    this.$refs.cancelBtn.focus();
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/confirmComponentStyles.scss";

.delete-file-wrapper {
  @include ConfirmStyles;
}

</style>