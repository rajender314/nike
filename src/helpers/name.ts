export function getInitialsFromName(name: any) {
  if (!name) {
    return name
  }

  const names = name.replace(/^\s+|\s+$/g, '').split(/\s+/)
  let initials = []

  if (names.length) {
    initials.push(names[0][0])
    if (names.length > 1) {
      initials.push(names[names.length - 1][0])
    }
  }

  return initials.join('')
}
