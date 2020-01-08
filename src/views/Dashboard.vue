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
@import "../scss/variables.scss";

.dashboard {
  width: 100%;
  background: $viewBackground;
}
@media screen and (min-width: 1024px) {
  .dashboard {
    width: 80vw;
    margin-top: 50px;
    border-radius: 20px;
    overflow: hidden;
  }
}

</style>
