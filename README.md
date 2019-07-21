# pokemonAPIGame

Live Demo here -> https://blondeaujulien.github.io/pokemonAPIGame/    
For now made for desktop only. Preferably (but not necessary) with a screen width of 1100px or more.    
(I'm also learning that IE and Edge browser will be a lot of fun to work with: not working on them for now).

## Project Story 

This is the first complete and original project I made since I started learning javascript. It started as I was playing with APIs and thought, after I found PokeAPI, that I could make I small game from it. I started with a simple/base idea and went head first but quickly thought about lot of small functionnalities I wanted to implement as I was going. This is why, as of now, the code is a bit messy and need some clean up.

## What I learned

Even tho I started while playing with APIs I mostly strengthened how to handle and manage a lot of events, search and learn how to use some events (thinking about the draggable event that I never played with before), how to eliminate bugs that always pop when you implement a new functionality, and generaly how to think about an application from A to Z.

## Game rules

The game is simple once you pick your name you get 5 pokemons. You have a round for changing the pokemons you don't want by selecting them ( with a click) and then click change. Then there will be 5 fights against your enemy pokemons. You drag the pokemon you want to use in the left dotted box and click fight to start the combat. Once there is a winner you are able to click new fight:  you enemy will get a new pokemon.    
The first to get to a score of 3 wins the match.    
You will see an update of the score of all the matches played at the end of the page. This is saved in local storage for the username used.    
The pokemon with the highest speed stat attack first. If they have the same speed, the user starts.    
The strenght of an attack consist of a (fixed amount of points comming from the pokemon attack stat (so the higher the stat the better) + a random bonus attack points (shared by all pokemons) - a fixed amount of point comming from the pokemon you fight (the higher the opponent defense the more it will diminish you attack).
