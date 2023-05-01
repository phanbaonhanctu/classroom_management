  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBCj7JA2ot3ePQUQ9FWGg0JU2psGHptrK4",
    authDomain: "quanlylophoc-64de5.firebaseapp.com",
    projectId: "quanlylophoc-64de5",
    storageBucket: "quanlylophoc-64de5.appspot.com",
    messagingSenderId: "98954416186",
    appId: "1:98954416186:web:7d3f02d9ef7a83e66c6503"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

/////////////////////////////Create CLassroom/////////////////////////////////
const link = document.getElementById('showclassroom');
link.addEventListener('click', function(event) {
  document.getElementById("create_classroom").hidden = false;
  document.getElementById("dashboardclassroom").hidden = true;
  document.getElementById("showdiemdanh").hidden = true;
  document.getElementById("xemchitiet").hidden = true;
  document.getElementById("create_diemdanh").hidden = true;
  document.getElementById("edit_thongtindangnhap").hidden = true;
  document.getElementById("sent_message").hidden = true;
  document.getElementById("myChart").hidden = true;
  document.getElementById("formchatbox").hidden = true;
});

const link1 = document.getElementById('showdiemdanhlink');
link1.addEventListener('click', function(event) {
  document.getElementById("create_classroom").hidden = true;
  document.getElementById("showdiemdanh").hidden = false;
  document.getElementById("dashboardclassroom").hidden = true;
  document.getElementById("xemchitiet").hidden = true;
  document.getElementById("create_diemdanh").hidden = false;
  document.getElementById("edit_thongtindangnhap").hidden = true;
  document.getElementById("sent_message").hidden = true;
  document.getElementById("myChart").hidden = false;
  document.getElementById("formchatbox").hidden = true;
});

const link2 = document.getElementById('thongtincanhan');
link2.addEventListener('click', function(event) {
  document.getElementById("create_classroom").hidden = true;
  document.getElementById("showdiemdanh").hidden = true;
  document.getElementById("dashboardclassroom").hidden = true;
  document.getElementById("xemchitiet").hidden = true;
  document.getElementById("create_diemdanh").hidden = true;
  document.getElementById("edit_thongtindangnhap").hidden = false;
  document.getElementById("sent_message").hidden = true;
  document.getElementById("myChart").hidden = true;
  document.getElementById("formchatbox").hidden = true;
  Showinfo();
});

const link3 = document.getElementById('guithongbao');
link3.addEventListener('click', function(event) {
  document.getElementById("create_classroom").hidden = true;
  document.getElementById("showdiemdanh").hidden = true;
  document.getElementById("dashboardclassroom").hidden = true;
  document.getElementById("xemchitiet").hidden = true;
  document.getElementById("create_diemdanh").hidden = true;
  document.getElementById("edit_thongtindangnhap").hidden = true;
  document.getElementById("sent_message").hidden = false;
  document.getElementById("myChart").hidden = true;
  document.getElementById("formchatbox").hidden = true;
});

const link4 = document.getElementById('showchatbox');
link4.addEventListener('click', function(event) {
  document.getElementById("create_classroom").hidden = true;
  document.getElementById("showdiemdanh").hidden = true;
  document.getElementById("dashboardclassroom").hidden = true;
  document.getElementById("xemchitiet").hidden = true;
  document.getElementById("create_diemdanh").hidden = true;
  document.getElementById("edit_thongtindangnhap").hidden = true;
  document.getElementById("sent_message").hidden = true;
  document.getElementById("myChart").hidden = true;
  document.getElementById("formchatbox").hidden = false;
  Danhsachlop();
});

// const link2 = document.getElementById('xemchitiet');
// link2.addEventListener('click', function(event) {
//   xemchitietdeimdanh();
// });

let cookie = {
  email: "",
  id: "",
  rule: "",
  chat: ""
};


var datacookie = document.cookie.split(";");
  
for (var i = 0; i < datacookie.length; i++) {
  var datacookiee = datacookie[i].trim();
  if (datacookiee.indexOf("rule=") == 0) {
    var rule = datacookiee.substring("rule=".length, datacookiee.length);
    cookie.rule = rule;
  }
  if (datacookiee.indexOf("email=") == 0) {
    var email = datacookiee.substring("email=".length, datacookiee.length);
    cookie.email = email;
  }
  if (datacookiee.indexOf("id=") == 0) {
    var id = datacookiee.substring("id=".length, datacookiee.length);
    cookie.id = id;
  }
}

let create_classroom;
let create_diemdanh;



if (cookie.rule == 0){
    create_classroom = true;
    create_diemdanh = true;
}else if (rule == 1){
    create_classroom = false;
    create_diemdanh = true;
}else {
    create_classroom = false;
    create_diemdanh = false;
}

if (create_classroom == false){
  var notification = document.getElementById("create_classroom");
  notification.innerHTML = "Bạn Không Có Quyền Sử Dụng Chức Năng Này";
}

function Showinfo(){
  var mssv = cookie.id;
  db.collection("student").doc(mssv).get().then((doc) => {
    document.getElementById("outputMssv").value = doc.data().mssv;
    document.getElementById("outputName").value = doc.data().name;
    document.getElementById("outputEmail").value = doc.data().email;
    document.getElementById("outputDay").value = doc.data().age;
    document.getElementById("outputPhone").value = doc.data().phone;
    document.getElementById("outputGender").value = doc.data().gender;
  }).catch((error) => {
    console.log("Lỗi: ", error);
  });
}

function Editinfo(){
    document.getElementById("outputMssv").disabled = true;
    document.getElementById("outputName").disabled = false;
    document.getElementById("outputEmail").disabled = true;
    document.getElementById("outputDay").disabled = false;
    document.getElementById("outputPhone").disabled = false;
    document.getElementById("outputGender").disabled = true;
}

function Saveinfo(){
  let newStudent = {
    mssv: "",
    name: "",
    phone: "",
    rule: "",
    email: "",
    gender: "",
    age: ""
  };
  newStudent.mssv = document.getElementById("outputMssv").value;
  newStudent.name = document.getElementById("outputName").value;
  newStudent.phone = document.getElementById("outputPhone").value;
  newStudent.rule = cookie.rule;
  newStudent.gender = document.getElementById("outputGender").value;
  newStudent.email = document.getElementById("outputEmail").value;
  newStudent.age = document.getElementById("outputDay").value;
  SaveDatabase("student",newStudent.mssv,newStudent);
  alert("Lưu thành công");

  document.getElementById("outputMssv").disabled = true;
  document.getElementById("outputName").disabled = true;
  document.getElementById("outputEmail").disabled = true;
  document.getElementById("outputDay").disabled = true;
  document.getElementById("outputPhone").disabled = true;
  document.getElementById("outputGender").disabled = true;
}




function GetID(){

        var value = cookie.id;

        // var testt = document.getElementById("outputID");
        // testt.value = "Mã số cán bộ của bạn là: "+value;

        // var test = document.getElementById("outputID2");
        // test.value = "Mã số cán bộ của bạn là: "+value;

        // var test1 = document.getElementById("outputID3");
        // test1.value = "Mã số cán bộ của bạn là: "+value;
        return value;

  }



  function GetRule(){
        var value = cookie.rule;
        return value;
  }

  function GetClassOfTeach(id){

  }

  var myButtonnew = document.getElementById("title_message");
  myButtonnew.addEventListener("click", function() {
    var dropdownnew = document.getElementById("myDropdown1");
    while (dropdownnew.options.length > 0) {
      dropdownnew.remove(0);
    }
    var idnew = cookie.id;
    db.collection("classroom").where("idteacher", "==", idnew)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var selectElementnew = document.getElementById("myDropdown1");
          var newOptionnew = document.createElement("option");
          newOptionnew.value = doc.id;
          newOptionnew.text = doc.data().tenlop;
          // Thêm option mới vào select
          selectElementnew.add(newOptionnew);
        })

      })
  })

  function SentMessage(){
    let message = {
      time: "",
      content: "",
      sent_from: "",
      sent_to: "",
      name: ""
    };

    message.time = Gettime();
    message.name = document.getElementById("title_message").value;
    message.content = document.getElementById("txt_message").value;
    message.sent_from = cookie.id;
    message.sent_to = document.getElementById("myDropdown1").value;

    SaveDatabaseRandomID("notification",message);
    alert("Luu thông báo thành công");
  }


  var myButton = document.getElementById("inputdiemdanhname");

    // Thêm sự kiện "onclick" cho phần tử đó
    myButton.addEventListener("click", function() {
      // Lấy dropdown bằng ID
      var dropdown = document.getElementById("myDropdown");

      // Lặp qua các option và xóa chúng
      while (dropdown.options.length > 0) {
        dropdown.remove(0);
      }

      // Xử lý sự kiện ở đây
          // Lấy đối tượng select từ id của nó
    var id = cookie.id;
    // Thực hiện truy vấn trong Firestore
      db.collection("classroom").where("idteacher", "==", id)
      .get()
      .then((querySnapshot) => {
          // Lặp qua các tài liệu trong truy vấn
          querySnapshot.forEach((doc) => {
              var selectElement = document.getElementById("myDropdown");
              // Tạo một option mới
              var newOption = document.createElement("option");
              newOption.value = doc.id;
              newOption.text = doc.data().tenlop;
              // Thêm option mới vào select
              selectElement.add(newOption);
              selectElement.onchange = function() {
                CLearTablename("lophoc");
                // Lấy giá trị của tùy chọn được chọn
                for (var mssv of doc.data().dssv) {
                    // Lấy tham chiếu đến document có id là "abc123" trong collection "myCollection"
                    var docRef = firebase.firestore().collection("student").doc(mssv);
                    // Lấy dữ liệu của document và xử lý kết quả
                    docRef.get().then(function(doc) {
                      const tableBody = $("#lophoc tbody");
                      var data = doc.data();
                            const row = `
                            <tr>
                              <td>${data.mssv}</td>
                              <td>${data.name}</td>
                              <td>${data.gender}</td>
                              <td><input type="checkbox" class="checkbox"</td>
                            </tr>
                          `;
                          tableBody.append(row);
                    });
                    $("#lophoce").tablesorter();
                };
              };
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    });


    

  function CreateDiemdanh(){
    var name = document.getElementById("inputdiemdanhname").value;
    var time = Gettime();
    var listsv = [];
            // Lấy tất cả các ô kiểm tra
            var checkboxes = document.getElementsByClassName("checkbox");
    
            // Lưu trữ các hàng được chọn
            var selectedRows = [];
          
            // Duyệt qua tất cả các ô kiểm tra và kiểm tra xem các ô kiểm tra nào được chọn
            for (var i = 0; i < checkboxes.length; i++) {
              if (checkboxes[i].checked) {
                // Lấy hàng tương ứng với ô kiểm tra được chọn
                var selectedRow = checkboxes[i].parentNode.parentNode;
          
                // Lưu trữ hàng được chọn
                selectedRows.push(selectedRow);
              }
            }
          
            // Lấy dữ liệu từ các hàng được chọn
            for (var j = 0; j < selectedRows.length; j++) {
              var masv = selectedRows[j].cells[0].textContent;
              console.log(masv);
              listsv.push(masv);
            }

            let newdiemdanh = {
              name: name,
              time: time,
              listsv: listsv
            };
            SaveDatabaseRandomID("diemdanh",newdiemdanh);
            alert("Tạo hoạt động điểm danh thành công");
  }

  function readFile() {

    var file = document.getElementById("input").files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, { type: "binary" });
      var sheetName = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[sheetName];
      var jsonData = XLSX.utils.sheet_to_json(worksheet, { 
        raw: false, // Trả về các giá trị không chuyển đổi sang định dạng khác
        dateNF: "dd-mm-yyyy", // Định dạng ngày tháng (nếu có) để giữ nguyên định dạng
        });
      displayData(jsonData);
    };
    reader.readAsBinaryString(file);
  }
  
  function displayData(data) {
    let newClassroom = {
      time: "",
      idteacher: "",
      tenlop: "",
      dssv: ["null"]
    };

    newClassroom.time = Gettime();
    newClassroom.idteacher = cookie.id;
    newClassroom.tenlop = document.getElementById("inputClassname").value;
    for (var i = 0; i < data.length; i++) {
      let newStudent = {
        mssv: "",
        name: "",
        phone: "",
        rule: "2",
        email: "",
        gender: "",
        age: ""
      };
      

      for (var key in data[i]) {
        if (key == "mssv"){
          newStudent.mssv = data[i][key];
          newClassroom.dssv[i] = data[i][key];
        }else if(key == "name"){
          newStudent.name =  data[i][key];
        }else if(key == "phone"){
          newStudent.phone =  data[i][key];
        }
        else if(key == "email"){
          newStudent.email =  data[i][key];
          RegisterStudent(newStudent.email);
        }
        else if(key == "gender"){
          newStudent.gender =  data[i][key];
        }
        else if (key == "age"){
            var birthdateObj = new Date(data[i][key]);
            var day = birthdateObj.getDate();
            var month = birthdateObj.getMonth() + 1; // Tháng bắt đầu từ 0 nên cộng thêm 1
            var year = birthdateObj.getFullYear();
            // Hiển thị ngày tháng theo định dạng dd/mm/yyyy
            var formattedDate = day + "/" + month + "/" + year;
            newStudent.age = formattedDate;
        }
      }
        SaveDatabase("student",newStudent.mssv,newStudent);
    } alert("Tạo lớp học thành công. Tài khoản mặc định cho sinh viên là email với mật khẩu 123456");
    SaveDatabaseRandomID("classroom",newClassroom);
  }
  
    function SaveDatabase (col,doc,data){
      const collectionRef = firebase.firestore().collection(col);
      const mssvDocRef = collectionRef.doc(doc);
      mssvDocRef.set(data);
    }
    function SaveDatabaseRandomID (col,data){
      const collectionRef = firebase.firestore().collection(col);
      collectionRef.add(data);
  
    }
    function Gettime(){
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; //Tháng tính từ 0 (tháng 0 là tháng 1)
      const day = now.getDate();
      const time = `${day}/${month}/${year}`;
      return time;
    }


  /////////////////////////////////////Create classroom//////////////////////////////////



      // Get data from Firestore
function GetData(){
    
    db.collection("classroom").onSnapshot((querySnapshot) => {
      ClearTable();
        const tableBody = $("#my-table tbody");
        querySnapshot.forEach((doc) => {
        const book = doc.data();
        const timestamp = book.time;

          const row = `
            <tr>
              <td>${book.tenlop}</td>
              <td>${book.idteacher}</td>
              <td>${book.dssv}</td>
              <td>${timestamp}</td>
            </tr>
          `;
          tableBody.append(row);
        });
        // Initialize tablesorter
        $("#my-table").tablesorter();
 //       setTimeout(GetData, 1000);
      });
}

function GetDataTable(){
  db.collection("diemdanh").onSnapshot((querySnapshot) => {
      var stt = 0;
      ClearTableDiemdanh();
      const tableBody = $("#diemdanh tbody");
      querySnapshot.forEach((doc) => {
      const bookk = doc.data();
      const timestamp = bookk.time; // timestamp được trả về từ Firestore
      const date = new Date(timestamp.seconds * 1000); // chuyển đổi timestamp thành đối tượng Date
      const dateString = date.toLocaleDateString(); // định dạng ngày tháng thành chuỗi
      // console.log(dateString); // hiển thị ngày tháng dưới dạng chuỗi
        stt++;
        const row = `
          <tr>
            <td>${stt}</td>
            <td>${bookk.name}</td>
            <td>${timestamp}</td>
            <td>${bookk.listsv.length}</td>
            <td onclick="xemchitietdiemdanh()">Click here</td>

          </tr>
        `;
        tableBody.append(row);
      });
      // Initialize tablesorter
      $("#diemdanh").tablesorter();
    });
}

function getStudentName(mssv) {
  const tableBody = $("#diemdanhchitiet tbody");
// Lấy reference đến document của sinh viên
var studentRef = db.collection("student").doc(mssv);
// Lấy dữ liệu của document đó
studentRef.get().then(function(doc) {
    if (doc.exists) {
        // Lấy thông tin họ tên của sinh viên từ dữ liệu của document
       var studentName = doc.data().name;
        console.log(studentName);
        const row = `
          <tr>
            <td>${mssv}</td>
            <td>${studentName}</td>
          </tr>
        `;
        tableBody.append(row);
    } else {
        console.log("Không tìm thấy document!");
    }
}).catch(function(error) {
    console.log("Lỗi khi lấy dữ liệu:", error);

});
$("#diemdanh").tablesorter();

}



function xemchitietdiemdanh(){
  ClearTableChitiet();
  document.getElementById("create_classroom").hidden = true;
  document.getElementById("showdiemdanh").hidden = true;
  document.getElementById("dashboardclassroom").hidden = true;
  document.getElementById("xemchitiet").hidden = false;
  document.getElementById("create_diemdanh").hidden = true;
  let id = "rRPsjv1QdEczsROKKRzT";
    db.collection("diemdanh").doc(id).get().then((doc) => {
      if (doc.exists) {
        var name = doc.data().listsv;
        for (let index = 0; index < name.length; index++) {
          const element = name[index];
          getStudentName(element)
      }
      } else {
        console.log("Tài liệu không tồn tại");
      }
    }).catch((error) => {
      console.log("Lỗi: ", error);

    });
}

function ClearTableChitiet(){
  const table = document.getElementById("diemdanhchitiet");
  const rows = table.getElementsByTagName("tr");
  
  // Lặp qua từng dòng và xóa chúng
  while (rows.length > 1) {
    table.deleteRow(1);
  }
  
}


function ClearTable(){
    const table = document.getElementById("my-table");
    const rows = table.getElementsByTagName("tr");
    
    // Lặp qua từng dòng và xóa chúng
    while (rows.length > 1) {
      table.deleteRow(1);
    }
    
}

function ClearTableDiemdanh(){
  const table = document.getElementById("diemdanh");
  const rows = table.getElementsByTagName("tr");
  
  // Lặp qua từng dòng và xóa chúng
  while (rows.length > 1) {
    table.deleteRow(1);
  }
  
}

  function CLearTablename(name){
    const table = document.getElementById(name);
    const rows = table.getElementsByTagName("tr");
    
    // Lặp qua từng dòng và xóa chúng
    while (rows.length > 1) {
      table.deleteRow(1);
    }
  }


function RegisterStudent(email){
  firebase.auth().createUserWithEmailAndPassword(email, "123456")
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log('Register successful!' + email);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('Register not sucessful!' + email);
    // ..
  });
}


function Register(){
    var user = document.getElementById("inputEmail");
    var pass = document.getElementById("inputPassword");
    var email = user.value;
    var password = pass.value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      alert('Register successful!');
      window.location.href = '/login/login.html';
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('Register not sucessful!');
      // ..
    });

    //Save info to table users//
    var inputemail = document.getElementById("inputEmail").value;
    var inputname = document.getElementById("inputName").value;
    var inputphone = document.getElementById("inputPhone").value;
    var inputgender = document.getElementById("gender").value;
    var inputmscb = document.getElementById("inputmscb").value;

    let newStudent = {
      mssv: inputmscb,
      name: inputname,
      phone: inputphone,
      rule: "0",
      email: inputemail,
      gender: inputgender,
      age: "Null"
    };
    
    SaveDatabase("student",newStudent.mssv,newStudent);

}


function DelCookie(){
    const cookieName = "email";
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    const cookieName1 = "rule";
    document.cookie = `${cookieName1}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    const cookieName2 = "id";
    document.cookie = `${cookieName2}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    alert('Logout successful!');
}


function Checklogin(){
    var user = document.getElementById("inputEmail");
    var pass = document.getElementById("inputPassword");
    var email = user.value;
    var password = pass.value;

    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
    // Lấy tham chiếu đến collection "users"
       const usersRef = firebase.firestore().collection("student");

      // // Tìm kiếm các document có trường "email" có giá trị là "example@gmail.com"
      usersRef.where("email", "==", email).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Truy cập trường "name" của document
          document.cookie = "email="+email+"; path=/";
          document.cookie = "rule="+doc.data().rule+"; path=/";
          document.cookie = "id="+doc.data().mssv+"; path=/";
          window.location.replace("/dashboard/index.html");
        });
      }).catch((error) => {
        console.log("Error getting documents: ", error);
      });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('Invalid username or password.');
    });
}


function RecoveryPassword(){
    var user = document.getElementById("inputEmail");
    var email = user.value;
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        alert('Email sent successful!');
    })
    .catch(function(error) {
        alert('Can not find email account');
    });
}

  function Notification(){
    const formtb = document.getElementById("notification");
    let html = '';
    var tb = db.collection("notification");
    tb.onSnapshot((querySnapshot) => {
      Delnotification();
      querySnapshot.forEach((doc) => {
        var thongbao = doc.data();
        html += '<li class="header_notify-item">'+'<h5>'+thongbao.name+'</h5><h6>'+thongbao.time+'</h6></li>';
      });
      formtb.innerHTML = html;
      html = "";
    })
  }

  function Delnotification(){
    const del = document.getElementById('notification');
    del.innerHTML = '';
  }

GetData();
GetDataTable();
Notification();




var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
      datasets: [{
          label: 'Doanh thu',
          data: [1200, 1500, 800, 1000, 2000, 1800],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      },
      responsive: false, // thêm dòng này để tắt khả năng tương thích của biểu đồ với màn hình
      maintainAspectRatio: false // thêm dòng này để vô hiệu hóa tỷ lệ giữa chiều rộng và chiều cao
  }
});

const chatBox = document.getElementById('chatbox');

function addMessage(message1,id) {
  const reciveMessage = document.createElement('div');
  reciveMessage.innerText = message1;
  reciveMessage.classList.add('reciveMessage');
  const max = message1.length * 11;
  reciveMessage.style.maxWidth = max +'px';
  chatBox.appendChild(reciveMessage);
  cookie.chat = id;
}

function sendMessage(mess,id){
  const sentMessage = document.createElement('div');
  sentMessage.innerText = mess;
  sentMessage.classList.add('sentMessage');
  const max1 = mess.length * 11;
  sentMessage.style.maxWidth = max1 +'px';
  chatBox.appendChild(sentMessage);
  cookie.chat = id;
}

var input = document.getElementById("inputChat");

input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) { // Kiểm tra xem người dùng đã nhấn phím Enter
    event.preventDefault(); // Ngăn chặn trang web chuyển đến trang khác khi nhấn Enter
    actionMessage();
  }
});


const btnSend = document.getElementById("btnSend");
btnSend.addEventListener("click", function(event){
  actionMessage();
})

  function actionMessage(){
    const inputChat = document.getElementById('inputChat').value;
    const testvalue = document.getElementById('inputChat');
    let newMessage = {
      message: "",
      sendBy: "",
      time: ""
    };
  
    newMessage.message = inputChat;
    var now = new Date();
    newMessage.time = now.getTime();
    newMessage.sendBy = cookie.email;
    SaveMessage(newMessage);
    testvalue.value = "";
  }

function SaveMessage(mess){
  let id = cookie.chat;
  let collectionRef = firebase.firestore().collection("chatRoom").doc(id).collection("chats");
  collectionRef.add(mess);
}

function ChatRoom(id){
      var firestore = firebase.firestore();
      var docRef2 = firestore.collection("chatRoom").doc(id).collection("chats");
      docRef2.orderBy("time", "asc").onSnapshot((querySnapshot) => {
        chatBox.innerHTML = "";
        querySnapshot.forEach((doc) => {
          const data = doc.data();
            if (data.sendBy == cookie.email){
              sendMessage(data.message,id);
            }else{
              addMessage(data.message,id);
            }
        });
        html = "";
      })
}



function getChatroomId(user1,user2){
            var firestore = firebase.firestore();
            firestore.collection("chatRoom").where("chatRoomId", "in", [user1+"_"+user2, user2+"_"+user1])
            .get()
            .then((querySnapshot) => {
              if (querySnapshot.size === 0) {
                
                let newChatroom = {
                  chatRoomId: "",
                  users: []
                }
                newChatroom.chatRoomId = user1+"_"+user2;
                newChatroom.users[0] = user1;
                newChatroom.users[1] = user2;

                SaveDatabase("chatRoom",newChatroom.chatRoomId,newChatroom);
                cookie.chat = newChatroom.chatRoomId;
                console.log("Đã tạo chat room với id: "+cookie.chat);
                ChatRoom(cookie.chat);
              }
                querySnapshot.forEach((doc) => {
                    var id = doc.id;
                    ChatRoom(id);
                });
            })
}

// ChatRoom("phanbaonhanctu@gmail.com_nhanb1805900@student.ctu.edu.vn");
var friendList = document.getElementById("friend-list-ul");
function Danhsachlop() {
  friendList.innerHTML="";
  if(cookie.rule == 0){
    var firestore = firebase.firestore();
            firestore.collection("classroom").where("idteacher", "==", cookie.id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id);
                    const data = doc.data();
                    for(i=0;i<data.dssv.length;i++){
                      var mssv = data.dssv[i];
                      var docRef = firebase.firestore().collection("student").doc(mssv);
                    docRef.get().then(function(doc1) {
                      var data1 = doc1.data();
                      addFriend(data1.name,data1.email);
                    });
                    }
                });
            })
  }else if(cookie.rule == 2){
    var firestore = firebase.firestore();
            firestore.collection("classroom").where("dssv", "array-contains", cookie.id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id);
                    const data = doc.data();
                    firebase.firestore().collection("student").doc(data.idteacher).get().then(function(doc2) {
                      var data2 = doc2.data();
                      addFriend(data2.name,data2.email);
                    });
                    for(i=0;i<data.dssv.length;i++){
                      var mssv = data.dssv[i];
                      var docRef = firebase.firestore().collection("student").doc(mssv);
                    docRef.get().then(function(doc1) {
                      var data1 = doc1.data();
                      addFriend(data1.name,data1.email);
                    });
                    }
                });
            })
  }
}



// Lấy tham chiếu đến danh sách bạn bè


// Thêm bạn bè vào danh sách
function addFriend(name,email) {
  var li = document.createElement("li");
  li.innerText = name;
  li.id = email;
  li.addEventListener('click', () => {
    // Gọi hàm chat ở đây
    console.log(li.id);
    getChatroomId(cookie.email,email);
  });
  friendList.appendChild(li);
}

// Xóa bạn bè khỏi danh sách
function removeFriend() {
  var liList = friendList.getElementsByTagName("li");
  for (var i = 0; i < liList.length; i++) {
      friendList.removeChild(liList[i]);
  }
}

// Sửa tên bạn bè trong danh sách
function editFriend(oldName, newName) {
  var liList = friendList.getElementsByTagName("li");
  for (var i = 0; i < liList.length; i++) {
    if (liList[i].innerText === oldName) {
      liList[i].innerText = newName;
      break;
    }
  }
}

// Sử dụng các hàm để thêm, xóa hoặc sửa đổi bạn bè trong danh sách
// addFriend("John");
// addFriend("Jane");
// removeFriend("John");
// editFriend("Jane", "Janet");