import test from 'node:test';import assert from 'node:assert/strict';
import {baseline,complete,runSuite,createEnquiry,exampleInput,passesRegression,proposalSchema} from './engine.ts';
test('prepared baseline exposes three reproducible failures',()=>{const r=runSuite(baseline);assert.deepEqual(r.filter(t=>!t.pass).map(t=>t.id),['duplicate','date','unassigned']);});
test('complete configuration passes the unchanged contract',()=>assert.ok(runSuite(complete).every(t=>t.pass)));
test('duplicate check normalizes email and course',()=>{const a=createEnquiry([],exampleInput,complete);const b=createEnquiry(a.records,{...exampleInput,email:' AVERY@EXAMPLE.COM ',course:' DATA ANALYSIS '},complete);assert.equal(b.ok,false);assert.equal(b.records.length,1);});
test('invalid calendar date is rejected',()=>assert.equal(createEnquiry([],{...exampleInput,followUp:'2026-02-30'},complete).ok,false));
test('different course is a distinct enquiry',()=>{const a=createEnquiry([],exampleInput,complete);assert.equal(createEnquiry(a.records,{...exampleInput,course:'Design'},complete).ok,true);});
test('repair cannot regress prior passing tests',()=>assert.equal(passesRegression(runSuite(complete),runSuite(baseline)),false));
test('proposal rejects executable or unsupported configuration',()=>assert.equal(proposalSchema.safeParse({title:'x',summary:'y',assumptions:[],rules:{...complete,code:'alert(1)'}}).success,false));
