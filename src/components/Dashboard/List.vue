<template>
  <ul class="file-list">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>

.file-list {
  width: 100%;
  list-style-type: none;
  --auto-grid-min-size: 12rem;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(var(--auto-grid-min-size), 1fr));
	grid-gap: 0.8rem;
  padding: 30px 20px;
  
  li {
    height: 120px;
    background: hsl(210, 65%, 28%);
  }
}

</style>