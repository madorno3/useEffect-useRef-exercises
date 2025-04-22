import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function KeepDrawing(){

    const [deckId, setDeckId] = useState(null);
    const [draw, setDraw] = useState("Start drawing");
    const [cards, setCards] = useState([]);
    const [autoDraw, setAutoDraw] = useState(false);
    const timerRef = useRef(null);


    useEffect(() => {
        async function shuffle() {
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            setDeckId(res.data.deck_id);

        }
        shuffle();
    }, [])

    useEffect(() => {
        if (autoDraw && !timerRef.current) {
          timerRef.current = setInterval(() => {
            drawCard();
          }, 1000);
        }
      
        return () => {
          clearInterval(timerRef.current);
          timerRef.current = null;
        };
    }, [autoDraw, deckId]);

    const drawCard = async () => {
        try {
          const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
          const newCard = res.data.cards[0];
      
          if (!res.data.remaining) {
            clearInterval(timerRef.current);
            setAutoDraw(false);
            alert("No more cards!");
            return;
          }
      
          setCards(prev => [...prev, newCard]);
        } catch (err) {
          console.error("Error drawing a card:", err);
        }
      };
      
    return (
        <div>
            <h2>Keep drawing</h2>
            <button onClick={() => setAutoDraw(prev => !prev)}>
                {autoDraw ? "Stop" : "Start Drawing"}
            </button>
            <div style={{ position: "relative", width: "226px", height: "314px", marginTop: "20px" }}>
                {cards.map((card, index) => (
                    <img
                        key={card.code}
                        src={card.image}
                        alt={card.code}
                        style={{
                            position: "absolute",
                            top: `${index * 2}px`,
                            left: `${index * 2}px`,
                            zIndex: index
                        }}
                    />
                ))}
            </div>
            
        </div>
    )
}

export default KeepDrawing;