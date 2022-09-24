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
  let credits = [];

document.getElementById("send-message").addEventListener("submit", postChat);
function postChat(e) {
  e.preventDefault();
  const name = document.getElementById("namebox").value;
  const timestamp = Date.now();
  const username = document.getElementById("chat-txt").value;
  db.ref("name/" + timestamp).set({
    usr: username,
    name: name,
    id:timestamp
  });
}

fetchCredits();
function fetchCredits(){
  db.ref("name").on("child_added", function(snapshot){
    const credit = snapshot.val();
    console.log(credit);
    credits.push(credit.name);
    console.log(credit.name);
  });
}



