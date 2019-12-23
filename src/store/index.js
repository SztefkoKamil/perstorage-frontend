import Vue from 'vue'
import Vuex from 'vuex'

import secret from '../../secret'
import { eventBus } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // allFiles: []
  },
  mutations: {
  },
  actions: {
    // getFiles: async (context) => {
    //   try {
    //     const route = secret.mainRoute + secret.getFiles;
    //     const token = localStorage.getItem('token');
    //     const config = {
    //       headers: {
    //         'Content-Type': 'Application/json',
    //         'Authorization': 'Bearer ' + token
    //       }
    //     };

    //     const response = await fetch(route, config);
    //     const result = await response.json();
    //     console.log(result);
    //   } catch (err) { console.log(err.message); }
    // },
    postFile: async (context, file) => {

    },
    postLogin: async (context, user) => {
      const route = secret.mainRoute + secret.loginRoute;
      const config = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'Application/json' }
      };

      try {
        const response = await fetch(route, config);
        const result = await response.json();
        if(response.status !== 202) {
          console.log(result);
          // call showError VUEX action
          throw new Error('Login failed');
        }
        console.log(result);
        
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.userId);

        // redirect to dashboard view
        eventBus.$emit('setView', 'Dashboard');

      } catch (err) { console.log(err.message); }
    },
    postSignup: async (context, newUser) => {
      const route = secret.mainRoute + secret.signupRoute;
      const config = {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: { 'Content-Type': 'Application/json' }
      };

      try {
        const response = await fetch(route, config);
        const result = await response.json();
        if(response.status !== 201) {
          console.log(result);
          // call showError VUEX action
          throw new Error('Signup failed');
        }
        console.log(result);

        // redirect to login view
        eventBus.$emit('setView', 'Login');

      } catch (err) { console.log(err.message); }
    }
  },
  modules: {
  }
})
