import React from 'react'
import { initials } from '../types'

type Props = { agent: string }

export default function Avatar({ agent }: Props) {
  if (agent && agent.startsWith('http')) {
    return <img className="avatar img" src={agent} alt={agent} />
  }

  return <div className="avatar" style={{ background: '#eef2ff' }} aria-hidden>{initials(agent)}</div>
}
