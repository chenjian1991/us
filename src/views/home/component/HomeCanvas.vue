<template>
  <div class="home-canvas" ref="homeCanvas"></div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  mounted() {
    const SEPARATION = 100,
      AMOUNTX = 50,
      AMOUNTY = 50;

    // let { container, camera, scene, renderer } = this
    this.container = ''
    this.camera = ''
    this.scene = ''
    this.renderer = ''
    this.requestAnimation = ''
    // var camera, scene, renderer;

    var particles,
      particle,
      count = 0;

    var mouseX = 0,
      mouseY = -800;

    // var windowHalfX = window.innerWidth / 2;
    // var windowHalfY = window.innerHeight / 2;

    const onWindowResize = () => {
      // windowHalfX = window.innerWidth / 2;
      // windowHalfY = container.clientHeight / 2;
      // camera.aspect = window.innerWidth / container.clientHeight;
      // camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, this.container.clientHeight);
    }

    var init = () => {
      // container = document.createElement("div");
      this.container = this.$refs.homeCanvas
      // document.body.appendChild(container);
      console.log(this.container.clientHeight)
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      this.camera.position.z = 1000;
      this.scene = new THREE.Scene();
      particles = new Array();
      var PI2 = Math.PI * 2;
      var material = new THREE.ParticleCanvasMaterial({
        color: 0xffffff,
        program: function(context) {
          context.beginPath();
          context.arc(0, 0, 1, 0, PI2, true);
          context.fill();
        }
      });
      var i = 0;

      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++] = new THREE.Particle(material);
          particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
          this.scene.add(particle);
        }
      }

      this.renderer = new THREE.CanvasRenderer();
      this.renderer.setSize(window.innerWidth, this.container.clientHeight);
      this.container.appendChild(this.renderer.domElement);

      // container.addEventListener("mousemove", onDocumentMouseMove, false);
      // document.addEventListener("touchstart", onDocumentTouchStart, false);
      // document.addEventListener("touchmove", onDocumentTouchMove, false);
      
      window.addEventListener("resize", onWindowResize, false);
    }

    

    // function onDocumentMouseMove(event) {
    //   mouseX = event.clientX - windowHalfX;
    //   mouseY = event.clientY - windowHalfY;
    // }

    // function onDocumentTouchStart(event) {
    //   if (event.touches.length === 1) {
    //     event.preventDefault();

    //     mouseX = event.touches[0].pageX - windowHalfX;
    //     mouseY = event.touches[0].pageY - windowHalfY;
    //   }
    // }

    // function onDocumentTouchMove(event) {
    //   if (event.touches.length === 1) {
    //     event.preventDefault();
    //     mouseX = event.touches[0].pageX - windowHalfX;
    //     mouseY = event.touches[0].pageY - windowHalfY;
    //   }
    // }


    const render = () => {
      this.camera.position.x += (mouseX - this.camera.position.x) * 0.05;
      this.camera.position.y += (-mouseY - this.camera.position.y) * 0.05;
      // console.log(camera.position.y)
      // camera.position.y = (-mouseY - camera.position.y) * 0.05;
      // camera.position.y = 30
      this.camera.lookAt(this.scene.position);

      var i = 0;

      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++];
          particle.position.y =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;
          particle.scale.x = particle.scale.y =
            (Math.sin((ix + count) * 0.3) + 1) * 2 +
            (Math.sin((iy + count) * 0.5) + 1) * 2;
        }
      }

      this.renderer.render(this.scene, this.camera);

      count += 0.1;
    }

    const animate = () => {
      this.requestAnimation = requestAnimationFrame(animate);
      render();
    }

    init();
    animate();
  },
  beforeDestroy() {
    this.container = ''
    this.camera = ''
    this.scene = ''
    this.renderer = ''
    cancelAnimationFrame(this.requestAnimation)
  }
};
</script>
<style lang="less">
.home-canvas{
  width: 100%;
  height: 306px;
  background: #151D24;
}
</style>