import assert from 'assert'
import test from 'node:test'

// assert.ok(1 === 1, "TRUE")
// assert.ok(1 == Math.random() * 10, "数值不相同")

// assert.equal(Math.random(), Math.random(), "不同")
// assert.deepEqual({a:32,b:"abc"}, {a:32, b:"abc"}, "对象不同")
// assert.deepEqual({a:32,b:"abc"}, {c:32, b:"abc"}, "对象不同")

test("对象相同", ()=>{
  assert.deepEqual({a:32,b:"abc"}, {a:32, b:"abc"})
})
test("对象不相同", ()=>{
  assert.deepEqual({a:32,b:"abc"}, {c:32, b:"abc"})
})