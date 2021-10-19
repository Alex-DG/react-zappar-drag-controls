import * as THREE from 'three'

import Experience from '.'

export default class Renderer {
  private experience: Experience
  public instance!: THREE.WebGLRenderer

  constructor() {
    this.experience = new Experience()

    this.removeDomElement()
    this.setInstance()
  }

  private removeDomElement() {
    const canvas = document.querySelector('canvas')
    if (canvas) document.getElementById('experience')?.removeChild(canvas)
  }

  private setInstance() {
    this.instance = new THREE.WebGLRenderer({ antialias: true })
    this.instance.setSize(
      this.experience.config.screen.width,
      this.experience.config.screen.height
    )
    this.instance.setPixelRatio(this.experience.config.screen.pixelRatio)
  }

  public resize() {
    this.instance.setSize(
      this.experience.config.screen.width,
      this.experience.config.screen.height
    )
    this.instance.setPixelRatio(this.experience.config.screen.pixelRatio)
  }

  public update() {
    this.instance.render(this.experience.scene, this.experience.camera.instance)
  }
}
