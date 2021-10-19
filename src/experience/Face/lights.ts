import * as THREE from 'three'

export default class Lights {
  public directionalLight!: THREE.DirectionalLight
  public ambientLight!: THREE.AmbientLight

  constructor() {
    this.setLights()
  }

  private setLights() {
    this.directionalLight = new THREE.DirectionalLight('white', 0.8)
    this.directionalLight.position.set(0, 5, 0)
    this.directionalLight.lookAt(0, 0, 0)

    this.ambientLight = new THREE.AmbientLight('white', 0.4)
  }
}
