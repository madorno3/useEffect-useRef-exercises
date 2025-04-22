import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Card (){

    const [deck, setDeckId] = useState(null);
    const [card, setCard] = useState(null);

    useEffect(() => {
        async function shuffle() {
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            setDeckId(res.data.deck_id);
        }
        shuffle();
    }, [])

    const handleClick = async () => {
        console.log("RAHHHHHHHHHH THE SPIRIT OF GAGA COMPELS YOU!");
        if (deck) {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
            setCard(res.data);

            console.log(res.data);
        }
    };
    
    return (
        <div>
            <h2>Deck O' Cards</h2>
            <button onClick={handleClick}>Get a card</button>
            {card && card.cards && (<img style={{ margin: '20px', display:'block' }} src={card.cards[0].image} alt={card.cards[0].code} />)}
            
        </div>
    )
}

export default Card;