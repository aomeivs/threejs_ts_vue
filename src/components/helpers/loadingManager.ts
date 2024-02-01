import { LoadingManager } from 'three'
import { ElLoading } from 'element-plus'
let loadingInstance: any
const loadingManager = new LoadingManager()

loadingManager.onStart = () => {
  loadingInstance = ElLoading.service()
}
loadingManager.onProgress = (url, loaded, total) => {
  loadingInstance.setText(`${url} -> ${loaded} / ${total}`)
}
loadingManager.onLoad = () => {
  loadingInstance.close()
}
loadingManager.onError = () => {
  console.log('❌ error while loading')
}
export { loadingManager }
