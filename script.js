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

  document.getElementById("authform").addEventListener("submit", getname);
  function getname(e){
    e.preventDefault();
    const name = document.getElementById("namebox");
    const username = name.value;
    document.getElementById("auth").style.display = "none";
    oname = username;
    fetchChatF();
    
  }

  document.getElementById("send-message").addEventListener("submit", postChat);
function postChat(e) {
  e.preventDefault();
  const username = oname;
  const timestamp = Date.now();
  const chatTxt = document.getElementById("chat-txt");
  const message = chatTxt.value;
  chatTxt.value = "";
  db.ref("messages/" + timestamp).set({
    usr: username,
    msg: message,
  });
}

const fetchChat = db.ref("messages/");
function fetchChatF(){
  fetchChat.on("child_added", function (snapshot) {
    const username = oname;
    const messages = snapshot.val();
    if(messages.usr === username){
      const msg = "<div class=\"my\">$" + messages.usr + " : " + messages.msg + "</div>";
      document.getElementById("messages").innerHTML += msg;
    }
    else{
      const msg = "<div>$" + messages.usr + " : " + messages.msg + "</div>";
      document.getElementById("messages").innerHTML += msg;
    }
    location.href="#bottom";
    document.getElementById('chat-txt').focus();
  });

}



