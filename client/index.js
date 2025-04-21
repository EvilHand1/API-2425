import './index.css';

console.log('Hello, world!');

// document.getElementById("NewHeroes").addEventListener("click", async () => {
//     const Hero3 = await getHero();
//     console.log(Hero3.id);
//   });

document.addEventListener("DOMContentLoaded", () => {
    function DefaultAnimation(){
      const cards = document.getElementsByClassName("card");
      console.log("Cards found:", cards.length);
 
      let id = 1;
      for (let card of cards){
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
    //DefaultAnimation();
  });


  battleButton.addEventListener('click', () => {
console.log('KIIIPP');
BattleAnimation();
  });


function BattleAnimation(){
  const cards = document.getElementsByClassName("card");
  const cardsContent = document.getElementsByClassName("card-content");

  
  cardsContent[0].animate(
      [
        { transform: `rotateY(deg)`, },
      { transform: `rotateY(45deg)`, offset: .05},
      { transform: `rotateY(45deg)`, offset: .20},
      { transform: `rotateY(-45deg)`, offset: .35},
      { transform: `rotateY(45deg)`, offset: .8},
      {transform: `rotateY(2turn)`, offset: 1},
      ],
      {
        duration: 4000,
        delay: 0,
        iterations: 1,
        direction: "alternate",
        easing: "ease-in-out",
      }
    );
  
    cards[0].animate(
      [
        { transform: "translateX(0dvw)", offset: .05 },
      { transform: "translateX(30dvw)", offset: .15 },
      { transform: "translateX(30dvw)", offset: .20 },
      { transform: "translateX(25dvw", offset: .30},
      { transform: "translateX(30dvw", offset: .35},
      { transform: "translateX(20dvw", offset: .45},
      { transform: "translateX(25dvw", offset: .55},
      { transform: "translateX(25dvw", offset: .6},
      { transform: "translateX(15dvw", offset: .75},
      { transform: "translateX(15dvw", offset: .8},
      { transform: "translateX(-20dvw", offset: 1},
      ],
      {
        duration: 4000,
        delay: 0,
        iterations: 1,
        direction: "alternate",
        easing: "ease-in-out",
      }
    );

    cardsContent[1].animate(
      [
        { transform: `rotateY(deg)`, },
      { transform: `rotateY(-45deg)`, offset: .05},
      { transform: `rotateY(-45deg)`, offset: .20},
      { transform: `rotateY(45deg)`, offset: .35},
      { transform: `rotateY(-45deg)`, offset: .8},
      {transform: `rotateY(-2turn)`, offset: 1},
      ],
      {
        duration: 4000,
        delay: 0,
        iterations: 1,
        direction: "alternate",
        easing: "ease-in-out",
      }
    );

    cards[1].animate(
      [
        { transform: "translateX(0dvw)", offset: .05 },
      { transform: "translateX(-30dvw)", offset: .15 },
      { transform: "translateX(-30dvw)", offset: .20 },
      { transform: "translateX(-25dvw", offset: .30},
      { transform: "translateX(-30dvw", offset: .35},
      { transform: "translateX(-20dvw", offset: .45},
      { transform: "translateX(-25dvw", offset: .55},
      { transform: "translateX(-25dvw", offset: .6},
      { transform: "translateX(-15dvw", offset: .75},
      { transform: "translateX(-15dvw", offset: .8},
      { transform: "translateX(20dvw", offset: 1},
      ],
      {
        duration: 4000,
        delay: 0,
        iterations: 1,
        direction: "alternate",
        easing: "ease-in-out",
      }
    );

 
}