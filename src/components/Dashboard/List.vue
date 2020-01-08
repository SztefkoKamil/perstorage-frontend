<template>
    <div class="loading-container" v-if="loading">
      <h2>Loading...</h2>
    </div>
  <ul class="file-list" v-else>
    <li v-for="file in files" :key="file.path">
      <img v-if="file.type === 'image'" :src="file.path" alt="">
      <a v-else-if="file.type === 'document'" :href="file.path" target="_blank">
        <span>document</span>
      </a>
      <a v-else-if="file.type === 'compressed'" :href="file.path" :download="file.name">
        <span>compressed</span>
      </a>
      <div class="layout">
        <h3 :title="file.name">{{ file.name }}</h3>
        <button class="layout-btn delete-btn">
          <span class="fa-trash-alt fas"></span>
        </button>
        <a class="layout-btn download-btn" href="">
          <span class="fa-download fas"></span>
        </a>
        <button class="layout-btn edit-btn">
          <span class="fa-edit fas"></span>
        </button>
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

    img {
      max-height: 100%;
      max-width: 100%
    }
    a {
      text-decoration: none;
      color: #fff;
      font-size: 30px;
      cursor: pointer;
    }

    .layout {
      position: absolute;
      width: 100%;
      height: 100%;

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

</style>