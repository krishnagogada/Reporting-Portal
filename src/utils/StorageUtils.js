import Cookie from 'js-cookie'

export const ACCESS_TOKEN = 'dG6EABne5a'
export const ROLE_TYPE = 'TDUJGKJ677'

export function getCookie(key) {
   return Cookie.get(key)
}

function setCookie(key, value) {
   Cookie.set(key, value, {
      expires: 30,
      path: '/'
   })
}

export function getAccessToken() {
   return getCookie(ACCESS_TOKEN)
}
export function setAccessToken(accessToken) {
   setCookie(ACCESS_TOKEN, accessToken)
}

export function clearUserSession() {
   Cookie.remove(ACCESS_TOKEN, { path: '/' })
}

export function getRoleType() {
   return getCookie(ROLE_TYPE)
}

export function setRoleType(roleType) {
   setCookie(ROLE_TYPE, roleType)
}

export function clearRoleType() {
   Cookie.remove(ROLE_TYPE, '')
}
