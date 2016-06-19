import { GraphQLSchema } from 'graphql'
import query from './HeroQuery'
import mutation from './HeroMutation'

/*
 * Examples :
 * - to get a list with all heroes:
 *    http://localhost:3000/heroes?query={heroes{name,description,abilities{name,description},tag}}
 * - to get a specific hero by name:
 *    http://localhost:3000/heroes?query={hero(tag:"soldier-76"){name,description,abilities{name,description},tag}}
 * - to create a new hero:
 *    http://localhost:3000/heroes?query=mutation{createHero(name:"NewHero",real_name:"A New Hero"){name,real_name,tag}}
 */
export default new GraphQLSchema({
  query: query,
  mutation: mutation
})
