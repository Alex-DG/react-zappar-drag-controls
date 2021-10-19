import * as ZapparThree from '@zappar/zappar-threejs'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Experience from '.'

export default class Camera {
  private experience: Experience

  public controls!: OrbitControls
  public perspectiveCamera!: THREE.PerspectiveCamera

  public instance!: ZapparThree.Camera

  constructor() {
    this.experience = new Experience()

    this.setInstance()
  }

  private setInstance() {
    this.instance = new ZapparThree.Camera()

    this.perspectiveCamera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    this.perspectiveCamera.position.z = 0.01

    this.controls = new OrbitControls(
      this.perspectiveCamera,
      this.experience.targetElement
    )

    this.controls.rotateSpeed = 2.0
    this.controls.zoomSpeed = 1.2
    this.controls.panSpeed = 0.8
    // this.controls.enabled = true
    // this.controls.enableZoom = true

    this.experience.scene.add(this.perspectiveCamera)
  }

  public start(value = true) {
    this.instance.start(value)
  }

  public update() {
    if (this.experience.renderer && this.controls) {
      // this.controls.update()
      this.instance.updateFrame(this.experience.renderer.instance)
    }
  }
}
