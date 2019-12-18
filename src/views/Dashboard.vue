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
  components: { Panel, List }
}
</script>

<style lang="scss" scoped>

.dashboard {
  width: 100%;
  height: 600px;
  background: hsla(210, 5%, 29%, 45%);
}

</style>
