/**
 * CommonJs模块
*/

const sayHello = (content) => {
  console.log("Hi" + content);
}
const content = "Singleton"

module.exports = {
  sayHello,
  content
}
