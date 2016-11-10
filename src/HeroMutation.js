import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql'
import { heroType, abilitiesInputType } from './HeroTypes'
import heroes from './data/ow_heroes.json'

// TODO: Persistence

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createHero: {
      type: heroType,
      args: {
        name: {
          name: 'name',
          type: new GraphQLNonNull(GraphQLString)
        },
        real_name: {
          name: 'real_name',
          type: GraphQLString,
          defaultValue: 'Unknown'
        },
        age: {
          name: 'age',
          type: GraphQLString,
          defaultValue: 'Unknown'
        },
        description: {
          name: 'description',
          type: GraphQLString,
          defaultValue: 'Unknown'
        },
        role: {
          name: 'role',
          type: GraphQLString,
          defaultValue: 'Offense'
        },
        occupation: {
          name: 'occupation',
          type: GraphQLString,
          defaultValue: 'Unknown'
        },
        base: {
          name: 'base',
          type: GraphQLString,
          defaultValue: 'Unknown'
        },
        affiliation: {
          name: 'affiliation',
          type: GraphQLString,
          defaultValue: 'Unknown'
        },
        url: {
          name: 'url',
          type: GraphQLString,
          defaultValue: 'Unknown'
        },
        abilities: {
          name: 'abilities',
          type: new GraphQLList(abilitiesInputType),
          defaultValue: []
        }
      },
      resolve: (obj, args) => {
        var hero = {
          name: args.name,
          real_name: args.real_name,
          tag: args.name.toLowerCase().split(/\W+/g).join('-'),
          age: args.age,
          description: args.description,
          role: args.role,
          occupation: args.occupation,
          base: args.base,
          affiliation: args.affiliation,
          url: 'https://playoverwatch.com/en-us/heroes/',
          abilities: args.abilities
        }

        console.log('create hero: ', hero.tag)
        return hero
      }
    },
    updateHero: {
      type: heroType,
      args: {
        tag: {
          name: 'tag',
          type: new GraphQLNonNull(GraphQLString)
        },
        name: {
          name: 'name',
          type: GraphQLString
        },
        real_name: {
          name: 'real_name',
          type: GraphQLString
        },
        age: {
          name: 'age',
          type: GraphQLString
        },
        description: {
          name: 'description',
          type: GraphQLString
        },
        role: {
          name: 'role',
          type: GraphQLString
        },
        occupation: {
          name: 'occupation',
          type: GraphQLString
        },
        base: {
          name: 'base',
          type: GraphQLString
        },
        affiliation: {
          name: 'affiliation',
          type: GraphQLString
        },
        url: {
          name: 'url',
          type: GraphQLString
        },
        abilities: {
          name: 'abilities',
          type: new GraphQLList(abilitiesInputType)
        }
      },
      resolve: (obj, args) => {
        let heroIndex = -1
        let response = heroes.find(function (hero, index) {
          if (hero.tag === args.tag) {
            heroIndex = index
            return true
          }
          return false
        })
        var items = Object.keys(args)

        items.forEach((arg) => {
          if (arg !== 'tag') {
            response[arg] = args[arg]
          }
        })

        heroes[heroIndex] = response
        console.log(JSON.stringify(heroes))
        console.log('hero updated: ', response.tag)
        return response
      }
    },
    deleteHero: {
      type: heroType,
      args: {
        tag: {
          name: 'tag',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (obj, args) => {
        console.log(heroes.length)
        let heroIndex = -1
        let response = heroes.find(function (hero, index) {
          if (hero.tag === args.tag) {
            heroIndex = index
            return true
          }
          return false
        })

        if (heroIndex < 0) {
          console.log(`Hero not found: ${args.tag}`)
          return response
        }

        heroes.splice(heroIndex, 1)
        console.log(`Hero deleted: ${args.tag}`)
        return response
      }
    }
  }
})

export default Mutation
