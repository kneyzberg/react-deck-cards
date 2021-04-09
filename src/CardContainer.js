import Card from "./Card";
import axios from "axios";

import {useState, useEffect, useRef } from "react";

const DECK_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"


function CardContainer(){
  const [cardList, setCardList] =useState([]);
  const [isShuffling, setIsShuffling] = useState(true)
  const [deckId, setDeckId] = useState("")

  async function fetchDeck(){
    if(deckId){
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

  async function getCard(){
      const newCardResult = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      let newCard = newCardResult.data.cards[0];
      setCardList(oldList => [...oldList, newCard]);
  };

  if(isShuffling) return <p>Loading...</p>

  return(
    <div>
      <button onClick={getCard}>Draw a Card!</button>
      <button onClick={fetchDeck}>Reshuffle deck!</button> 
      <div className="Card-Conatiner">
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
