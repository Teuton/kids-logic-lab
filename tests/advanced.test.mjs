import test from 'node:test';
import assert from 'node:assert/strict';
import {rectangleArea,canPlacePiece,isBoardCovered,foldPaper,candyFilterCount,gearValuesFromGcd,numberLineJumps} from '../src/math/advanced.js';
test('14×12 拼板總面積與吸附碰撞',()=>{assert.equal(rectangleArea(14,12),168);assert.equal(canPlacePiece({x:0,y:0,w:8,h:7},[],14,12),true);assert.equal(canPlacePiece({x:7,y:0,w:6,h:7},[{x:0,y:0,w:8,h:7}],14,12),false);assert.equal(canPlacePiece({x:8,y:0,w:6,h:7},[{x:0,y:0,w:8,h:7}],14,12),true);});
test('14×12 四片完整覆蓋',()=>{const pieces=[{x:0,y:0,w:8,h:7},{x:8,y:0,w:6,h:7},{x:0,y:7,w:8,h:5},{x:8,y:7,w:6,h:5}];assert.equal(isBoardCovered(pieces,14,12),true);});
test('紙張依序上下、左右、左右對摺',()=>{let s={width:16,height:12,layers:1,folds:0,history:[]};s=foldPaper(s,'horizontal');s=foldPaper(s,'vertical');s=foldPaper(s,'vertical');assert.deepEqual({width:s.width,height:s.height,layers:s.layers,folds:s.folds},{width:4,height:6,layers:8,folds:3});});
test('96 顆糖果套用兩個條件後剩 66',()=>{const candies=Array.from({length:96},(_,i)=>({id:i,color:['red','green','yellow','blue'][i%4],shape:i%16<4?'star':'round'}));assert.equal(candyFilterCount(candies,[c=>c.color!=='red',c=>!(c.color==='blue'&&c.shape==='star')]),66);});
test('齒輪比例 6:2:1 且 GCD=12',()=>{assert.deepEqual(gearValuesFromGcd([6,2,1],12),[72,24,12]);});
test('+88 數線 0 到 500 共 5 次',()=>{assert.deepEqual(numberLineJumps(88,500),[88,176,264,352,440]);});
