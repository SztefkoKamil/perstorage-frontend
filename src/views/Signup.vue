<template>
  <div class="signup main-view">
    <h1>Signup</h1>
    <SignupForm></SignupForm>
  </div>
</template>

<script>
import SignupForm from '../components/Signup/SignupForm';

export default {
  name: 'home',
  components: {
    SignupForm
  }
}
</script>

<style lang="scss" scoped>
// @import "../scss/variables.scss";
// @import "../scss/flexMixins.scss";

.signup {
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

</style>