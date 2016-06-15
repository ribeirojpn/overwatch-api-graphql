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
    name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    real_name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    age: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    description: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    role: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    occupation: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    base: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    affiliation: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    url: { type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    tag: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
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
            type: graphql.GraphQLString,
          },
          real_name: {
            name: 'real_name',
            type: graphql.GraphQLString,
            defaultValue: "Unknown"
          },
          age: {
            name: 'age',
            type: graphql.GraphQLString,
            defaultValue: "Unknown"
          },
          description: {
            name: 'description',
            type: graphql.GraphQLString,
            defaultValue: "Unknown"
          },
          role: {
            name: 'role',
            type: graphql.GraphQLString,
            defaultValue: "Offense"
          },
          occupation: {
            name: 'occupation',
            type: graphql.GraphQLString,
            defaultValue: "Unknown"
          },
          base: {
            name: 'base',
            type: graphql.GraphQLString,
            defaultValue: "Unknown"
          },
          affiliation: {
            name: 'affiliation',
            type: graphql.GraphQLString,
            defaultValue: "Unknown"
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

          heroes.push(hero)

          console.log('create hero: ',hero.tag)
          return hero;
        }
      }
    }
  })
})

module.exports = schema;
