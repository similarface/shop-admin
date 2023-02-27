import { ElNotification } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'
export function toast(message, type="success"){
    ElNotification({
        title:'',
        message,
        type,
        duration:3000,
      })
}


export function showModal(content='提示内容', type="warning", title=""){
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type,
    }
  )
}
// 显示全屏loading
export  function  showFullLoading(){
    nprogress.start()
}
// 隐藏全屏loading
export  function  hiddenFullLoading(){
    nprogress.done()
}