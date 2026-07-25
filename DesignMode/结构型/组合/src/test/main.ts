import Apple from "./Apple"
import Compote from "./Compote"
import Grape from "./Grape"
import Pear from "./Pear"


/**
 * 底盘
*/
const compote: Compote = new Compote()
const apple = new Apple()
const apple2 = new Apple()
const apple3 = new Apple()
const apple4 = new Apple()
const pear = new Pear()
const pear2 = new Pear()
const grape = new Grape()
compote.addElement(apple, apple2, apple3, apple4, pear, pear2, grape)

/**
 * 子盘1
*/
const compoteLittle1: Compote = new Compote()
const littleApple = new Apple()
const littleApple2 = new Apple()
const littleApple3 = new Apple()
compoteLittle1.addElement(littleApple, littleApple2, littleApple3)

/**
 * 字盘2
*/
const compoteLittle2: Compote = new Compote()
const littleApple4 = new Apple()
const littleApple5 = new Apple()
compoteLittle2.addElement(littleApple4, littleApple5)

/**
 * 最小的盘子， 在子盘1之内
*/
const compoteMin: Compote = new Compote()
const minApple = new Apple()
compoteMin.addElement(minApple)
compoteLittle1.addElement(compoteMin)


compote.addElement(compoteLittle1, compoteLittle2)
compote.eat()