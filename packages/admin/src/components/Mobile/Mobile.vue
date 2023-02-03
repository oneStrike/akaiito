<template>
  <div class="mobile">
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  name: 'Mobile'
}
</script>

<style scoped lang="scss">
.mobile {
  width: 284px;
  box-sizing: border-box;
  background-image: url('@/assets/images/iphonex-modal.png');
  background-size: 100%;
  box-shadow: 0 4px 25px 0 rgb(4 40 60 / 18%);
  border-radius: 20px;
  padding: 50px 10px 14px;

  .content {
    width: 260px;
    height: 460px;
  }
}
</style>
