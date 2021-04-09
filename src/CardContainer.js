import Card from "./Card";
import axios from "axios";

import {useState, useEffect, useRef } from "react";

const DECK_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"


function CardContainer(){
  const [cardList, setCardList] =useState([]);
  const deckId = useRef();

  useEffect(function getCardDeck(){
    async function fetchDeck(){
      const deckResult = await axios.get(DECK_URL);
      deckId.current = deckResult.data.deck_id;
    }
    fetchDeck();
  }, []);

  function getCard(){
    async function fetchCard(){
      const newCardResult = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`);
      let newCard = newCardResult.data.cards[0];
      setCardList(oldList => [...oldList, newCard]);
      console.log(cardList);
    }

    fetchCard();
  };
      
  return(
    <div>
      <button onClick={getCard}>Draw a Card!</button>
      <div className="Card-Conatiner">
        {cardList.map(card => <Card key={card.code} imageUrl={card.image}/>)}
      </div>
    </div>
  )
}

export default CardContainer;
