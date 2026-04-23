import React from 'react'

export const _fetch = (url, options = {}) => {
  return new Promise(resolve => {
    fetch(`${url}?_=${Date.now()}`, options)
    .then( r =>{
      r = r.json()
      resolve(r)
    })
  })
}