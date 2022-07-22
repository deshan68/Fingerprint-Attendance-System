    //references
    var homeBtn = document.getElementById("honmebtn");
    var beginSection = document.getElementById("beginSection");
    var attendnceSec = document.getElementById("attendnceSec");
    var enrollSec = document.getElementById("enrollSec");
    var enrollBtn = document.getElementById("EnrlDiv");
    var mrkAttnBtn = document.getElementById("MrkAttnDiv");
    let countVrble = 0;
    homeBtn.addEventListener('click', home);
    enrollBtn.addEventListener('click', enrollPage);
    mrkAttnBtn.addEventListener('click', attenPage);

       
    function home(){
        beginSection.style.display = 'flex';
        enrollSec.style.display =  'none';  
        attendnceSec.style.display =  'none';  

        set(ref(db, "I  am now in the/"),{
            Mark_the_Attedance_Section: 0
        });

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
       var tbody1 = document.getElementById('tbody1');
       var tbody2 = document.getElementById('tbody2');

       function AddItemToTable(fngrId, name, gen, sNum, email){
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
           td6.innerHTML = email;

           trow.appendChild(td1);
           trow.appendChild(td2);
           trow.appendChild(td3);
           trow.appendChild(td4);
           trow.appendChild(td5);
           trow.appendChild(td6);

           tbody1.appendChild(trow);

           
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

       import {getDatabase, ref, get , set, child, update, remove, onValue, push}
       from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
       
       const db = getDatabase();

       function AddAllItemToTable(Students){
               tbody1.innerHTML="";
               Students.forEach(element => {
                   AddItemToTable(element.FingerId, element.NameOfStd, element.Gender, element.SrlNum,element.EmlAddrs)
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

                const db5 = getDatabase();
                const dbRef5 = ref(db5, 'I  am now in the/Mark_the_Attedance_Section');
                onValue(dbRef5, (snapshot) => {
                    const I_am_now_in = snapshot.val();
                    if(I_am_now_in ==  1){
                        attenPage();
                        startTheMarkAttn();
                        InsertChoose2();
                    }
                });

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
                    console.log(students);

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


function startTheMarkAttn(){
    set(ref(db, "Found_IDs/"),{
        ID:0
        })
        
        const dbRef3 = ref(db, 'Found_IDs/ID/');
        onValue(dbRef3, (snapshot) => {
            const FoundId = snapshot.val();
            if(FoundId == 0){
                
            }else{

                set(ref(db, "Attempt Count/"+ FoundId),{
                    Count:countVrble
                });
                MarkTheFoundId(FoundId);
            }
        });
}












       window.onload = GetAllDataRealtime;
    //    window.onload = onload2;






    function onload2(){

    }









































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
                        //    .then(()=>{
                        //        alert("Finger Id stored successfully");
                        //    })
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
                            //    .then(()=>{
                            //        alert("Finger Id stored successfully");
                            //    })
                               .catch((error)=>{
                                   alert("unsuccessfull, error"+error);
                               });

                               IdGenerate();
                   }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'ID Alredy Used Or Invalid ID',
                        })
                           }
               }

               

       }

       function IdGenerate(){
                   set(ref(db, "CurrentFingerId"),{
                       CurrentFingerId: CurrentFingerId.value,
                       Old_Id: OldId
                   })
                   .then(()=>{
                        Swal.fire({
                            icon: 'success',
                            title: 'Fingerprint ID Stored Successfully',
                            text: 'Scanning has started',
                        })
                   })
                   .catch((error)=>{
                       alert("unsuccessfull, error"+error);
                   });

                   OldId = CurrentFingerId.value;
       }

       // insert data function
       function InsertUserInfo(){

           if(UserName.value == "" || SrlNum.value == "" || EmlAddrs.value ==  ""){
            Swal.fire({
                icon: 'warning',
                title: 'Please Enter Information',
              })
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
                   Gender: selectedGender,
                   DaleyAttemptNo: 1
               })
               .then(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Date Stored Successfully',
                  })
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

       }

       enrollBtn.addEventListener('click', InsertChoose1);
       mrkAttnBtn.addEventListener('click', InsertChoose2);
       mrkAttnBtn.addEventListener('click', startTheMarkAttn);




    //    mark the found ID
    function MarkTheFoundId(FoundId){


        
        
            const dbRef3 = ref(db,"Students" );
            onValue(dbRef3,(snapshot)=>{
            var FoundIdStdnt = [];
            snapshot.forEach(childSnapshot => {
                FoundIdStdnt.push(childSnapshot.val());
            });
            const dbRef4 = ref(db, 'Found_IDs/ID/');
            onValue(dbRef4, (snapshot) => {
                const FoundId = snapshot.val();
                if(FoundId != 0){
                    set(ref(db, "Found_IDs/"),{
                        ID:0
                    });
                    UpdateAllItemToTable(FoundIdStdnt[FoundId-1]);
                }else{
                    startTheMarkAttn();
                }
            });

        });
        
        function UpdateAllItemToTable(Students){
            UpdateItemToTable(Students.FingerId, Students.NameOfStd, Students.Gender, Students.SrlNum, Students.EmlAddrs, Students.DaleyAttemptNo);
            
        };

        function UpdateItemToTable(fngrId, name, gen, sNum, email, attmpt){
            
            let mydate = new Date();
            let day = mydate.getDate();
            let month = mydate.getMonth() + 1;
            let year = mydate.getUTCFullYear();
            let StrngDate = String(day);
            let StrngMonth = String(month);
            let StrngYear = String(year);
            let fullDate =  StrngYear + "-" + StrngMonth + "-" + StrngDate;
            var hours = mydate.getHours();
            var min = mydate.getMinutes();
            let LstDte,ReleventId,RelavantDate;

            const dbRef6 = ref(db, "Attendance Sheat");
            onValue(dbRef6,(snapshot)=>{
                var AttendanceSheat = [];
                snapshot.forEach(childSnapshot => {
                    AttendanceSheat.push(childSnapshot.val());
                });
                for(let j=0 ; j<AttendanceSheat.length ; j++){
                    for(let i = 1 ; i<AttendanceSheat[j].length ; i++){
                        RelavantDate = (AttendanceSheat[j][i]["PersonalInfo"]["Attendance_date"]);
                        ReleventId = (AttendanceSheat[j][i]["PersonalInfo"]["FingerId"]);
                        if(fngrId == ReleventId){
                            LstDte = RelavantDate;
                        }
                        
                    }
                }
            
            })


            if(LstDte != fullDate){
                attmpt = 1;
                set(ref(db, "Students/"+ fngrId),{
                    NameOfStd: name,
                    FingerId: fngrId,
                    SrlNum: sNum,
                    EmlAddrs: email,
                    Gender: gen,
                    DaleyAttemptNo: 1
                });            }

            
            set(ref(db, "Attendance Sheat/"+ fullDate + "/" + FoundId + "/" + "PersonalInfo"),{
                NameOfStd: name,
                FingerId: fngrId,
                SrlNum: sNum,
                EmlAddrs: email,
                Gender: gen,
                Attendance_date: fullDate,

            })
            // .then(()=>{
            //     alert("Time in stored successfully");
            // })
            // .catch((error)=>{
            //     alert("unsuccessfull, error"+error);
            // }); 


            if(attmpt == 1){
                set(ref(db, "Students/"+ fngrId),{
                    NameOfStd: name,
                    FingerId: fngrId,
                    SrlNum: sNum,
                    EmlAddrs: email,
                    Gender: gen,
                    DaleyAttemptNo: 2
                });
                set(ref(db, "Found_IDs/"),{
                    ID:0
                });
                set(ref(db, "Attendance Sheat/"+ fullDate + "/" + FoundId + "/" + "TimeIn"),{
                    TimeIn: hours + ":" + min,

                });
                set(ref(db, "Attendance Sheat/"+ fullDate + "/" + FoundId + "/" + "TimeOut"),{
                    TimeOut: "-"
                });
                console.log("attmp 1 ok");
                set(ref(db, "I  am now in the/"),{
                    Mark_the_Attedance_Section: 1
                });
                location.reload();
                attenPage();
                InsertChoose2();
                startTheMarkAttn();
            }else if((attmpt == 2)){
                set(ref(db, "Students/"+ fngrId),{
                    NameOfStd: name,
                    FingerId: fngrId,
                    SrlNum: sNum,
                    EmlAddrs: email,
                    Gender: gen,
                    DaleyAttemptNo: 3
                });
                set(ref(db, "Attendance Sheat/"+ fullDate + "/" + FoundId + "/" + "TimeOut"),{
                    TimeOut: hours + ":" + min,
                });
                set(ref(db, "Found_IDs/"),{
                    ID:0
                });
                console.log("attmp 2 ok");
                set(ref(db, "I  am now in the/"),{
                    Mark_the_Attedance_Section: 1
                });
                location.reload();
            }else{
                // Swal.fire('You Are Alredy Attempt')
                Swal.fire({
                    icon: 'warning',
                    title: 'This Student Alredy Attempt',
                  })
                set(ref(db, "Found_IDs/"),{
                    ID:0
                });
                console.log(LstDte);
                console.log(fngrId);


                // setTimeout(attenPage, 3000);
                // InsertChoose2();
                // startTheMarkAttn();
            }






            

        }
        
        
    }








// -----------send data to mark attedance table-----------------------
const dbRef6 = ref(db, "Attendance Sheat");
onValue(dbRef6,(snapshot)=>{
    var AttendanceSheat = [];
    snapshot.forEach(childSnapshot => {
        AttendanceSheat.push(childSnapshot.val());
    });
    tbody2.innerHTML= "";
    console.log(AttendanceSheat);
    console.log(AttendanceSheat.length);

    for(let j=0 ; j<AttendanceSheat.length ; j++){
        for(let i = 1 ; i<AttendanceSheat[j].length ; i++){
            console.log(AttendanceSheat[j].length);
            console.log(AttendanceSheat[j][i]["PersonalInfo"], AttendanceSheat[j][i]["TimeIn"], AttendanceSheat[j][i]["TimeOut"]);
            AddAllItemToAttedanceTable(AttendanceSheat[j][i]["PersonalInfo"], AttendanceSheat[j][i]["TimeIn"],  AttendanceSheat[j][i]["TimeOut"]);
    
        }
    }

})
    
function AddAllItemToAttedanceTable(AttendanceSheat_personalInfo, AttendanceSheat_timein, AttendanceSheat_timeout){
    console.log(AttendanceSheat_personalInfo, AttendanceSheat_timein, AttendanceSheat_timeout);
    AddItemToAttedanceTable(AttendanceSheat_personalInfo.Attendance_date, AttendanceSheat_personalInfo.Gender, AttendanceSheat_personalInfo.EmlAddrs, AttendanceSheat_personalInfo.SrlNum, AttendanceSheat_personalInfo.NameOfStd, AttendanceSheat_personalInfo.FingerId,
                            AttendanceSheat_timein.TimeIn, AttendanceSheat_timeout.TimeOut);

}

function AddItemToAttedanceTable(attnDate, gen, email, srlnum, name, fngrid, timein, timeout){
    let trow = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');
    let td8 = document.createElement('td');

    td1.innerHTML = fngrid;
    td2.innerHTML = name;
    td3.innerHTML = email;
    td4.innerHTML = gen;
    td5.innerHTML = srlnum;
    td6.innerHTML = attnDate;
    td7.innerHTML = timein;
    td8.innerHTML = timeout;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);

    tbody2.appendChild(trow);

    
}