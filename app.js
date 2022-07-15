    //references
    var homeBtn = document.getElementById("honmebtn");
    var beginSection = document.getElementById("beginSection");
    var attendnceSec = document.getElementById("attendnceSec");
    var enrollSec = document.getElementById("enrollSec");
    var enrollBtn = document.getElementById("EnrlDiv");
    var mrkAttnBtn = document.getElementById("MrkAttnDiv");

    homeBtn.addEventListener('click', home);
    enrollBtn.addEventListener('click', enrollPage);
    mrkAttnBtn.addEventListener('click', attenPage);

       
    function home(){
        beginSection.style.display = 'flex';
        enrollSec.style.display =  'none';  
        attendnceSec.style.display =  'none';  

    }
    function enrollPage(){
        beginSection.style.display = 'none';
        enrollSec.style.display =  'block'; 
        attendnceSec.style.display =  'none';  

    }  
    function attenPage(){
        beginSection.style.display = 'none';
        enrollSec.style.display =  'none';  
        attendnceSec.style.display =  'block';  
    }  
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       // filling the table
       var tbody = document.getElementById('tbody1');

       function AddItemToTable(fngrId, name, gen, sNum){
           let trow = document.createElement("tr");
           let td1 = document.createElement('td');
           let td2 = document.createElement('td');
           let td3 = document.createElement('td');
           let td4 = document.createElement('td');
           let td5 = document.createElement('td');
           let td6 = document.createElement('td');

           const d = new Date();
           let text = d.toLocaleDateString();

           td1.innerHTML = fngrId;
           td2.innerHTML = name;
           td3.innerHTML = gen;
           td4.innerHTML = sNum;
           td5.innerHTML = text;
           td6.innerHTML = "10:00";

           trow.appendChild(td1);
           trow.appendChild(td2);
           trow.appendChild(td3);
           trow.appendChild(td4);
           trow.appendChild(td5);
           trow.appendChild(td6);

           tbody.appendChild(trow);

           
       }



       // Import the functions you need from the SDKs you need
       import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
       import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js";
       // TODO: Add SDKs for Firebase products that you want to use
       // https://firebase.google.com/docs/web/setup#available-libraries
     
       // Your web app's Firebase configuration
       // For Firebase JS SDK v7.20.0 and later, measurementId is optional
       const firebaseConfig = {
         apiKey: "AIzaSyCotFCQkdkrPv-40udPECkGOFuTJKkdirI",
         authDomain: "nodemcuprjct.firebaseapp.com",
         databaseURL: "https://nodemcuprjct-default-rtdb.firebaseio.com",
         projectId: "nodemcuprjct",
         storageBucket: "nodemcuprjct.appspot.com",
         messagingSenderId: "367799849431",
         appId: "1:367799849431:web:fe074db5da79af606f3b92",
         measurementId: "G-H6KV984NVN"
       };
     
       // Initialize Firebase
       const app = initializeApp(firebaseConfig);
       const analytics = getAnalytics(app);
       const StoredFingerArry = [];

       import {getDatabase, ref, get , set, child, update, remove, onValue}
       from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
       
       const db = getDatabase();

       function AddAllItemToTable(Students){
               tbody.innerHTML="";
               Students.forEach(element => {
                   AddItemToTable(element.FingerId, element.NameOfStd, element.Gender, element.SrlNum)
               });
           }

       function AddAllItemToDB(Succsessfully_Stored_ID){
           Succsessfully_Stored_ID.forEach(element => {
               
               AddItemToDB(element.FingerId)
           });
       }
       function AddItemToDB(SavedId){
           StoredFingerArry.push(SavedId);

       }


       function GetAllDataRealtime(){

               const db = getDatabase();
               const starCountRef = ref(db, 'Succsessfully_Stored_ID/fingerID/' );
               onValue(starCountRef, (snapshot) => {
                   const StoredFingerId = snapshot.val();
                   set(ref(db, "Succsessfully_Stored_ID/"+ StoredFingerId),{
                       FingerId: StoredFingerId
                   })
               });

               const dbRef = ref(db,"Students");

               onValue(dbRef,(snapshot)=>{
                   var students = [];
                   snapshot.forEach(childSnapshot => {
                       students.push(childSnapshot.val());
                   });

                   AddAllItemToTable(students);
               })

               const dbRef2 = ref(db,"Succsessfully_Stored_ID");

               onValue(dbRef2,(snapshot)=>{
                   var FingerArry = [];
                   
                   snapshot.forEach(childSnapshot => {
                       FingerArry.push(childSnapshot.val());
                   });
                   FingerArry.pop();
                   // console.log(FingerArry);
                   AddAllItemToDB(FingerArry);
               })


       }















       window.onload = GetAllDataRealtime;















































       //reference
       var FingerId = document.getElementById("FingerId");
       var CurrentFingerId  = FingerId;
       var OldId = "-1";
       var UserName = document.getElementById("UserName");
       var SrlNum = document.getElementById("SrlNum");
       var EmlAddrs = document.getElementById("EmlAddrs");
       var radioButtons = document.querySelectorAll('input[name="gender"]');


       var addFingerBtn = document.getElementById("addFingerBtn");
       var AddUsrBtn = document.getElementById("AddUsrBtn");
       var UpdtUsrBtn = document.getElementById("UpdtUsrBtn");
       var RmvUsrBtn = document.getElementById("RmvUsrBtn");

       // insert fingerId function and cheak the validation of entered ID
           function InsertFingerId(){

               if(StoredFingerArry.length == 0){
                   set(ref(db, "Students/"+ FingerId.value),{
                               FingerId: FingerId.value
                           })
                           .then(()=>{
                               alert("Finger Id stored successfully");
                           })
                           .catch((error)=>{
                               alert("unsuccessfull, error"+error);
                           });

                           IdGenerate();
               }else{
                   let isValidId;
                   for(let i=0 ; i<StoredFingerArry.length ;i++){
                       if(StoredFingerArry[i] == FingerId.value){
                           isValidId = false;
                           break;
                       }else{
                           isValidId =true;
                       }
                   }

                   if(isValidId == true && FingerId.value != ""){
                               set(ref(db, "Students/"+ FingerId.value),{
                                   FingerId: FingerId.value
                               })
                               .then(()=>{
                                   alert("Finger Id stored successfully");
                               })
                               .catch((error)=>{
                                   alert("unsuccessfull, error"+error);
                               });

                               IdGenerate();
                   }else{
                               alert("This ID alredy Used or Invalid ID");
                           }
               }

               

       }

       function IdGenerate(){
                   set(ref(db, "CurrentFingerId"),{
                       CurrentFingerId: CurrentFingerId.value,
                       Old_Id: OldId
                   })
                   .then(()=>{
                       alert("Finger Id stored successfully");
                   })
                   .catch((error)=>{
                       alert("unsuccessfull, error"+error);
                   });

                   OldId = CurrentFingerId.value;
       }

       // insert data function
       function InsertUserInfo(){

           if(UserName.value == "" || SrlNum.value == "" || EmlAddrs.value ==  ""){
               alert("plz enter info");
           }else{
               // select the gender from radio buttons
               for (const radioButton of radioButtons) {
                   if (radioButton.checked) {
                       var selectedGender = radioButton.value;
                       break;
                   }
               }
               set(ref(db, "Students/"+ FingerId.value),{
                   NameOfStd: UserName.value,
                   FingerId: FingerId.value,
                   SrlNum: SrlNum.value,
                   EmlAddrs: EmlAddrs.value,
                   Gender: selectedGender
               })
               .then(()=>{
                   alert("data stored successfully");
               })
               .catch((error)=>{
                   alert("unsuccessfull, error"+error);
               });




               // clear all input field
               clearInptBx();
           }
       }

       //clear input box
       function clearInptBx(){
           UserName.value = "";
           FingerId.value = "";
           SrlNum.value ="";
           EmlAddrs.value = "";
       }

       // assign events to bttns
       AddUsrBtn.addEventListener('click', InsertUserInfo);
       addFingerBtn.addEventListener('click', InsertFingerId);








       var Enrollment ;
       var MarkTheAttend;

       // Update DB when we are choose enrollment or Mark Attendanece
       function InsertChoose1(){
           set(ref(db,"Start with Enrollment or Mark the Attendance/"),{
               Enrollment: true,
               Mark_The_Attedance: false
           })

           console.log("InsertChoose1")
       }

       function InsertChoose2(){
           set(ref(db,"Start with Enrollment or Mark the Attendance/"),{
               Enrollment: false,
               Mark_The_Attedance: true
           })

           console.log("InsertChoose2")
       }

       enrollBtn.addEventListener('click', InsertChoose1);
       mrkAttnBtn.addEventListener('click', InsertChoose2);