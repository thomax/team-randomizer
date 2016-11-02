import React from 'react'
import {flatten} from 'lodash'

function flattenTeam(team) {
  return flatten(Object.keys(team).map(key => {
    const value = team[key]
    if (Array.isArray(value)) {
      return value
    }
    // a non-skill key, e.g. teamNumber
    return null
  })).filter(Boolean)
}

function average(team, attr) {
  let sum = 0
  team.forEach(mem => {
    sum += Number(mem[attr])
  })
  return (sum*1.0/team.length).toFixed(2)
}

function renderPlayer(player, batchIndex) {
  const playerName = `${player.firstName} ${player.lastName}`
  return (
    <tr key={`${batchIndex}-${player.id}`}>
      <td>{player.oldTeam}</td>
      <td>{playerName}</td>
      <td>{player.skill}</td>
      <td>{player.maturity}</td>
    </tr>
  )
}

function TeamTable(props) {
  const {team, batchIndex} = props
  const flatTeam = flattenTeam(team)

  return (
    <div>
      <table className="stats-table">
        <tbody>
          <tr>
            <th>Spillere</th><td>{flatTeam.length}</td>
          </tr>
          <tr>
            <th>Ferdighet</th><td>{average(flatTeam, 'skill')}</td>
          </tr>
          <tr>
            <th>Modenhet</th><td>{average(flatTeam, 'maturity')}</td>
          </tr>
        </tbody>
      </table>

      <table className="players-table">
        <thead>
          <tr>
            <th>Lag</th>
            <th>Navn</th>
            <th>Ferdighet</th>
            <th>Modenhet</th>
          </tr>
        </thead>
        <tbody>
          {flatTeam.map(player => {
            return renderPlayer(player, batchIndex)
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TeamTable
