import { Scene, Vector3, Box3 } from 'three'

/**
 * Exploder class is used to explode an object
 */
export default class Exploder {
  static DEFAULT_SCALE = 1
  private scene: Scene
  private objectId: number // target object to be exploded
  public position: Vector3 // position of exploder
  private scale: number // power of exploder, means how far will a sub-object exploded away
  private explodedTimes: number = 0 // an object can be exploded more than once

  /**
   * Constructor of Explode
   * @param objectId target object id, that is going to be exploded
   * @param position if undefined, will explode object by its center
   * @param scale scale factor, 1 means 1 time farer away from exploder's position
   */
  public constructor(
    scene: Scene,
    objectId: number,
    position: Vector3 | undefined = undefined,
    scale: number = Exploder.DEFAULT_SCALE
  ) {
    this.scene = scene
    this.objectId = objectId
    if (!objectId) {
      console.log(`Invalid objectId: ${objectId}`)
    }
    this.scale = scale
    if (scale <= 0) {
      console.log(`Invalid scale: ${scale}`)
    }
    if (position) {
      this.position = position
    } else {
      this.position = new Vector3()
      this.getObjectCenter(this.position)
    }
  }

  /**
   * Explode the object
   */
  public explode() {
    if (!this.objectId || !this.position || !this.scale) {
      console.log(
        `Invalid objectId: ${this.objectId}, or position: ${this.position}, or this.power: ${this.scale}`
      )
      return
    }
    const object = this.scene.getObjectById(this.objectId)
    if (!object || !object.children) {
      console.log('No children to explode!')
      return
    }
    console.log(`position: ${this.position.x}, ${this.position.y}, ${this.position.z}`)
    object.children.forEach((childObj) => {
      const pos = new Vector3(childObj.position.x, childObj.position.y, childObj.position.z)
      const distance = pos.sub(this.position) // get distance from childObj to exploder position
      childObj.position.addScaledVector(distance, this.scale)
    })
    this.explodedTimes++
  }

  /**
   * Unexplode the object
   */
  public unexplode() {
    const object = this.scene.getObjectById(this.objectId)
    if (!object || !object.children) {
      console.log('No children to explode!')
      return
    }
    for (let i = this.explodedTimes; i > 0; --i) {
      object.children.forEach((childObj) => {
        const pos = new Vector3(childObj.position.x, childObj.position.y, childObj.position.z)
        const factor = this.scale / (1 + this.scale)
        const dist = pos.sub(this.position)
        dist.x *= factor
        dist.y *= factor
        dist.z *= factor
        childObj.position.sub(dist)
      })
    }
  }

  private getObjectCenter(center: Vector3) {
    const bbox = new Box3()
    if (!this.objectId) {
      console.log(`Invalid objectId: ${this.objectId}`)
      return
    }
    const object = this.scene.getObjectById(this.objectId)
    if (!object || !object.children) {
      console.log('No children to explode!')
      return
    }
    object.traverse((obj) => {
      bbox.expandByObject(obj)
    })
    bbox.getCenter(center)
  }
}
