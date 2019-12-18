<template>
  <div id="app">
    <Dashboard></Dashboard>
  </div>
</template>


<script>
import Dashboard from './views/Dashboard';


export default {
  components: {
    Dashboard
  }
}

</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  background: linear-gradient(to right bottom, hsl(210, 4%, 20%), hsl(240, 4%, 6%), hsl(210, 4%, 20%),);
  min-height: 800px;
}



</style>
