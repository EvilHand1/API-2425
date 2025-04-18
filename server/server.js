import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

const API_KEY = process.env.API_TOKEN;
const BaseURL= 'https://superheroapi.com/api.php/' + API_KEY + '/';
// const HeroURL= BaseURL + 'search/z';

const data = {
  'beemdkroon': {
    id: 'beemdkroon',
    name: 'Beemdkroon',
    image: {
      src: 'https://i.pinimg.com/736x/09/0a/9c/090a9c238e1c290bb580a4ebe265134d.jpg',
      alt: 'Beemdkroon',
      width: 695,
      height: 1080,
    }
  },
  'wilde-peen': {
    id: 'wilde-peen',
    name: 'Wilde Peen',
    image: {
      src: 'https://mens-en-gezondheid.infonu.nl/artikel-fotos/tom008/4251914036.jpg',
      alt: 'Wilde Peen',
      width: 418,
      height: 600,
    }
  }
}

const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();

app
  .use(logger())
  .use('/', sirv('dist'))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));

app.get('/', async (req, res) => {
  // var randomHeroes = Math.floor(Math.random() * 700) + 1;
  // const TestURL = BaseURL + randomHeroes;
  // const data = await fetch(TestURL);
  // const Hero1 = await data.json();

  // var randomHeroes2 = Math.floor(Math.random() * 700) + 1;
  // const TestURL2 = BaseURL + randomHeroes2;
  // const data2 = await fetch(TestURL2);
  // const Hero2 = await data2.json();
  
  const Hero1 = await getHero();
  const Hero2 = await getHero();
    // console.log(HeroAll)
    // console.log('hoi allemaal')
    console.log("Hero 1: " + Hero1.id + "       Hero 2: " + Hero2.id)
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', hero1: Hero1, hero2: Hero2 }));

});

app.get('/Hero/:id/', async (req, res) => {
  const id = req.params.id;
  const endpoint = BaseURL + id;
  
  const response = await fetch(endpoint);
  const specHero = await response.json();
  
  return res.send(renderTemplate('server/views/detail.liquid', { title: `Detail page for ${id}, hero:`, hero: specHero }));
});

const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};

async function getHero() {
  while (true) {
    const randomId = Math.floor(Math.random() * 700) + 1;
    const response = await fetch(BaseURL + randomId);
    const hero = await response.json();
    console.log("Hero: " + hero.id)
    
    var BrokenHero = false;

    const publisher = ['Marvel Comics', 'DC Comics'];
    const value = hero.biography.publisher;

    if (!publisher.includes(value)){
      BrokenHero = true;
    } else{
      for (const stat of ['strength', 'speed', 'durability', 'power', 'combat']) {
        const value = hero.powerstats[stat];
        if (value === "null") {
          BrokenHero = true;
          break;
        }
      }
    }

    if (!BrokenHero) { 
      return hero;
    }
  }
}