<template>
    <form @submit.prevent="deleteUser" class="delete-file-wrapper">
      <h4>Sure to delete Your account?</h4>
      <div class="buttons">
        <button @click="hideConfirm" ref="cancelBtn" type="button">Cancel</button>
        <button>Delete account</button>
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
    deleteUser() {
      // this.$store.dispatch('deleteuser', this.data.userId);
      console.log('delete user ' + this.data.userId);
    },
    hideConfirm() { eventBus.$emit('hideConfirm'); }
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