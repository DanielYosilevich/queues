var dispatcher = require('./dispatcher')
var Queue = require('queue-fifo')

async function sendEmail(posts) {
    var result = [];
    var queue = new Queue();
    posts.map(post => {
        post.lastTried = new Date()
        queue.enqueue(JSON.stringify(post))
    })
    while (!queue.isEmpty()) {
        let email = queue.dequeue()
        try {
            let r = await dispatcher.sendEmail(email)
            console.log(r)
            let postToUpdate = JSON.parse(email)
            postToUpdate.sentAt = new Date()
            postToUpdate.triesCount++
            result.push(JSON.parse(JSON.stringify(postToUpdate)))
        } catch (err) {
            console.log(err)
            let temp = JSON.parse(email)
            temp.triesCount++
            email = JSON.stringify(temp)
            queue.enqueue(email)
        }
    }
    return result
}

module.exports = {
    sendEmail: sendEmail
}

