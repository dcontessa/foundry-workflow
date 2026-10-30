import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {createServer as createTcpServer} from 'node:net';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {complete,baseline,sampleProposal} from '../src/engine.ts';

async function unusedPort(){const s=createTcpServer();s.listen(0,'127.0.0.1');await once(s,'listening');const port=(s.address() as {port:number}).port;await new Promise<void>(r=>s.close(()=>r()));return port;}
test('server adapter validates input, output, origins and provider errors using a local fixture API',async t=>{
 let fixture:'valid'|'invalid'|'error'='valid';let observed:any;
 const provider=createServer(async(req,res)=>{let body='';for await(const chunk of req)body+=chunk;observed=JSON.parse(body);res.setHeader('Content-Type','application/json');if(fixture==='error'){res.writeHead(403);res.end('{}');return;}res.end(JSON.stringify({choices:[{message:{content:JSON.stringify(fixture==='valid'?{...sampleProposal(),rules:complete}:{code:'unsupported'})}}],usage:{total_tokens:42}}));});
 provider.listen(0,'127.0.0.1');await once(provider,'listening');t.after(()=>provider.close());
 const providerPort=(provider.address() as {port:number}).port;const port=await unusedPort();
 const child=spawn(process.execPath,['--experimental-strip-types','server/index.ts'],{cwd:process.cwd(),env:{...process.env,HOST:'127.0.0.1',PORT:String(port),NEBIUS_API_KEY:'local-fixture-only',NEBIUS_BASE_URL:`http://127.0.0.1:${providerPort}/v1/`,NEBIUS_MODEL:'nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B'},stdio:['ignore','pipe','pipe']});
 t.after(()=>child.kill());await new Promise<void>((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Server fixture startup timeout')),10000);child.stdout.on('data',chunk=>{if(String(chunk).includes('Foundry server:')){clearTimeout(timer);resolve();}});child.once('exit',code=>{clearTimeout(timer);reject(new Error(`Server exited ${code}`));});});
 const url=`http://127.0.0.1:${port}`;const body={action:'repair',brief:'Training enquiries need duplicates and follow-up checks.',rules:baseline,failures:[]};
 const post=(payload:unknown,origin?:string)=>fetch(`${url}/api/propose`,{method:'POST',headers:{'Content-Type':'application/json',...(origin?{origin}:{})},body:JSON.stringify(payload)});
 await t.test('health exposes configuration without credentials',async()=>{const response=await fetch(`${url}/api/health`);const value=await response.json() as any;assert.equal(value.configured,true);assert.ok(!JSON.stringify(value).includes('local-fixture-only'));});
 await t.test('valid provider output is validated and carries provenance',async()=>{const response=await post(body);assert.equal(response.status,200);const value=await response.json() as any;assert.deepEqual(value.proposal.rules,complete);assert.equal(value.usage.total_tokens,42);assert.equal(value.provider,'Nebius');assert.equal(observed.chat_template_kwargs.enable_thinking,false);});
 await t.test('invalid user input is rejected before inference',async()=>{assert.equal((await post({...body,code:'run this'})).status,400);});
 await t.test('unrelated browser origin is refused',async()=>{assert.equal((await post(body,'https://unrelated.example')).status,403);});
 await t.test('unsupported model output is rejected without applying anything',async()=>{fixture='invalid';assert.equal((await post(body)).status,502);});
 await t.test('provider failure is surfaced without synthetic fallback',async()=>{fixture='error';const response=await post(body);assert.equal(response.status,502);assert.match((await response.json() as any).error,/HTTP 403/);});
});
