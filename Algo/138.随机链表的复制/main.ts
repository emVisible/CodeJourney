/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     next: Node | null
 *     random: Node | null
 *     constructor(val?: number, next?: Node, random?: Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *         this.random = (random===undefined ? null : random)
 *     }
 * }
 */


function copyRandomList(head: Node | null): Node | null {
  const res = new Node(head.val)
  const aim = res
  while (head !== null) {
    while (res) {
      res = res.next
    }
    res.next = head.next
    res.random = head.random
    head = head.next
  }
  return aim
};