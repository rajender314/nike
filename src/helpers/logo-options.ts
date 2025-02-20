export function checkLogoLimit(logos: any[]) {
  let list = logos.filter((logo: any) => {
    return logo.status
  })
  return list.length < 15 ? true : false
}

export function getShortName(name: any) {
  let arrName = name.split(' ')
  let sName =
    arrName && arrName.length > 1
      ? arrName[0].charAt(0) + arrName[1].charAt(0)
      : arrName.length === 1
      ? arrName[0].charAt(0)
      : '--'
  return sName
}
