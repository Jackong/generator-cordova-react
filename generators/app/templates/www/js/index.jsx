import React, { PropTypes } from 'react'

class App extends React.Component {
    render () {
        return (
            <h1>Hello <%= appname %></h1>
        )
    }
}

window.handleError = e => {
    console.error('error', e, e.stack);
    alert(e.stack);
}

window.onerror = (msg, url, line, column, e) => {
    window.handleError(e ? e : new Error(msg + '(' + url + '):' + line + '-' + column));
    return true;
}

try {
    document.addEventListener('deviceready', () => {
        React.render(<App />, document.body);
    }, false)
} catch (e) {
    handleError(e);
}
