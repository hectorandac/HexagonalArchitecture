Feature: Get limits for given context
  This feature purpose is to receive a context
  from the user and given that context we get the
  required limits from the JSON structured file

  Scenario: The user types an empty file name
    Given that the user types the name ""
    Then he will receive an error like "error: option `-f, --file <string>\' argument missing"

  Scenario: The user types a wrong file name
    Given that the user types the name "contest.json"
    Then he will receive an error like "Error: Could not find the file"

  Scenario: Good path but wrong format
    Given that the user types the name "context-bad-format.json"
    And the format check gives "false"
    Then he will receive an error like "Error: Invalid format" on Proccess

  Scenario: Good path but Good format
    Given that the user types the name "context.json"
    And the format check gives "true"
    Then he will receive a result like "{ valid: [ 18, 150 ], invalid: [ 17, 151 ] }" on Proccess
