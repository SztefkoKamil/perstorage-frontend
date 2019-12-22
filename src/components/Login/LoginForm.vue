<template>
  <form class="login-form" @submit.prevent="goLogin">
    <label for="login-email">email</label>
    <input type="email" name="" id="login-email" required v-model="email">
    <label for="login-pass">password</label>
    <input type="password" name="" id="login-pass" required v-model="password">
    <button type="submit">Login</button>
  </form>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    goLogin() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch('postLogin', user);
    }
  }
}
</script>

<style lang="scss" scoped>

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 50px;
  border-bottom: 1px dashed #fff;

  label {
    text-align: left;
    font-size: 18px;
    margin: 20px 0 2px;;
  }
  input {
    width: 300px;
    font-size: 18px;
    color: hsl(210, 65%, 28%);
    text-align: center;
    border-radius: 5px;
    padding: 4px 6px;
    background: #fff;
    border: 2px solid hsl(210, 65%, 28%);
  }
  button {
    margin-top: 30px;
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