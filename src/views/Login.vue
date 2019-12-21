<template>
  <div class="login">
    <h1>Login</h1>
    <!-- <LoginForm></LoginForm> -->
    <div class="to-register">
      <button class="to-register-btn">Signup</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'login',
  components: {
  }
}
</script>

<style lang="scss" scoped>

.login {
  width: 100%;
  background: hsla(210, 5%, 29%, 45%);
  padding: 50px 0 30px;
}

.to-register {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  .to-register-btn {
    border: none;
    border-radius: 5px;
    padding: 10px 30px;
    font-size: 20px;
    background: hsl(210, 65%, 28%);
    color: #fff;
  }
}

</style>