<template>
  <div class="signup main-view" @keydown.esc="closePolicy">
    <h1>Signup to Perstorage</h1>
    <div class="signup-info">
      <transition name="toggle-info">
        <p v-if="toggleInfo">
          <span>Users number limited to 5. If it's full contact me at sztefkokamil@gmail.com</span>
          <span>Name must have min 2 characters length.</span>
          <span>Password must have min 6 characters length.</span>
        </p>
      </transition>
      <button @click="toggleInfo = !toggleInfo">?</button>
    </div>
    <SignupForm></SignupForm>
    <div class="back-to-login">
      <button @click="backToLogin">Login</button>
    </div>
    <div v-if="showPolicy" class="privacy-policy-container">
      <button
        @click="closePolicy"
        ref="policyCloseBtn"
        class="close-policy-btn fas fa-times-circle"
      ></button>
      <div class="content-wrapper">
        <h3>Privacy Policy</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id beatae dicta harum quaerat
          optio voluptates reprehenderit sunt sed odit, expedita hic, et quos dolore illo obcaecati.
          Minus perferendis dolorum corporis! Totam magnam nulla labore veritatis tempora recusandae
          libero deleniti? Dolor rerum cumque ullam nesciunt dicta ea, quos vel nostrum debitis
          minus quas nemo quam consectetur necessitatibus, impedit aspernatur odit non. Quasi
          repellendus quod eveniet eligendi consectetur. Explicabo reprehenderit sunt ex recusandae
          rerum alias ut, maiores laborum quas quasi, ad inventore. Voluptatibus recusandae
          doloremque molestias qui quasi nemo commodi beatae corrupti.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id beatae dicta harum quaerat
          optio voluptates reprehenderit sunt sed odit, expedita hic, et quos dolore illo obcaecati.
          Minus perferendis dolorum corporis! Totam magnam nulla labore veritatis tempora recusandae
          libero deleniti? Dolor rerum cumque ullam nesciunt dicta ea, quos vel nostrum debitis
          minus quas nemo quam consectetur necessitatibus, impedit aspernatur odit non. Quasi
          repellendus quod eveniet eligendi consectetur. Explicabo reprehenderit sunt ex recusandae
          rerum alias ut, maiores laborum quas quasi, ad inventore. Voluptatibus recusandae
          doloremque molestias qui quasi nemo commodi beatae corrupti.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id beatae dicta harum quaerat
          optio voluptates reprehenderit sunt sed odit, expedita hic, et quos dolore illo obcaecati.
          Minus perferendis dolorum corporis! Totam magnam nulla labore veritatis tempora recusandae
          libero deleniti? Dolor rerum cumque ullam nesciunt dicta ea, quos vel nostrum debitis
          minus quas nemo quam consectetur necessitatibus, impedit aspernatur odit non. Quasi
          repellendus quod eveniet eligendi consectetur. Explicabo reprehenderit sunt ex recusandae
          rerum alias ut, maiores laborum quas quasi, ad inventore. Voluptatibus recusandae
          doloremque molestias qui quasi nemo commodi beatae corrupti.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id beatae dicta harum quaerat
          optio voluptates reprehenderit sunt sed odit, expedita hic, et quos dolore illo obcaecati.
          Minus perferendis dolorum corporis! Totam magnam nulla labore veritatis tempora recusandae
          libero deleniti? Dolor rerum cumque ullam nesciunt dicta ea, quos vel nostrum debitis
          minus quas nemo quam consectetur necessitatibus, impedit aspernatur odit non. Quasi
          repellendus quod eveniet eligendi consectetur. Explicabo reprehenderit sunt ex recusandae
          rerum alias ut, maiores laborum quas quasi, ad inventore. Voluptatibus recusandae
          doloremque molestias qui quasi nemo commodi beatae corrupti.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import SignupForm from '../components/Signup/SignupForm';
import eventBus from '../eventBus';

export default {
  name: 'home',
  components: {
    SignupForm
  },
  data() {
    return {
      toggleInfo: false,
      showPolicy: false
    };
  },
  methods: {
    backToLogin() {
      eventBus.$emit('setView', 'Login');
    },
    closePolicy() {
      eventBus.$emit('hidePolicy');
    }
  },
  watch: {
    showPolicy(newValue) {
      if (newValue) this.$nextTick(() => this.$refs.policyCloseBtn.focus());
    }
  },
  created() {
    eventBus.$on('showPolicy', () => {
      this.showPolicy = true;
    });
    eventBus.$on('hidePolicy', () => {
      this.showPolicy = false;
    });
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';
@import '../scss/flexMixins.scss';

.signup {
  h1 {
    font-size: 26px;
  }
}
@media screen and (min-width: 710px) {
  .signup {
    width: 700px;
    margin-top: 50px;
    border-radius: 20px;

    h1 {
      font-size: 32px;
    }
  }
}

.back-to-login {
  @include flexRow;
  width: 300px;
  height: 140px;
  border-top: 1px dashed #fff;

  button {
    border: none;
    border-radius: 5px;
    padding: 10px 30px;
    font-size: 20px;
    background: $colorOne;
    color: $fontColorOne;
    cursor: pointer;
  }
}

.signup-info {
  margin: 30px 0 20px;
  position: relative;
  width: 360px;
  @include flexRow;

  p {
    position: absolute;
    width: 320px;
    color: #fff;
    background: $colorOne;
    padding: 10px;
    border-radius: 5px;
    left: 20px;
    top: 40px;
    line-height: 120%;

    span {
      display: block;
      text-align: left;

      &:nth-child(2) {
        margin: 7px 0;
      }
    }
  }
  .toggle-info-enter-active {
    animation: show-info 0.1s 1 linear;
  }
  @keyframes show-info {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  .toggle-info-leave-active {
    animation: hide-info 0.1s 1 linear;
  }
  @keyframes hide-info {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      transform: translateY(-20px);
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
    line-height: 1;
    cursor: pointer;
  }
}

.privacy-policy-container {
  @include flexRow(center, flex-start);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: hsl(0, 0%, 13%);
  padding: 100px 30px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    background: $colorOne;
  }
  &::-webkit-scrollbar-thumb {
    background: $colorTwo;
    border-radius: 5px;
  }

  .content-wrapper {
    max-width: 1024px;
  }

  p {
    margin: 20px 0 0;
    text-align: justify;
    line-height: 1.3;
  }

  .close-policy-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100;
    color: #000;
    font-size: 40px;
    font-weight: 700;
    background: #000;
    border: none;
    border-radius: 50%;
    cursor: pointer;

    &::after {
      content: '';
      width: 30px;
      height: 30px;
      position: absolute;
      top: 5px;
      left: 5px;
      z-index: -2;
      background: #fff;
      border-radius: 50%;
    }
  }
}
</style>
