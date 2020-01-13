<template>
    <div class="loading-container" v-if="loading">
      <h2>Loading...</h2>
    </div>
  <ul class="file-list" v-else>
    <li v-for="file in files" :key="file.id" :data-id="file.id">
      <img v-if="file.type === 'image'" :src="file.path" alt="">
      <i v-else-if="file.type === 'document'" class="fas fa-file-alt fa-4x"></i>
      <i v-else-if="file.type === 'compressed'" class="fas fa-file-archive fa-4x"></i>

      <div class="layout" >
        <a class="layout-bg-btn" v-if="file.type === 'document'" :href="file.path"  target="_blank"></a>
        <a class="layout-bg-btn" v-if="file.type === 'compressed'" :href="file.path"></a>
        <h3 :title="file.name">{{ file.name }}</h3>
        <button class="layout-btn delete-btn fa-trash-alt fas" @click="deleteFile"></button>
        <a v-if="file.type === 'document'" :href="file.path" target="_blank" class="layout-btn download-btn fa-download fas"></a>
        <a v-else-if="file.type === 'compressed'" :href="file.path" :download="file.name" class="layout-btn download-btn fa-download fas"></a>
        <a v-else :href="file.path" :download="file.name" target="_blank" class="layout-btn download-btn fa-download fas"></a>
        <button class="layout-btn edit-btn fa-edit fas"></button>
      </div>
    </li>
  </ul>
</template>

<script>
import { eventBus } from '../../main'
import { mapState } from 'vuex';

export default {

  data() {
    return {
      loading: true,
      files: []
    }
  },
  methods: {
    deleteFile(e) {
      const fileId = e.target.parentNode.parentNode.attributes.getNamedItem('data-id').value;
      this.$store.dispatch('deleteFile', fileId)
    }
  },
  computed: mapState(['userFiles']),
  watch: {
    userFiles(newFiles) {
      this.files = newFiles;
    }
  },
  created() {
    // eventBus.$on('fetchingFiles', () => {
    //   this.loading = true;
    // });
    eventBus.$on('filesFetched', () => {
      this.files = this.$store.state.userFiles;
      this.loading = false;
    });
    this.$store.dispatch('getFiles');
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/flexMixins.scss";
@import "../../scss/variables.scss";

.loading-container {
  @include flexRow;
  height: 400px;
}

.file-list {
  width: 100%;
  list-style-type: none;
  --auto-grid-min-size: 12rem;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(var(--auto-grid-min-size), 1fr));
	grid-gap: 0.8rem;
  padding: 30px 20px;
  
  li {
    height: 150px;
    background: hsl(210, 65%, 28%);
    @include flexColumn(space-around);
    overflow: hidden;
    position: relative;

    i { color: $colorTwo; }

    img {
      max-height: 100%;
      max-width: 100%
    }

    .layout {
      position: absolute;
      width: 100%;
      height: 100%;

      .layout-bg-btn {
        height: 100%;
        width: 100%;
        cursor: pointer;
        display: block;
      }
      .layout-btn {
        @include flexRow;
        position: absolute;
        background: rgb(238, 238, 238);
        color: #000;
        font-size: 16px;
        width: 30px;
        height: 30px;
        border: none;
        cursor: pointer;
      }
      .delete-btn {
        top: 0;
        left: 0;
        border-bottom-right-radius: 12px;
        padding: 0 2px 2px 0;
      }
      .download-btn {
        top:0;
        right: 0;
        border-bottom-left-radius: 12px;
        padding: 0 0 2px 2px;
      }
      .edit-btn {
        bottom:0;
        right: 0;
        padding-left: 3px;
      }
      h3 {
        width: 100%;
        height: 30px;
        position: absolute;
        bottom:0;
        left: 0;
        padding: 7px 32px 8px 5px;
        font-size: 13px;
        font-weight: 400;
        color: #222;
        white-space: nowrap;
        text-align: center;
        text-overflow: ellipsis;
        user-select: none;
        overflow: hidden;
        background: rgba(175, 175, 175, 0.9);
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .file-list {
    max-height: calc(100vh - 70px);
    overflow-y: scroll;

    li .layout {
      height: 140%;
      transition: height .15s linear;
    }
    li:hover .layout {
      height: 100%;
    }
    li:last-child { margin-bottom: 20px; }
  }
.file-list::-webkit-scrollbar { background: $colorOne; }
.file-list::-webkit-scrollbar-thumb {
  background: $colorTwo;
  border-radius: 5px;
}
}

</style>