document.addEventListener('click', function(event){

  if(event.target === document.getElementById("addBtn")){
    document.getElementById("addList").style.display="block";

  }else{
    document.getElementById("addList").style.display="none";
  }

  if(event.target.matches("#popQuote,#popLink,#popTodo") || event.target.matches("#cancel,#cancelLink,#cancelTask")){
    //quote
    document.getElementById("popQuote").style.display = "none";
    document.getElementById("quoteInp").value="";
    document.getElementById("quoteTitle").value="";
    //link
    document.getElementById("popLink").style.display="none";
    document.getElementById("linkName").value="";
    document.getElementById("linkURL").value="";
    //todo
    document.getElementById("popTodo").style.display="none";
    document.getElementById("submitTodo").disabled = true;
    document.getElementById("submitTodo").style.cssText=`background-color: #2A2A2A; color: #d3d7d9;`;
  }

  if(event.target === document.getElementById("qbg")){
    document.getElementById("qbg").style.display="none";
    dltstatus = "";
  }

  if (event.target == document.getElementById("delaccount")) {
    DeleteAcc();
  } else {
    const dellAcc = document.getElementById("dellAcc");
    if (dellAcc && !dellAcc.contains(event.target)) {
      dellAcc.remove();
    }
  }

  if (event.target == document.getElementById("setU")) {
    changeU();
  } else {
    const cup = document.getElementById("cup");
    if (cup && !cup.contains(event.target)) {
      cup.remove();
    }
  }

  if(event.target == document.getElementById("setP")) {
    changeP();
  }else {
    const cpd = document.getElementById("cpd");
    if(cpd && !cpd.contains(event.target)){
      document.getElementById("cpd").remove();
    };
  };

});

let statusQuote = ""; // flag to check kung mag-a-add ba o mag-e-edit ng quote para ma-reuse natin yung #popquote modal

function addQuotes() {
  statusQuote = "addQuote";
  document.getElementById("submitQuote").style.color=" #565656c6";
  document.getElementById("submitQuote").disabled=true;

  document.getElementById("quoteInp").value="";
  document.getElementById("quoteTitle").value="";
  
  document.getElementById("popQuote").style.display = "block";
  console.log(statusQuote);
};

function addLinks(){
  document.getElementById("popLink").style.display="block";
}

function addTodo(){
  statusTodo = 'addTodo';
  document.getElementById("popTodo").style.display="block";
  document.getElementById("todoDate").value = dateCreated;
  document.getElementById("todoTitle").value= "";
  document.getElementById("desc").value ="";
}



document.addEventListener('input', ()=>{

  // verify muna kung may laman yung quote box para ma-enable yung submit button
  if(document.getElementById("quoteInp").value.trim() !== ""){
    document.getElementById("submitQuote").style.color=" #007bff"
    document.getElementById("submitQuote").disabled=false;
  }else{
    document.getElementById("submitQuote").style.color=" #565656c6";
    document.getElementById("submitQuote").disabled=true;
  }

  // same logic sa link, enable natin yung submit pag may nilagay na URL
  if(document.getElementById("linkURL").value.trim() !== ""){
    document.getElementById("submitLink").style.color=" #007bff";
    document.getElementById("submitLink").disabled=false;
  }else{
    document.getElementById("submitLink").style.color=" #565656c6";
    document.getElementById("submitLink").disabled=true;
  }

  // set ng rules/validation para sa to-do inputs

  let indate = document.getElementById("todoDate").value;
  let ind = new Date(indate);
  let td = new Date(dateCreated);

  if(ind >= td && document.getElementById("todoTitle").value.trim() != ""){
    document.getElementById("todoDate").style.backgroundColor = "rgba(119, 255, 201, 0.83)";
    // console.log( ind +" >= "+ td)
    document.getElementById("submitTodo").disabled = false;
    document.getElementById("submitTodo").style.cssText=`background-color:rgb(93, 93, 93); color:rgb(152, 255, 158);`;
  }else{
    document.getElementById("todoDate").style.backgroundColor = "rgba(255, 119, 126, 0.83)";
    document.getElementById("submitTodo").disabled = true;
    document.getElementById("submitTodo").style.cssText=`background-color: #2A2A2A; color: #d3d7d9;`;
  }

});


const today = new Date();
const day = today.getDate();
let month = today.getMonth()+1;
const year = today.getFullYear();
if(month < 10){
  month = "0"+month;
};
let dateCreated = ""+month+"/"+day+"/"+year+"";



console.log(dateCreated);

document.getElementById("submitQuote").addEventListener('click', (event) => {
  event.preventDefault();

  if(statusQuote == "addQuote"){
    let quoteTitle = document.getElementById("quoteTitle").value;
    let quoteInp = document.getElementById("quoteInp").value;

    if(quoteTitle.trim() === ""){
      quoteTitle = "Untitled Quote";
    };

    let fd = new FormData();
    fd.append('action', 'addQuote');
    fd.append("title", quoteTitle);
    fd.append("text", quoteInp);
    fd.append("date", dateCreated);

    fetch('backend/addDelete.php', {
      method: "POST",
      body: fd
    })
    .then(response => response.json())
    .then(data => {
      console.log("Response:", data);
      if (data.status == "fail" || data.status == "error") {
        alert(data.msg);
      }
      if (data.status == "success") {
        // alert(data.msg);
        Quotes();
      }
    })
    .catch(error => console.error("Fetch Error:", error));

  }else if(statusQuote == "editQuote"){

    let quoteTitle = document.getElementById("quoteTitle").value;
    let quoteInp = document.getElementById("quoteInp").value;

    if(quoteTitle.trim() === ""){
      quoteTitle = "Untitled Quote";
    };

    console.log(qId+" "+quoteTitle+" "+quoteInp);

    let fd = new FormData();
    fd.append('action', 'editQuote');
    fd.append('id', qId);
    fd.append('qtitle', quoteTitle);
    fd.append('qtext', quoteInp);

    fetch('backend/addDelete.php',{
      method: 'POST',
      body: fd
    })
    .then(response => response.json())
    .then(data => {
      if(data.status == 'success'){
        // alert(data.msg);
        Quotes();
      }
    });
  };

  document.getElementById("popQuote").style.display = "none";
  document.getElementById("quoteInp").value="";
  document.getElementById("quoteTitle").value="";
}); 

function loadQuotes(){
  let fd = new FormData();
  fd.append("action", "getQuote");
  fetch('backend/getDataSql.php',{
    method: "POST",
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == "success"){
      quotes.innerHTML = "";
      data.dquotes.reverse().forEach(quote => {
        quotes.innerHTML += `
          <div class="quoteList" data-id="${quote.id}" data-title="${escapeHTML(quote.title)}"data-content="${escapeHTML(quote.content)}" data-date="${quote.dcreate}"onclick="openQuote(this)">
            <div class="titleDate">
              <h1>${quote.title}</h1>
              <small>${quote.dcreate}</small>
            </div>
            <svg onclick="delQuote(event,${quote.id})" style="border-radius: 50%; width:fit-content;height:fit-content;padding:3px;" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="-1 0 27 27" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </div>`;
      });
    }else alert("ok lang yan bawi next life!!");
  });
};

let dltstatus;

function delQuote(event,id){
  event.stopPropagation();

  document.getElementById("qbg").style.display="none";

  let fd = new FormData();
  fd.append('action', 'dltQuote');
  fd.append('id', id);

  fetch('backend/addDelete.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == 'success'){
      Quotes();
    }else if(data.status == 'fail'){
      alert(data.msg);
    };
  });
};

function escapeHTML(str){
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};


let qId;
let qtitle;
let qcontent;
function openQuote(el){
  dltstatus = 'indlt';
  qId = el.dataset.id;
  qtitle = el.dataset.title;
  qcontent = el.dataset.content;
  let dc = el.dataset.date;

  // inalis ko muna yung mga debug logs dito
  let a = document.getElementById("qbox");

  document.getElementById("qbg").style.display="block";

  a.innerHTML="";
  a.innerHTML = `
    <dotlottie-player src="https://lottie.host/2bf652cf-ff04-4777-a0e2-fee9fae51ebc/GWVTTyjlWc.lottie" background="transparent" speed="2" 
      style="width: 75px; height: 75px; position: absolute;top:0; border-radius:10px" loop autoplay></dotlottie-player>

    <div style="position:absolute; right: 20px;top:-40px; padding: 10px; background-color:#ffffff; border: 1px solid #e0e0e0; display: flex;align-items: center;gap:10px;border-radius:25px;">
      <svg class="qqq" onclick='editQuote()' xmlns="http://www.w3.org/2000/svg" style="background-color:#ffffff;border:1px solid #000;border-radius:100%;padding:3.5px;" width="24" height="24" viewBox="-5 -5 34 34" fill="black" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
      <svg class="qqq" id="dellot"; onclick="delQuote(event,${qId})" xmlns="http://www.w3.org/2000/svg" style="background-color:#ffffff;border:1px solid #cc0000;color:#cc0000;border-radius:100%;padding:3.5px;" width="24" height="24" viewBox="-5 -5 34 34" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
      <svg class="qqq" onclick="document.getElementById('qbg').style.display='none'" xmlns="http://www.w3.org/2000/svg" style="background-color:#ffffff;border:1px solid #555555;color:#555555;border-radius:15px;padding:3.5px;" width="24" height="24" viewBox="-5 -5 34 34" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
    </div>
    <div style="text-align: center; font-family: 'Inter', sans-serif; font-size:26px;font-weight:bold;">
      <div style="text-align:right;margin: 20px 0">
        <small style="font-size:14px; padding: 10px">${dc}</small>
      </div>
      <p style="word-break: break-word;">${escapeHTML(qcontent)}</p>
      <p style="margin: 40px 0 0 0;">${escapeHTML(qtitle)}</p>
    </div>
    <dotlottie-player src="https://lottie.host/2bf652cf-ff04-4777-a0e2-fee9fae51ebc/GWVTTyjlWc.lottie" background="transparent" speed="3" 
      style="width: 75px; height: 75px; position: absolute;bottom:0px;right:25px;transform:rotate(-180deg);" loop autoplay></dotlottie-player>
    `;
};

function editQuote(){
  document.getElementById("qbg").style.display="none";
  addQuotes();
  statusQuote = "editQuote";
  console.log(statusQuote+" "+qId);

  document.getElementById("quoteTitle").value = qtitle;
  document.getElementById("quoteInp").value = qcontent;

}




// --- section na 'to is for links ---
document.getElementById("submitLink").addEventListener('click', function(event){
  event.preventDefault();

  let linkName = document.getElementById("linkName").value;
  let url = document.getElementById("linkURL").value;

  if(!url.startsWith("http://") && !url.startsWith("https://")){
    linkErr.innerHTML = `URL invalid!!`;
    return;
  };

  if(linkName.trim() == ""){
    linkName = url;
    console.log(linkName);
  };
  console.log(linkName);

  let fd = new FormData();
  fd.append("action", "addLink");
  fd.append("name", linkName);
  fd.append("url", url);

  fetch('backend/addDelete.php',{
    method: "POST",
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == 'success'){
      // alert(data.msg);

      document.getElementById("linkName").value="";
      document.getElementById("linkURL").value="";
      document.getElementById("popLink").style.display="none";
      Links();
    }
  })

});

function loadLinks(){
  let fd = new FormData();
  fd.append("action", "getLink");
  fetch('backend/getDataSql.php',{
    method: "POST",
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == 'success'){
      gridLinks.innerHTML = "";
      data.dlinks.reverse().forEach(link =>{
        let date = link.lastvisit;
        if(date == null){
          date =""
        };
        let domain = new URL(link.link).hostname;
        let faviconUrl = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
        gridLinks.innerHTML += ` 
        <div class="gridItemLink">
          <div style="width:200px; position: relative;">
            <div class="delLink" onclick="delLink(${link.id})">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </div>
            <div class="linkList" onclick="linkClick('${link.link}',${link.visit},${link.id})">
              <div class="linkImg"><img src="${faviconUrl}"></div>
              <h3>${escapeHTML(link.name)}</h3>
              <div class="linkVisit">
                <small>Visit: ${link.visit}</small><br>
                <small>Last visit: ${date}</small>
              </div>
            </div>
          </div>
        </div>`
      });
      links.appendChild(gridLinks);
    };
  });
};

function delLink(id){
  let fd = new FormData();
  fd.append("action", "delLink");
  fd.append("id", id);
  fetch('backend/addDelete.php', {
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == "success"){
      // alert(data.msg);
      Links();
    }else if(data.status = "fail"){
      alert(data.msg);
    }
  });
}

function linkClick(i,visit,id){
  visit += 1;
  let date = dateCreated;
  // console.log((visit) + date);

  let fd = new FormData();
  fd.append('action', 'updateLink');
  fd.append('visit', visit);
  fd.append('date', date);
  fd.append('id', id);

  fetch('backend/addDelete.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == "success"){
      // alert(data.msg);
      loadLinks();
    }
  });
  window.open(i,'_blank');
}

// ayusin natin formatting ng date input at i-set natin yung min date sa today
flatpickr("#todoDate",{
  dateFormat: "m/d/Y",
  minDate: "today"
});

document.getElementById("submitTodo").addEventListener('click', (event)=>{
  event.preventDefault();

  let title = document.getElementById("todoTitle").value;
  let descript = document.getElementById("desc").value;
  let due = document.getElementById("todoDate").value;
  // alert(title+descript+due);
 
  if(statusTodo == 'addTodo'){

    let fd = new FormData();
    fd.append('action', 'addTodo');
    fd.append('title', title);
    fd.append('description', descript);
    fd.append('due', due);
    fd.append('status', 'inprogress');
    fd.append('dcreate', dateCreated);

    fetch('backend/addDelete.php', {
      method: 'POST',
      body: fd
    })
    .then(response => response.json())
    .then(data => {
      if(data.status == "success"){
        // alert(data.msg);
        Todo();
      };
    });
  }else if(statusTodo == 'editTodo'){
    // alert("edit todo!");
    
    let fd = new FormData();
    fd.append('action', 'editTodo');
    fd.append('id', tId);
    fd.append('title', title);
    fd.append('description', descript);
    fd.append('due', due);

    fetch('backend/addDelete.php', {
      method: 'POST',
      body: fd
    })
    .then(response => response.json())
    .then(data => {
      // alert(data.msg);
      Todo();
    });
  };
  document.getElementById("popTodo").style.display="none";
  document.getElementById("todoTitle").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("todoDate").value = "";
});


function loadTodo(){
  let fd = new FormData();
  fd.append('action', 'getTodo');
  fd.append('dToday', dateCreated);
  fetch('backend/getDataSql.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("storedInprogress").innerHTML = "";
    document.getElementById("storedTodayDue").innerHTML = "";


    if(data.today.length > 0){
      console.log(data.today);
      document.getElementById("lblToday").innerHTML = "Today";
      data.today.reverse().forEach(td =>{

        storedTodayDue.innerHTML += `
        <div class="loadTodo">
          <h4>Due: ${td.dueDate}</h4>
          <h1>${td.title}</h1>
          <h3>${td.descript}</h3>
          <div class="tbtn">
            <small onclick="doneTodo(${td.id},'completed')">Done</small>
            <small onclick="editTodo(${td.id},'${escapeHTML(td.title)}','${escapeHTML(td.descript)}','${td.dueDate}')">Edit</small>
            <small onclick="delTodo(${td.id})">Remove</small>
          </div>
        </div><br>
        `;
      });
    }else{
      document.getElementById("lblToday").innerHTML = "No due today!";
    }
    
    if(data.inprogress){
      data.inprogress.reverse().forEach(inprog =>{
        document.getElementById("storedInprogress").innerHTML += 
        `
        <br>
        <div class="loadTodo">
          <h4>Due: ${inprog.dueDate}</h4>
          <h1>${inprog.title}</h1>
          <h3>${inprog.descript}</h3>
          <div class="tbtn">
            <small onclick="doneTodo(${inprog.id},'completed')">Done</small>
            <small onclick="editTodo(${inprog.id},'${escapeHTML(inprog.title)}','${escapeHTML(inprog.descript)}','${inprog.dueDate}')">Edit</small>
            <small onclick="delTodo(${inprog.id})">Remove</small>
          </div>
        </div>
        `;
      });
    };


    if(data.completed){
      console.log("Ito:  "+data.completed);
      document.getElementById("storedCompleted").innerHTML = "";

      data.completed.reverse().forEach(complete => {
        document.getElementById("storedCompleted").innerHTML +=`
        <div class="loadTodo">
          <h4>Due: ${complete.dueDate}</h4>
          <h1>${complete.title}</h1>
          <h3>${complete.descript}</h3>
          <div class="tbtn">
            <small onclick="delTodo(${complete.id})">Remove</small>
          </div>
        </div><br>
        `;
      });
    };

    if(data.pastDue){
      console.log("Umayyy "+data.pastDue.length);
      document.getElementById("storedFailed").innerHTML = "";

      data.pastDue.reverse().forEach(past =>{

        document.getElementById("storedFailed").innerHTML += `
        
        <div class="loadTodo">
          <h4>Due: ${past.dueDate}</h4>
          <h1>${past.title}</h1>
          <h3>${past.descript}</h3>
          <div class="tbtn">
            <small onclick="delTodo(${past.id})">Remove</small>
          </div>
        </div><br>
        `;
      });
    };
    // todo();
  });
};

function doneTodo(id, status){

  let fd = new FormData();
  fd.append('action', 'updateTodo');
  fd.append('id', id);
  fd.append('status', status);

  fetch('backend/addDelete.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    // alert(data.msg);
    Todo();
  });
};
let statusTodo;
let tId;

function editTodo(id,title,descript,due){
  statusTodo = 'editTodo';
  tId = id;
  
  document.getElementById("popTodo").style.display="block";
  document.getElementById("todoTitle").value=title;
  document.getElementById("desc").value=descript;
  document.getElementById("todoDate").value=due;
};

function delTodo(id){
  let fd = new FormData();
  fd.append('action', 'delTodo');
  fd.append('id', id);

  fetch('backend/addDelete.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    // alert(data.msg);
    Todo();
  });
};

// mag-sho-show 'to ng confirmation popup before tuluyang mag-logout
function showLogout(){

  let me = document.createElement("div");
  me.id="conLogout";
  me.innerHTML += `
  <div style="position: absolute; height:100vh; width: 100vw;background-color:rgba(0,0,0,0.4);z-index: 3;" onclick='document.getElementById("conLogout").remove()'>
    <div style="position: absolute; left: 50%; background-color:#ffffff; border: 1px solid #e0e0e0; transform: translateX(-50%);
       padding: 20px;color:#111111; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1)">

      <dotlottie-player src="https://lottie.host/f136a902-dc81-405c-8123-f9be7400ef71/028hTUYSGZ.lottie" background="transparent" speed="1" style="width: 100px; height: 100px;margin:auto;" loop autoplay></dotlottie-player>
      
      <h2>Are you sure you want to log out?</h2>

      <div style="display: flex; gap: 20px; justify-content: flex-end; margin-top: 15px; font-weight: bolder;">

        <h4 onclick='document.getElementById("conLogout").remove()' style="border: 1px solid #e0e0e0;padding: 8px 15px;border-radius: 6px; color: #555555; background-color: #fafafa">
          Cancel</h4>

        <h4 onclick="confirmLogout()" style="border: none;padding: 8px 15px; background-color:#000000; color: #ffffff; border-radius: 6px">
          Log out</h4>

      </div>

    </div>
  </div>`;
  document.body.appendChild(me);
}


document.getElementById("LogOut").addEventListener('click', ()=>{

  showLogout();

  console.log("hfhfhf");
});
function confirmLogout(){
  let fd = new FormData();
  fd.append('action', 'logOut')
  fetch('backend/getDataSql.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data =>{
    console.log(data);
    if(data.status == 'success'){
      window.location.href="index.html";
      // alert(data.msg);
    };
  });
}



function choosePf(){

  document.getElementById("setting").innerHTML += `
  
  <style>
    .pfCircle{
      height: 80px;
      width: 80px;
      padding: 5px;
      border-radius: 50%;
    }
    
    .pfCircle img{
      height: 100%;
      width: 100%;
    }
    .pfrows{
      display: flex;
      flex-direction: row;
      flex-wrap:wrap;
      gap: 10px;
      justify-content:center;
    }
    @keyframes scale{
      0%{transform: scale(1)}
      50%{transform: scale(.9)}
      100%{transform: scale(1)}
    }
  </style>

  <div id="pf" style="width:400px;background-color:#ffffff;position: absolute; top:50%;left:50%;
    transform:translate(-50%,-50%);padding: 20px;border-radius: 12px;border: 1px solid #e0e0e0;box-shadow: 0 15px 35px rgba(0,0,0,0.15);">
    <h1 style="text-align:center;margin-bottom:30px;">Choose Profile Pic</h1>
    <div class="pfrows">
      <div class="pfCircle" id="pfCircle0" onclick="profile(0)">
        <img src="assets/profile0.png">
      </div>
      <div class="pfCircle" id="pfCircle1" onclick="profile(1)">
        <img src="assets/profile1.png">
      </div>
      <div class="pfCircle" id="pfCircle2" onclick="profile(2)">
        <img src="assets/profile2.png">
      </div>
      <div class="pfCircle" id="pfCircle3" onclick="profile(3)">
        <img src="assets/profile3.png">
      </div>
      <div class="pfCircle" id="pfCircle4" onclick="profile(4)">
        <img src="assets/profile4.png">
      </div>
      <div class="pfCircle" id="pfCircle5" onclick="profile(5)">
        <img src="assets/profile5.png">
      </div>
      <div class="pfCircle" id="pfCircle6" onclick="profile(6)">
        <img src="assets/profile6.png">
      </div>
      <div class="pfCircle" id="pfCircle7" onclick="profile(7)">
        <img src="assets/profile7.png">
      </div>
    </div>
    <div style="display:flex; gap: 20px;font-weight: bolder;font-size:21px;margin-top:15px">
      <div onclick="document.getElementById('pf').remove();">Cancel</div>
      <div onclick="conpf()" style="color:#000000;">Save</di>
    </div>
  </div>
  `;
  loadprofile();
}
let npf;
let usersprofile;
function profile(i){
  let id = "pfCircle"+i;

  document.querySelectorAll(".pfCircle").forEach(pf =>{
    pf.style.backgroundColor="";
  });

  // alert(usersprofile+" "+i);
  if(usersprofile == i){
    document.getElementById(id).style.backgroundColor="rgb(21, 160, 74)";
  }else{
    document.getElementById(id).style.backgroundColor="rgb(46, 100, 131)";
  }

  npf = i;
}

// if(document.getelementbyid("uprofile").getattribute('src') === "" && document.getelementbyid("sprofile").getattribute('src')===""){
//   document.getelementbyid("uprofile").src='assets/user.png';
//   document.getelementbyid("sprofile").src='assets/user.png';
// }

function conpf(){

  let fd = new FormData();
  fd.append('action', 'profile');
  fd.append('i', npf);

  fetch('backend/getDataSql.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == 'success'){
      npf = data.msg;
      // alert(data.msg);
      let me = `assets/pf${npf}.png`;
      document.getElementById("uprofile").src=me;
      document.getElementById("sprofile").src=me;
      loadprofile();
    };
    document.getElementById("pf").remove();
  });
};

// get natin yung profile index from db para ma-load yung profile pic ng user
loadprofile();
function loadprofile(){

  let fd=new FormData();
  fd.append('action', 'getprofile');
  fetch('backend/getDataSql.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    npf = data.msg[0].profile;
    usersprofile = data.msg[0].profile;
    let id = "pfCircle"+usersprofile;
    // disabled na yung alert dito
    let me = `assets/pf${npf}.png`;

    if(npf == null){
      document.getElementById("uprofile").src='assets/user.png';
      document.getElementById("sprofile").src='assets/user.png';
    }else{
      document.getElementById("uprofile").src=me;
      document.getElementById("sprofile").src=me;
    }

      document.getElementById(id).style.cssText=`
      background-color: rgb(21, 160, 74);
      border: 2px solid rgb(0, 255, 98);
      animation: scale 2s ease-out infinite;
      `;
  });

};

// modal o popup para mapalitan yung username sa settings
function changeU(){
  let me = document.getElementById("setUsername").value;
  let overlay = document.createElement("div");
  overlay.id = "cup-overlay";
  overlay.innerHTML = `
  <div style="position: fixed; height:100vh; width: 100vw; background-color:rgba(0,0,0,0.4); z-index: 100; top: 0; left: 0;" onclick="if(event.target === this) document.getElementById('cup-overlay').remove();">
    <div id="cup" style="width: 320px; position: absolute; top:50%;left:50%;transform:translate(-50%,-50%); 
      display:block; background-color:#ffffff; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 15px 35px rgba(0,0,0,0.15); padding: 25px; color: #111111; cursor: default;">
      <h2 style="text-align: center; margin: 0 0 20px 0; font-size: 22px;">Change Username</h2>
      
      <div style="margin-bottom: 15px;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #555555; font-weight: 500;">Current Username</h3>
          <input type="text" value="${me}" readonly style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #e0e0e0; border-radius: 6px; font-family: 'Inter', sans-serif; font-size: 14px; background-color: #fafafa; color: #555555; outline: none;">
      </div>

      <div style="margin-bottom: 20px;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #555555; font-weight: 500;">New Username</h3>
          <input id="ccUsername" type="text" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #e0e0e0; border-radius: 6px; font-family: 'Inter', sans-serif; outline: none; font-size: 14px;" placeholder="Enter new username">
          <p id="uexist" style="color:rgb(159, 0, 0); margin: 5px 0 0 0; font-size: 12px;"></p>
      </div>
      
      <div style="display:flex; justify-content: flex-end; gap: 10px; font-weight: 500;">
        <div onclick="document.getElementById('cup-overlay').remove();" style="padding: 10px 15px; border-radius: 6px; cursor: pointer; color: #555555; background: #fafafa; border: 1px solid #e0e0e0;">Cancel</div>
        <div onclick="conu()" style="padding: 10px 15px; border-radius: 6px; cursor: pointer; color: white; background: #111111;">Save</div>
      </div>
    </div>
  </div>
  `;
  document.body.appendChild(overlay);
}

// modal o popup para makapag-change password
function changeP(){
  let overlay = document.createElement("div");
  overlay.id = "cpd-overlay";
  overlay.innerHTML = `
  <div style="position: fixed; height:100vh; width: 100vw; background-color:rgba(0,0,0,0.4); z-index: 100; top: 0; left: 0;" onclick="if(event.target === this) document.getElementById('cpd-overlay').remove();">
    <div id="cpd" style="width: 320px; position: absolute; top:50%;left:50%;transform:translate(-50%,-50%); 
      display:block; background-color:#ffffff; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 15px 35px rgba(0,0,0,0.15); padding: 25px; color: #111111; cursor: default;">
      <h2 style="text-align: center; margin: 0 0 20px 0; font-size: 22px;">Change Password</h2>
      
      <div style="margin-bottom: 20px;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #555555; font-weight: 500;">New Password</h3>
          <input id="ccPass" type="password" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #e0e0e0; border-radius: 6px; font-family: 'Inter', sans-serif; outline: none; font-size: 14px;" placeholder="Enter new password">
      </div>
      
      <div style="display:flex; justify-content: flex-end; gap: 10px; font-weight: 500;">
        <div onclick="document.getElementById('cpd-overlay').remove();" style="padding: 10px 15px; border-radius: 6px; cursor: pointer; color: #555555; background: #fafafa; border: 1px solid #e0e0e0;">Cancel</div>
        <div onclick="conp()" style="padding: 10px 15px; border-radius: 6px; cursor: pointer; color: white; background: #111111;">Save</div>
      </div>
    </div>
  </div>
  `;
  document.body.appendChild(overlay);
}

// send natin yung new password papuntang PHP para ma-save sa db
function conp(){
  let me = document.getElementById("ccPass").value.trim();

  if(me == ""){
    return alert("enter new password");
  }

  let fd = new FormData();
  fd.append('action', 'changePass');
  fd.append('password', me);
  fetch('backend/getDataSql.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    // alert(data.msg)
    if(data.status == 'success'){
      window.location.href="../dash/index.php";
    };
    if(data.status == 'fail'){
      return alert("already been using this password!!");
    };
  });
};

// same din sa username, update natin diretso sa db
function conu(){
  let me = document.getElementById("setUsername").value;
  let username = document.getElementById("ccUsername").value.trim();
  if(username == ""){
    return alert("Enter new username");
  }
  if(username == me){
    return alert("already been!!");
  }

  let fd = new FormData();
  fd.append('action', 'changeUsername');
  fd.append('username', username);
  fetch('backend/getDataSql.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == 'success'){
      alert(data.msg);
      window.location.href="../dash/index.php";
    }else if(data.status == 'exist'){
      document.getElementById("uexist").innerHTML = `${data.msg}`;
      // alert(data.msg);
    };
    
  });
};
// popup na hihingi ng password before i-delete yung buong account
function DeleteAcc(){
  document.getElementById("setting").innerHTML += `
  <div id="dellAcc" style="width: 300px; position: absolute; top:50%;left:50%;transform:translate(-50%,-50%); 
    display:block; background-color:rgba(219, 219, 219, 0.92);padding: 10px">

    <h2 style="text-align: center; margin: 10px 0">Delete Account!!</h2>
    <h3 style="margin: 5px 0;">Enter Password </h3>
    <input id="conDel" type="text" style="outline:none;padding: 0 10px">
    <p id="delwrong" style="color:rgb(196, 0, 0)"></p>
    <div style="display:flex; gap: 20px;font-weight: bold;margin-top:15px">
      <div onclick="document.getElementById('dellAcc').remove();">Cancel</div>
      <div onclick="conDel()" style="color:red">Confirm</di>
    </div>
  </div>
  `;
}

function conDel(){
  let a = document.getElementById("conDel").value.trim();
  if(a == ""){
    return alert("Enter !!!");
  }
  let fd = new FormData();
  fd.append('action', 'deleteAccount');
  fd.append('pass', a);
  fetch('backend/getDataSql.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == 'deleted'){
      alert(data.status);
      window.location.href='index.html';
    }else{
      document.getElementById("delwrong").innerHTML = "*incorrect password*";
    }
  });
}





// --- main navigation buttons natin (quotes, links, todo, settings) ---
// grab natin yung mga UI element references dito
let quotes = document.getElementById("forQuotes");
let links = document.getElementById("forLinks");
let tasks = document.getElementById("forTodo");
let setting = document.getElementById("setting");

function Quotes(){
  handleShow("Quotes", quotes, links, tasks,setting);
  loadQuotes();
}
function Links(){
  handleShow("Links",links,quotes,tasks,setting);
  loadLinks();
}
function Todo(){
  handleShow("To-do",tasks,quotes,links,setting);
  loadTodo();
}
function Setting(){
  handleShow("Setting",setting,tasks,quotes,links);
  // document.getelementbyid("setting").style.display="block";
}

function handleShow(setLabel,show,hide,hide1,hide2){
  document.getElementById("labelC").innerHTML = setLabel;
  document.getElementById("labelC").style.cssText=`
    background-color:rgba(95, 95, 95, 0.62);
    width: fit-content;
    border-radius: 15px;
    margin: 10px 0 0 25px;

    `;

  show.style.display="block";
  hide.style.display="none";
  hide1.style.display="none";
  hide2.style.display="none";

  document.getElementById("greet").style.display="none";
}
// --- end of script ---

function Home(){
  quotes.style.display="none";
  links.style.display="none";
  tasks.style.display="none";
  setting.style.display="none";
  document.getElementById("labelC").innerHTML = "";
  document.getElementById("labelC").style.cssText="background-color:transparent;";
  document.getElementById("greet").style.display="block";
}





