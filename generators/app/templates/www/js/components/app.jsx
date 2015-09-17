import React, { PropTypes } from 'react'
import ReactCSS from 'reactcss-decorator'

@ReactCSS
class App extends React.Component {
    classes() {
        return {
            default: {
                title: {
                    color: 'red'
                },
                content: {
                    color: 'blue'
                }
            }
        }
    }
    render () {
        return (
            <div>
                <h1 is="title">Hello <%= name %></h1>
                <p is="content">Welcome to <%= appname %></p>
            </div>
        )
    }
}

export default App
