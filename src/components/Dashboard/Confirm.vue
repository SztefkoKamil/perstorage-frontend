<template>
  <div class="confirm-wrapper">
    <component :is="confirmType" :data="data"></component>
  </div>
</template>

<script>
import ConfirmEditFile from './ConfirmEditFile';
import ConfirmDeleteFile from './ConfirmDeleteFile';
import ConfirmDeleteUser from './ConfirmDeleteUser';

export default {
  props: ['data'],
  components: { ConfirmEditFile, ConfirmDeleteFile, ConfirmDeleteUser },
  data() { return {
    confirmType: null
  };},
  created() {
    if(this.data.actionType === 'edit-file') this.confirmType = ConfirmEditFile;
    else if(this.data.actionType === 'delete-file') this.confirmType = ConfirmDeleteFile;
    else if(this.data.actionType === 'delete-user') this.confirmType = ConfirmDeleteUser;
  }
};
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


}

</style>