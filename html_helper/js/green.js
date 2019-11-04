jQuery(document).ready(function() {

    var form = $('.search-st99'); // contact form
    var submit = $('#search99');  // submit button

    // form submit event
    form.on('submit', function(e) {
        e.preventDefault(); // prevent default form submit
        console.log($(this).attr('action'));
        var table = '';

        $.ajax({
            url: $(this).attr('action'), // form action url
            type: 'POST', // form submit method get/post
            dataType: 'json', // request type html/json/xml
            data: form.serialize(), // serialize form data
            beforeSend: function() {
                console.log('অনুগ্রহপূর্বক অপেক্ষা করুন .....'); // change submit button text
                $("#result").html('অনুগ্রহপূর্বক অপেক্ষা করুন .....');
            },
            success: function(data) {
                console.log(data);
                if(data == 0) {
                    var errorE = '';
                    errorE += '<div id="div3" class="notice">';
                    errorE += '<div class="message-box-wrap">';
                    errorE += '<button class="close-but" id="colosebut3">close</button> খুঁজে পাওয়া যায়নি</div>';
                    errorE += '</div>';

                    $("#no-result").html(errorE);
                    $("#result").html('');
                } else {
                    table += '<div class="table-style">';
                    table += '<table class="table-list">';
                    table += '<tr><th width="80"></th><th align="left">নাম</th><th align="left">পিতার নাম</th><th align="left">মায়ের নাম</th><th align="left">রোল</th><th align="left">সেশন</th><th align="left">স্থায়ী ঠিকানা</th><th align="left">বর্তমান ঠিকানা</th><th></th></tr>';
                    $.each(data, function (index, value) {
                        //console.log( index + ": " + value.name );
                        table += '<tr>';
                        table += '<td valign="top"><img src="' + base_url + "uploads/student/" + value.photo + '" width="80"></td>';
                        table += '<td valign="top">' + value.name + '</td>';
                        table += '<td valign="top">' + value.fathers_name + '</td>';
                        table += '<td valign="top">' + value.mothers_name + '</td>';
                        table += '<td valign="top">' + value.roll + '</td>';
                        table += '<td valign="top">' + value.session + '</td>';
                        table += '<td valign="top">' + value.permanent_address + '</td>';
                        table += '<td valign="top">' + value.present_address + '</td>';
                        table += '<td valign="top"><a href="'+base_url+'student/sprint/'+value.id+'" target="_blank" title="প্রিন্ট করুন"><img src="'+base_url+'uploads/print.png"></a></td>';
                        table += '</tr>';
                    });
                    table += '</table>';
                    table += '</div>';
                    $("#no-result").html('');
                    $("#result").html(table);
                }
            },
            error: function(e) {
                console.log(e)
            }
        });
    });

    //search result
    // form submit event
    $(".search-result").on('submit', function(e) {
        e.preventDefault(); // prevent default form submit
        //console.log($(this).attr('action'));
        var table = '';
        var info = '';

        $.ajax({
            url: $(this).attr('action'), // form action url
            type: 'POST', // form submit method get/post
            dataType: 'json', // request type html/json/xml
            data: $(this).serialize(), // serialize form data
            beforeSend: function() {
                console.log('অনুগ্রহপূর্বক অপেক্ষা করুন .....'); // change submit button text
                $("#result-info").html('');
                $("#result").html('অনুগ্রহপূর্বক অপেক্ষা করুন .....');
            },
            success: function(data) {
                $(".result-print").attr('style', 'display:block');
                console.log(data.std_info[0].name);
                if(data.std_info[0].shift == '1') {
                    var shift = '১ম';
                } else {
                    var shift = '২য়';
                }//১ম
                info += '<table width="100%">';
                info += '<tr><td>';
                info += 'শিক্ষার্থীর নাম: '+data.std_info[0].name+"<br />";
                info += 'পিতার নাম: '+data.std_info[0].fathers_name+"<br />";
                info += 'মায়ের নাম: '+data.std_info[0].mothers_name+"<br />";
                info += 'শ্রেণী: '+data.std_info[0].stu_class+"<br />";
                info += 'শাখা: '+data.std_info[0].stu_group+"<br />";
                info += 'শিফ্ট: '+shift+"<br />";
                info += '</td>';
                info += '<td align="right"><img src="'+base_url+'uploads/student/'+data.std_info[0].photo+'" width="100"></td></tr>';

                info += '</table>'

                table += '<div class="table-style">';
                table += '<table class="table-list">';
                table += '<tr><th>বিষয়</th><th>নম্বর</th><th>জিপিএ</th><th>মন্তব্য</th></tr>';
                $.each(data.result_details, function (index, value) {
                    //console.log( index + ": " + value.name );
                    table += '<tr>';
                    //table += '<td valign="top"><img src="' + base_url + "uploads/student/" + value.photo + '" width="80"></td>';
                    table += '<td valign="top">' + value.name + '</td>';
                    table += '<td valign="top">' + value.number + '</td>';
                    table += '<td valign="top">' + value.point + '</td>';
                    table += '<td valign="top">' + value.final_result + '</td>';
                    table += '</tr>';
                });
                table += '<tr>';
                //table += '<td valign="top"><img src="' + base_url + "uploads/student/" + value.photo + '" width="80"></td>';
                table += '<td valign="top"></td>';
                table += '<td valign="top"></td>';
                table += '<td valign="top">সিজিপিএ</td>';
                table += '<td valign="top">' + data.result_info[0].point + '</td>';
                table += '</tr>';
                table += '</table>';
                table += '</div>';

                $("#no-result").html('');
                $("#result-info").html(info);
                $("#result").html(table);
            },
            error: function(e) {
                console.log(e)
            }
        });
    });

    $("#btnPrint").click(function (e) {
        e.preventDefault(); // prevent default form submit
        var contents = $("#result-print").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>Result Print</title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="'+base_url+'html_helper/css/style.css" rel="stylesheet" type="text/css" />');
        //Append the DIV contents.
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();

        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            frame1.remove();
        }, 500);
    });

    $("#all-std-print").click(function (e) {
        e.preventDefault(); // prevent default form submit
        var contents = $("#result-std").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>Result Print</title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="'+base_url+'html_helper/css/style.css" rel="stylesheet" type="text/css" />');
        //Append the DIV contents.
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();

        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            frame1.remove();
        }, 500);
    });

    $(".quotas").on("change", function(e){
        var value = $(this).val();
        if(value == 'freedom') {
            $("#freedom-kota").attr('style', 'display:block');
            $("#staff-kota").attr('style', 'display:none');
        } else if(value == 'staff') {
            $("#freedom-kota").attr('style', 'display:none');
            $("#staff-kota").attr('style', 'display:block');
        } else {
            $("#freedom-kota").attr('style', 'display:none');
            $("#staff-kota").attr('style', 'display:none');
        }
    });

    $("#std_class").on("change", function(e){
        var value = $(this).val();

        if(value>8) {
            $("#std_subject_group").attr('style', 'display:block');
        } else {
            $("#std_subject_group").attr('style', 'display:none');
        }
    });

    $("#office-intime").removeAttr('disabled');
    $("#office-outtime").removeAttr('disabled');

    $('form.attend').on('submit', function(e) {
        e.preventDefault(); // prevent default form submit

        console.log($(this).attr('action'));

        $.ajax({
            url: $(this).attr('action'), // form action url
            type: 'POST', // form submit method get/post
            dataType: 'json', // request type html/json/xml
            data: $(this).serialize(), // serialize form data
            beforeSend: function() {
                console.log('অনুগ্রহপূর্বক অপেক্ষা করুন .....'); // change submit button text
                $("#office-intime").html('অনুগ্রহপূর্বক অপেক্ষা করুন ');
            },
            success: function(data) {
                if(data == 'inok') {
                    $("#office-intime").attr('style', 'background-color:green');
                    $("#office-intime").html('<i class="fa fa-check fa-lg"></i> অফিস ইন টাইম');
                    $("#office-intime").attr('disabled', 'true');
                }
            },
            error: function(e) {
                console.log(e)
            }
        });
    });

    //var form = $('.attend-out'); // contact form
    //var submit = $('#office-outtime');  // submit button
    $('form.attend-out').on('submit', function(e) {
        e.preventDefault(); // prevent default form submit

        console.log('out');

        $.ajax({
            url: $(this).attr('action'), // form action url
            type: 'POST', // form submit method get/post
            dataType: 'json', // request type html/json/xml
            data: $(this).serialize(), // serialize form data
            beforeSend: function() {
                console.log('অনুগ্রহপূর্বক অপেক্ষা করুন .....'); // change submit button text
                $("#office-outtime").html('অনুগ্রহপূর্বক অপেক্ষা করুন ');
            },
            success: function(data) {
                if(data == 'outok') {
                    $("#office-outtime").attr('style', 'background-color:green');
                    $("#office-outtime").html('<i class="fa fa-check fa-lg"></i> অফিস অাউট টাইম');
                    $("#office-outtime").attr('disabled', 'true');
                }
            },
            error: function(e) {
                console.log(e)
            }
        });
    });

    $('.cost-more').on('click', function(ex) {
        var total_row = parseInt($("#total-row").val())+1;
        $("#total-row").val(total_row);
        var now_row = $("#total-row").val();

        var txt = '';
        txt +='<tr id="row'+now_row+'">';
        txt +='<td><input id="cost_details" class="col col-12 font-size-text cost-text" type="text" value="" name="cost_details[]" placeholder="খরচের বিবরন"></td>';
        txt +='<td><input class="col col-12 font-size-text cost_price" type="text" value="0" name="cost_price[]" placeholder="দাম"></td>';
        txt += '<td><a class="cost-remove" id="'+now_row+'" href="javascript:void();"><i class="fa fa-minus fa-lg"></i></a></td>'
        txt +='</tr>';

        $("#add-result").append(txt);
    });

    $(".table-list").on('click', '.cost-remove', function(e) {
        var id = $(this).attr('id');
        $("#row"+id).empty();

        var total = 0;
        $('.cost_price').each(function(index){
            total += parseInt($(this).val());
        });
        $("#cost_total").val(total);
    });

    //$("#cost_total").on('click', function(e) {
    $(".table-list").on('keyup', '.cost_price', function(e) {
        if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
            this.value = this.value.replace(/[^0-9\.]/g, '');
        }

        var total = 0;
        $('.cost_price').each(function(index){
            total += parseInt($(this).val());
        });
        $("#cost_total").val(total);
    });

    //salary sheet
    $('.more-staff').on('click', function(ex) {
        //alert('s');
        var total_row = parseInt($("#total-row").val())+1;
        $("#total-row").val(total_row);
        var now_row = $("#total-row").val();

        var staff = $("#staff_id").html();
        var year = $("#year").html();
        var month = $("#month").html();
        var house_rent = $("#house_rent").html();
        //console.log(staff);
        var txt = '';
        txt +='<tr id="row'+now_row+'">';
        txt +='<td><select required="required" name="staff_id[]">'+staff+'</select></td>';
        txt +='<td><select required="required" name="year[]">'+year+'</select></td>';
        txt +='<td><select required="required" name="month[]">'+month+'</select></td>';

        txt +='<td><input required="required" name="basic_salary[]" id="basic_salary" class="col col-12 font-size-text input-box basic_salary" type="text" ></td>';
        txt +='<td><select required="required" name="house_rent[]">'+house_rent+'</select></td>';
        txt +='<td><input required="required" name="education_allowance[]" id="education_allowance" class="col col-12 font-size-text input-box education_allowance" type="text"></td>';
        //txt +='<td><input required="required" name="mahorgo_allowance[]" id="mahorgo_allowance" class="col col-12 font-size-text input-box mahorgo_allowance" type="text"></td>';

        txt +='<td><input required="required" name="provident_fund[]" id="provident_fund" class="col col-12 font-size-text input-box provident_fund" type="text"></td>';
        txt +='<td><input required="required" name="interest_deduct[]" id="interest_deduct" class="col col-12 font-size-text input-box2 interest_deduct" type="text"></td>';
        txt +='<td><input name="cheque_no[]" id="cheque_no" class="col col-12 font-size-text input-box2" type="text"></td>';
        txt +='<td><a class="staff-remove" id="'+now_row+'" href="javascript:void();"><i class="fa fa-minus fa-lg"></i></a></td>';
        txt +='</tr>';

        $("#add-staff").append(txt);
    });

    $(".table-list").on('click', '.staff-remove', function(e) {
        var id = $(this).attr('id');
        $("#row"+id).empty();
    });

    $(".table-list").on('keyup', '.basic_salary', function(e) {
        if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
            this.value = this.value.replace(/[^0-9\.]/g, '');
        }
    });
    $(".table-list").on('keyup', '.education_allowance', function(e) {
        if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
            this.value = this.value.replace(/[^0-9\.]/g, '');
        }
    });
    $(".table-list").on('keyup', '.provident_fund', function(e) {
        if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
            this.value = this.value.replace(/[^0-9\.]/g, '');
        }
    });

    $(".staff-delete").on('mouseover', function(e) {
        var id = $(this).attr('id');
        $("#delete"+id).show();
    });
    $(".staff-delete").on('mouseout', function(e) {
        var id = $(this).attr('id');
        $("#delete"+id).hide();
    });
    $(".remove-salary").on('click', function(ex){
        if(confirm("Are you confirm delete this entry?")) {
            return true;
        } else {
            return false;
        }
    });

    //make attend sheet
    $('.more-row').on('click', function(ex) {
        var total_row = parseInt($("#total-row").val())+1;
        $("#total-row").val(total_row);
        var now_row = $("#total-row").val();
        var std_class = $(".std_class").html();

        var subject_group = $(".subject_group").html();
        var std_group = $("#std_group").html();
        var shift = $("#shift").html();

        var year = $("#year").html();
        var month = $("#month").html();
        var day = $("#day").html();

        //console.log(staff);
        var txt = '';
        txt +='<tr id="row'+now_row+'">';
        txt +='<td><select  name="std_class[]" id="'+now_row+'" class="std_class">'+std_class+'</select>';

        txt +='<select name="subject_group[]" id="subject_group'+now_row+'" class="subject_group">'+subject_group+'</select></td>';
        txt +='<td><select name="std_group[]">'+std_group+'</select></td>';

        txt +='<td><select name="shift[]">'+shift+'</select></td>';
        txt +='<td><select name="year[]">'+year+'</select></td>';
        txt +='<td><select name="month[]">'+month+'</select>';
        txt +='<select name="day[]">'+day+'</select></td>';

        txt +='<td><input name="total_student[]" id="total_student-'+now_row+'" class="col col-12 font-size-text cost-text2 total_student" type="text" ></td>';
        txt +='<td><input name="attend[]" id="attend-'+now_row+'" class="col col-12 font-size-text cost-text2 attend" type="text"></td>';
        txt +='<td><input name="absent[]" id="absent-'+now_row+'" class="col col-12 font-size-text cost-text2 absent" type="text"></td>';
        txt +='<td><a class="std-remove" id="'+now_row+'" href="javascript:void();"><i class="fa fa-minus fa-lg"></i></a></td>';
        txt +='</tr>';

        $("#add-std").append(txt);
    });

    $(".table-list").on('change', '.std_class', function(e) {
        var id = $(this).attr('id');
        var value = $(this).val();
        if(value>8) {
            $("#subject_group" + id).show();
        } else {
            $("#subject_group" + id).hide();
        }
    });

    $(".table-list").on('keyup', '.total_student', function(e) {
        if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
            this.value = this.value.replace(/[^0-9\.]/g, '');
        }
    });

    $(".table-list").on('keyup', '.attend', function(e) {
        if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
            this.value = this.value.replace(/[^0-9\.]/g, '');
        }
    });

    $(".table-list").on('keyup', '.absent', function(e) {
        if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
            this.value = this.value.replace(/[^0-9\.]/g, '');
        }
    });

    $(".table-list").on('keyup', '.attend', function(ex) {
        var id = $(this).attr('id');
        console.log(id);
        var id_split = id.split('-');
        //alert(id_split[1]);
        var total_student = $("#total_student-"+id_split[1]).val();
        //alert(total_student)
        var attend = $("#attend-"+id_split[1]).val();

        var total = parseFloat(total_student-attend);
        $("#absent-"+id_split[1]).val(total);
    });

    $(".table-list").on('keyup', '.total_student', function(ex) {
        var id = $(this).attr('id');
        console.log(id);
        var id_split = id.split('-');
        //alert(id_split[1]);
        var total_student = $("#total_student-"+id_split[1]).val();
        //alert(total_student)
        var attend = $("#attend-"+id_split[1]).val();

        var total = parseFloat(total_student-attend);
        $("#absent-"+id_split[1]).val(total);
    });
});