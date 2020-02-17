<template>
  <form class="signup-form" @submit.prevent="goSignup">
    <label for="signup-name">name</label>
    <input type="text" id="signup-name" required v-model="name">
    <label for="signup-email">email</label>
    <input type="text" id="signup-email" required v-model="email">
    <label for="signup-pass1">password</label>
    <input type="password" id="signup-pass1" required minlength="6" v-model="password1">
    <label for="signup-pass2">confirm password</label>
    <input type="password" id="signup-pass2" required minlength="6" v-model="password2">
    <div class="terms">
      <input type="checkbox" id="signup-terms" required v-model="policy">
      <label for="signup-terms">Read & accept <button>privacy policy</button></label>
    </div>
    <vue-recaptcha 
      class="recaptcha-container" 
      sitekey="6LfpPckUAAAAAEmT6OTSVf2XiTZlxBTOFP7HCfj5" 
      :loadRecaptchaScript="true" 
      @verify="recaptchaVerify" 
      @expired="recaptchaExpired"
    ></vue-recaptcha>
    <button class="signup-form-btn" type="submit">Submit</button>
  </form>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';

export default {
  name: 'login',
  components: { VueRecaptcha },
  data() { return {
    name: '',
    email:'',
    password1: '',
    password2: '',
    policy: false,
    recpatcha: false
  }; },
  methods: {
    goSignup() {
      if(this.password1 !== this.password2) {
        console.log('Please confirm password');
        return null;
      }
      if(!this.recpatcha) {
        console.log('Please confirm recaptcha');
        return null;
      }

      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password1,
      };
      
      this.$store.dispatch('postSignup', newUser);
    },
    recaptchaVerify() { this.recpatcha = true; },
    recaptchaExpired() { this.recpatcha = false; }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/variables.scss";
@import "../../scss/flexMixins.scss";

.signup-form {
  @include flexColumn;
  margin: 10px 0 50px;

  label {
    text-align: left;
    font-size: 18px;
    margin: 20px 0 2px;;
  }
  &>input {
    width: 300px;
    font-size: 18px;
    color: $colorOne;
    text-align: center;
    border-radius: 5px;
    padding: 4px 6px;
    background: #fff;
    border: 2px solid $colorOne;
  }

  .terms {
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

  .signup-form-btn {
    margin-top: 50px;
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