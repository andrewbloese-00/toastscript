

const ICONS = { 
    LOADING: "⏱️",
    ERROR: "🚫",
    SUCCESS: "✅",
    WARNING: "⚠️"
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

class Toaster { 
    constructor(){
        this.toaster = document.createElement("div")
        this.toaster.className = "toast_wrapper"
        document.body.appendChild(this.toaster)
        this.toasts = []
        this.mount()

    }
    /**
     * 
     * @param {string} message a warning message to display to the user
     * @param {number} expireTime the length of time in milliseconds to display the message for
     */
    success(message,expireTime=5000){
        let notification = ToastMessage(ICONS.SUCCESS,message)
        notification.classList.add("toast-success")
        this.toaster.appendChild(notification)
        this.toasts.push({notification,expires: Date.now() + expireTime})
        
    }

    /**
     * 
     * @param {string} message a warning message to display to the user
     * @param {number} expireTime the length of time in milliseconds to display the message for
     */
    error(message,expireTime=5000){
        let notification = ToastMessage(ICONS.ERROR,message)
        notification.classList.add("toast-error")
        this.toaster.appendChild(notification)
        this.toasts.push({notification,expires: Date.now() + expireTime})
    }

    /**
     * 
     * @param {string} message a warning message to display to the user
     * @param {number} expireTime the length of time in milliseconds to display the message for
     */
    warn(message,expireTime=5000){
        let notification = ToastMessage(ICONS.WARNING,message)
        notification.classList.add("toast-warning")
        this.toaster.appendChild(notification)
        this.toasts.push({notification,expires: Date.now() + expireTime})
    }
    /**
     * 
     * @param {Promise<any>} promise some promise to track status of 
     * @param {string} loadingMessage inital message, eg "loading products..."
     * @param {string} error error message | eg "Error loading products..."
     * @param {string} success success message | eg "Found 20 products"
     * @returns 
     */
    async loading(promise,loadingMessage,error,success){
        let notification = ToastMessage(ICONS.LOADING,loadingMessage||"Loading...")
        this.toaster.appendChild(notification)
        return promise.then((res)=>{
            this.success(success)
            notification.remove()
            return res
        }).catch((err)=>{
            console.error(err)
            this.error(error)
            notification.remove()
            return error
        })
   

    }
    /**
     * 
     * @param {string} icon a character to use as the icon for the toast message 
     * @param {string} message the message to display on the toast
     * @param {{}} styles the styles to apply to the toast message 
     * @param {Number} expireTime  default is 5 seconds (5000ms) 
     */
    custom(icon,message,styles,expireTime=5000){
        let notification = ToastMessage(icon,message)
        Object.keys(styles).forEach(attr=>{
            notification.style[attr] = styles[attr]
        })
        this.toaster.appendChild(notification)
        this.toasts.push({notification,expires: Date.now() + expireTime})
    }
    dismount(){
        clearInterval(this._cleaner)
    }
    _clearExpired(){
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
    }
    mount(){
        this._cleaner = setInterval(()=>{
            this._clearExpired()
        },1000)
    }

}

function wait(s){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve()
        },s*1000)
    })

}

async function main(){
    let toaster = new Toaster()
    toaster.warn("Experiencing some connection issues...")
    toaster.error("Something went wrong...")
    toaster.success("Reconnected Successfully")

    // toaster.dismount()
}
main()