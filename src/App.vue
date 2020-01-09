<template>
  <div id="app">
    <transition name="toggle-view" mode="out-in">
      <component :is="actualView"></component>
    </transition>
  </div>
</template>


<script>
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Signup from './views/Signup';
import { eventBus } from './main'


export default {
  components: {
    Dashboard,
    Login,
    Signup
  },
  data() {
    return {
      actualView: Login
    }
  },
  methods: {
    setView(view) {
      if(view === 'Login') { this.actualView = Login; }
      else if(view === 'Dashboard') { this.actualView = Dashboard; }
      else if(view === 'Signup') { this.actualView = Signup; }
    },
    checkLogin() {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if(token && userId) this.setView('Dashboard');
    }
  },
  created() {
    eventBus.$on('setView', (view) => { this.setView(view); });
    this.checkLogin();
  }
}

</script>


<style lang="scss">
@import "./scss/variables.scss";
@import "./scss/flexMixins.scss";

*{ margin: 0; padding: 0; box-sizing: border-box;}

body::-webkit-scrollbar { background: $colorOne; }
body::-webkit-scrollbar-thumb {
  background: $colorTwo;
  border-radius: 5px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  overflow: hidden;

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

// transition animations
#app {
  .toggle-view-enter-active {
    animation: show-view .1s 1 linear;
  }
  @keyframes show-view {
    0% {
      transform: scale(0.2);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  .toggle-view-leave-active {
    animation: hide-view .1s 1 linear;
  }
  @keyframes hide-view {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.2);
      opacity: 0;
    }
  }
}

</style>
