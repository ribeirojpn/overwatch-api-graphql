import { GraphQLNonNull, GraphQLString, GraphQLObjectType,GraphQLList } from 'graphql'

let abilitiesType = new GraphQLObjectType({
  name: 'Abilities',
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    icon_url: { type: GraphQLString }
  }
})

let heroType = new GraphQLObjectType({
  name: 'Hero',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    real_name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) },
    occupation: { type: new GraphQLNonNull(GraphQLString) },
    base: { type: new GraphQLNonNull(GraphQLString) },
    affiliation: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString)},
    tag: { type: new GraphQLNonNull(GraphQLString) },
    abilities: { type: new GraphQLList(abilitiesType) }
  }
})

export { heroType }
