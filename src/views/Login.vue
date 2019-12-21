<template>
  <div class="login">
    <h1>Login</h1>
    <LoginForm></LoginForm>
    <div class="to-register">
      <button class="to-register-btn">Signup</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '../components/Login/LoginForm'

export default {
  name: 'login',
  components: { LoginForm }
}
</script>

<style lang="scss" scoped>

.login {
  width: 100%;
  background: hsla(210, 5%, 29%, 45%);
  padding: 50px 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media screen and (min-width: 710px) {
  .login {
    width: 700px;
    margin-top: 50px;
    border-radius: 20px;
  }
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