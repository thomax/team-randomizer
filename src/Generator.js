
function randomFromArray(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function playerSkillKey(player) {
  return `skill${player.skill}`
}

function addPlayerToTeam(player, team) {
  const playerSkill = playerSkillKey(player)
  const playersAtSkill = team[playerSkill]
  playersAtSkill.push(player)
  team[playerSkill] = playersAtSkill
}

function addToOptimalTeam(player, teams) {
  const optimalTeamsBySkill = teamsMatchedBySkill(player, teams)
  addPlayerToTeam(player, randomFromArray(optimalTeamsBySkill))
}

function teamsMatchedBySkill(player, teams) {
  const playerSkill = playerSkillKey(player)
  const teamsIndexedBySkill = []
  teams.forEach(team => {
    const count = team[playerSkill].length
    teamsIndexedBySkill[count] = teamsIndexedBySkill[count] || []
    teamsIndexedBySkill[count].push(team)
  })
  return teamsIndexedBySkill.find(teams => {
    // firsts array in array which (first not undefined element)
    return !!teams
  })
}


class Generator {

  constructor(teamCount, players, playersById, playersBySkill) {
    this.teamCount = teamCount
    this.players = players
    this.playersById = playersById
    this.playersBySkill = playersBySkill
    this.teams = []
    for (let i = 0; i < teamCount; i++) {
      this.teams.push({teamNumber: `${i}`, skill1: [], 'skill2': [], 'skill3': []})
    }
  }

  randomTeams() {
    Object.keys(this.playersBySkill).forEach(skill => {
      const playersAtSkill = this.playersBySkill[skill]
      playersAtSkill.forEach(player => {
        addToOptimalTeam(player, this.teams)
      })
    })
    return this.teams
  }


}

export default Generator
