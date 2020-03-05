<template>
  <ul class="file-list">
    <li v-for="file in files" :key="file.id">
      <ListItem :fileData="file" :data-id="file.id"></ListItem>
    </li>
  </ul>
</template>

<script>
import { eventBus } from '../../main';
import { mapState } from 'vuex';
import ListItem from './ListItem';

export default {
  components: { ListItem },
  data() { return {
      files: []
  }; },
  computed: mapState(['userFiles']),
  watch: {
    userFiles(newFiles) {
      this.files = newFiles;
    }
  },
  created() {
    eventBus.$on('filesFetched', () => this.files = this.$store.state.userFiles);
    this.$store.dispatch('getFiles');
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/flexMixins.scss";
@import "../../scss/variables.scss";

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
    overflow: hidden;
  }
}
@media screen and (min-width: 1024px) {
  .file-list {
    max-height: calc(100vh - 70px);
    overflow-y: auto;

    li:last-child { margin-bottom: 20px; }
  }
  .file-list::-webkit-scrollbar { background: $colorOne; }
  .file-list::-webkit-scrollbar-thumb {
    background: $colorTwo;
    border-radius: 5px;
  }
}

</style>