import { z } from 'zod';
export const ruleKeys = ['requireEmail','preventDuplicates','validateDates','showUnassigned'] as const;
export const rulesSchema=z.object({requireEmail:z.boolean(),preventDuplicates:z.boolean(),validateDates:z.boolean(),showUnassigned:z.boolean()}).strict();
export const proposalSchema=z.object({title:z.string().min(1).max(80),summary:z.string().min(1).max(600),assumptions:z.array(z.string().max(240)).max(6),rules:rulesSchema}).strict();
export type Rules=z.infer<typeof rulesSchema>;
export type Proposal=z.infer<typeof proposalSchema>;
export const baseline:Rules={requireEmail:true,preventDuplicates:false,validateDates:false,showUnassigned:false};
export const complete:Rules={requireEmail:true,preventDuplicates:true,validateDates:true,showUnassigned:true};
export const ruleLabels:Record<keyof Rules,string>={requireEmail:'Require a valid contact email',preventDuplicates:'Flag duplicate email + course',validateDates:'Validate follow-up dates',showUnassigned:'Keep unassigned enquiries visible'};
export type Enquiry={id:string;name:string;email:string;course:string;owner:string;status:'new'|'contacted'|'qualified'|'closed';received:string;followUp:string;notes:string};
export type Input=Omit<Enquiry,'id'|'status'>;
const norm=(s:string)=>s.trim().toLowerCase();
export function createEnquiry(records:Enquiry[],input:Input,rules:Rules):{ok:boolean;records:Enquiry[];message:string}{
 const clean=Object.fromEntries(Object.entries(input).map(([k,v])=>[k,v.trim()])) as Input;
 if(!clean.name||!clean.course)return {ok:false,records,message:'Customer name and course are required.'};
 if(rules.requireEmail&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email))return {ok:false,records,message:'Enter a valid contact email.'};
 if(rules.preventDuplicates&&records.some(r=>norm(r.email)===norm(clean.email)&&norm(r.course)===norm(clean.course)))return {ok:false,records,message:'Possible duplicate: this email and course already exist. Review the existing enquiry.'};
 const validDate=(s:string)=>/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;
 if(rules.validateDates&&(!validDate(clean.received)||!validDate(clean.followUp)||clean.followUp<clean.received))return {ok:false,records,message:'Follow-up must be a valid date on or after the received date.'};
 const next={...clean,id:crypto.randomUUID(),status:'new' as const};
 return {ok:true,records:[...records,next],message:'Enquiry created.'};
}
export const visibleEnquiries=(records:Enquiry[],rules:Rules)=>records.filter(r=>rules.showUnassigned||!!r.owner);
export const exampleInput:Input={name:'Avery Tan',email:'avery@example.com',course:'Data Analysis',owner:'Alex',received:'2026-10-30',followUp:'2026-10-31',notes:'Synthetic demo enquiry'};
export const seed:Enquiry[]=[{...exampleInput,id:'demo-1',status:'new'},{...exampleInput,id:'demo-2',name:'Sam Rivera',email:'sam@example.com',course:'Project Management',owner:'Taylor',status:'contacted'},{...exampleInput,id:'demo-3',name:'Jordan Lee',email:'jordan@example.com',course:'Presentation Skills',owner:'',status:'new'}];
export type TestResult={id:string;name:string;pass:boolean;expected:string;actual:string;durationMs:number};
export function runSuite(rules:Rules):TestResult[]{
 const results:TestResult[]=[];
 const test=(id:string,name:string,fn:()=>{pass:boolean;expected:string;actual:string})=>{const start=performance.now();results.push({id,name,...fn(),durationMs:Math.round((performance.now()-start)*1000)/1000});};
 test('valid','Valid enquiry is recorded',()=>{const a=createEnquiry([],exampleInput,rules);return {pass:a.ok&&a.records.length===1&&!!a.records[0].id&&a.records[0].status==='new',expected:'One record with a stable ID and new status.',actual:a.ok?`${a.records.length} record; status ${a.records[0].status}; ID created.`:a.message};});
 test('duplicate','Duplicate is flagged',()=>{const a=createEnquiry([],exampleInput,rules);const b=createEnquiry(a.records,{...exampleInput,email:' AVERY@EXAMPLE.COM ',course:' data analysis '},rules);return {pass:!b.ok&&b.records.length===1,expected:'Duplicate blocked for review; record count stays 1.',actual:b.ok?`${b.records.length} records created. Duplicate was accepted.`:b.message};});
 test('email','Missing email is blocked',()=>{const a=createEnquiry([],{...exampleInput,email:''},rules);return {pass:!a.ok,expected:'Save blocked with a contact-email message.',actual:a.message};});
 test('date','Invalid follow-up is blocked',()=>{const a=createEnquiry([],{...exampleInput,followUp:'2026-10-29'},rules);return {pass:!a.ok,expected:'Follow-up before received date is rejected.',actual:a.message};});
 test('unassigned','Unassigned enquiry stays visible',()=>{const a=createEnquiry([],{...exampleInput,owner:''},rules);const rows=visibleEnquiries(a.records,rules);return {pass:a.ok&&rows.length===1,expected:'Unassigned record remains in the visible queue.',actual:`${a.records.length} saved; ${rows.length} visible in the queue.`};});
 return results;
}
export function passesRegression(previous:TestResult[],next:TestResult[]){return previous.filter(t=>t.pass).every(t=>next.some(n=>n.id===t.id&&n.pass));}
export function sampleProposal():Proposal{return {title:'Training enquiry workflow',summary:'Capture course enquiries, assign responsibility, and keep follow-ups visible.',assumptions:['This prototype handles training enquiries only.','Email and course together identify a possible duplicate.','Owners and dates are reviewed by a person.'],rules:{...baseline}};}
