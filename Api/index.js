import axios from "axios";

export default class DeckApi
{
    getShuffledDeck = async (count = 1) =>
    {
        const axiosResponse = await axios.get(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${count}`);
        return axiosResponse.data;
    }

    drawCards = async (deckId, count = 2) =>
    {
        const axiosResponse = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
        return axiosResponse.data;
    }
}