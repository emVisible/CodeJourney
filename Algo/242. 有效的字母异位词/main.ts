function isAnagram(s: string, t: string): boolean {
  if (s.length != t.length) return false
  const map = new Array(26).fill(0)
  for (let i = 0;i < s.length; i++) {
    map[s[i].charCodeAt(0) - 'a'.charCodeAt(0)]++
  }
  for (let i = 0;i < t.length; i++) {
    const idx = t[i].charCodeAt(0) - 'a'.charCodeAt(0)
    map[idx]--
    if (map[idx] < 0) return false
  }
  return true
};
const res = isAnagram("anagram", "nagaram")
const res2 = isAnagram("rat", "cat")
console.log('res',res)
console.log('res2',res2)