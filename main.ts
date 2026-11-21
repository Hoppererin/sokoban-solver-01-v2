import F from"node:fs";
const E=process.env,I=E.MAKEFUN_INPUT_DIR||"/input",O=E.MAKEFUN_OUTPUT_DIR||"/output",U="udlr";
for(let d of F.readdirSync(I)){
let L=F.readFileSync(I+"/"+d+"/level.txt","utf8"),w=L.indexOf("\n"),g=L.replace(/\n/g,""),D=[-w,w,-1,1],X=[],p;
[...g].forEach((x,i)=>{if("$*".includes(x))X.push(i);if("@+".includes(x))p=i});
const B=(o,s,t)=>{let q=[s],v={[s]:""};if(s==t)return"";for(let c of q)for(let k=4;k--;){let n=c+D[k];if(o(n)&&!(n in v)){v[n]=v[c]+U[k];if(n==t)return v[n];q.push(n)}}return v};
const S=(C,e,f,b,x)=>{
let Q=[[b,e,""]],V={[b+"|"+e]:1};
for(let[q,p,m]of Q){
let o=i=>(i in C||i==e)&&!q.includes(i),R=B(o,p);
if(q.every(v=>".*+".includes(g[v]))){let c=f in R;if(!x||c)return[m,c,p,q]}
for(let v of q)for(let j=4;j--;){let n=v+D[j];
if(o(n)&&v-D[j] in R){let u=[...q];u[u.indexOf(v)]=n;u.sort();let k=u+"|"+v;
if(!V[k]){V[k]=1;Q.push([u,v,m+R[v-D[j]]+U[j]])}}}}
return["",0,e,[]]};
let y=p/w|0,s=new Set(X),m="",T=[],o=i=>g[i]!="#"&&!s.has(i);
let K=(e,b,a)=>{m+=B(o,p,e)+a[0];for(let v of b)s.delete(v);for(let v of a[3])s.add(v);p=a[2]};
for(let q of[y-1,y+1])for(let i=q*w;i<q*w+w;i++)if(g[i]!="#"){let C=B(j=>g[j]!="#"&&j/w>>0!=y,i),e=i+(y-q)*w,b=X.filter(v=>v in C),a=S(C,e,i,b,0);a[1]?K(e,b,a):T.push([C,e,i,b,a])}
for(let R of T){if(R!=T.at(-1)){let a=S(R[0],R[1],R[2],R[3],1);if(a[0])R[4]=a}K(R[1],R[3],R[4])}
F.mkdirSync(O+"/"+d,{recursive:true});F.writeFileSync(O+"/"+d+"/solution.txt",m)}
