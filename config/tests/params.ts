export const reportTypes : {
    value: string,
    label: string
}[] = [
    {
        value: 'full',
        label: 'Полный'
    },
    {
        value: 'detailed-score',
        label: 'Баллы по вопросам'
    },
    {
        value: 'score',
        label: 'Общий балл'
    },
    {
        value: 'accepted',
        label: 'Без отчета'
    }
]

export const scoreTypes : {
    value: string,
    label: string
}[] = [
    {
        value: 'last-attempt',
        label: 'Последняя попытка'
    },
    {
        value: 'max-attempt',
        label: 'Лучшая попытка'
    }
]

export const testStatuses : {
    value: string,
    label: string
}[] = [
    {
        value: 'pending',
        label: 'Ожидание'
    },
    {
        value: 'progress',
        label: 'Активен'
    },
    {
        value: 'completed',
        label: 'Завершен'
    }
]

