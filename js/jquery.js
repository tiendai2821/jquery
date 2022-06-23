$(document).ready(function () {
    let id = 0;
    let list = [];
    let isEdit = false;
    let index = -1

    $("#save-button").click(function () {
        const fullName = $("#fullName").val();
        const birthday = $("#birthday").val();
        const phoneNumber = $("#phoneNumber").val();
        const hometown = $("#hometown").val();
        if (fullName == "" || birthday == "" || phoneNumber == "" || hometown == "") {
            alert("Nhập thiếu hoặc nhập sai! vui lòng kiểm tra lại");
            return 0;
        }

        if (isEdit) {
            doUpdateInfo(fullName, birthday, phoneNumber, hometown);
            isEdit = false;
            return;
        }

        $("#table-data").append("<tr id='" + id + "'>" +
            "<td><input type='checkbox'></td>" +
            "<td class='no' style='display: none'>" + id + "</td>" +
            "<td class='fullName'>" + fullName + "</td>" +
            "<td class='birthday'>" + birthday + "</td>" +
            "<td class='phoneNumber'>" + phoneNumber + "</td>" +
            "<td class='hometown'>" + hometown + "</td>" +
            "</tr>");
        const ob = { id, fullName, birthday, phoneNumber, hometown };
        list.push(ob);
        clearForm();
        id++;
    });
    $("#refresh-button").click(function () {
        clearForm();
    });
    $("#delete").click(function(){

        if(confirm("bạn có chắc muốn xóa các lựa chọn"))
        {
            var arr_id = [];
            
            $(":checkbox:checked").each(function(i){
                arr_id[i] = $(this).val();
            })
            if(arr_id.length == 0){
                alert("cần chọn ít nhất 1 trường");
            }else{
                $("#table input[type='checkbox']:checked:not('.toggleCheckbox')").closest("tr").remove();
            }
            
        }
    else{
        return false;
    }
        })

        $("#edit").click(function(){

           
                var arr_id = [];
                
                $(":checkbox:checked").each(function(i){
                    arr_id[i] = $(this).val();
                })
                if(arr_id.length >= 2){
                    alert("không thể sửa nhiều trường 1 lúc");
                }else if(arr_id.length == 0 ){
                    alert("cần chọn ít nhất 1 trường");
                }
                
                else{
                    $(":checkbox:checked").each(function(i){
                        const rowData = $(this).parents('tr');
                        index = parseInt(rowData.children('.no').text());
                        document.getElementById('fullName').value = rowData.children('.fullName').text();
                        document.getElementById('birthday').value = rowData.children('.birthday').text();
                        document.getElementById('phoneNumber').value = rowData.children('.phoneNumber').text();
                        document.getElementById('hometown').value = rowData.children('.hometown').text();

                        isEdit = true;
                    })
                   
                }
                
        }
            )

   

    function doUpdateInfo(fullName, birthday, phoneNumber, hometown) {
        list[index].fullName = fullName;
        list[index].birthday = birthday;
        list[index].phoneNumber = phoneNumber;
        list[index].hometown = hometown;

        const rowData = $('table').find('tr#' + index);
        rowData.children('.fullName').text(fullName);
        rowData.children('.birthday').text(birthday);
        rowData.children('.phoneNumber').text(phoneNumber);
        rowData.children('.hometown').text(hometown);

        index = -1;
        clearForm();
    }

    function clearForm() {
        document.getElementById("fullName").value = "";
        document.getElementById("birthday").value = "";
        document.getElementById("phoneNumber").value = "";
        document.getElementById("hometown").value = "";
    }

});