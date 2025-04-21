# web API

## Week 1

### filter

```liquid
   {% for item in hero1 %} 
  {% if item.biography.publisher == "Marvel Comics" or item.biography.publisher == "DC Comics"%} 
    {% if item.powerstats.intelligence != "null" and 
      item.powerstats.strength != "null" and 
      item.powerstats.speed != "null" and 
      item.powerstats.durability != "null" and 
      item.powerstats.power != "null" and 
      item.powerstats.combat != "null" %} 
```


## Week 2

### filter

```js
async function getHero() {
  while (true) {
    const randomId = Math.floor(Math.random() * 700) + 1;
    const response = await fetch(BaseURL + randomId);
    const hero = await response.json();
    // console.log("Hero: " + hero.id)
    
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
```

## Week 3

### stars

```liquid
 <div class="star-rating">
      {% assign totalStars = 10 %}
      {% assign rating = hero1.powerstats.intelligence | divided_by: 10 %}
      {% assign fullStars = rating | floor %}
      {% assign hasHalfStar = rating | minus: fullStars | round: 1 %}
      {% assign halfIndex = fullStars | plus: 1 %}

      {%- for i in (1..totalStars) -%}
        {% if i <= fullStars %}
          <span class="star filled"></span>
          {% elsif i == halfIndex and hasHalfStar >= 0.5 %}
            <span class="star half"></span>
        {% else %}
          <span class="star"></span>
        {% endif %}
      {%- endfor -%}
    </div>
```

VERSION 2
```liquid

  {% for stat in hero1.powerstats['intelligence', 'strength', 'speed', 'durability', 'power', 'combat'] %}
   
      <p>Chicken: {{ stat }}</p>
  
  {% endfor %} 
           
         {% assign rawValue = hero.powerstats[stat] | default: 0 %}
          {% assign rating = rawValue | times: totalStars | divided_by: 100 %}
          {% assign fullStars = rating | floor %}
          {% assign hasHalfStar = rating | minus: fullStars | round: 1 %}
          {% assign halfIndex = fullStars | plus: 1 %}
  
          <div class="star-rating">
            {%- for i in (1..totalStars) -%}
              {% if i <= fullStars %}
                <span class="star filled"></span>
              {% elsif i == halfIndex and hasHalfStar >= 0.5 %}
                <span class="star half"></span>
              {% else %}
                <span class="star"></span>
              {% endif %}
            {%- endfor -%}
          </div> 
```

VERSION 3

```js
app.get('/', async (req, res) => {
  let hero1 = await getHero();
  let hero2 = await getHero();

  hero1.stats = getPowerStats(hero1);
  hero2.stats = getPowerStats(hero2);

    // console.log("Hero 1: " + Hero1.id + "       Hero 2: " + Hero2.id)
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', hero1, hero2 }));

});

function getPowerStats(hero){
  const newPowerstats = []

  for (const [key, value] of Object.entries(hero.powerstats)) {
    const integer = Math.floor(value / 10)
    const decimal = Math.round((value / 10 - integer) * 100) / 100;
    newPowerstats.push({
      name: key,
      integer: integer,
      decimal: decimal // todo: afronden naar 2 decimalen
    })
  }
  return newPowerstats
}
```