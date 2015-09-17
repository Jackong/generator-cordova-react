import React from 'react'
import App from './components/app'

Promise.onPossiblyUnhandledRejection(err => {
    throw err
})

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
