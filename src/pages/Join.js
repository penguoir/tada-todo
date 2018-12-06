import React from 'react'
import { JoinButton } from '../lib/firebase'

export default function Join (isShown) {
  return (
    <div className="pa5 bg-white absolute" style={{left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
      <h1 class="f2 tc lh-copy mb3">
        Join Tada Todo
      </h1>
      <p className="f6 lh-solid mt0 mb3">Don't worry, we'll make an account for you.</p>
      <div className="pa2"></div>
      <JoinButton />
    </div>
  )
}