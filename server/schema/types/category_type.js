const graphql = require("graphql");
const mongoose = require("mongoose");
const Category = mongoose.model("category");
const ProductType = require("./product_type");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;


const CategoryType = new GraphQLObjectType({
    name: "CategoryType", 
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parentValue, args) {
                return Category.getProducts(parentValue._id);
            }
        }
    })
});

module.exports = CategoryType;