function groupAnagrams(strs) {
    const map = {}
    for (const s of strs) {
      const subMap = new Array(26).fill(0)
      for (const value of s) {
        subMap[value.charCodeAt(0) - 'a'.charCodeAt(0)]++
      }
      map[subMap] ? map[subMap].push(s) : map[subMap] = [s]
    }
    return Object.values(map)
};

const res = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
console.log('res',res)