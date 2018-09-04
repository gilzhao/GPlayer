<template>
  <video id="video" preload="none" poster="https://media.w3.org/2010/05/sintel/poster.png">
    <source id="mp4" src="https://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4">
    <p>Your user agent does not support the HTML5 Video element.</p>
  </video>
</template>

<script>
export default {
	data() {
		return {
		};
	},
};
</script>

<style lang="less">
div {
	color: blueviolet;
}
</style>
