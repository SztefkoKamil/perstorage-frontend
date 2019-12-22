<template>
  <form class="signup-form" @submit.prevent="goSignup">
    <label for="signup-name">name</label>
    <input type="text" id="signup-name" required v-model="name">
    <label for="signup-email">email</label>
    <input type="text" id="signup-email" required v-model="email">
    <label for="signup-pass1">password</label>
    <input type="password" id="signup-pass1" required v-model="password1">
    <label for="signup-pass2">confirm password</label>
    <input type="password" id="signup-pass2" required v-model="password2">
    <div class="terms">
      <input type="checkbox" id="signup-terms" required v-model="policy">
      <label for="signup-terms">Read & accept <button>privacy policy</button></label>
    </div>
    <!-- captcha here -->
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
// @ is an alias to /src
import VueRecaptcha from 'vue-recaptcha';

export default {
  name: 'login',
  components: { VueRecaptcha },
  data() {
    return {
      name: '',
      email:'',
      password1: '',
      password2: '',
      policy: false,
      recpatcha: false
    }
  },
  methods: {
    goSignup() {
      if(this.password1 !== this.password2) {
        // confirm password message
        console.log('Please confirm password');
        return null;
      }
      if(!this.recpatcha) {
        // confirm recaptcha message
        console.log('Please confirm recaptcha');
        return null;
      }

      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password1,
      }
      
      this.$store.dispatch('postSignup', newUser);
    },
    recaptchaVerify(e) { this.recpatcha = true; },
    recaptchaExpired(e) { this.recpatcha = false; }
  }
}
</script>

<style lang="scss" scoped>
// @import "../scss/variables.scss";
@import "../../scss/flexMixins.scss";

.signup-form {
  @include flexColumn;
  margin: 50px 0;

  label {
    text-align: left;
    font-size: 18px;
    margin: 20px 0 2px;;
  }
  &>input {
    width: 300px;
    font-size: 18px;
    color: hsl(210, 65%, 28%);
    text-align: center;
    border-radius: 5px;
    padding: 4px 6px;
    background: #fff;
    border: 2px solid hsl(210, 65%, 28%);
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
    border: 2px solid hsl(210, 65%, 28%);
    border-radius: 5px;
  }

  .signup-form-btn {
    margin-top: 50px;
    border: 2px solid hsl(210, 65%, 28%);
    border-radius: 5px;
    padding: 10px 30px;
    font-size: 20px;
    background: #fff;
    color: hsl(210, 65%, 28%);
    cursor: pointer;
  }
}

</style>