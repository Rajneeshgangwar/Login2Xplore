/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stuDb = "Student";
var stuRel = "Student-Rel";
var connToken = "90933195|-31949319908005537|90951132";


$("#empId").focus();

function saveRecNo2LS(jsonObj){
    
    var data=JSON.parse(jsonObj.data);
    localStorage.setItem('recno',data.rec_no);
}

function getStudentRollAsJsonObj() {
    var rollNo = $("#rollNo").val();
    var jsonStr = {
        rollNo:rollNo
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    
    saveRecNo2LS(jsonObj);
    
    var record=JSON.parse(jsonObj.data).record;
    
    $("#stuName").val(record.stuName);
    $("#stuClass").val(record.stuClass);
    $("#dob").val(record.dob);
    $("#address").val(record.address);
    $("#enDate").val(record.enDate);
    
}


function getStudent() {

    var stuJsonObj = getStudentRollAsJsonObj();

    var getRequest = createGET_BY_KEYRequest(connToken, stuDb, stuRel, stuJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    

    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stuName").focus();

    } else if (resJsonObj.status === 200){
        
        
        $("#rollNo").prop("disabled", true);
        $("#stuName").focus();
        fillData(resJsonObj);
        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#save").prop("disabled",true);
        
        
    }
}






function validateAndGetFormData() {
    var rollNo = $("#rollNo").val();
    if (rollNo === "") {
        alert("Roll Number is Required");
        $("#rollNo").focus();
        return "";
    }
    var stuName = $("#stuName").val();
    if (stuName === "") {
        alert("Student Name is Required");
        $("#stuName").focus();
        return "";
    }
    var stuClass= $("#stuClass").val();
    if (stuClass === "") {
        alert("Class is Required Value");
        $("#class").focus();
        return "";
    }

    var dob = $("#dob").val();
    if (dob === "") {
        alert("DOB is Required Value");
        $("#dob").focus();
        return "";
    }
    var address = $("#address").val();
    if (address === "") {
        alert("address is Required Value");
        $("#address").focus();
        return "";
    }
    var enDate = $("#enDate").val();
    if (enDate === "") {
        alert("Enrollment Date is Required Value");
        $("#enDate").focus();
        return "";
    }
    var jsonStrObj = {
        rollNo:rollNo,
        stuName:stuName,
        stuClass: stuClass,
        dob: dob,
        address:address,
        enDate: enDate
    };
    return JSON.stringify(jsonStrObj);
}

function resetForm() {
    $("#rollNo").val("");
    $("#stuName").val("");
    $("#stuClass").val("");
    $("#dob").val("");
    $("#address").val("");
    $("#enDate").val("");
    $("#rollNo").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#rollNo").focus();
}
function saveData() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return "";
    }
    var putReqStr = createPUTRequest(connToken, jsonStr, stuDb, stuRel);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, jpdbBaseURL, jpdbIML);
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#rollNo").focus();
}


function updateData() {

    $("#update").prop("disabled", true);

    jsonChange = validateAndGetFormData();

    var updateRequest = createUPDATERecordRequest(connToken, jsonChange, stuDb, stuRel, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    console.log(resJsonObj);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#rollNo").focus();
}