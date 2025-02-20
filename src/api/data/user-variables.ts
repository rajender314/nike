export function getUserVariables() {
  const userObj = JSON.parse(localStorage.getItem('user') || 'null')

  if (userObj) {
    return { sportId: userObj.sportId }
  } else {
    return {}
  }
}
