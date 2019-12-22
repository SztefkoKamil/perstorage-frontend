import Vue from 'vue'
import Vuex from 'vuex'

import secret from '../../secret'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    postLogin: async (context, user) => {
      const route = secret.mainRoute + secret.loginRoute;
      const request = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'Application/json' }
      };

      try {
        const response = await fetch(route, request)
        if(response.status !== 200) {
          throw new Error('Login filed');
        }
        const result = await response.json();
        
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.userId);

        // redirect to dashboard view

      } catch (err) { console.log(err.message); }
    }
  },
  modules: {
  }
})
