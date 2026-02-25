<template>
  <div class="spinner">
    <div class="loadingio-spinner-rolling-dir07futyzr">
      <div class="ldio-3zucp4fvxv6">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Spinner",

  components: {},

  data() {return{}},

  methods: {},
};
</script>

<style type="text/css">
@keyframes ldio-3zucp4fvxv6 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.spinner {
    display: flex;
    align-items: center;
    justify-content: center;
}

.ldio-3zucp4fvxv6 div {
  position: absolute;
  width: 65px;
  height: 65px;
  border: 5px solid #0871cd;
  border-top-color: transparent;
  border-radius: 50%;
}
.ldio-3zucp4fvxv6 div {
  animation: ldio-3zucp4fvxv6 1s linear infinite;
  top: 50px;
  left: 50px;
}
.loadingio-spinner-rolling-dir07futyzr {
  width: 60px;
  height: 60px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.ldio-3zucp4fvxv6 {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.6);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-3zucp4fvxv6 div {
  box-sizing: content-box;
}
</style>