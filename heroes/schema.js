const graphql = require('graphql')
const heroes = require('./ow_heroes.json')

let abilitiesType = new graphql.GraphQLObjectType({
  name: 'Abilities',
  fields: {
    name: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    icon_url: { type: graphql.GraphQLString }
  }
})

let heroType = new graphql.GraphQLObjectType({
  name: 'Hero',
  fields: {
    name: { type: graphql.GraphQLString },
    real_name: { type: graphql.GraphQLString },
    age: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    role: { type: graphql.GraphQLString },
    occupation: { type: graphql.GraphQLString },
    base: { type: graphql.GraphQLString },
    affiliation: { type: graphql.GraphQLString },
    url: { type: graphql.GraphQLString },
    tag: { type: graphql.GraphQLString },
    abilities: { type: new graphql.GraphQLList(abilitiesType) }
  }
})

/*
 * Examples :
 * - to get a list with all heroes:
 *    http://localhost:3000/heroes?query={heroes{name,description,abilities{name,description},tag}}
 * - to get a specific hero by name:
 *    http://localhost:3000/heroes?query={hero(tag:"soldier-76"){name,description,abilities{name,description},tag}}
 * - to create a new hero:
 *    http://localhost:3000/heroes?query=mutation{createHero(name:"NewHero",real_name:"A New Hero"){name,real_name,tag}}
 */
let schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      heroes: {
        type: new graphql.GraphQLList(heroType),
        resolve: function (_, args) {
          return heroes
        }
      },
      hero: {
        type:heroType,
        args: {
          tag: {
            type: graphql.GraphQLString
          }
        },
        resolve: function (_, args) {
          let response = null
          heroes.forEach(function (hero) {
            if (hero.tag === args.tag){
              response = hero
              return;
            }
          })

          return response;
        }
      }
    }
  }),
  mutation: new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createHero: {
        type: heroType,
        args: {
          name: {
            name: 'name',
            type: graphql.GraphQLString
          },
          real_name: {
            name: 'real_name',
            type: graphql.GraphQLString
          },
          age: {
            name: 'age',
            type: graphql.GraphQLString
          },
          description: {
            name: 'description',
            type: graphql.GraphQLString
          },
          role: {
            name: 'role',
            type: graphql.GraphQLString
          },
          occupation: {
            name: 'occupation',
            type: graphql.GraphQLString
          },
          base: {
            name: 'base',
            type: graphql.GraphQLString
          },
          affiliation: {
            name: 'affiliation',
            type: graphql.GraphQLString
          },
        },
        resolve: function (obj, args) {
          var hero = {
            name: args.name,
            real_name: args.real_name,
            tag: args.name.toLowerCase(),
            age: args.age,
            description: args.description,
            role: args.role,
            occupation: args.occupation,
            base: args.base,
            affiliation: args.affiliation,
            url: "https://playoverwatch.com/en-us/heroes/",
            abilities: []
          }

          heroes.push(hero);

          console.log('create hero: ',hero.tag)
          return hero;
        }
      }
    }
  })
})

module.exports = schema;
