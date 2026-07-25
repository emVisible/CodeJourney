import { test } from 'node:test'
import assert from 'assert';
function simplifyPath(path: string): string {
  const globalStack = ['/']
  const newPath = path.replace(/\/\/+/g, '/')
  newPath.split("/").forEach((value, index) => {
    if (!value) return
    if (value == '.') {
      return
    } else if (value == '..') {
      if (globalStack.length == 1) return
      globalStack.pop()
    } else {
      globalStack.push(`${value}/`)
    }
  })
  let res = globalStack.join('')
  if (res.length != 1 && res.endsWith('/')) {
    res = res.substring(0, res.length - 1)
  }
  return res
};
function simplifyPath2(path: string): string {
  const stack = [] as string[]
  const names = path.split('/')
  for (const name of names) {
    if (name == '..') {
      if (stack.length) stack.pop()
    }
    else if (name.length && name != '.') stack.push(name)
  }
  return "/" + stack.join('/')
};
test('e1', () => {
  assert.deepEqual("/home", simplifyPath("/home/"))
})
test('e2', () => {
  assert.deepEqual("/", simplifyPath("/../"))
})
test('e3', () => {
  assert.deepEqual("/home/foo", simplifyPath("/home//foo/"))
})
test('e4', () => {
  assert.deepEqual("/c", simplifyPath("/a/./b/../../c/"))
})