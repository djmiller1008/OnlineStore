const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");
const Category = mongoose.model("category");
const Product = mongoose.model("product");
const CategoryType = require("./types/category_type");
const ProductType = require("./types/product_type");
const AuthService = require("../services/auth");
const UserType = require("./types/user_type");

const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
        type: UserType,
        args: {
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString }
        },
        resolve(parentValue, args) {
            return AuthService.register(args);
        }
    },

    logout: {
        type: UserType,
        args: {
            _id: { type: GraphQLID }
        },
        resolve(parentValue, args) {
            return AuthService.logout(args);
        }
    },

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