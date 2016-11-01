import React, {PropTypes} from 'react'
import TeamTable from './TeamTable'

export default class TeamsTables extends React.Component {

  static propTypes = {
    teams: PropTypes.array // eslint-disable-line react/forbid-prop-types
  }

  render() {
    const {teams, batchIndex} = this.props
    return (
      <div>
        {teams.map((team, teamIndex) => {
          return (
            <div key={`${batchIndex}-${teamIndex}`}>
              <h2>Lag {teamIndex+1}</h2>
              <TeamTable team={team} batchIndex={batchIndex}/>
            </div>
          )
        })}
      </div>
    )
  }
}
