import React from 'react'
import A from './a'

const Message = () => {
  return (
    <div className="content">
      <h1>Rexpack от  <a href='https://github.com/bengrunfeld?tab=overview&from=2019-11-01&to=2019-11-03'>мужика с гита</a></h1>
      <p className="description">React, Express, and Webpack Boilerplate Application</p>
      <div className="awful-selfie"></div>
      <A />
    </div>
  )
}

export default Message