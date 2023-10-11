export function useLoading(init: boolean = false){
    const _loading = ref(Number(init))
    const addLoading = () => _loading.value++
    const removeLoading = () => _loading.value--

    const loading = computed(()=> _loading.value > 0)

    return {
        loading,
        addLoading,
        removeLoading
    }
}