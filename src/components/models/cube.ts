import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three'

const createCube = () => {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshStandardMaterial({ color: 0x00ff00 })
  const cube = new Mesh(geometry, material)
  return cube
}
export { createCube }
