
function sendEmail(email) {
    if (succeeds()) return Promise.resolve(`Email '${JSON.parse(email).title}' Sent!`)
    return Promise.reject(`Error Emailing '${JSON.parse(email).title}'!`)
}

function succeeds() {
    return Math.random() > 0.8;
}

module.exports = {
    sendEmail: sendEmail
}
