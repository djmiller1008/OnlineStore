const graphql = require("graphql");
const mongoose = require("mongoose");

const Category = require("../../models/Category");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const ProductType = new GraphQLObjectType({
    name: "ProductType",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        weight: { type: GraphQLInt },
        category: {
            type: require("./category_type"),
            resolve(parentValue) {
                return Category.findById(parentValue.category)
                    .then(category => category)
                    .catch(err => null)
            }
        }
    })
});

module.exports = ProductType;