<template>
    <div class="loading-container" v-if="loading">
      <h2>Loading...</h2>
    </div>
  <ul class="file-list" v-else>
    <li v-for="file in files" :key="file.path">
      <h3 :title="file.name">{{ file.name }}</h3>
      <img v-if="file.type === 'image'" :src="file.path" alt="">
      <a v-else-if="file.type === 'document'" :href="file.path" target="_blank">
        <span>document</span>
      </a>
      <a v-else-if="file.type === 'compressed'" :href="file.path" :download="file.name">
        <span>compressed</span>
      </a>
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

    h3 {
      width: 100%;
      font-size: 18px;
      font-weight: 500;
      white-space: nowrap;
      text-align: left;
    }
    img {
      max-height: 80%;
      max-width: 100%
    }
    a {
      text-decoration: none;
      color: #fff;
      font-size: 30px;
      cursor: pointer;
    }
  }
}

</style>