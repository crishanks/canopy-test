import DeckApi from "./Api/index.js";

const QueenFinder = () =>
{
    let totalQueensFound = 0;

    const cardValuesMap = {
        'ACE': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'JACK': 11,
        'QUEEN': 12,
        'KING': 13,
    };

    const spades = [];
    const diamonds = [];
    const clubs = [];
    const hearts = [];

    const deckApi = new DeckApi();

    let intervalId;

    deckApi.getShuffledDeck()
        .then((response) =>
        {
            intervalId = setInterval(() =>
            {
                if (totalQueensFound === 4)
                {
                    clearInterval(intervalId);
                    return logResults();
                } else
                {
                    drawCards(response.deck_id);
                }
            }, 1000);
        })
        .catch((e) =>
        {
            console.log(`Error: ${e}`);
        });

    const drawCards = (deckId) =>
    {
        deckApi.drawCards(deckId)
            .then((response) =>
            {
                checkCards(response.cards);
            })
            .catch((e) =>
            {
                console.log(`Error: ${e}`)
            });
    }

    const checkCards = (cards) =>
    {
        cards.forEach((card) =>
        {
            if (card.value === 'QUEEN') totalQueensFound++;
            switch (card.suit)
            {
                case 'SPADES':
                    spades.push(card.value);
                    break;
                case 'DIAMONDS':
                    diamonds.push(card.value);
                    break;
                case 'CLUBS':
                    clubs.push(card.value);
                    break;
                case 'HEARTS':
                    hearts.push(card.value);
                    break;
            }
        });
    }

    const sortCards = (cards) =>
    {
        const sortedCards = [];
        cards.forEach((card) =>
        {
            const cardIndex = cardValuesMap[card];
            sortedCards[cardIndex] = card;
        });
        return sortedCards.filter((card) => (!!card));
    }

    const logResults = () =>
    {
        const sortedSpades = sortCards(spades);
        const sortedDiamonds = sortCards(diamonds);
        const sortedClubs = sortCards(clubs);
        const sortedHearts = sortCards(hearts);

        console.log('SPADES: ', sortedSpades);
        console.log('DIAMONDS: ', sortedDiamonds);
        console.log('CLUBS: ', sortedClubs);
        console.log('HEARTS: ', sortedHearts);
    }
}

QueenFinder();
