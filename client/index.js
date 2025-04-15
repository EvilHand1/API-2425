import './index.css';

console.log('Hello, world!');

// document.getElementById("NewHeroes").addEventListener("click", async () => {
//     const Hero3 = await getHero();
//     console.log(Hero3.id);
//   });

document.addEventListener("DOMContentLoaded", () => {
    function runAnimation(){
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
    //runAnimation();
  });