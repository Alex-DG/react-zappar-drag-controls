import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls'

// import Face from './Face'

import modelSrc from '../assets/Shark_Animated.glb'
import Experience from '.'

export default class World {
  private experience = new Experience()
  private dragControls!: DragControls
  private model!: GLTF

  private raycaster = new THREE.Raycaster()
  private clickMouse = new THREE.Vector2()
  private moveMouse = new THREE.Vector2()
  private draggable!: any

  private isTouch = false

  private cameraQinvert = new THREE.Quaternion()
  private cameraWorldPos = new THREE.Vector3()
  private centerOfScene = new THREE.Vector3(0, 0, 0)

  constructor() {
    this.setShark()

    const directionalLight = new THREE.DirectionalLight('white', 0.8)
    directionalLight.position.set(0, 5, 0)
    directionalLight.lookAt(0, 0, 0)

    const ambientLight = new THREE.AmbientLight('white', 0.4)

    this.experience.scene.add(directionalLight, ambientLight)

    window.addEventListener('touchstart', (event) => {
      // if (this.draggable) {
      //   console.log(`Dropping object: ${this.draggable.userData.name}`)
      //   // this.draggable = null
      //   return
      // }

      const { clientX, clientY } = event.touches[0]
      // const { clientX, clientY } = event

      // THREE RAYCASTER
      this.clickMouse.x = (clientX / window.innerWidth) * 2 - 1
      this.clickMouse.y = -(clientY / window.innerHeight) * 2 + 1

      this.raycaster.setFromCamera(
        this.clickMouse,
        this.experience.camera.instance
      )
      const found = this.raycaster.intersectObjects(
        this.experience.scene.children,
        true
      )

      if (found.length > 0 && found[0].object.userData.draggable) {
        this.draggable = found[0].object
        console.log(`Object found: ${found[0].object.userData.name}`)
      }
    })

    // window.addEventListener('mousemove', (event) => {
    //   this.moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1
    //   this.moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    //   console.log(this.moveMouse)
    // })
    document.addEventListener(
      'touchmove',
      (event) => {
        this.isTouch = true
        // reset the transparency
        const { clientX, clientY } = event.changedTouches[0]
        console.log({ clientX, clientY })
        // const { clientX, clientY } = event
        this.moveMouse.x = (clientX / window.innerWidth) * 2 - 1
        this.moveMouse.y = -(clientY / window.innerHeight) * 2 + 1
      },
      false
    )

    document.addEventListener(
      'touchend',
      (event) => {
        console.log('touch end!')
        const { clientX, clientY } = event.changedTouches[0]

        this.moveMouse.x = (clientX / window.innerWidth) * 2 - 1
        this.moveMouse.y = -(clientY / window.innerHeight) * 2 + 1

        this.isTouch = false
      },
      false
    )
  }

  dragObject() {
    if (this.draggable != null && this.isTouch) {
      this.model.scene.position.x = this.moveMouse.x * 6
      this.model.scene.position.y = this.moveMouse.y * 6
    }
  }

  setShark() {
    const gltfLoader = new GLTFLoader()

    gltfLoader.load(
      modelSrc,
      (gltf) => {
        this.model = gltf

        let mesh = this.model.scene.children.find(
          (child) => child.name === 'ParentFBXASC032Sharkbody1'
        ) as THREE.SkinnedMesh

        mesh.userData = { name: 'SHARK', draggable: true }

        this.model.scene.scale.setScalar(0.012)
        this.model.scene.position.z = -12
        this.model.scene.rotation.y = Math.PI / 2

        this.model.scene.visible = true

        this.experience.scene.add(this.model.scene)
      },
      undefined,
      () => {
        console.log('An error ocurred loading the GLTF model')
      }
    )
  }

  update() {
    this.dragObject()

    this.cameraQinvert.copy(this.experience.camera.perspectiveCamera.quaternion)
    this.cameraQinvert.invert()
    this.experience.camera.perspectiveCamera.getWorldPosition(
      this.cameraWorldPos
    )

    if (this.model) {
      const distance = this.cameraWorldPos.distanceTo(this.centerOfScene)
      this.model.scene.scale.setScalar(distance)
      this.model.scene.quaternion.copy(this.cameraQinvert)
    }
  }
}
