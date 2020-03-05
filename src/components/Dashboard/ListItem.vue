<template>
  <div class="list-item-file">
    <img v-if="fileData.type === 'image'" :src="fileData.path" alt="">
    <i v-else-if="fileData.type === 'document'" class="fas fa-file-alt fa-4x"></i>
    <i v-else-if="fileData.type === 'compressed'" class="fas fa-file-archive fa-4x"></i>
    <!-- layout background button  -->
    <div class="layout" >
      <div class="layout-bg-btn" 
        v-if="fileData.type === 'image'" 
        @click="showGallery"></div>
      <a class="layout-bg-btn" 
        v-else-if="fileData.type === 'document'" 
        :href="fileData.path"  
        target="_blank"></a>
      <a class="layout-bg-btn" 
        v-else-if="fileData.type === 'compressed'" 
        :href="fileData.path"></a>
      <!-- file name -->
      <h3 :title="fileData.name">{{ fileData.name }}</h3>
      <!-- delete button -->
      <button class="layout-btn delete-btn fa-trash-alt fas" @click="deleteFile"></button>
      <!-- download button -->
      <a v-if="fileData.type === 'document'" 
        :href="fileData.path" 
        target="_blank" 
        :download="fileData.name" 
        class="layout-btn download-btn fa-download fas"></a>
      <a v-else-if="fileData.type === 'compressed'" 
        :href="fileData.path" 
        :download="fileData.name" 
        class="layout-btn download-btn fa-download fas"></a>
      <a v-else 
        :href="fileData.path" 
        :download="fileData.name" 
        target="_blank" 
        class="layout-btn download-btn fa-download fas"></a>
        <!-- edit file name button -->
      <button @click="editFile" :data-value="fileData.name" class="layout-btn edit-btn fa-edit fas"></button>
    </div>
  </div>  
</template>

<script>
import { eventBus } from '../../main';

export default {
  props: ['fileData'],
  methods: {
    editFile(e) {
      const fileData = {
        actionType: 'edit-file',
        fileId: e.target.parentNode.parentNode.attributes.getNamedItem('data-id').value,
        fileName: e.target.attributes.getNamedItem('data-value').value
      };
      eventBus.$emit('showConfirm', fileData);
    },
    deleteFile(e) {
      const fileData = {
        actionType: 'delete-file',
        fileId: e.target.parentNode.parentNode.attributes.getNamedItem('data-id').value
      };
      eventBus.$emit('showConfirm', fileData);
    },
    showGallery(e) {
      const imageId = e.target.parentNode.parentNode.attributes.getNamedItem('data-id').value;
      const images =  this.$store.state.userFiles.filter(file => file.type === 'image');
      const index = images.findIndex(img => img.id === imageId);
      eventBus.$emit('showGallery', index);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/flexMixins.scss";
@import "../../scss/variables.scss";

.list-item-file {
    @include flexColumn(space-around);
    position: relative;
    height: 100%;
    width: 100%;
    max-width: 300px;
    background: $colorOne;
    margin: 0 auto;


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
      color: $fontColorTwo;
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
      color: $fontColorTwo;
      white-space: nowrap;
      text-align: center;
      text-overflow: ellipsis;
      user-select: none;
      overflow: hidden;
      background: rgba(175, 175, 175, 0.9);
    }
  }
}

#app.mouseDevice .list-item-file .layout {
  height: 140%;
  transition: height .15s linear;
}
#app.mouseDevice .list-item-file:hover .layout {
  height: 100%;
}

</style>