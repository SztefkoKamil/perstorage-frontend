<template>
  <div class="login">
    <h1>Login to your dashboard</h1>
    <div class="login-info">
      <transition name="toggle-info">
        <p v-if="toggleInfo">If You don't have your account & You just want to test app, feel free to login for guest account, email: guest@test.pl, password: noPass1</p>
      </transition>
      <button @click="toggleInfo = !toggleInfo">?</button>
    </div>
    <LoginForm></LoginForm>
    <div class="to-signup">
      <button @click="redirect">Signup</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '../components/Login/LoginForm'
import { eventBus } from '../main'

export default {
  name: 'login',
  components: { LoginForm },
  data() {
    return {
      toggleInfo: false
    }
  },
  methods: {
    redirect() { eventBus.$emit('setView', 'Signup'); }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";
@import "../scss/flexMixins.scss";

.login {
  width: 100%;
  background: $viewBackground;
  padding: 50px 0 30px;
  @include flexColumn;

  h1 {
    font-size: 26px;
    color: #fff;
  }
}
@media screen and (min-width: 710px) {
  .login {
    width: 700px;
    margin-top: 50px;
    border-radius: 20px;

    h1 {
      font-size: 32px;
    }
  }
}

.login-info {
  margin: 30px 0 20px;
  position: relative;
  width: 360px;
  @include flexRow;

  p {
    position: absolute;
    width: 360px;
    color: #fff;
    background: $colorOne;
    padding: 10px;
    border-radius: 5px;
    left: 0px;
    top: -85px;
    line-height: 120%;
  }
  .toggle-info-enter-active {
    animation: show-login-info .1s 1 linear;
  }
  @keyframes show-login-info {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  .toggle-info-leave-active {
    animation: hide-login-info .1s 1 linear;
  }
  @keyframes hide-login-info {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      transform: translateY(20px);
    }
  }

  button {
    @include flexRow;
    width: 24px;
    height: 24px;
    background: #fff;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    font-weight: 900;
    color: $colorOne;
    cursor: pointer;
  }
}

.to-signup {
  height: 200px;
    @include flexRow;

  button {
    border: none;
    border-radius: 5px;
    padding: 10px 30px;
    font-size: 20px;
    background: hsl(210, 65%, 28%);
    color: #fff;
  }
}

</style>