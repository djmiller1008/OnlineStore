const graphql = require("graphql");
const mongoose = require("mongoose");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;


const CategoryType = new GraphQLObjectType({
    name: "CategoryType", 
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
});

module.exports = CategoryType;