<template>
  <form class="login-form" @submit.prevent="goLogin">
    <label for="login-email">email</label>
    <input type="email" name="" id="login-email" required v-model="email" />
    <label for="login-pass">password</label>
    <input type="password" name="" id="login-pass" minlength="6" required v-model="password" />
    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    goLogin() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('postLogin', user);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/flexMixins.scss';
@import '../../scss/variables.scss';

.login-form {
  @include flexColumn;
  padding: 20px 0 50px;
  border-bottom: 1px dashed #fff;

  label {
    text-align: left;
    font-size: 18px;
    margin: 20px 0 2px;
  }
  input {
    width: 300px;
    font-size: 18px;
    color: $colorOne;
    text-align: center;
    border-radius: 5px;
    padding: 4px 6px;
    background: #fff;
    border: 2px solid $colorOne;
  }
  button {
    margin-top: 30px;
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
