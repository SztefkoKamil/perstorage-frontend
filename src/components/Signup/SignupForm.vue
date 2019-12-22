<template>
  <div class="signup-form">
    <label for="signup-name">name</label>
    <input type="text" id="signup-name">
    <label for="signup-email">email</label>
    <input type="text" id="signup-email">
    <label for="signup-pass1">password</label>
    <input type="text" id="signup-pass1">
    <label for="signup-pass2">repeat password</label>
    <input type="text" id="signup-pass2">
    <div class="terms">
      <input type="checkbox" id="signup-terms">
      <label for="signup-terms">Read & accept 
        <button>privacy policy</button>
      </label>
    </div>
    <!-- captcha here -->
    <button type="submit">Submit</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'login',
  components: {  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "../scss/variables.scss";
@import "../../scss/flexMixins.scss";

.signup-form {
  @include flexColumn;
  margin-bottom: 50px;

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

  &>button {
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