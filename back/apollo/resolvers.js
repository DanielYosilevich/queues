const mongoService = require('../services/mongo-service')
const ObjectId = require('mongodb').ObjectId
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const mailService = require('../services/email-service')

mongoService.connect().then(db => {
    Posts = db.collection('posts')
})

const resolvers = {
    Query: {
        post: async (root, { _id }) => {
            return prepare(await Posts.findOne(ObjectId(_id)))
        },
        posts: async (root, args) => {
            return (await Posts.find(args.searchBy).toArray()).map(prepare)
        },
    },
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {  // ast = Abstract Syntax Tree :)
                return new Date(ast.value) // ast value is always in string format
            }
            return null;
        },
    }),
    Mutation: {
        addPost: async (root, args, context, info) => {
            try {
                console.log('Adding Post:', args)
                args.post.createdAt = new Date()
                args.post.lastTried = null
                args.post.sentAt = null
                args.post.triesCount = 0;
                const res = await Posts.insertOne(args.post)
                return prepare(res.ops[0])
            } catch (error) { console.log(error) }
        },
        removePost: async (root, args, context, info) => {
            try {
                const res = { _id: args._id }
                let r = await Posts.deleteOne({ _id: ObjectId(args._id) })
                if (r.result.n) res.message = 'Post Successfully Removed'
                else res.message = 'Post Not Found'
                return res
            } catch (error) { console.log(error) }
        },
        updatePost: async (root, args, context, info) => {
            try {
                let excludeId = omit(args.post, '_id')
                let r = await Posts.updateOne({ _id: ObjectId(args.post._id) }, { $set: excludeId })
                if (r.result.n) console.log('Post Successfully Updated')
                else throw ('Post Not Found')
                return args.post
            } catch (error) { console.log(error) }
        },
        emailOne: async (root, { _id }) => {
            try {
                let post = await Posts.findOne(ObjectId(_id))
                let excludeCreatedAt = omit(post, 'createdAt')
                let output = await mailService.sendEmail([excludeCreatedAt])
                let postToUpdate = output[0]
                let excludeId = omit(postToUpdate, '_id')
                await Posts.updateOne({ _id: ObjectId(postToUpdate._id) }, { $set: excludeId })
                return { _id }
            } catch (error) { console.log(error) }
        },

        emailAll: async (root) => {
            try {
                let allPosts = await Posts.find({}).toArray()
                let posts = allPosts.filter(post => !post.triesCount)
                posts.map(post => delete post.createdAt)
                let output = await mailService.sendEmail(posts)
                await Promise.all(output.map(post => {
                    let excludeId = omit(post, '_id')
                    Posts.updateOne({ _id: ObjectId(post._id) }, { $set: excludeId })
                }))
                return { message: 'All mail sent!' }
            } catch (error) { console.log(error) }
        },



        resetAll: async (root) => {
            const query = {};
            const update = { "$set": { "sentAt": null, "lastTried": null, "triesCount": 0 } };
            const options = { "upsert": false }
            try {
                let result = await Posts.updateMany(query, update, options)
                const { matchedCount, modifiedCount } = result;
                let message = `Successfully matched ${matchedCount} and modified ${modifiedCount} items.`
                console.log(message)
                return { message: message }
            } catch (error) { console.log(error) }
        }
    }
};

const prepare = (o) => {
    o._id = o._id.toString()
    return o;
}

function omit(obj, omitKey) {
    return Object.keys(obj).reduce((result, key) => {
        if (key !== omitKey) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}

module.exports = {
    resolvers
}
