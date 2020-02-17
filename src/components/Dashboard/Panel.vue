<template>
  <nav id="panel" :class="{open: isPanelOpen}">
    <div class="btns-panel">
      <button class="delete" @click="deleteUser">delete</button>
      <h4>{{ info }}</h4>
      <button @click="logout">logout</button>
    </div>
    <UploadForm></UploadForm>
    <div v-if="uploadBlocker" class="upload-blocker"></div>
    <div class="panel-info">
      <transition name="toggle-info">
        <p v-if="toggleInfo">
          <span>Enabled file formats: jpeg, jpg, png, pdf, txt, doc, docx, rar, zip, 7z.</span>
          <span>Maximum file size: 2MB</span>
          <span>Maximum number of stored files: 20</span>
        </p>
      </transition>
      <button @click="toggleInfo = !toggleInfo">?</button>
    </div>
    <div class="toggleBtn-wrapper">
      <button 
        @click="isPanelOpen = !isPanelOpen" 
        :class="{open: isPanelOpen}"
        id="toggleBtn" 
        class="fas fa-arrow-alt-circle-down"
      ></button>
    </div>
    <span class="files-counter">{{ filesCounter }} files stored</span>
  </nav>
</template>

<script>
import UploadForm from './UploadForm';
import { eventBus } from '../../main';
import { mapState } from 'vuex';

export default {
  components: { UploadForm },
  data() { return {
      toggleInfo: false,
      navContainer: null,
      isPanelOpen: false,
      info: 'Hello, add some files.',
      filesCounter: 0,
      uploadBlocker: false
    }; },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      eventBus.$emit('setView', 'Login');
    },
    deleteUser() {
      const data = { actionType: 'delete-user' };
      eventBus.$emit('showConfirm', data);
    }
  },
  computed: mapState(['userFiles']),
  watch: {
    userFiles(newFiles) {
      this.filesCounter = newFiles.length;
    },
    filesCounter(filesNumber) {
      if(filesNumber >= 20) {
        eventBus.$emit('disableUploadForm', true);
        this.uploadBlocker = true;
        this.info = 'Files limit reached.';
      } else {
        eventBus.$emit('disableUploadForm', false);
        this.uploadBlocker = false;
        this.info = 'Hello, add some files.';
      }
    }
  },
  created() {
    eventBus.$on('closePanel', () => this.isPanelOpen = false);
    eventBus.$on('changeInfo', info => this.info = info);
    this.filesCounter = this.$store.state.userFiles.length;
  },
  mounted() {
    this.navContainer = document.getElementById('panel');
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/flexMixins.scss";
@import "../../scss/variables.scss";

#panel {
  width: 100%;
  max-width: 500px;
  height: 121px;
  background: $colorOne;
  border-bottom-left-radius: 150px;
  border-bottom: 1px solid $colorTwo;
  border-left: 1px solid $colorTwo;
  position: fixed;
  top: -100px;
  right: 0px;
  transition: transform .2s linear;

  &.open {
    transform: translateY(100px);
  }
}
@media screen and (min-width: 1024px) {
  #panel { position: absolute; }
}

.btns-panel {
  @include flexRow(space-between);
  padding: 10px 0;

  h4 {
    font-weight: 400;
    font-size: 16px;
    width: 50%;
    user-select: none;
    color: $fontColorOne;
  }
  button {
    background: transparent;
    border: 1px solid $colorTwo;
    border-radius: 15px;
    color: $fontColorOne;
    font-size: 14px;
    padding: 6px 17px;
    margin: 0 10px;
    cursor: pointer;
  }
}

.upload-blocker {
  position: absolute;
  top: 56px;
  left: 150px;
  width: 200px;
  height: 30px;
  cursor: not-allowed;
}

.panel-info {
  position: absolute;
  top: 100px;
  left: -30px;
  width: 300px;
  @include flexRow;

  p {
    position: absolute;
    width: 300px;
    color: $fontColorOne;
    background: $colorOne;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid $colorTwo;
    left: 40px;
    top: 20px;
    line-height: 120%;
    text-align: left;
    @include flexColumn(center, flex-start);

    span:nth-child(2) {
      margin: 5px 0;
    }
  }
  .toggle-info-enter-active {
    animation: show-panel-info .1s 1 linear;
  }
  @keyframes show-panel-info {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  .toggle-info-leave-active {
    animation: hide-panel-info .1s 1 linear;
  }
  @keyframes hide-panel-info {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }

  button {
    @include flexRow;
    width: 20px;
    height: 20px;
    background: #fff;
    border: none;
    border-radius: 50%;
    font-size: 18px;
    font-weight: 900;
    color: $colorOne;
    cursor: pointer;
  }
}

.toggleBtn-wrapper {
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-10px);

  #toggleBtn {
    width: 20px;
    height: 20px;
    border: none;
    background: transparent;
    font-size: 20px;
    cursor: pointer;
    transition: transform .2s linear;

    &.open { transform: rotate(180deg); }
  }
  #toggleBtn::after {
    content: "";
    width: 17px;
    height: 17px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -2;
    border-radius: 50%;
    background: $colorTwo;
  }
}

.files-counter {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 18px;
  user-select: none;
  color: $fontColorOne;
  padding-right: 5px;
  line-height: 100%;
}
@media screen and (min-width: 1024px) {
  .files-counter { padding-right: 20px; }
}

</style>