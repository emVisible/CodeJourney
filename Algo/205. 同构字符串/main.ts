function isIsomorphic(s: string, t: string) :boolean{
  const map1:any = {}
  const map2:any = {}
  for (let i = 0; i < s.length; ++i ){
    const x = s[i]
    const y = t[i]
    if ((map1[x] && map1[x] !== y) ||(map2[y] && map2[y] !== x))return false
    map1[x] = y
    map2[y] = x
  }
  return true
};

const res = isIsomorphic('egg', 'add')
console.log('res',res)