<template>
  <div id="app" :class="{openedModal: modal, mouseDevice}">
    <transition name="toggle-view" mode="out-in">
      <component :is="actualView"></component>
    </transition>
    <transition name="show-notification">
      <Notification v-if="notification" :info="notificationInfo"></Notification>
    </transition>
  </div>
</template>


<script>
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Signup from './views/Signup';
import Notification from './components/Notification';
import { eventBus } from './main'


export default {
  components: {
    Dashboard,
    Login,
    Signup,
    Notification
  },
  data() { return {
      actualView: Login,
      modal: false,
      mouseDevice: false,
      notification: false,
      notificationInfo: null
  }},
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
    },
    isTouchscreenDevice() {
      const isTouchScreen = ( 'ontouchstart' in window ) || ( navigator.maxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 );
      this.mouseDevice = !isTouchScreen;
    },
    showNotification(info) {
      this.notificationInfo = info;
      this.notification = true;
      setTimeout(() => { this.notification = false; }, 3000);
    }
  },
  created() {
    eventBus.$on('setView', (view) => { this.setView(view); });
    eventBus.$on('showNotification', info => this.showNotification(info));
    eventBus.$on('showGallery', () => { this.modal = true; });
    eventBus.$on('hideGallery', () => { this.modal = false; });
    eventBus.$on('showConfirm', () => { this.modal = true; });
    eventBus.$on('hideConfirm', () => { this.modal = false; });
    this.checkLogin();
  },
  mounted() {
    this.isTouchscreenDevice();
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
#app.openedModal { height: 100vh; }

.main-view {
  width: 100%;
  background: $viewBackground;
  padding: 50px 0 30px;
  @include flexColumn;
}

// transition animations
#app {
  // toggle view ----------------------
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

  // show notification --------------------
  .show-notification-enter-active {
    animation: show-notification .1s 1 linear;
  }
  @keyframes show-notification {
    0% {
      transform: translate(-50%, -150px);
    }
    100% {
      transform: translate(-50%, 0px);
    }
  }
  .show-notification-leave-active {
    animation: hide-notification .1s 1 linear;
  }
  @keyframes hide-notification {
    0% {
      transform: translate(-50%, 0px);
    }
    100% {
      transform: translate(-50%, -150px);
    }
  }
}

</style>
