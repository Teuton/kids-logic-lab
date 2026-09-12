import test from 'node:test';import assert from 'node:assert/strict';import {isPrime,getFactors,primeFactorization,gcd,gcdMany,lcm,lcmMany,isCoprime,countTrailingZerosFactorial} from '../src/math/core.js';
test('教材指定質數案例',()=>{assert.equal(isPrime(17),true);assert.equal(isPrime(27),false);assert.equal(isPrime(37),true);assert.equal(isPrime(47),true);assert.equal(isPrime(578),false);});
test('因數與質因數分解',()=>{assert.deepEqual(getFactors(45),[1,3,5,9,15,45]);assert.deepEqual(primeFactorization(48),{2:4,3:1});});
test('教材指定 GCD 案例',()=>{assert.equal(gcd(165,217),1);assert.equal(gcdMany([57,95,209]),19);assert.equal(gcdMany([120,168,192]),24);});
test('教材指定 LCM 案例',()=>{assert.equal(lcm(132,44),132);assert.equal(lcmMany([15,16,18]),720);assert.equal(lcm(150,120),600);});
test('互質與階乘尾數 0',()=>{assert.equal(isCoprime(8,15),true);assert.equal(isCoprime(9,15),false);assert.equal(countTrailingZerosFactorial(50),12);});
