<template>
  <div class="dashboard">
    <Panel></Panel>
  </div>
</template>

<script>
// @ is an alias to /src
import Panel from '../components/Dashboard/Panel';

export default {
  name: 'dashboard',
  components: {
    Panel
  }
}
</script>

<style lang="scss" scoped>

.dashboard {
  width: 100%;
  height: 600px;
  background: hsla(210, 5%, 29%, 45%);
}

</style>
