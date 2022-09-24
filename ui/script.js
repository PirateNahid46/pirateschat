const firebaseConfig = {
    apiKey: "AIzaSyAFJTHbawTSD1vw2IT50Eat5lkHuJxQlW0",
  authDomain: "pirates-chat-d8e00.firebaseapp.com",
  projectId: "pirates-chat-d8e00",
  storageBucket: "pirates-chat-d8e00.appspot.com",
  messagingSenderId: "623862060797",
  appId: "1:623862060797:web:19809d01227cf0bf1f5094",
  measurementId: "G-9ZDRSV4RB4"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  var oname;
  var user;
  let credits = [];

  document.getElementById("authform").addEventListener("submit", getname);
  function getname(e){
    e.preventDefault();
    const name = document.getElementById("namebox");
    const username = name.value;
    document.getElementById("auth").style.display = "none";
    oname = username;
    if(credits.includes(oname)){
      fetchChatF();
      document.getElementById("bottom").style.visibility = "visible";
      laodUser(oname);

    }else{
      alert("Sorry, You are not Authorized!");
    }
    
  }



  document.getElementById("send-message").addEventListener("submit", postChat);
function postChat(e) {
  e.preventDefault();
  const username = user;
  const timestamp = Date.now();
  const chatTxt = document.getElementById("chat-txt");
  const message = chatTxt.value;
  chatTxt.value = "";
  db.ref("messages/" + timestamp).set({
    usr: username,
    msg: message,
    id:timestamp
  });
}

const fetchChat = db.ref("messages/");
function fetchChatF(){
  fetchChat.on("child_added", function (snapshot) {
    const username = user;
    const messages = snapshot.val();
    const time = Date(messages.id);
    if(messages.usr === username){
      const msg = "<div class=\"my\"> " + messages.msg +"<br><div class=\"time\">"+time+"</div></div>";
      document.getElementById("messages").innerHTML += msg;
    }
    else{
      const msg = "<div><span class=\'name\'>" + messages.usr + "</span><br> <div class=\"others\">" + messages.msg + "<br><div class=\"time\">"+time+"</div></div></div>";
      document.getElementById("messages").innerHTML += msg;
    }
    var height = document.getElementById('messages').scrollHeight;
    document.getElementById('chat').scrollTo(0, height);
    document.getElementById('chat-txt').focus();
  });

}

fetchCredits();
function fetchCredits(){
  db.ref("name").on("child_added", function(snapshot){
    const credit = snapshot.val();
    credits.push(credit.name);
  });
}

function laodUser(id){
  const refD = db.ref("name");
      refD.orderByChild('name').equalTo(id).on("value", function(snapshot) {
            snapshot.forEach(function(data){
              const messages = data.val();
              user = messages.usr;
              console.log("Logged in as "+user);
    });
});
}
