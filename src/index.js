import React from 'react'
import ReactDOM from 'react-dom'
import url from 'url'
import App from './App'
import './index.css'

const parsedQuery = url.parse(window.location.href, true).query
const repetitions = parsedQuery.n || 3
const teamCount = parsedQuery.teams || 8
const sheetKey = parsedQuery.sheetKey

ReactDOM.render(
  <App repetitions={repetitions} teamCount={teamCount} sheetKey={sheetKey}/>, document.getElementById('root')
)
