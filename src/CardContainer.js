import Card from "./Card";
import axios from "axios";
import "./CardContainer.css"
import {useState, useEffect, useRef } from "react";

const DECK_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"


function CardContainer(){
  const [cardList, setCardList] =useState([]);
  const [isShuffling, setIsShuffling] = useState(true)
  const [deckId, setDeckId] = useState("");
  const timerId = useRef();
  const [isDrawing, setIsDrawing] = useState(false);

  async function fetchDeck(){
    if(deckId){
      // setIsDrawing(d => {
      //   clearInterval(timerId.current)
      //   return false;
      // });
      setIsShuffling(isShuffling => true)
      const deckResult = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
      setCardList([]);
    }
    else {
      const deckResult = await axios.get(DECK_URL);
      setDeckId(deckResult.data.deck_id);
    }
    setIsShuffling(isShuffling => false);
  }
  
  useEffect(function getCardDeck(){
    fetchDeck();
  }, []);

  useEffect(function startCardDrawing(){
    if(isDrawing){
      timerId.current = setInterval(() => {
        getCard();
      }, 1000);
    } else {
      clearInterval(timerId.current);
    }
  },[isDrawing, timerId]);

  function toggleDrawing(){
    setIsDrawing(d => !d);
  }

  async function getCard(){
      const newCardResult = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      let newCard = newCardResult.data.cards[0];
      setCardList(oldList => [...oldList, newCard]);
  };

  if(isShuffling) return <p>Loading...</p>

  return(
    <div>
      <button onClick={toggleDrawing}>{!isDrawing ? "Start Drawing": "Stop Drawing" }</button>
      <button onClick={fetchDeck}>Reshuffle deck!</button> 
      <div className="Card-Container">
        {cardList.length <= 52 ?
        cardList.map(card => <Card key={card.code} imageUrl={card.image}/>)
        :
        <h4>You're out of cards</h4>
        }
      </div>
    </div>
  )
}

export default CardContainer;
