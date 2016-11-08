import cheerio from 'cheerio'
import request from 'request'
import jsonfile from 'jsonfile'
import async from 'async'

const URL = 'https://playoverwatch.com/en-us/heroes/'

const heroesList = ['genji', 'mccree', 'pharah', 'reaper', 'soldier-76', 'tracer', 'bastion',
                    'hanzo', 'junkrat', 'mei', 'torbjorn', 'widowmaker', 'dva', 'reinhardt',
                    'roadhog', 'winston', 'zarya', 'lucio', 'mercy', 'symmetra', 'zenyatta', 'ana', 'sombra']

let heroes = []

function start () {
  var begin = Date.now()
  var end
  async.each(heroesList, function (item, callback) {
    request(URL + item, (erro, response, body) => {
      let begin = Date.now()
      console.log('downloading:', URL + item)
      let $ = cheerio.load(body)
      let hero = {}
      let heroBio = $('.hero-bio').find('.name').text().split(', ')

      hero.name = $('.ability-showcase-controls').find('.hero-name').text()
      hero.real_name = heroBio[0].replace('Real Name: ', '').replace(/^( )/, '')
      hero.age = heroBio[1].replace('Age: ', '').replace(/ /g, '').replace(/^( )/, '')
      hero.description = $('.hero-detail-description').text().replace(/^( )/, '')
      hero.role = $('.hero-detail-role-name').text().replace(/^( )/, '')
      hero.occupation = $('.hero-bio').find('.occupation').text().replace('Occupation: ', '').replace(/^( )/, '')
      hero.base = $('.hero-bio').find('.base').text().replace('Base of Operations: ', '').replace('\t', '').replace(/^( )/, '')
      hero.affiliation = $('.hero-bio').find('.affiliation').text().replace('Affiliation: ', '').replace(/^( )/, '')
      hero.url = URL + item
      hero.tag = item

      hero.abilities = []
      $('.hero-detail-wrapper .hero-ability').each((index, element) => {
        let ability = {
          name: $(element).find('.hero-ability-descriptor h4').text(),
          description: $(element).find('.hero-ability-descriptor p').text(),
          icon_url: $(element).find('.hero-ability-icon').attr('src')
        }

        hero.abilities.push(ability)
      })

      heroes.push(hero)
      end = Date.now()
      console.log(item, 'downloaded')
      console.log(end - begin, 'ms')
      callback()
    })
  }, (err) => {
    console.log('FINISHED!')
    console.log(end - begin, 'ms')
    saveJSON()
  })
}

function saveJSON () {
  const file = './heroes/ow_heroes.json'
  jsonfile.writeFile(file, heroes, {spaces: 2}, (err) => {
    if (err) console.log(err)
  })
}

start()
