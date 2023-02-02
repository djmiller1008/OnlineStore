const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");
const Category = mongoose.model("category");
const Product = mongoose.model("product");
const CategoryType = require("./types/category_type");
const ProductType = require("./types/product_type");

const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newCategory: {
        type: CategoryType,
        args: {
            id: { type: GraphQLID },
            name: { type: GraphQLString }
        },
        resolve(parentValue, { id, name }) {
            return new Category({ id, name }).save();
        }
    },

    deleteCategory: {
        type: CategoryType,
        args: {
            id: { type: GraphQLID }
        },
        resolve(parentValue, { id }) {
            return Category.findOneAndDelete({ _id: id })
        }
    },
    
    newProduct: {
        type: ProductType,
        args: {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            weight: { type: GraphQLInt }
        },
        resolve(parentValue, { id, name, description, weight }) {
            return new Product({ id, name, description, weight }).save();
        }
    },

    deleteProduct: {
        type: ProductType,
        args: {
            id: { type: GraphQLID }
        },
        resolve(parentValue, { id }) {
            return Product.findOneAndDelete({ _id: id })
        }
    },

    updateProductCategory: {
        type: ProductType,
        args: {
            productId: { type: GraphQLID },
            categoryId: { type: GraphQLID }
        },
        resolve(parentValue, { productId, categoryId }) {
            return Product.updateProductCategory(productId, categoryId);
        }
    }
  }
});

module.exports = mutations;