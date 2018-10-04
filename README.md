# Hexagonal Architecture #
The purpose of this project is to build a better understanding of the Hexagonal Architecture.
The task we will need to accomplish are to:
* Create a JS Module using TDD, This will be later implemented in a more complex web development project, this module need to be able to:
  - Be modifiable in terms of tests it can run using the Gherkin language.
  - Be Modifiable in terms of the test it can run using the unit testing solution provided by the language of the authors choice in these case JS.

## Usage ##
This section will explain the necessary steps to run the program as well as it's tests.
### Running the program ###
Since we are using NodeJS for building it, the command needed to run this module is ```node <Installation directory> -f <JSON formatted file>```, The expected output for these command would be a JSON structured text which will show the interpreted constraints by the program.
### Testing the program ###
This section will explain the necessary steps to perform test on the software.
#### Running Gherkin environment ####
If you would like to test the gherkin feature file you'll need to run the following command ```npm test```, this command will help you test the critical parts of the program initiated by a user behavior. If you would like to change that behavior you can find [context.json]("https://git.meetacosta.com/Intec/Hexagonal-Architecture/blob/master/context.json"), [context-bad-json]("https://git.meetacosta.com/Intec/Hexagonal-Architecture/blob/master/context-bad-json.json") and [context-bad-format]("https://git.meetacosta.com/Intec/Hexagonal-Architecture/blob/master/context-bad-format.json") which are some test cases required for the Gherkin test, also feel free to modify the file [ValidatorProcessor]("https://git.meetacosta.com/Intec/Hexagonal-Architecture/blob/master/features/ValidatorProcessor.feature"), which defines the steps that test runs.

#### Running Unit Tests environment ####
If you rather run all the unit test associated with this project run the command ```npm run unit-test```, if you need it you can also modify the test cases explained above to match your criteria.

## Details ##
This is a school project, intended for the class of Web Application Development, the objective is to have a better understanding of the Hexagonal Architecture.

### Authors ###
* Hector Andres Acosta Pozo (1065948)
* Raul Ovalle (1055344)
