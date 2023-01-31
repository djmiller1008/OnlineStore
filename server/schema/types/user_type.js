const graphql = require("graphql");
const mongoose = require("mongoose");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

module.exports = UserType;