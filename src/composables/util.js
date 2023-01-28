import { ElNotification } from 'element-plus'

export function toast(message, type="success"){
    ElNotification({
        title:'',
        message,
        type,
        duration:3000,
      })
}