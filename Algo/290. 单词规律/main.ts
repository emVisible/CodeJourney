function wordPattern(pattern: string, s: string): boolean {
  const map: any = {}
  const words = s.split(" ")
  if (words.length != pattern.length) return false
  const registed = []
  for (let i = 0; i < words.length; i++) {
    const x = pattern[i]
    const y = words[i]

    if (map[x] && map[x] !== y) {
      return false
    } else {
      for (const value of registed) {
        if (value == y && map[x] !== y) return false
      }
      map[x] = y
      registed.push(y)
    }
  }
  return true
};

const res = wordPattern("abba", "dog cat cat fish")
console.log('res', res)