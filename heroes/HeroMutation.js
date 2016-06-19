import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { heroType } from './HeroTypes'

export default new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		createHero: {
			type: heroType,
			args: {
				name: {
					name: 'name',
					type: new GraphQLNonNull(GraphQLString),
				},
				real_name: {
					name: 'real_name',
					type: GraphQLString,
					defaultValue: "Unknown"
				},
				age: {
					name: 'age',
					type: GraphQLString,
					defaultValue: "Unknown"
				},
				description: {
					name: 'description',
					type: GraphQLString,
					defaultValue: "Unknown"
				},
				role: {
					name: 'role',
					type: GraphQLString,
					defaultValue: "Offense"
				},
				occupation: {
					name: 'occupation',
					type: GraphQLString,
					defaultValue: "Unknown"
				},
				base: {
					name: 'base',
					type: GraphQLString,
					defaultValue: "Unknown"
				},
				affiliation: {
					name: 'affiliation',
					type: GraphQLString,
					defaultValue: "Unknown"
				},
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
					url: "https://playoverwatch.com/en-us/heroes/",
					abilities: []
				}

				console.log('create hero: ',hero.tag)
				return hero;
			}
		}
	}
})
