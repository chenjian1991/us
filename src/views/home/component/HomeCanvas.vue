<template>
  <div class="home-canvas" ref="homeCanvas"></div>
</template>
<script>
export default {
  data() {
    return {
      _container: '',
      _camera: '',
      _scene: '',
      _renderer: '',
      _requestAnimation: ''
    };
  },
  mounted() {
    const SEPARATION = 100;
    const AMOUNTX = 50;
    const AMOUNTY = 50;


    let particles;
    let particle;
    let count = 0;

    const mouseX = 0;
    const mouseY = -800;
    

    const init = () => {
      this._container = this.$refs.homeCanvas
      this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
      this._camera.position.z = 1000
      this._scene = new THREE.Scene()
      particles = new Array()
      const PI2 = Math.PI * 2
      const material = new THREE.ParticleCanvasMaterial({
        color: 0xffffff,
        program: function(context) {
          context.beginPath()
          context.arc(0, 0, 1, 0, PI2, true)
          context.fill()
        }
      })
      var i = 0;

      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++] = new THREE.Particle(material);
          particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
          this._scene.add(particle)
        }
      }

      this._renderer = new THREE.CanvasRenderer()
      this._renderer.setSize(window.innerWidth, this._container.clientHeight)
      this._container.appendChild(this._renderer.domElement)
    }
    
    const render = () => {
      this._camera.position.x += (mouseX - this._camera.position.x) * 0.05
      this._camera.position.y += (-mouseY - this._camera.position.y) * 0.05
      this._camera.lookAt(this._scene.position);

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

      this._renderer.render(this._scene, this._camera);

      count += 0.1;
    }

    const animate = () => {
      this._requestAnimation = requestAnimationFrame(animate);
      render();
    }

    window.addEventListener("resize", this.resizeFn, false);

    init();
    animate();
  },
  methods: {
    resizeFn() {
      this._renderer.setSize(window.innerWidth, this._container.clientHeight);
    }
  },
  beforeDestroy() {
    this._container = ''
    this._camera = ''
    this._scene = ''
    this._renderer = ''
    cancelAnimationFrame(this._requestAnimation)
    window.removeEventListener('resize', this.resizeFn, false)
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