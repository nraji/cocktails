# Cocktail Service

## Problem to solve

You can find the problem to solve [here](https://bodenbauschutt-cocktails.deno.dev/task2).

## Installation

Install using [npm](https://www.npmjs.org/):

```sh
npm install
```

## Starting locally

```sh
npm start
```

Following endpoint can be used to use the service

```sh
localhost:3000/dingdong
```
| Param                     | Type                 | Optional          | Description                                                   |
|---------------------------|----------------------|-------------------|---------------------------------------------------------------|
| [ numOfStoreIngredients ] | <code>Integer</code> | <code>true</code> | Number of stored ingredients you want to use for the cocktail |

### Example request

```sh
localhost:3000/dingdong?numOfStoreIngredients=1
```

## Tests

Run tests using: 
```sh
npm test
```
