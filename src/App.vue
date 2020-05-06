<template>
  <div id="app" :class="{ openedModal: modal || loading, mouseDevice }">
    <transition name="toggle-view" mode="out-in">
      <component :is="actualView"></component>
    </transition>
    <transition name="show-notification">
      <Notification v-if="notification" :info="notificationInfo"></Notification>
    </transition>
    <div class="loading-container" v-if="loading">
      <h2>Loading</h2>
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Signup from './views/Signup';
import Notification from './components/Notification';
import eventBus from './eventBus';

export default {
  components: {
    Dashboard,
    Login,
    Signup,
    Notification,
  },
  data() {
    return {
      actualView: Login,
      loading: false,
      modal: false,
      mouseDevice: false,
      notification: false,
      notificationInfo: null,
      notificationTimeout: null,
    };
  },
  methods: {
    setView(view) {
      if (view === 'Login') {
        this.actualView = Login;
      } else if (view === 'Dashboard') {
        this.actualView = Dashboard;
      } else if (view === 'Signup') {
        this.actualView = Signup;
      }
    },
    checkLogin() {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (token && userId) this.setView('Dashboard');
    },
    isTouchscreenDevice() {
      const isTouchScreen =
        'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
      this.mouseDevice = !isTouchScreen;
    },
    showNotification(info) {
      if (this.notificationTimeout) clearTimeout(this.notificationTimeout);
      this.notificationInfo = info;
      this.notification = true;
      this.notificationTimeout = setTimeout(() => {
        this.notification = false;
        this.notificationTimeout = null;
      }, 3000);
    },
  },
  created() {
    eventBus.$on('setView', view => {
      this.setView(view);
    });
    eventBus.$on('showNotification', info => this.showNotification(info));
    eventBus.$on('showLoading', () => {
      this.loading = true;
    });
    eventBus.$on('hideLoading', () => {
      this.loading = false;
    });
    eventBus.$on('showGallery', () => {
      this.modal = true;
    });
    eventBus.$on('hideGallery', () => {
      this.modal = false;
    });
    eventBus.$on('showPolicy', () => {
      this.modal = true;
    });
    eventBus.$on('hidePolicy', () => {
      this.modal = false;
    });
    eventBus.$on('showConfirm', () => {
      this.modal = true;
    });
    eventBus.$on('hideConfirm', () => {
      this.modal = false;
    });
    window.loadingScreen.style.display = 'none';
    this.checkLogin();
  },
  mounted() {
    this.isTouchscreenDevice();
  },
};
</script>

<style lang="scss">
@import './scss/variables.scss';
@import './scss/flexMixins.scss';

body {
  background: #000;
}

body::-webkit-scrollbar {
  background: $colorOne;
}
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
#app.openedModal {
  height: 100vh;
}

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
    animation: show-view 0.1s 1 linear;
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
    animation: hide-view 0.1s 1 linear;
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
    animation: show-notification 0.1s 1 linear;
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
    animation: hide-notification 0.1s 1 linear;
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

.loading-container {
  @include flexColumn;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: hsla(0, 0%, 35%, 95%);

  h2 {
    font-size: calc(20px + 10vw);
  }
}
</style>
