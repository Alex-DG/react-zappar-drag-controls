import * as THREE from 'three'
import * as ZapparThree from '@zappar/zappar-threejs'

import Experience from '..'

import faceTextureTemplate from '../../assets/faceMeshTemplate.png'
import Lights from './lights'

export default class Face {
  private experience: Experience
  private lights!: Lights

  private faceMaterial!: THREE.MeshStandardMaterial
  private faceBufferGeometry!: ZapparThree.FaceBufferGeometry

  public faceTrackerGroup!: ZapparThree.FaceAnchorGroup
  public faceMeshMesh!: THREE.Mesh

  constructor() {
    this.experience = new Experience()

    this.setLights()
    this.setFace()
    this.setVisibility()
  }

  private setLights() {
    this.lights = new Lights()

    this.experience.scene.add(
      this.lights.directionalLight,
      this.lights.ambientLight
    )
  }

  private setVisibility() {
    this.faceTrackerGroup.faceTracker.onVisible.bind(() => {
      this.faceTrackerGroup.visible = true
    })

    this.faceTrackerGroup.faceTracker.onNotVisible.bind(() => {
      this.faceTrackerGroup.visible = false
    })
  }

  private setFace() {
    const manager = new ZapparThree.LoadingManager()

    // Tracker
    const faceTracker = new ZapparThree.FaceTrackerLoader(manager).load()

    // Tracker group
    this.faceTrackerGroup = new ZapparThree.FaceAnchorGroup(
      this.experience.camera.instance,
      faceTracker
    )
    this.experience.scene.add(this.faceTrackerGroup)

    // Face Mesh
    const faceMesh = new ZapparThree.FaceMeshLoader(manager).load()
    this.faceBufferGeometry = new ZapparThree.FaceBufferGeometry(faceMesh)

    // Texture
    const textureLoader = new THREE.TextureLoader(manager)
    const faceTexture = textureLoader.load(faceTextureTemplate)
    faceTexture.flipY = true

    this.faceMaterial = new THREE.MeshStandardMaterial({
      map: faceTexture,
      transparent: true,
    })

    // Construct a THREE Mesh object from our geometry and texture
    // and add it to our tracker group
    this.faceMeshMesh = new THREE.Mesh(
      this.faceBufferGeometry,
      this.faceMaterial
    )

    this.faceTrackerGroup.add(this.faceMeshMesh)
  }

  public update() {
    if (this.faceBufferGeometry) {
      this.faceBufferGeometry.updateFromFaceAnchorGroup(this.faceTrackerGroup)
    }
  }

  public destroy() {
    const shouldDispose =
      !!this.faceMaterial &&
      !!this.faceBufferGeometry &&
      !!this.lights &&
      !!this.experience.scene

    if (shouldDispose) {
      this.faceMaterial.dispose()
      this.faceBufferGeometry.dispose()

      this.faceTrackerGroup.remove(this.faceMeshMesh)

      this.experience.scene.remove(
        this.lights.directionalLight,
        this.lights.ambientLight
      )
    }
  }
}
