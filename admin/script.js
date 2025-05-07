
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



