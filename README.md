# web API

## Week 1

Deze week was het doel om een content API te vinden en daarbij een idee te bedenken. We hadden een site gevonden met heel veel content API's en ik vond een superhero API en dat leek me wel leuk. Dus ik ging kijken of ik uberhaupt een connectie kon maken met die API en data laten zien, en dat lukte. En toen moest ik nog een idee bedenken, maar ik wist niet wat en toen kwam Syd met het idee om de powerstats te gebruiken voor een card battle en ik vond dat wel leuk.


### filter

Ik heb met behulp van if-statements een filter gemaakt waarmee ik hero's die een powerstat missen niet laat zien. Ook filter ik op marvel en dc heroes, omdat ik die het leukst vind.

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

Voor mijn idee heb ik maar 2 kaarten nodig op het scherm, dus ik kan de forloop van week 1 niet gebruiken. Tevens moet ik dan een randomizer hebben, die ook die filters eruit filtert. Dus ik moet daar een andere manier voor vinden.

Ik heb ook gekeken naar de detail page welke informatie ik daar in wou doen.

### filter

Matthijs liet zien hoe hij random dingen uit zijn API haalde en ik heb daar de basis van gepakt. Ik wist al waarop ik moest filteren, maar ik wist niet hoe, dus ik heb het aan chatGPT gevraagd hoe ik dat kon doen. Die gaf me een while loop en de forloop met de stats erin. En toen heb ik de rest zelf toegevoegd.

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

Deze week had ik een plan. Maandag ga ik de web API's fixen en dinsdag de styling. Voor web API's wou ik de animation API en de page transition API gebruiken.

### transition API

Ik begon met aan chatGPT vragen hoe de api werkte, maar het gaf me niks nuttigs. Alles wat ik kreeg werkte niet. Dante die gebruikte dezelfde API dus ik had aan hem hulp gevraagd. Ik had een lijn code nodig om het te laten werken. Ik had ook hulp nodig van Declan, omdat er iets verandert moest worden in mijn settings hiervoor.

```css
@view-transition{
   navigation: auto;
   }
```

Door de image element een view-transitition-name te geven en de css te veranderen, verplaatst de image nu mooi naar de plek op de detail pagina.

```css
@view-transition{
  navigation: auto;
  }
 ::view-transition-old(root),
 ::view-transition-new(root){
  animation-duration: 400ms;
  animation-timing-function: ease-in-out;
 }

```

```liquid
 <img src="{{ hero.image.url }}" alt="{{ hero.name }}" width="{{ hero.image.width }}" height="{{ hero.image.height }} onerror="this.src =
    'https://picsum.photos/id/237/480/640' style="view-transition-name: detailpage-{{ hero.id }}" />
```



### animation API

Ik ging ook de animation API gebruiken. Ik had een voorbeeld van Matthijs gekregen, een animatie die shaked om de zoveel tijd. En toen ik dat snapte heb ik een hover animatie gemaakt.

```js
document.addEventListener("DOMContentLoaded", () => {
  function DefaultAnimation() {
    const cards = document.getElementsByClassName("card");

    let id = 1;
    for (let card of cards) {
      card.animate(
        [
          { transform: "translateY(-5px)" },
          { transform: "translateY(5px)" },
        ],
        {
          duration: 1000,
          delay: 200 * id,
          iterations: Infinity,
          direction: "alternate",
          easing: "ease-in-out",
        }
      );
      id += 1;
    }
  }
  DefaultAnimation();
});
```


### stars

Om de powerstats mooi weer te geven wou ik sterren gebruiken. Ik had opgezocht met css voorbeelden van star ratings. Ik wou er een ombouwen naar wat ik nodig had, lukte me niet. Dus toen ben ik met chatGPT aan de slag gegaan. Toen heb ik een werkende versie in codepen gekregen. Toen heb ik dat vertaald naar liquid. En die berekening zie je hieronder. Hij pakt een stat, doet een paar berekeningen om een heel en een komma getal te krijgen. Daarna loopt hij dus het aantal totale sterren wat nodig is en vult het alle sterren, daarna een halve ster, en daarna lege sterren.


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

Toen moest het zegmaar voor elke stat, dus ik probeerde het in een forloop te zetten, werkte niet. Maar hier is de code. 
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

Ik ging naar Syd voor hulp. Die zei dat ik het via javascript moest doen. Dus dat hebben wij samen gedaan. We hebben een functie gemaakt en omdat mijn database raar is moesten we  een speciale forloop gebruiken om data uit de array te halen. Die hebben we vervolgens in een array gegooid en die array toegevoegd aan de variabel.
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
      decimal: decimal 
    })
  }
  return newPowerstats
}
```

In liquid halen we de de stat naam uit de data en zetten daaronder 10 sterren. in elke sterrenhouder geven we een variabel die we gebruiken in css om ook een soort van for loop te doen, maar dan veel langer.

```liquid
{% for stat in hero.stats %}
        <p class="folder-header">{{ stat.name }}:</p>
        <div class="container" style="--decimal: {{ stat.decimal }}" data-integer="{{ stat.integer }}">
          {% for _ in (1..10) %}
            <span class="star"></span>
          {% endfor %}
        </div>
      {% endfor %}
```

## week 4

Aangezien ik vorige dinsdag de hele dag bezig was met de sterren maken, moest ik nog heel veel doen. Ik begon met maandag een knop toe te voegen om een battle animation te starten en ik had dat een soort van gemaakt. Dinsdag ging ik alles stijlen. Aangezien ik mijn server opnieuw moet opstarten met een css wijziging heb ik geleerd om de inspector te gebruiken voor het designen. Ik heb 2 versies gemaakt. In de eerste versie kreeg ik de whitespace maar niet weg, dus het formaat van de kaart was nooit goed. Toen liet Matthijs me foto's zien van een kaart die een image als achtergrond gebruikt, en ik dacht dat ga ik proberen. Ziet er mooi uit, dus ik hou het.

![alt text](<Schermafbeelding 2025-04-22 113818.png>)

![alt text](<Schermafbeelding 2025-04-22 125515.png>)

## bronnen

https://shopify.github.io/liquid/

https://superheroapi.com/#powerstats

Syd en Declan

https://chat.openai.com/

https://css-pattern.com/

https://getcssscan.com/css-buttons-examples