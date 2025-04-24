import './index.css';

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('NewHeroes').style.display = 'none';

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
    DefaultAnimation();
  });


battlebutton.addEventListener('click', () => {
  var random = Math.floor(Math.random() * 2) + 1;
  console.log(random);
  if (random === 1){
    LeftWinsAnimation();
  }
  else {
    RightWinsAnimation();
  }
  battlebutton.disabled = true;
  battlebutton.style.opacity = '0'; 

  setTimeout(() => {
    battlebutton.style.display = 'none';;
    document.getElementById('NewHeroes').style.display = 'block';
  }, 5000);
});


function RightWinsAnimation(){
  const cards = document.getElementsByClassName("card");
  const cardsContent = document.getElementsByClassName("card-content");

  cardsContent[0].animate(
    [
      { transform: `rotateY(deg)`, },
    { transform: `rotateY(45deg)`, offset: .05},
    { transform: `rotateY(45deg)`, offset: .20},
    { transform: `rotateY(-45deg)`, offset: .35},
    { transform: `rotateY(45deg)`, offset: .8},
    {transform: `rotateY(45deg)`, offset: 1},
    ],
    {
      duration: 4000,
      delay: 0,
      iterations: 1,
      easing: "ease-in-out",
    }
  );

  const fightAnimation = cards[0].animate(
    [
    { transform: "translateX(0dvw)", offset: .05 },
    { transform: "translateX(20dvw)", offset: .15 },
    { transform: "translateX(20dvw)", offset: .20 },
    { transform: "translateX(15dvw", offset: .30},
    { transform: "translateX(30dvw", offset: .35},
    { transform: "translateX(25dvw", offset: .45},
    { transform: "translateX(35dvw", offset: .55},
    { transform: "translateX(35dvw", offset: .6},
    { transform: "translateX(25dvw", offset: .75},
    { transform: "translateX(45dvw", offset: .8},
    { transform: "translateX(45dvw", offset: 1},
    ],
    {
      duration: 4000,
      delay: 0,
      iterations: 1,
      easing: "ease-in-out",
      fill: "forwards",
    }
  ); 

  fightAnimation.onfinish = () => {
    cards[0].animate(
      [
      { transform: "translateX(45dvw)"},
      { transform: "translateX(23.5dvw"},
      ],
      {
        duration: 1000,
        delay: 0,
        iterations: 1,
        easing: "ease-in-out",
        fill: "forwards",
      }
    )
  }
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
        easing: "ease-in-out",
      }
    );

    cards[1].animate(
      [
      { transform: "translateX(0dvw)", offset: .05 },
      { transform: "translateX(-20dvw)", offset: .15 },
      { transform: "translateX(-20dvw)", offset: .20 },
      { transform: "translateX(-5dvw", offset: .30},
      { transform: "translateX(-10dvw", offset: .35},
      { transform: "translateX(0dvw", offset: .45},
      { transform: "translateX(-5dvw", offset: .55},
      { transform: "translateX(-5dvw", offset: .6},
      { transform: "translateX(5dvw", offset: .75},
      { transform: "translateX(5dvw", offset: .8},
      { transform: "translateX(80dvw", offset: 1},
      ],
      {
        duration: 4000,
        delay: 0,
        iterations: 1,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );

 
}


function LeftWinsAnimation(){
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
        easing: "ease-in-out",
      }
    );
  
    cards[0].animate(
      [
      { transform: "translateX(0dvw)", offset: .05 },
      { transform: "translateX(20dvw)", offset: .15 },
      { transform: "translateX(20dvw)", offset: .20 },
      { transform: "translateX(5dvw", offset: .30},
      { transform: "translateX(10dvw", offset: .35},
      { transform: "translateX(0dvw", offset: .45},
      { transform: "translateX(5dvw", offset: .55},
      { transform: "translateX(5dvw", offset: .6},
      { transform: "translateX(-5dvw", offset: .75},
      { transform: "translateX(-5dvw", offset: .8},
      { transform: "translateX(-80dvw", offset: 1},
      ],
      {
        duration: 4000,
        delay: 0,
        iterations: 1,
        easing: "ease-in-out",
        fill: "forwards",
      }
    ); 

    cardsContent[1].animate(
      [
        { transform: `rotateY(deg)`, },
      { transform: `rotateY(-45deg)`, offset: .05},
      { transform: `rotateY(-45deg)`, offset: .20},
      { transform: `rotateY(45deg)`, offset: .35},
      { transform: `rotateY(-45deg)`, offset: .8},
      {transform: `rotateY(-45deg)`, offset: 1},
      ],
      {
        duration: 4000,
        delay: 0,
        iterations: 1,
        easing: "ease-in-out",
      }
    );
  
    const fightAnimation = cards[1].animate(
      [
      { transform: "translateX(0dvw)", offset: .05 },
      { transform: "translateX(-20dvw)", offset: .15 },
      { transform: "translateX(-20dvw)", offset: .20 },
      { transform: "translateX(-15dvw", offset: .30},
      { transform: "translateX(-30dvw", offset: .35},
      { transform: "translateX(-25dvw", offset: .45},
      { transform: "translateX(-35dvw", offset: .55},
      { transform: "translateX(-35dvw", offset: .6},
      { transform: "translateX(-25dvw", offset: .75},
      { transform: "translateX(-45dvw", offset: .8},
      { transform: "translateX(-45dvw", offset: 1},
      ],
      {
        duration: 4000,
        delay: 0,
        iterations: 1,
        easing: "ease-in-out",
        fill: "forwards",
      }
    ); 

    fightAnimation.onfinish = () => {
      cards[1].animate(
        [
        { transform: "translateX(-45dvw)"},
        { transform: "translateX(-23.5dvw"},
        ],
        {
          duration: 1000,
          delay: 0,
          iterations: 1,
          easing: "ease-in-out",
          fill: "forwards",
        }
      )
    }
    
}