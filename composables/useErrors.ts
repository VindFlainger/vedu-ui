/*
export interface RequestError {
    message: string,
    code: number,
    stack?: string
}

export type RequestErrors = {
    errors: AppError[],
    status: number
}

export function useErrors<ErrorT>(error: any){
    const messages = computed(()=> toValue(error)?.data?.messages || [])
    const code = computed(()=>{
        if (!toValue(error)?.data) return 0
        else return toValue(error)?.data?.code || 0
    })

    return {
        code,
        messages
    }
}*/
