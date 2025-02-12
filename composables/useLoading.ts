export function useLoading(init: boolean = false){
    const _loading = ref(Number(init))
    const addLoading = () => {
        _loading.value++
    }
    const removeLoading = () => {
        _loading.value--
    }

    const loaded = ref(false)
    const setLoaded = () => {
        loaded.value = true
    }
    const setNotLoaded = () => {
        loaded.value = false
    }

    const loading = computed(()=> _loading.value > 0)

    return {
        loading,
        addLoading,
        removeLoading,
        loaded,
        setLoaded,
        setNotLoaded
    }
}