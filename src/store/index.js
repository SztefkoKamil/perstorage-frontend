import Vue from 'vue';
import Vuex from 'vuex';
import downloadjs from 'downloadjs';
import secret from '../../secret';
import { eventBus } from '../main';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileTypes: secret.fileTypes,
    filesToUpload: [],
    userFiles: []
  },
  mutations: {
    setFilesToUpload(state, files) {
      const userFiles = state.userFiles;

      const typeFilter = files.filter(file => state.fileTypes.includes(file.type));
      const sizeFilter = typeFilter.filter(file => file.size < 2000000);
      if(userFiles.length + sizeFilter.length > 20) {
        let loop = true;
        while(loop) {
          sizeFilter.pop();
          if(userFiles.length + sizeFilter.length <= 20) loop = false;
        }
      }
      const nameFilter = sizeFilter.filter(file => {
        for(const i in userFiles) {
          if(file.name === userFiles[i].name) return false;
        }
        return true;
      });

      const filesCounter = nameFilter.length;
      if(filesCounter > 0) state.filesToUpload = nameFilter;
      else state.filesToUpload = [];

      let newInfo = 'Hello, add some files.';
      if(filesCounter === 1) newInfo = '1 file chosen';
      else if (filesCounter > 1) newInfo = `${filesCounter} files chosen`;
      eventBus.$emit('changeInfo', newInfo);
    }
  },
  actions: {
    getFiles: async (context) => {
      eventBus.$emit('showLoading');
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
        context.state.userFiles = result;
        eventBus.$emit('hideLoading');
        eventBus.$emit('filesFetched');

      } catch (err) {
        const result = { message: 'Sorry, server error. Try again in 5 min.', error: true };
        eventBus.$emit('hideLoading');
        eventBus.$emit('showNotification', result);
        console.log(err.message);
      }
    },
    postFiles: async (context) => {
      eventBus.$emit('showLoading');
      const files = context.state.filesToUpload;
      if(files.length === 0) return false;

      eventBus.$emit('changeInfo', 'Uploading files');

      const formData = new FormData();
      for(const file of files) { formData.append('files', file); }

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
          result.error = true;
          eventBus.$emit('hideLoading');
          eventBus.$emit('showNotification', result);
          throw new Error('Files uploading filed');
        }

        eventBus.$emit('hideLoading');
        eventBus.$emit('showNotification', result);
        context.state.filesToUpload = [];

        eventBus.$emit('closePanel');
        eventBus.$emit('changeInfo', 'Hello, add some files.');

        context.state.userFiles = [...context.state.userFiles, ...result.addedFiles];

      } catch (err) {
        const result = { message: 'Sorry, server error. Try again in 5 min.', error: true };
        eventBus.$emit('hideLoading');
        eventBus.$emit('showNotification', result);
        console.log(err.message);
      }
    },
    downloadFile: async (context, fileData) => {
      eventBus.$emit('showLoading');
      const token = localStorage.getItem('token');
      const url = secret.mainRoute + secret.downloadFile + fileData.id;
      const config = { headers: { Authorization: 'Bearer ' + token } };
      let browserError = null;

      try {
        const response = await fetch(url, config);
        if (response.status === 200) browserError = true;
        const newResponse = new Response(response.body);
        const blob = await newResponse.blob();
        downloadjs(blob, fileData.name);
        eventBus.$emit('hideLoading');

      } catch (err) {
        const result = { message: 'Sorry, server error. Try again in 5 min.', error: true };
        if(browserError) result.message = 'Sorry, can\'t download a file - browser error.';
        eventBus.$emit('hideLoading');
        eventBus.$emit('showNotification', result);
        console.log(err.message);
      }
    },
    editFile: async (context, data) => {
      eventBus.$emit('hideConfirm');
      eventBus.$emit('showLoading');
      const route = secret.mainRoute + secret.putFile;
      const token = localStorage.getItem('token');
      const config = {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      
      try {
        const response = await fetch(route, config);
        const result = await response.json();
        if(response.status !== 202) {
          result.error = true;
          eventBus.$emit('hideLoading');
          eventBus.$emit('showNotification', result);
          throw new Error('File updating filed');
        }

        eventBus.$emit('hideLoading');
        eventBus.$emit('showNotification', result);

        context.state.userFiles.forEach(file => {
          if(file.id === data.id) file.name = data.name + data.ext;
        });

      } catch (err) {
        const result = { message: 'Sorry, server error. Try again in 5 min.', error: true };
        eventBus.$emit('hideLoading');
        eventBus.$emit('showNotification', result);
        console.log(err.message);
      }
    },
    deleteFile: async (context, fileId) => {
      eventBus.$emit('hideConfirm');
      eventBus.$emit('showLoading');
      const route = secret.mainRoute + secret.deleteFile + fileId;
      const token = localStorage.getItem('token');
      const config = {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      };

      try {
        const response = await fetch(route, config);
        const result = await response.json();
        if(response.status !== 202) {
          result.error = true;
          eventBus.$emit('hideLoading');
          eventBus.$emit('showNotification', result);
          throw new Error('File deleting failed');
        }

        eventBus.$emit('hideLoading');
        eventBus.$emit('showNotification', result);

        context.state.userFiles = context.state.userFiles.filter(file => file.id !== fileId );

      } catch (err) {
        const result = { message: 'Sorry, server error. Try again in 5 min.', error: true };
        eventBus.$emit('hideLoading');
        eventBus.$emit('showNotification', result);
        console.log(err.message);
      }
    },
    deleteUser: async () => {
      eventBus.$emit('hideConfirm');
      eventBus.$emit('showLoading');
      const route = secret.mainRoute + secret.deleteUser;
      const token = localStorage.getItem('token');
      const config = {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'Application/json',
          'Authorization': 'Bearer ' + token
        }
      };

      try {
        const response = await fetch(route, config);
        const result = await response.json();
        if(response.status !== 202) {
          result.error = true;
          eventBus.$emit('hideLoading');
          eventBus.$emit('showNotification', result);
          throw new Error('User delete failed');
        }

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        eventBus.$emit('hideLoading');
        eventBus.$emit('setView', 'Login');

      } catch (err) {
        const result = { message: 'Sorry, server error. Try again in 5 min.', error: true };
        eventBus.$emit('hideLoading');
        eventBus.$emit('showNotification', result);
        console.log(err.message);
      }
    },
    postLogin: async (context, user) => {
      eventBus.$emit('showLoading');
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
          result.error = true;
          eventBus.$emit('hideLoading');
          eventBus.$emit('showNotification', result);
          throw new Error('Login failed');
        }
        
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.userId);
        eventBus.$emit('setView', 'Dashboard');

      } catch (err) {
        const result = { message: 'Sorry, server error. Try again in 5 min.', error: true };
        eventBus.$emit('hideLoading');
        eventBus.$emit('showNotification', result);
        console.log(err.message);
      }
    },
    postSignup: async (context, newUser) => {
      eventBus.$emit('showLoading');
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
          result.error = true;
          eventBus.$emit('hideLoading');
          eventBus.$emit('showNotification', result);
          throw new Error('Signup failed');
        }
        
        eventBus.$emit('hideLoading');
        eventBus.$emit('setView', 'Login');

      } catch (err) {
        const result = { message: 'Sorry, server error. Try again in 5 min.', error: true };
        eventBus.$emit('hideLoading');
        eventBus.$emit('showNotification', result);
        console.log(err.message);
      }
    }
  }
});
