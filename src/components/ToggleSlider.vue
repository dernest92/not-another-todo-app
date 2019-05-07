<template>
  <div class="toggle-container">
    <label class="switch" for="checkbox">
      <input ref="checkbox" type="checkbox" id="checkbox" @input="update">
      <div class="slider round"></div>
    </label>
  </div>
</template>

<script>
export default {
  props: ["value"],
  methods: {
    update() {
      this.$emit("input", this.$refs.checkbox.checked);
    }
  }
};
</script>

<style lang="scss" scoped>
$width: 40px;
$height: $width * (34/60);

.toggle-container {
  display: inline-block;
}
.switch {
  display: inline-block;
  height: $height;
  position: relative;
  width: $width;
}

.switch input {
  display: none;
}

.slider {
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;
}

.slider:before {
  background-color: #fff;
  bottom: $height * 0.12;
  content: "";
  height: $height * 0.76;
  left: $height * 0.12;
  position: absolute;
  transition: 0.4s;
  width: $height * 0.76;
}
label {
  margin: 0;
}

input:checked + .slider {
  background-color: #66bb6a;
}

input:checked + .slider:before {
  transform: translateX($height * 0.76);
}

.slider.round {
  border-radius: $height;
}

.slider.round:before {
  border-radius: 50%;
}

body {
  background-color: #f1f2f3;
}
</style>
