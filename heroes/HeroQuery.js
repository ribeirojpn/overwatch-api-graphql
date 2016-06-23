import { GraphQLObjectType, GraphQLList, GraphQLString} from 'graphql'
import { heroType } from './HeroTypes'
import heroes from './ow_heroes.json'

export default new GraphQLObjectType({
	name: 'Query',
	fields: {
		heroes: {
			type: new GraphQLList(heroType),
			resolve: function (_, args) {
				return heroes
			}
		},
		hero: {
			type:heroType,
			args: {
				tag: {
					type: GraphQLString
				}
			},
			resolve: (_, args) => {
				let response = heroes.find(function (hero) {
					return hero.tag === args.tag
				})
				return response;
			}
		}
	}
})
