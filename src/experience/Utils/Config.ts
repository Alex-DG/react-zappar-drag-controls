import Experience from '..'

import {
  ExperienceConfigScreen,
  ExperienceConfigModel,
  ExperienceConfigControls,
} from '../../config/types'

export default class Config {
  static instance: Config

  private experience!: Experience

  public screen!: ExperienceConfigScreen
  public model!: ExperienceConfigModel
  public controls!: ExperienceConfigControls

  constructor() {
    if (Config.instance) {
      return Config.instance
    }
    Config.instance = this

    this.experience = new Experience()

    this.model = {
      size: 0.0125,
    }

    const targetElement = this.experience.targetElement
    const boundings = targetElement.getBoundingClientRect()
    const width = boundings.width || window.innerWidth
    const height = boundings.height || window.innerHeight

    this.screen = {
      pixelRatio: Math.min(Math.max(window.devicePixelRatio, 1), 2),
      width,
      height,
    }

    this.controls = {
      enabled: true,
    }
  }
}
