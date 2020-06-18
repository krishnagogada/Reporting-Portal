import Cookie from 'js-cookie'

export const ACCESS_TOKEN = 'dG6EABne5a'
export const ADMIN_TOKEN = "rye5y457e568wnhtu"

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

export function getAdminToken() {
   return getCookie(ADMIN_TOKEN)
}

export function setAdminToken(adminToken) {
   setCookie(ADMIN_TOKEN, adminToken)
}

export function setAccessToken(accessToken) {
   setCookie(ACCESS_TOKEN, accessToken)
}

export function clearUserSession() {
   Cookie.remove(ACCESS_TOKEN, { path: '/' })
}
