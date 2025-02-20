export function objectPath(obj: any, path: string[], defaultValue?: any) {
  if (!obj) {
    return defaultValue
  }

  let currentObj: any = obj

  for (let i = 0; i < path.length; i++) {
    if (currentObj[path[i]]) {
      currentObj = currentObj[path[i]]
    } else {
      return defaultValue
    }
  }

  return currentObj
}

export function objectDeepClone(obj: any) {
  if (!obj) {
    return obj
  }

  return JSON.parse(JSON.stringify(obj))
}

export function removeTypeName(data: any[]) {
  if (!data) {
    return data
  }

  return data.map((obj: any) => {
    delete obj.__typename
    return obj
  })
}

export function remove_id(data: any[]) {
  if (!data) {
    return data
  }

  return data.map((obj: any) => {
    const { _id, ...newObj } = obj
    return newObj
  })
}
