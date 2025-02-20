export function selectDataFormat(list: any[], value: string, label: string) {
    return list.map((val: any) => {
        return { value: val[value], label: val[label] }
    })
}