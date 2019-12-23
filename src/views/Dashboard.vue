<template>
  <div class="dashboard">
    <Panel></Panel>
    <List></List>
  </div>
</template>

<script>
// @ is an alias to /src
import Panel from '../components/Dashboard/Panel';
import List from '../components/Dashboard/List';

export default {
  name: 'dashboard',
  components: { Panel, List },
  created() {
    // this.$store.dispatch('getFiles');
  }
}
</script>

<style lang="scss" scoped>

.dashboard {
  width: 100%;
  background: hsla(210, 5%, 29%, 45%);
}

</style>
