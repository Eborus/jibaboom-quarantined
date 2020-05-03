# Code Style

This documents helps to guide the look and feel of the code so that even when there are multiple developer, the style remains consistent. You may read more about it [here](https://javascript.info/coding-style).

## Style Guide

| Rules             | Choices                         |
| ----------------- | ------------------------------- |
| Case Styles       | camelCase/snake_case/PascalCase |
| Acronym Case      | IBM/Ibm/ibm                     |
| Indentation Style | Allman/1TBS                     |
| Indentation       | Tabs/Space                      |
| Indentation Space | 2/4 spaces                      |
| Semicolon         | Optional/Mandatory              |

## Examples

Based on your chosen rules, give an example of a code that follows the code style and an example of a code that does not follow the code style. The examples you give should cover all the above defined rule.

### Good Example

```js
function totallyNormalAddition(firstInteger, secondInteger) {
    let resultMessage = "The sum of this totally normal addition adds up to ";

    if(firstInteger > 10) {
        firstInteger = firstInteger + 5
    } else {
        firstInteger = firstInteger + 10
    };

    let result = firstInteger + secondInteger;

    return resultMessage + result;
}

console.log(totallyNormalAddition(4, 5));
```

### Bad Example

```js
function TotallyNormalSubtraction(FirstInteger,SecondInteger){
let Resultmessage = "The sum of this totally normal addition adds up to"
if(FirstInteger>10) {
FirstInteger = FirstInteger+5 } 
else {
FirstInteger = FirstInteger+10 }
let Result = FirstInteger+SecondInteger
return Resultmessage+Result
}
console.log(totallyNormalAddition(4,5)+"my eyes hurt")
```
