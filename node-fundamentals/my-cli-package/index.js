#!/usr/bin/env node
const inquirer = require("inquirer");
 //const yargs = require("yargs");
//const { argv } = yargs(process.argv);
const https = require('https')
const url = "https://pokeapi.co/api/v2/pokemon/";
const printFiveMoves = async (pokemonName) => {
  https.get(url+pokemonName, res => {
    let data = '';
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', () => {
      data = JSON.parse(data);
      const moves = data.moves.map(({ move }) => move.name);
      console.log(moves.slice(0, 5));
    })
  }).on('error', err => {
    console.log(err.message);
  })
};

const prompt = inquirer.createPromptModule();
prompt([
  {
    type: "input",
    name: "pokemon",
    message: "Enter a pokemon name to view its first 5 moves",
  },
]).then((answers) => {
  const pokemon = answers.pokemon;
  printFiveMoves(pokemon);
});

// printFiveMoves(argv.pokemon);
