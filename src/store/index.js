import Vue from 'vue'
import Vuex from 'vuex'

import secret from '../../secret'
import { eventBus } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileTypes: ['image/jpeg', 'image/jpg', 'image/png', 'application/zip', 'application/x-7z-compressed', 'application/x-rar-compressed', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    filesToUpload: [],
    userFiles: []
  },
  mutations: {
    setFiles(state, files) {
      const typeFilter = files.filter(file => state.fileTypes.includes(file.type));
      const sizeFilter = typeFilter.filter(file => file.size < 3002880);
      const filesCounter = sizeFilter.length;

      if(filesCounter > 0) state.filesToUpload = sizeFilter;
      else state.filesToUpload = [];

      let newInfo;
      if(filesCounter === 1) newInfo = '1 file chosen';
      else if (filesCounter > 1) newInfo = `${filesCounter} files chosen`
      eventBus.$emit('changeInfo', newInfo);
    }
  },
  actions: {
    getFiles: async (context) => {
      try {
        const route = secret.mainRoute + secret.getFiles;
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'Application/json',
            'Authorization': 'Bearer ' + token
          }
        };

        const response = await fetch(route, config);
        const result = await response.json();
        // console.log(result);
        context.state.userFiles = result;
        eventBus.$emit('filesFetched');
      } catch (err) { console.log(err.message); }
    },
    postFiles: async (context) => {
      const files = context.state.filesToUpload;
      if(files.length === 0) { return false; }

      eventBus.$emit('changeInfo', 'Uploading files');

      const formData = new FormData();
      for(const file of files) {
        formData.append('files', file);
      }

      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const route = secret.mainRoute + secret.postFiles + '?userid=' + userId;
      const config = {
        method: 'POST',
        body: formData,
        headers: { 'Authorization': 'Bearer ' + token }
      };

      try {
        const response = await fetch(route, config);
        const result = await response.json();
        if(response.status !== 201) {
          console.log(result);
          // call showError VUEX action
          throw new Error('Files uploading filed');
        }
        console.log(result);

        context.state.filesToUpload = [];

        eventBus.$emit('changeInfo', 'Files uploaded');
        setTimeout(() => {
          eventBus.$emit('changeInfo', 'Hello, add some files');
        }, 3000)

        // reload files in dashboard
        context.dispatch('getFiles');

      } catch (err) { console.log(err.message); }
    },
    deleteFile: async (context, fileId) => {
      // add alert question here

      const route = secret.mainRoute + secret.deleteFile + fileId;
      const token = localStorage.getItem('token');
      const config = {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      }

      try {
        const response = await fetch(route, config);
        const result = await response.json();
        if(response.status !== 202) {
          console.log(result);
          // call showError VUEX action
          throw new Error('Files uploading filed');
        }
        console.log(result);

        eventBus.$emit('hideConfirm');

        context.state.userFiles = context.state.userFiles.filter(file => file.id !== fileId );
      } catch (err) { console.log(err.message); }
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
