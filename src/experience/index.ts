import * as ZapparThree from '@zappar/zappar-threejs'
import * as THREE from 'three'

import Camera from './Camera'
import Renderer from './Renderer'
import World from './World'
import Config from './Utils/Config'

import { ExperienceOptions } from '../config/types'

class Experience {
  static instance: Experience

  private isRunning = false

  public targetElement!: HTMLDivElement
  public config!: Config
  public scene!: THREE.Scene
  public renderer!: Renderer
  public camera!: Camera
  public world!: World

  constructor(options?: ExperienceOptions) {
    // :: AR compatibility check ::.
    if (ZapparThree.browserIncompatible()) {
      ZapparThree.browserIncompatibleUI()
      throw new Error('Unsupported browser')
    }

    // :: Singleton pattern ::
    if (Experience.instance) {
      return Experience.instance
    }
    Experience.instance = this

    if (!options?.targetElement) {
      console.warn("Missing 'targetElement' property")
      return
    }

    // :: DOM ::
    this.targetElement = options?.targetElement

    // :: Intialising experience ::
    this.setConfig()
    this.setScene()
    this.setCamera()
    this.setRenderer()
    this.setWorld()
    this.setResize()

    this.isRunning = true

    console.log('Starting experience...')
    this.update()
  }

  private setWorld() {
    this.world = new World()
  }

  private setCamera() {
    this.camera = new Camera()
    this.camera.instance.start(true)
    this.scene.background = this.camera.instance.backgroundTexture
  }

  private setConfig() {
    this.config = new Config()
  }

  private setScene() {
    this.scene = new THREE.Scene()
  }

  private setResize() {
    window.addEventListener('resize', () => {
      const boundings = this.targetElement.getBoundingClientRect()
      this.config.screen.width = boundings.width || window.innerWidth
      this.config.screen.height = boundings.height || window.innerHeight

      this.renderer.resize()
    })
  }

  private setRenderer() {
    this.renderer = new Renderer()
    this.targetElement.appendChild(this.renderer.instance.domElement)
    ZapparThree.glContextSet(this.renderer.instance.getContext())
  }

  private update() {
    if (this.isRunning) {
      this.camera?.update()
      this.world?.update()
      this.renderer?.update()

      requestAnimationFrame(this.update.bind(this))
    }
  }

  public destroy() {
    this.stop()
  }

  public stop() {
    this.isRunning = false
  }
}

export default Experience
