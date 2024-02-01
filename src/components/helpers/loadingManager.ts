import { LoadingManager } from 'three'
import { ElLoading } from 'element-plus'
let loadingInstance: any
const loadingManager = new LoadingManager()

loadingManager.onStart = () => {
  loadingInstance = ElLoading.service({
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
loadingManager.onProgress = (url, loaded: number, total: number) => {
  const persent = ((loaded * 100) / total).toFixed(2)
  loadingInstance.setText(`
  加载:::${url}:::${persent}%
  `)
}
loadingManager.onLoad = () => {
  loadingInstance.close()
}
loadingManager.onError = () => {
  console.error('❌ error while loading')
  loadingInstance.close()
}
export { loadingManager }
