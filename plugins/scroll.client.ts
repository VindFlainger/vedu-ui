export interface ResizedOptions {
    styles?: Record<string, [string, string?]>
    classes?: [string, string?]
}


const handleResize = (el: HTMLElement, orientation: string = 'width', resizedOptions: ResizedOptions) => {
    if ((el.scrollWidth > el.clientWidth && orientation === 'width') || (el.scrollHeight > el.clientHeight && orientation === 'height')){
        if (resizedOptions.styles) {
            Object.entries(resizedOptions.styles).forEach(([k, v]) => {
                el.style.setProperty(k, v[0])
            })
        }

        if (resizedOptions.classes) {
            resizedOptions.classes[0].split(' ').forEach(cl => {
                el.classList.add(cl)
            })
        }
    } else {
        if (resizedOptions.styles){
            Object.entries(resizedOptions.styles).forEach(([k, v]) => {
                if (!v[1]) el.classList.remove()
                else el.style.setProperty(k, v[1])
            })
        }
        if (resizedOptions.classes){
            resizedOptions.classes[0].split(' ').forEach(cl => {
                el.classList.remove(cl)
            })
            if (resizedOptions.classes[1]){
                resizedOptions.classes[1].split(' ').forEach(cl => {
                    el.classList.add(cl)
                })
            }
        }

    }
}

export default defineNuxtPlugin((nuxt) => {
    nuxt.vueApp.directive('scroll',  {
        mounted(el, binding){
            if (ResizeObserver) {
                el.observer = new ResizeObserver(() => handleResize(el, binding.arg, binding.value))
                el.observer.observe(el);
            }
            handleResize(el, binding.arg, binding.value)
        },
        updated(el, binding){
            if (el.observer) el.observer.disconnect();
            if (ResizeObserver) {
                el.observer = new ResizeObserver(() => handleResize(el, binding.arg, binding.value))
                el.observer.observe(el);
            }
            handleResize(el, binding.arg, binding.value)
        },
        beforeUnmount(el, binding){
            if (el.observer) el.observer.disconnect();
        }
    })
})