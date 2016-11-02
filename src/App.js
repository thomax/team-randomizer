import React from 'react';
import sheetrock from 'sheetrock'
import TeamsTables from './TeamsTables'
import Generator from './Generator'
import logo from './logo.svg'
import './App.css'


function sheetUrl(key) {
  return `https://docs.google.com/spreadsheets/d/${key}/edit#gid=0`
}

function playerFromRow(row) {
  const player = {}
  let i = 0
  row.labels.forEach(label => {
    player[label] = row.cellsArray[i++]
  })
  return player
}


export default React.createClass({
  displayName: 'App',

  getInitialState() {
    return {
      players: null,
      playersById: null,
      playersBySkill: null,
      batches: []
    }
  },

  parseRawRows(rows) {
    const players = []
    const playersById = {}
    const playersBySkill = {}
    rows.splice(0, 1) // remove first row containing only headers
    rows.forEach(row => {
      const player = playerFromRow(row)
      players.push(player)
      playersById[player.id] = player
      playersBySkill[player.skill] = playersBySkill[player.skill] || []
      playersBySkill[player.skill].push(player)
    })
    return {
      players: players.reverse(),
      playersById: playersById,
      playersBySkill: playersBySkill
    }
  },

  componentDidMount() {
    const {repetitions, teamCount, sheetKey} = this.props
    const {batches} = this.state
    console.log(teamCount, 'teams', repetitions, 'times')
    const handleResult = function (error, options, response) {
      if (error) {
        console.log('oh noes', options, JSON.stringify(error, null, 2))
      } else {
        const {players, playersById, playersBySkill} = this.parseRawRows(response.rows)
        this.setState({players, playersById, playersBySkill, batches})
        console.log('players', players)
        for (let i = 0; i < repetitions; i++) {
          const gen = new Generator(teamCount, players, playersById, playersBySkill)
          batches.push(gen.randomTeams())
        }
        this.setState({batches: batches})
      }
    }.bind(this)

    sheetrock({
      url: sheetUrl(sheetKey),
      query: 'select A,B,C,D,E,F order by A desc',
      callback: handleResult
    })
  },


  render() {
    const {players, batches} = this.state

    if (!players) {
      return <div>Loading players...</div>
    }
    if (batches.length === 0) {
      return <div>Generating teams...</div>
    }
    return (
      <div className="batches">
        {batches.map((teams, batchIndex) => {
          return (
            <div key={batchIndex}>
              <h1>Batch {batchIndex+1}</h1>
              <TeamsTables teams={teams} batchIndex={batchIndex}/>
            </div>
          )
        })}
      </div>
    )
  }
})
