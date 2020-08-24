# Zombies vs Creatures!
After the nuclear war, a strange and deadly virus has infected the planet. Living creatures are becoming zombies that spread their zombiness by an unfriendly bite. The world consists of an n x n grid on which zombies and creatures live.
## Installation
The application use Jest for unit testing. There is only one additional package at the moment. You can install this by running the following command at the project root directory:

`npm install`

## Running the application
Run the following command to start the application

`npm run program [filepath]`

> *filepath = the input file that has initial data
> Currently supported formats: .txt .json

To instantly run the program with example data use the following command:

    npm run program ./input.txt
   or 

    npm run program ./input.json

## Input file format
The application currently supports .txt and .json files. CLI argument implementation is planned in further releases.

### .txt files
Following is the sample file content for .txt files:

    3
    (0,0)
    (2,0)(1,1)
    LDD
Description by lines:
 1. Defines the **n** for the **n x n** grid. E.g in this case the grid would be 3x3.
 2. The starting coordinates for zombies. You may define multiple coordinates on the same line to initialize mutiple zombies.
 3. The starting coordinates for creatures. You may define multiple coordinates on the same line to initialize mutiple zombies.
 4. Theses are the moves each of the zombies will make. Each move will made by all the converted creatures as well.
### .JSON files
Following is the smaple content for .json files:

    {
	    "size": 4,
	    "zombiePositions": [
		    "(2,1)"
	    ],
	    "creaturePositions": [
		    "(0,1)",
		    "(1,2)",
		    "(3,1)"
	    ],
	    "moves": "DLUURR"
    }
Description by keys:
 1. **Size:** Defines the **n** for the **n x n** grid. E.g in this case the grid would be 3x3.
 2. **zombiePositions** The starting coordinates for zombies. You may define multiple coordinates on the same line to initialize mutiple zombies.
 3. **creaturePositions** The starting coordinates for creatures. You may define multiple coordinates on the same line to initialize mutiple zombies.
 4. **moves** Theses are the moves each of the zombies will make. Each move will made by all the converted creatures as well.

## Output
Once you run the exmaple **.txt** file you will see the following output:

    zombies score: 2
    zombies positions:
    (2,2) (1,2) (0,0)
    survivor(s):
**Zombies score** indicates the number of times all the zombies have successfuly 'turned' a creature into a zombie.
**Zombies positions** denotes the position of the zombies after they have completed the moves.
**Survivors** denotes the numbers of creatures that have not been turned into zombies.
 
## Running tests and current coverage
Run the following command to unit test the application:

    npm test

To run the tests with coverage details use the following command

    npm test -- --coverage
---
### Current coverage results
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------|---------|----------|---------|---------|-------------------
All files        |   85.42 |     87.5 |    91.3 |   85.56 | 
 src             |   85.25 |    90.91 |   88.24 |   85.96 | 
  creatures.js   |     100 |      100 |     100 |     100 | 
  inhabitants.js |     100 |      100 |     100 |     100 | 
  planet.js      |      75 |    85.71 |   83.33 |   76.47 | 67-76
  zombies.js     |     100 |      100 |     100 |     100 | 
 utils           |   85.71 |    84.62 |     100 |   84.85 | 
  utils.js       |   85.71 |    84.62 |     100 |   84.85 | 27,45-54,89-93   

> The remaining lines are **console.error** logs which require custom jest extensions to be tested.

----
