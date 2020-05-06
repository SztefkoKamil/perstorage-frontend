<template>
  <form class="signup-form" @submit.prevent="goSignup">
    <label for="signup-name">name</label>
    <input type="text" id="signup-name" required minlength="2" v-model="name" />
    <label for="signup-email">email</label>
    <input type="email" id="signup-email" required v-model="email" />
    <label for="signup-pass1">password</label>
    <input type="password" id="signup-pass1" required minlength="6" v-model="password1" />
    <label for="signup-pass2">confirm password</label>
    <input
      type="password"
      id="signup-pass2"
      ref="pass2"
      required
      v-model="password2"
      @keyup="confirmPassword"
    />
    <div class="policy">
      <input type="checkbox" id="signup-policy" required v-model="policy" />
      <label for="signup-policy">
        <span>Read & accept </span>
        <button @click="showPolicy" type="button" id="show-policy-btn">privacy policy</button>
      </label>
    </div>
    <vue-recaptcha
      class="recaptcha-container"
      sitekey="6LfpPckUAAAAAEmT6OTSVf2XiTZlxBTOFP7HCfj5"
      :loadRecaptchaScript="true"
      @verify="recaptchaVerify"
      @expired="recaptchaExpired"
    ></vue-recaptcha>
    <input type="checkbox" required v-model="recaptcha" class="recaptcha-input" />
    <button class="signup-form-btn" id="signup-submit" type="submit">Submit</button>
  </form>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import eventBus from '../../eventBus';

export default {
  name: 'login',
  components: { VueRecaptcha },
  data() {
    return {
      name: '',
      email: '',
      password1: '',
      password2: '',
      policy: false,
      recaptcha: false,
    };
  },
  methods: {
    showPolicy() {
      eventBus.$emit('showPolicy');
    },
    confirmPassword() {
      if (this.password1 === this.password2) this.$refs.pass2.setCustomValidity('');
      else this.$refs.pass2.setCustomValidity("Passwords Don't Match");
    },
    goSignup() {
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password1,
      };
      this.$store.dispatch('postSignup', newUser);
    },
    recaptchaVerify() {
      this.recaptcha = true;
    },
    recaptchaExpired() {
      this.recaptcha = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';
@import '../../scss/flexMixins.scss';

.signup-form {
  @include flexColumn;
  margin: 10px 0 50px;

  label {
    text-align: left;
    font-size: 18px;
    margin: 20px 0 2px;
  }
  & > input {
    width: 300px;
    font-size: 18px;
    color: $colorOne;
    text-align: center;
    border-radius: 5px;
    padding: 4px 6px;
    background: #fff;
    border: 2px solid $colorOne;
  }

  .policy {
    margin: 50px 0;

    input {
      transform: scale(2);
      margin-right: 20px;
    }
    label {
      font-size: 16px;

      button {
        background: transparent;
        border: none;
        font-size: inherit;
        text-decoration: underline;
        color: yellow;
        cursor: pointer;
      }
    }
  }

  .recaptcha-container {
    width: 300px;
    border: 2px solid $colorOne;
    border-radius: 5px;
  }

  .recaptcha-input {
    position: relative;
    bottom: 15px;
    z-index: -2;
  }

  .signup-form-btn {
    margin-top: 40px;
    border: 2px solid $colorOne;
    border-radius: 5px;
    padding: 10px 30px;
    font-size: 20px;
    background: #fff;
    color: $colorOne;
    cursor: pointer;
  }
}
</style>
