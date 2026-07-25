/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
/**
 * 双指针
*/
// function hasCycle(head: ListNode | null): boolean {
//   if (!head || !head.next) return false
//   let slow = head
//   let fast = head.next
//   while (slow != fast) {
//     if (!fast || !fast.next) return false
//     slow = slow.next
//     fast = fast.next.next
//   }
//   return true

/**
 * 哈希表
*/
// function hasCycle(head: ListNode | null): boolean {
//   const map = new Set()
//   while (head) {
//     if (map.has(head)) return true
//     map.add(head)
//     head = head.next
//   }
//   return false
// };
