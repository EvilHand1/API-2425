import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

const BaseURL= 'https://superheroapi.com/api.php/4f6f07fdc09f90c689e5c530ffa460a6/';
const HeroURL= BaseURL + 'search/f';

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
  const data = await fetch(HeroURL);
  const HeroAll = await data.json();
  
    // console.log(HeroAll)
    // console.log('hoi allemaal')
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', items: HeroAll }));

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

