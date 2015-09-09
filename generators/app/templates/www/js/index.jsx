import React, { PropTypes } from 'react'

class App extends React.Component {
    render () {
        return (
            <h1>Hello <%= appname %></h1>
        )
    }
}

document.addEventListener('deviceready', () => {
    React.render(<App />, document.body)
}, false)
