//references
var homeBtn = document.getElementById("honmebtn");
var beginSection = document.getElementById("beginSection");
var attendnceSec = document.getElementById("attendnceSec");
var FilterSec = document.getElementById("FilterSec");
var enrollSec = document.getElementById("enrollSec");
var enrollBtn = document.getElementById("EnrlDiv");
var mrkAttnBtn = document.getElementById("MrkAttnDiv");
var FiltrDtBtn = document.getElementById("FiltrDtDiv");
let srchBtn = document.getElementById("serchbtn");
let selctDate = document.getElementById("SearchDate");
let countVrble = 0;

homeBtn.addEventListener('click', home);
enrollBtn.addEventListener('click', enrollPage);
mrkAttnBtn.addEventListener('click', attenPage);
FiltrDtBtn.addEventListener('click', FiltrtDtPage);

    
function home(){
    beginSection.style.display = 'flex';
    enrollSec.style.display =  'none';  
    attendnceSec.style.display =  'none';  
    FilterSec.style.display =  'none';  

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
    set(ref(db, "I  am now in the/"),{
        Mark_the_Attedance_Section: 1
    });
}  
function FiltrtDtPage(){
    beginSection.style.display = 'none';
    enrollSec.style.display =  'none';  
    attendnceSec.style.display =  'none';  
    FilterSec.style.display =  'block';  

}
    
    
    
    
    
       
       
       
       
       
       
       


// filling the table
var tbody1 = document.getElementById('tbody1');
var tbody2 = document.getElementById('tbody2');
var tbody3 = document.getElementById('tbody3');

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
    RealtimeRun();

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
    });
        
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
            
            if(FingerId.value == ''){
                Swal.fire({
                    icon: 'warning',
                    title: 'Please Enter ID',
                  })
            }else{
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
                            console.log(typeof(FingerId.value));
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
                                console.log(typeof(FingerId.value));

                    }else{
                         Swal.fire({
                             icon: 'error',
                             title: 'ID Alredy Used Or Invalid ID',
                         })

                            }
                }
                
            }



               

       }

       function IdGenerate(){
        // console.log(typeof(FingerId.value));

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


    //cheack the Finger print  and stored 1 on DB if the finger print is stored
        const dbRef = ref(db,"Finger Print Is/Stored" );
        onValue(dbRef,(snapshot)=>{
        var IsSuccess = snapshot.val();
        console.log(IsSuccess);
        if(IsSuccess == 1){
            IsvalidFingerPrint(1);
        }
        else if(IsSuccess == 2) {
            IsvalidFingerPrint(2)
        }
        else if(IsSuccess == 3) {
            IsvalidFingerPrint(3)
        }
        });

        function IsvalidFingerPrint(num){
            if(num == 1){

                Swal.fire({
                    icon: 'success',
                    title: 'Fingerprint Stored Successfully',
                    text: 'Now Enter Student Details',
                }) ;  

            }else if (num ==2){
                Swal.fire({
                    icon: 'info',
                    title: 'Please Remove Finger And Place Again Same Finger',
                }) 
            }else if(num ==3){
                Swal.fire({
                    icon: 'warning',
                    title: 'Finger Print Did Not Match Place Correct Finger Again',
                }) 
            }
        }



       // insert data function
       function InsertUserInfo(){
        set(ref(db, "Finger Print Is/"),{
            Stored: 0,

        });
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
        
        console.log(FoundIdStdnt);

        if(FoundId != 0){
            set(ref(db, "Found_IDs/"),{
                ID:0
            });
            UpdateAllItemToTable(FoundIdStdnt[FoundId-1]);
        }else{
            startTheMarkAttn();
        }



        
        function UpdateAllItemToTable(Students){
            console.log("test 2");

            UpdateItemToTable(Students.FingerId, Students.NameOfStd, Students.Gender, Students.SrlNum, Students.EmlAddrs, Students.DaleyAttemptNo);
            
        };

        function UpdateItemToTable(fngrId, name, gen, sNum, email, attmpt){

            console.log("test 3");
            console.log(attmpt);

            
            let mydate = new Date();
            let day = mydate.getDate();
            let month = mydate.getMonth() + 1;
            let year = mydate.getUTCFullYear();
            let StrngDate = String(day);
            let StrngMonth;
            let StrngYear = String(year);

            
            
            switch(month) {
                case 1:
                    StrngMonth = "01";
                break;
                case 2:
                    StrngMonth = "02";
                break;
                case 3:
                    StrngMonth = "03";
                break;
                case 4:
                    StrngMonth = "04";
                break;
                case 5:
                    StrngMonth = "05";
                break;
                case 6:
                    StrngMonth = "06";
                break;
                case 7:
                    StrngMonth = "07";
                break;
                case 8:
                    StrngMonth = "08";
                break;
                case 9:
                    StrngMonth = "09";
                break;
                case 10:
                    StrngMonth = "10";
                break;
                case 11:
                    StrngMonth = "11";
                break;
                case 12:
                    StrngMonth = "12";
                break;
                default:
                    
              }
            
              let fullDate =  StrngYear + "-" + StrngMonth + "-" + StrngDate;



            var hours = mydate.getHours();
            var min = mydate.getMinutes();
            let ReleventId,RelavantDate;
            let LstDte;

            // console.log(CompleAttendanceSheat[0].length);
            // for(let j=0 ; j<CompleAttendanceSheat.length ; j++){
            // console.log(CompleAttendanceSheat);
            //     for(let i = 1 ; i<=CompleAttendanceSheat[j].length ; i++){
            //         console.log(CompleAttendanceSheat[j][i]["PersonalInfo"]["Attendance_date"]);
            //         RelavantDate = (CompleAttendanceSheat[j][i]["PersonalInfo"]["Attendance_date"]);
            //         ReleventId = (CompleAttendanceSheat[j][i]["PersonalInfo"]["FingerId"]);
            //         console.log(RelavantDate);
            //         console.log(ReleventId);
            //         console.log(fngrId);
        
            //         if(fngrId == ReleventId){
            //             LstDte = RelavantDate;
        
            //         }
                    
            //     }
            // }
            
            // console.log(LstDte);
            // console.log(fullDate);
            // if(LstDte != fullDate){
            //     attmpt = 1;
                
            // }




            

            // .then(()=>{
            //     alert("Time in stored successfully");
            // })
            // .catch((error)=>{
            //     alert("unsuccessfull, error"+error);
            // }); 


            if(attmpt == 1){
                set(ref(db, "Attendance Sheat/"+ fullDate + "/" + fngrId + "/" + "PersonalInfo"),{
                    NameOfStd: name,
                    FingerId: fngrId,
                    SrlNum: sNum,
                    EmlAddrs: email,
                    Gender: gen,
                    Attendance_date: fullDate,
    
                })
                set(ref(db, "Attendance Sheat/"+ fullDate + "/" + fngrId + "/" + "TimeIn"),{
                    TimeIn: hours + ":" + min,

                });
                set(ref(db, "Attendance Sheat/"+ fullDate + "/" + fngrId + "/" + "TimeOut"),{
                    TimeOut: "-"
                });

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

                set(ref(db, "DatesArray/"+ fullDate),{
                    fullDate
                });
                // console.log("attmp 1 ok");
                // set(ref(db, "I  am now in the/"),{
                //     Mark_the_Attedance_Section: 1
                // });
                location.reload();
                attenPage();
                InsertChoose2();
                startTheMarkAttn();
            }else if((attmpt == 2)){
                set(ref(db, "Attendance Sheat/"+ fullDate + "/" + fngrId + "/" + "PersonalInfo"),{
                    NameOfStd: name,
                    FingerId: fngrId,
                    SrlNum: sNum,
                    EmlAddrs: email,
                    Gender: gen,
                    Attendance_date: fullDate,
    
                })
                set(ref(db, "Attendance Sheat/"+ fullDate + "/" + fngrId + "/" + "TimeOut"),{
                    TimeOut: hours + ":" + min,
                });
                set(ref(db, "Students/"+ fngrId),{
                    NameOfStd: name,
                    FingerId: fngrId,
                    SrlNum: sNum,
                    EmlAddrs: email,
                    Gender: gen,
                    DaleyAttemptNo: 1
                });

                set(ref(db, "Found_IDs/"),{
                    ID:0
                });
                console.log("attmp 2 ok");
                // set(ref(db, "I  am now in the/"),{
                //     Mark_the_Attedance_Section: 1
                // });
                location.reload();
            }else{
                Swal.fire({
                    icon: 'warning',
                    title: 'This Student Alredy Attempt',
                  })
                set(ref(db, "Found_IDs/"),{
                    ID:0
                });
                console.log(LstDte);
                console.log(fullDate);

            }

        }
        
    }

    
tbody2.innerHTML= "";
const dbRef7 = ref(db, "DatesArray");
onValue(dbRef7, (snapshot) => {
    var DatesArrayLst = [];
    snapshot.forEach(childSnapshot => {
        DatesArrayLst.push(childSnapshot.val());
    })
    // console.log(DatesArrayLst[1]["fullDate"]);
    console.log(DatesArrayLst.length);
    for(let i=0 ; i<DatesArrayLst.length ; i++){

        let SingleDate = DatesArrayLst[i]["fullDate"];
        console.log(SingleDate);

        // ------filtering the paticular date information

        
        // -----------send data to mark attedance table-----------------------
        const dbRef6 = ref(db, "Attendance Sheat/" + SingleDate);
        onValue(dbRef6,(snapshot)=>{
            var AttendanceSheat = [];
            snapshot.forEach(childSnapshot => {
                AttendanceSheat.push(childSnapshot.val());
            });
            console.log(AttendanceSheat);
            console.log(AttendanceSheat.length);
            AddAllItemToAttedanceTable(AttendanceSheat);

        })

        function AddAllItemToAttedanceTable(AttendanceSheat){
            AttendanceSheat.forEach(element => {
                AddItemToAttedanceTable(element.PersonalInfo.Attendance_date, element.PersonalInfo.Gender, element.PersonalInfo.EmlAddrs, element.PersonalInfo.SrlNum, element.PersonalInfo.NameOfStd, element.PersonalInfo.FingerId,
                    element.TimeIn.TimeIn, element.TimeOut.TimeOut)
            })
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

    }
});







// // -----------send data to mark attedance table-----------------------
// const dbRef6 = ref(db, "Attendance Sheat");
// onValue(dbRef6,(snapshot)=>{
//     var AttendanceSheat = [];
//     snapshot.forEach(childSnapshot => {
//         AttendanceSheat.push(childSnapshot.val());
//     });
//     tbody2.innerHTML= "";
//     console.log(AttendanceSheat);
//     console.log(AttendanceSheat.length);

//     for(let j=0 ; j<AttendanceSheat.length ; j++){
        
//         for(let i = 1 ; i<AttendanceSheat[j].length ; i++){
//             console.log(AttendanceSheat[j].length);
//             console.log(AttendanceSheat[j][i]["PersonalInfo"], AttendanceSheat[j][i]["TimeIn"], AttendanceSheat[j][i]["TimeOut"]);
//             AddAllItemToAttedanceTable(AttendanceSheat[j][i]["PersonalInfo"], AttendanceSheat[j][i]["TimeIn"],  AttendanceSheat[j][i]["TimeOut"]);
    
//         }
//     }

// })
    
// function AddAllItemToAttedanceTable(AttendanceSheat_personalInfo, AttendanceSheat_timein, AttendanceSheat_timeout){
//     console.log(AttendanceSheat_personalInfo, AttendanceSheat_timein, AttendanceSheat_timeout);
//     AddItemToAttedanceTable(AttendanceSheat_personalInfo.Attendance_date, AttendanceSheat_personalInfo.Gender, AttendanceSheat_personalInfo.EmlAddrs, AttendanceSheat_personalInfo.SrlNum, AttendanceSheat_personalInfo.NameOfStd, AttendanceSheat_personalInfo.FingerId,
//                             AttendanceSheat_timein.TimeIn, AttendanceSheat_timeout.TimeOut);

// }

// function AddItemToAttedanceTable(attnDate, gen, email, srlnum, name, fngrid, timein, timeout){
//     let trow = document.createElement("tr");
//     let td1 = document.createElement('td');
//     let td2 = document.createElement('td');
//     let td3 = document.createElement('td');
//     let td4 = document.createElement('td');
//     let td5 = document.createElement('td');
//     let td6 = document.createElement('td');
//     let td7 = document.createElement('td');
//     let td8 = document.createElement('td');

//     td1.innerHTML = fngrid;
//     td2.innerHTML = name;
//     td3.innerHTML = email;
//     td4.innerHTML = gen;
//     td5.innerHTML = srlnum;
//     td6.innerHTML = attnDate;
//     td7.innerHTML = timein;
//     td8.innerHTML = timeout;

//     trow.appendChild(td1);
//     trow.appendChild(td2);
//     trow.appendChild(td3);
//     trow.appendChild(td4);
//     trow.appendChild(td5);
//     trow.appendChild(td6);
//     trow.appendChild(td7);
//     trow.appendChild(td8);

//     tbody2.appendChild(trow);

    
// }



var CompleAttendanceSheat = [];
var FoundIdStdnt = [];


function RealtimeRun(){

    const dbRef3 = ref(db,"Students" );
    onValue(dbRef3,(snapshot)=>{
    FoundIdStdnt = [];
    snapshot.forEach(childSnapshot => {
        FoundIdStdnt.push(childSnapshot.val());
    });
    
    
    const dbRef4 = ref(db, 'Found_IDs/ID/');
    onValue(dbRef4, (snapshot) => {
        const FoundId = snapshot.val();
        console.log("test 1");
    
    
    });
    console.log(FoundIdStdnt);
    
    });
    
    
    
    
    const dbRef8 = ref(db, "Attendance Sheat");
    onValue(dbRef8,(snapshot)=>{
        CompleAttendanceSheat = [];
        snapshot.forEach(childSnapshot => {
            CompleAttendanceSheat.push(childSnapshot.val());
        });
    
        console.log(CompleAttendanceSheat);
    
    })
    
}





// -------------------filter page------------------------

function dateshow(){
    let crrntDate = selctDate.value;
    let dataFond;
    console.log(typeof(crrntDate));
    console.log(crrntDate);

    tbody3.innerHTML= "";
    const dbRef7 = ref(db, "DatesArray");
    onValue(dbRef7, (snapshot) => {
    var DatesArrayLst = [];
    snapshot.forEach(childSnapshot => {
        DatesArrayLst.push(childSnapshot.val());
    })
    // console.log(DatesArrayLst[1]["fullDate"]);
    console.log(DatesArrayLst.length);
    for(let i=0 ; i<DatesArrayLst.length ; i++){

        let SingleDate = DatesArrayLst[i]["fullDate"];
        console.log(SingleDate);

        // ------filtering the paticular date information
        if(crrntDate == SingleDate){
            dataFond=true;
            const dbRef6 = ref(db, "Attendance Sheat/" + SingleDate);
            onValue(dbRef6,(snapshot)=>{
                var AttendanceSheat = [];
                snapshot.forEach(childSnapshot => {
                    AttendanceSheat.push(childSnapshot.val());
                });
                console.log(AttendanceSheat);
                console.log(AttendanceSheat.length);
                AddAllItemToAttedanceTable(AttendanceSheat);
    
            })
    
            function AddAllItemToAttedanceTable(AttendanceSheat){
                AttendanceSheat.forEach(element => {
                    AddItemToAttedanceTable(element.PersonalInfo.Attendance_date, element.PersonalInfo.Gender, element.PersonalInfo.EmlAddrs, element.PersonalInfo.SrlNum, element.PersonalInfo.NameOfStd, element.PersonalInfo.FingerId,
                        element.TimeIn.TimeIn, element.TimeOut.TimeOut)
                })
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
    
                tbody3.appendChild(trow);
    
                
            }
        }
    }
    if(dataFond != true){
        Swal.fire({
            icon: 'warning',
            title: 'No Relevent Data',
          })
    }
});

}
srchBtn.addEventListener('click', dateshow);
