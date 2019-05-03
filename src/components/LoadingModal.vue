<template>
  <div class="loading-modal">
    <div class="place-spinner">
      <div class="ring-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
$spinner-color: #fff;

.loading-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.75);
}
.place-spinner {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.ring-spinner {
  display: inline-block;
  position: relative;

  // Control the overall diameter of the circle here
  width: 3rem;
  height: 3rem;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;

    // Control the width of the circular line here
    border: 5px solid;

    // Make different border sides transparent for different patterns
    border-color: $spinner-color $spinner-color transparent transparent;

    // Changing cubic-bezier
    // See http://cubic-bezier.com to make easy variants
    animation: ring-spin 1.2s cubic-bezier(0.57, 0.05, 0.58, 0.94) infinite;
  }
  div:nth-child(1) {
    animation-delay: -0.25s;
  }
  div:nth-child(2) {
    animation-delay: -0.17s;
  }
  div:nth-child(3) {
    animation-delay: -0.1s;
  }
}
@keyframes ring-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
