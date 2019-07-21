class Pokemon {

	async getPokemon(id) {
		let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`);
		let responseData = await response.json();


		let url = responseData.results[id].url;
		//console.log(responseData);

		let responsePok = await fetch(url);
		let responseDataPok = await responsePok.json();
		return responseDataPok;
	}
}
