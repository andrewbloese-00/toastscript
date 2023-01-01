

const ICONS = { 
    LOADING: "⏱️",
    ERROR: "🚫",
    SUCCESS: "✅",
}

const ToastMessage = ( icon , message ) => { 
    let div = document.createElement("div")
    div.classList.add("toast-message")
    div.innerHTML = `
        <span>${icon}</span>
        <p>${message}</p>
    `
    return div
}

export class Toaster { 
    constructor(toasterId="toaster_wrapper"){
        let t = document.createElement("div")
        t.className = "toast_wrapper"
        t.id = toasterId
        document.body.appendChild(t)
        this.toaster = t
        this.toasts = []
        this._cleaner = setInterval(()=>{
            this.toasts.forEach((toast,i)=>{
                if(toast.expires < Date.now()){
                    //animate out
                    toast.notification.classList.add("toast-leaving")
                    setTimeout(()=>{
                        //remove toast from dom 
                        toast.notification.remove()
                        //remove toast from list
                        this.toasts.splice(i,1)

                    },600)

                }
            })
        },1000)
    }
    success(message,expireTime=5000){
        let notification = ToastMessage(ICONS.SUCCESS,message)
        notification.classList.add("toast-success")
        this.toaster.appendChild(notification)
        this.toasts.push({notification,expires: Date.now() + expireTime})
        
    }
    error(message,expireTime=5000){
        let notification = ToastMessage(ICONS.ERROR,message)
        notification.classList.add("toast-error")
        this.toaster.appendChild(notification)
        this.toasts.push({notification,expires: Date.now() + expireTime})
    }
    async loading(promise,loadingMessage="Loading...",error,success){
        let notification = ToastMessage(ICONS.LOADING,loadingMessage)

        this.toaster.appendChild(notification)
        return promise.then((res)=>{
            this.success(success)
            notification.remove()
            return res
        }).catch((error)=>{
            this.error(error)
            notification.remove()
            return error
        })
   

    }
    custom(icon,message,styles,expireTime=5000){
        let notification = ToastMessage(icon,message)
        Object.keys(styles).forEach(attr=>{
            notification.style[attr] = styles[attr]
        })
        this.toaster.appendChild(notification)
        this.toasts.push({notification,expires: Date.now() + expireTime})
    }

}


