
import "./Card.css"

/* props:
imageUrl: */

function Card({imageUrl}){
  // function getRandomRotation {
  //   let rotation = Math.floor(Math.random * (45));
  //   if(Math.random() > 0.5){
  //     rotation = rotation * -1;
  //   }
  //   return rotation;
  // }

  // let cardRotation = getRandomRotation();

  return (
    <div className="Card-cards">
      <img src={imageUrl}></img>
    </div>
  )
}

export default Card;