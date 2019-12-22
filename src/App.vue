<template>
  <div id="app">
    <Signup></Signup>
  </div>
</template>


<script>
// import Dashboard from './views/Dashboard';
// import Login from './views/Login';
import Signup from './views/Signup';


export default {
  components: {
    // Dashboard,
    // Login,
    Signup
  }
}

</script>


<style lang="scss">
@import "./scss/variables.scss";
@import "./scss/flexMixins.scss";

*{ margin: 0; padding: 0; box-sizing: border-box;}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;

  background: $appBackground;
  min-height: 100vh;
  @include flexRow(center, flex-start);
}

.main-view {
  width: 100%;
  background: $viewBackground;
  padding: 50px 0 30px;
  @include flexColumn;
}

</style>
