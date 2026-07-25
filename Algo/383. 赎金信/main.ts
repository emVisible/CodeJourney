function canConstruct(ransomNote: string, magazine: string): boolean {
  const map = new Array(26).fill(0)

  for (const ch of magazine){
    map[ch.charCodeAt(0) - 'a'.charCodeAt(0)]++
  }

  for (const ch of ransomNote) {
    map[ch.charCodeAt(0) - 'a'.charCodeAt(0)]--
    if (map[ch.charCodeAt(0) - 'a'.charCodeAt(0)] < 0) return false
  }
  return true
};