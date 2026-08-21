const A=localStorage;
const S={
 started:A.getItem("reset_started")==="1",
 day:+A.getItem("reset_day")||1,
 tasks:JSON.parse(A.getItem("reset_tasks")||"{}"),
 mood:JSON.parse(A.getItem("reset_mood")||"{}"),
 reflections:JSON.parse(A.getItem("reset_reflections")||"{}")
};

const quotes=[
 "Consistency is not intensity. It is the refusal to negotiate with yourself.",
 "You don't need a perfect day. You need a completed one.",
 "Make the next right choice. Then make another.",
 "Your future self is built in ordinary moments.",
 "Keep the promise small enough to keep — and strong enough to matter."
];

const things=[
 ["WAKE BEFORE 6 AM","Start the day before the world gets loud."],
 ["LIGHT OF THE SUN","Get outside and expose yourself to natural light."],
 ["TRAIN","Complete the planned training or movement session."],
 ["FOOD AS PER DIET","Follow the food structure you chose. No negotiation."],
 ["90 MIN FOCUS","Protect one serious block for your most important work."],
 ["15 MIN SILENCE","No phone. No input. Just quiet."],
 ["LINES","Write the few lines that keep you honest."],
 ["30 MIN READING","Read something that makes you better."]
];

function save(){A.setItem("reset_tasks",JSON.stringify(S.tasks));A.setItem("reset_mood",JSON.stringify(S.mood));A.setItem("reset_reflections",JSON.stringify(S.reflections));A.setItem("reset_day",S.day)}
function phase(d){return d<=30?["RESET",1,30]:d<=60?["BUILD",31,60]:["TRANSFORM",61,90]}
function id(d,i){return `d${d}t${i}`}
function done(d,i){return !!S.tasks[id(d,i)]}
function dayScore(d){return things.filter((_,i)=>done(d,i)).length}
function dayComplete(d){return dayScore(d)===8}
function daysDone(){let n=0;for(let d=1;d<=90;d++)if(dayComplete(d))n++;return n}
function totalDone(){let n=0;for(let d=1;d<=90;d++)n+=dayScore(d);return n}
function nav(active){
 return `<nav class="nav"><div class="container">
 <button class="logo" onclick="go('${S.started?'dashboard':'home'}')">90 — THE RESET</button>
 <div class="navlinks">${S.started?`
 <button class="${active==='dashboard'?'active':''}" onclick="go('dashboard')">Dashboard</button>
 <button class="${active==='day'?'active':''}" onclick="go('day/'+S.day)">Today</button>
 <button class="${active==='plan'?'active':''}" onclick="go('plan')">Plan</button>
 <button class="${active==='progress'?'active':''}" onclick="go('progress')">Progress</button>`:""}</div>
 <button class="menu" onclick="document.querySelector('.mobile').classList.toggle('open')">☰</button></div>
 <div class="mobile">${S.started?`<button onclick="go('dashboard')">Dashboard</button><button onclick="go('day/'+S.day)">Today</button><button onclick="go('plan')">Plan</button><button onclick="go('progress')">Progress</button>`:""}</div></nav>`;
}
function home(){
 return `${nav('home')}<main>
 <section class="hero container"><div><div class="kicker">90 DAYS / ONE STANDARD</div><h1>Eight things.<br>Every day.</h1><p>A focused 90-day protocol built around a small number of actions you can see, measure and repeat.</p><button class="primary" onclick="start()">START THE RESET →</button></div></section>
 <section class="section container center"><div class="kicker">THE IDEA</div><h2>Small enough to repeat.<br>Serious enough to change you.</h2><p class="section-lead">No complicated scoring system. No endless habits. Eight daily commitments, a visible score and ninety days of evidence.</p>
 <div class="cards"><div class="card feature"><div class="micro">01 / DAILY</div><h3>Eight things.</h3><p>Each day has the same core structure. You know exactly what “done” looks like.</p></div><div class="card feature"><div class="micro">02 / VISIBLE</div><h3>Ninety days.</h3><p>Your completed days become a visual record instead of a vague feeling that you're improving.</p></div><div class="card feature"><div class="micro">03 / FINAL</div><h3>Lock it in.</h3><p>At the end of the day, finalise your data. Then stop negotiating and sleep.</p></div></div></section>
 <section class="section container"><div class="kicker center">A DAY IN THE RESET</div><h2 class="center">The day is the unit.</h2><div class="day-demo"><div class="card"><div class="day-head"><div class="star">✦</div><h3>Day 24</h3><p>Week 4 · Wednesday</p></div><div class="tasks">${things.map((x,i)=>`<button class="task-btn ${i<6?'done':''}" onclick="demoTask(this)"><span>•</span>${x[0]}</button>`).join("")}</div><div class="score"><strong>6 / 8</strong><span>AT OR ABOVE MARK</span></div><div class="rule"></div><div class="micro">TODAY'S ONE THING</div><div class="one-thing">Finish the client deck.</div></div></div></section>
 <section class="section container center"><div class="kicker">THE MAP</div><h2>Ninety days<br>you can see.</h2><div class="overview"><div class="card"><div class="micro">NINETY DAY OVERVIEW</div><div class="grid90">${Array.from({length:90},(_,i)=>`<i class="cell ${i<21?'done':''} ${i%7<2?'strong':''}"></i>`).join("")}</div><div class="overview-footer"><div class="mini"><div class="micro">DAYS AT MARK</div><strong>21 / 24</strong></div><div class="mini"><div class="micro">WEIGHT CHANGE</div><strong class="teal">—</strong></div></div></div></div></section>
 <section class="section container center"><div class="kicker">YOUR NUMBERS</div><h2>Targets from<br>your own numbers.</h2><div class="target"><div class="card"><div class="micro">DAILY TARGET</div><div class="cal">YOUR TARGET</div><div class="macros"><div class="macro"><strong>—</strong><small>PROTEIN</small></div><div class="macro"><strong>—</strong><small>CARBS</small></div><div class="macro"><strong>—</strong><small>FAT</small></div></div><div class="switch"><button class="active">YOUR PLAN</button><button>ALTERNATIVE</button></div></div></div></section>
 <section class="section"><div class="container lock"><div class="lock-panel"><h2>Lock it in.<br>Then sleep.</h2><button class="final" onclick="start()">FINALISE DATA FOR THE DAY</button><div class="savebox"><div class="micro">SAVING OPERATOR DATA</div><div class="bar"><i></i></div><div class="locked"><div class="micro">DAY LOCKED</div><div class="quote">${quotes[0]}</div><div class="next">NEXT CHECK IN — TOMORROW, 9:00 PM</div></div></div></div></div></section>
 </main><footer class="footer">90 — THE RESET · PRIVATE BY DEFAULT</footer>`;
}
function demoTask(el){el.classList.toggle("done")}
function start(){S.started=true;S.day=1;A.setItem("reset_started","1");save();go("dashboard")}
function dashboard(){
 let d=S.day,score=dayScore(d),pct=Math.round(daysDone()/90*100);
 return `${nav('dashboard')}<main class="dashboard container"><div class="dashboard-top"><div><div class="kicker">YOUR RESET</div><h1>Day ${d}.</h1></div><button class="outline" onclick="go('day/'+d)">OPEN TODAY →</button></div>
 <div class="stats"><div class="stat"><div class="micro">90 DAY PROGRESS</div><div class="value">${pct}%</div><div class="progress"><i style="width:${pct}%"></i></div></div><div class="stat"><div class="micro">DAYS AT MARK</div><div class="value">${daysDone()} / 90</div></div><div class="stat"><div class="micro">TODAY</div><div class="value">${score} / 8</div></div><div class="stat"><div class="micro">TOTAL CHECKS</div><div class="value">${totalDone()}</div></div></div>
 <div class="dashgrid"><div class="card"><div class="micro">NINETY DAY OVERVIEW</div><div class="calendar">${Array.from({length:90},(_,i)=>{let n=i+1;return `<button class="${dayComplete(n)?'done':''} ${n===d?'current':''}" onclick="go('day/${n}')">${n}</button>`}).join("")}</div></div>
 <div class="card"><div class="micro">CURRENT PHASE</div><h3>${phase(d)[0]}</h3><p>${d<=30?"Clear the noise and establish the baseline.":d<=60?"Turn your actions into systems.":"Raise the standard and make it sustainable."}</p><div class="metric"><span>Phase day</span><strong>${d-phase(d)[1]+1} / 30</strong></div><div class="metric"><span>Daily score</span><strong>${score} / 8</strong></div><button class="primary" style="width:100%;margin-top:20px" onclick="go('day/'+d)">CHECK IN</button></div></div></main>`;
}
function dayPage(raw){
 let d=Math.max(1,Math.min(90,+raw||1));S.day=d;save();let score=dayScore(d);
 return `${nav('day')}<main class="day-page container"><div class="day-hero"><div class="kicker">DAY ${d} / 90 · ${phase(d)[0]}</div><h1>Eight things.</h1><p>${quotes[(d-1)%quotes.length]}</p></div>
 <div class="daygrid"><div class="card tasklist"><div class="micro">TODAY / ${score} OF 8 AT MARK</div><div class="tasks">${things.map((x,i)=>`<button class="task-btn ${done(d,i)?'done':''}" onclick="toggle(${d},${i})"><span>${done(d,i)?'●':'○'}</span>${x[0]}<div style="font:9px var(--sans);letter-spacing:0;text-transform:none;margin-top:5px;opacity:.65">${x[1]}</div></button>`).join("")}</div><div class="score"><strong>${score} / 8</strong><span>AT OR ABOVE MARK</span></div><div class="rule"></div><div class="micro">TODAY'S ONE THING</div><div class="one-thing">Finish the one task that matters most.</div><button class="final" style="margin-top:24px" onclick="lockDay(${d})">FINALISE DATA FOR THE DAY</button></div>
 <div class="card" style="padding:25px"><div class="micro">EVENING CHECK-IN</div><h3 style="font-size:25px;font-weight:300">How did the day feel?</h3><div class="moods">${["😞","😐","🙂","🔥"].map((m,i)=>`<button class="mood ${S.mood[d]===i?'active':''}" onclick="setMood(${d},${i})">${m}</button>`).join("")}</div><textarea class="reflection" id="ref" placeholder="A few lines. What did you learn?">${S.reflections[d]||""}</textarea><button class="outline" style="width:100%;margin-top:9px" onclick="saveRef(${d})">SAVE REFLECTION</button><div class="rule"></div><div class="micro">NEXT CHECK IN</div><p style="color:#9db0aa">Tomorrow, 9:00 PM.</p></div></div></main>`;
}
function toggle(d,i){S.tasks[id(d,i)]=!S.tasks[id(d,i)];save();render()}
function setMood(d,i){S.mood[d]=i;save();render()}
function saveRef(d){S.reflections[d]=document.getElementById("ref").value;save();toast("Reflection saved")}
function lockDay(d){if(!dayComplete(d)){toast("Complete all eight things before locking the day.");return}if(d<90)S.day=d+1;save();toast(d===90?"90 days complete.":"Day locked. Tomorrow is ready.");render()}
function plan(){
 return `${nav('plan')}<main class="section container"><div class="center"><div class="kicker">YOUR 90 DAY PLAN</div><h2>Three phases.<br>One direction.</h2><p class="section-lead">This is the starter structure. Replace the sample language in app.js with your exact protocol, meals, workouts, learning goals and daily rules.</p></div><div class="cards">${[["01","DAYS 1–30","RESET","Build the baseline. Remove friction. Make the eight actions obvious."],["02","DAYS 31–60","BUILD","Protect consistency. Increase depth without increasing chaos."],["03","DAYS 61–90","TRANSFORM","Turn the protocol into an identity and a sustainable routine."]].map(x=>`<div class="card feature"><div class="micro">${x[0]} / ${x[1]}</div><h3>${x[2]}</h3><p>${x[3]}</p></div>`).join("")}</div></main>`}
function progress(){
 let pct=Math.round(daysDone()/90*100);
 return `${nav('progress')}<main class="section container"><div class="center"><div class="kicker">YOUR NUMBERS</div><h2>Progress without perfection.</h2></div><div class="stats"><div class="stat"><div class="micro">COMPLETION</div><div class="value">${pct}%</div></div><div class="stat"><div class="micro">DAYS AT MARK</div><div class="value">${daysDone()}</div></div><div class="stat"><div class="micro">TOTAL CHECKS</div><div class="value">${totalDone()}</div></div><div class="stat"><div class="micro">TARGET</div><div class="value">90</div></div></div><div class="card" style="margin-top:15px"><div class="micro">NINETY DAY OVERVIEW</div><div class="calendar">${Array.from({length:90},(_,i)=>`<button class="${dayComplete(i+1)?'done':''}" onclick="go('day/${i+1}')">${i+1}</button>`).join("")}</div></div><div class="card" style="margin-top:15px"><div class="micro">LOCAL DATA</div><h3>Private by default.</h3><p>Check-ins, moods and reflections are stored only in this browser using localStorage. There is no backend in this local version.</p></div></main>`}
function toast(t){let e=document.querySelector(".toast");if(!e){e=document.createElement("div");e.className="toast";document.body.appendChild(e)}e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),1800)}
function go(r){location.hash=r}
function render(){let r=document.getElementById("app"),h=location.hash.slice(1)||"home";if(!S.started&&h!=="home"){go("home");return}r.innerHTML=h==="home"?home():h==="dashboard"?dashboard():h==="plan"?plan():h==="progress"?progress():h.startsWith("day/")?dayPage(h.split("/")[1]):home();window.scrollTo(0,0)}
addEventListener("hashchange",render);render();