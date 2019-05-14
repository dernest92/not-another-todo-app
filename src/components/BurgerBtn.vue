<template>
  <div @click="update" class="burger-click-region" :class="{active, closing}">
    <span class="burger-menu-piece"></span>
    <span class="burger-menu-piece"></span>
    <span class="burger-menu-piece"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      closing: false,
      isOpen: false
    };
  },
  methods: {
    update() {
      if (this.isOpen) {
        this.closing = true;
        this.active = false;
        this.isOpen = false;
      } else {
        this.closing = false;
        this.active = true;
        this.isOpen = true;
      }
      this.$emit("toggle");
    }
  }
};
</script>

<style lang="scss"  scoped>
.burger-click-region {
  position: relative;
  width: 48px;
  height: 48px;
  cursor: pointer;
  z-index: 20;
  background-color: #2d3436;
  border-radius: 50%;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.4);
  transition: all 1s;

  &.flat {
    background-color: rgba(51, 51, 51, 0);
    box-shadow: none;
    opacity: 1;
    .burger-menu-piece {
      border-top: 3px solid #fff;
    }
  }

  &.active {
    background-color: transparent;
    box-shadow: none;
    .burger-menu-piece {
      border-top: 3px solid #fff !important;
    }
  }
}

$menu-animation-duration: 200ms;
$menu-animation-timing: ease-out;

.burger-menu-piece {
  left: 12px;
  display: block;
  position: absolute;
  width: 24px;
  border-top: 3px solid #fff;
  transform-origin: 50% 50%;
  transition: all $menu-animation-duration $menu-animation-timing;
  transition: border-top 0.5s;

  &:nth-child(1) {
    top: 14px;
  }

  &:nth-child(2) {
    top: 22px;
    opacity: 1;
    transition: transform $menu-animation-duration $menu-animation-timing,
      opacity 0ms linear $menu-animation-duration / 2;
  }

  &:nth-child(3) {
    top: 30px;
  }

  .active & {
    &:nth-child(1) {
      animation: burger-open-top $menu-animation-duration $menu-animation-timing
        forwards;
    }

    &:nth-child(2) {
      opacity: 0;
      transition: transform $menu-animation-duration $menu-animation-timing,
        opacity 0ms linear $menu-animation-duration / 2;
    }

    &:nth-child(3) {
      animation: burger-open-bot $menu-animation-duration $menu-animation-timing
        forwards;
    }
  }

  .closing & {
    &:nth-child(1) {
      animation: burger-close-top $menu-animation-duration
        $menu-animation-timing forwards;
    }

    &:nth-child(3) {
      animation: burger-close-bot $menu-animation-duration
        $menu-animation-timing forwards;
    }
  }
}

@keyframes burger-open-top {
  50% {
    transform: translate3d(0, 8px, 0);
  }
  100% {
    transform: translate3d(0, 8px, 0) rotate(45deg);
  }
}

@keyframes burger-open-bot {
  50% {
    transform: translate3d(0, -8px, 0);
  }
  100% {
    transform: translate3d(0, -8px, 0) rotate(-45deg);
  }
}

@keyframes burger-close-top {
  0% {
    transform: translate3d(0, 8px, 0) rotate(45deg);
  }
  50% {
    transform: translate3d(0, 8px, 0) rotate(0deg);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes burger-close-bot {
  0% {
    transform: translate3d(0, -10px, 0) rotate(-45deg);
  }
  50% {
    transform: translate3d(0, -10px, 0) rotate(0deg);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
