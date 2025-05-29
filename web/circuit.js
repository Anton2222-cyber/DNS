        /* Page specific scripts comes here */       
        var totalGraphsPlotted = 0;
        var availableColors = ["Orange", "LightBlue", "Brown", "Purple", "Red"];
        var plottedColors = [];
        var options;
        var dataset = [];
        var addressDetails = []
        var updateInterval = 1000;
        var i = 0;
        //to add
        var setTimeOutfunctionCall;

        var availableVariables = [];

/* new code */
        var addedAddress = [];
        var addedVariableNames = [];

		 /* page load code */
		
        $(document).ready(function () {

           


            //window.setInterval(DisplayRandomValues, 1000);
                       
            $('#lstVariables .ButtonOne button').each(function (index, item) {
                $(this).html('Submit');
                if ($('#divLeftpart').css('display') == 'block')
                    $(this).css('margin-left', '-1%');
            });

           

            if ($('#divMobileRecognizer').css('display') == 'block') {
                
                $('#lstMobilevariablesList').append($('#lstVariables').children());

                //$('#lstMobilevariablesList').append('<tr style="visibility:hidden" class="ButtonOne Dummy"> <td style="max-width:25%"><span>Dummy</span></td>   <td style="max-width:2%"></td> <td style="max-width:60%"><button style="width:85px;height:40px;" type="button">Submit</button></td> </tr>');

                $('#lstMobilevariablesList .ButtonOne button').each(function (index, item) {
                    $(this).html('Submit');                   
                });               

                $("#mobileVariablesList").show();
                $("#mobileGraphPlot").hide();

                if (dataset.length > 0) {
                    dataset = [];
                    addedAddress = [];
                    plottedColors = [];
                    addedVariableNames = [];
                    options.yaxis = [];
                    $('#mobileVariables').val("");
                    $('#listOfAddedvariablesMobile').empty();
                    totalGraphsPlotted = 0;
                    $('#ulAutoCompleteListMobile').empty();
                    //clearTimeout(setTimeOutfunctionCall);

                }
            }
            

            var className = 'rowGraph';
            var allSpanElements = $('.' + className + ' span');
            var allTextElements = $('.' + className + ' input[type=text]');

            addressDetails = [];

            allTextElements.each(function (index, item) {
                var item = { Name: allSpanElements[index].outerText, id: (item).id }                
                addressDetails.push(item);
            });

            availableVariables = [];
            allSpanElements.each(function (index, item) {
                availableVariables.push(item.outerText)
            });
         

            $('.ReadWriteBox').each(function(index,item)
            {
                  
                $(this).val($(this).next().children().eq(1).val());
                $(this).next().children().eq(2).val($(this).next().children().eq(1).val());              
                $(this).keypress(handleKeyPressReadWrite);
                $(this).blur(handleBlurReadWrite);
            });

            window.setInterval(HandlePlcTextBoxValueChange, 1000);

           
            //$('#selectedMobileElement').text('Appication Elements');

            /* Handle modal close  */
            $('#myModal').on('hidden.bs.modal', function () {
                dataset = [];
                addedAddress = [];
                addedVariableNames = [];
                plottedColors = [];
                options.yaxis = [];
                $('#variables').val("");
                totalGraphsPlotted = 0;
                //clearTimeout(setTimeOutfunctionCall);
                $('#addedVariablesList .tempRow').empty();
                $('#ulAutoCompleteList').empty();
            });    
         
        });
 

        /* Function to handle window resize*/
        $(window).resize(function () {

            if ($(window).width() > 600 && $(window).width() < 1280 && $('#spnBreadCrumTablet').css('display', 'block')) {
                var rowCount = $('#lstVariables tr').length;
                if (rowCount == 0) {
                    $('.Dummy').remove();
                    $('#lstVariables').append($('.ReadOnlytext'));
                    $('#lstVariables').append($('.ReadWrite'));
                    $('#lstVariables').append($('.ButtonOne'));
                    $('#lstVariables').append($('.ImgBool'));
                }
            }


            if ($(window).width() <= 600 && $('#spnBreadCrumMobile').css('display', 'block')) {

                var rowCount = $('#lstMobilevariablesList tr').length;
                if (rowCount == 0) {
                    $('.Dummy').remove();
                    $('#lstMobilevariablesList').append($('.ReadOnlytext'));
                    $('#lstMobilevariablesList').append($('.ReadWrite'));
                    $('#lstMobilevariablesList').append($('.ButtonOne'));
                    $('#lstMobilevariablesList').append($('.ImgBool'));
                   // $('#lstMobilevariablesList').append('<tr style="visibility:hidden" class="ButtonOne Dummy"> <td style="max-width:25%"><span>Dummy</span></td>   <td style="max-width:2%"></td> <td style="max-width:60%"><button style="width:85px;height:40px;" type="button">Submit</button></td> </tr>');
                }
            }


        });

         /* Function to show the auto complete list of variables in desktop*/
        function ShowAutoCompleteList() {
            var inputValue = $("#variables").val().toLowerCase();
            liToAdd = '';
            $('#ulAutoCompleteList').empty();

            if (inputValue.trim() == '') {
                $('#trAutoCompleteList').hide();
                return;
            }

            var liToAdd = '';

            $.each(availableVariables, function (index, value) {

                if (value.toLowerCase().substr(0, inputValue.length) == inputValue) {
                    liToAdd += '<li  onclick="FillTextBox(this);" data-param1="' + value + '" style="cursor:pointer;padding:2%;width:170px;">' + value + '</li>';
                }
            });

            if (liToAdd != '') {
                $('#ulAutoCompleteList').append(liToAdd);
                $('#trAutoCompleteList').show();
            } else {
                $('#trAutoCompleteList').hide();
            }
        }

        /* Function to show the auto complete list of variables in mobile*/
        function ShowAutoCompleteListMobile() {
            var inputValue = $("#mobileVariables").val().toLowerCase();
            liToAdd = '';
            $('#ulAutoCompleteListMobile').empty();

            if (inputValue.trim() == '') {
                $('#trAutoCompleteListMobile').hide();
                return;
            }

            var liToAdd = '';

            $.each(availableVariables, function (index, value) {

                if (value.toLowerCase().substr(0, inputValue.length) == inputValue) {
                    liToAdd += '<li  onclick="FillTextBoxMobile(this);" data-param1="' + value + '" style="cursor:pointer;text-align:left;padding:2%;">' + value + '</li>';
                }
            });

            if (liToAdd != '') {
                $('#ulAutoCompleteListMobile').append(liToAdd);
                $('#trAutoCompleteListMobile').show();
            } else {
                $('#trAutoCompleteListMobile').hide();
            }
        }

        /* Function to show the selected variable name in textbox*/
        function FillTextBox(element) {
            $("#variables").val(($(element).attr('data-param1')));
            $('#trAutoCompleteList').hide();
        }

/* Function to show the selected variable name in textbox*/
        function FillTextBoxMobile(element) {
            $("#mobileVariables").val(($(element).attr('data-param1')));
            $('#trAutoCompleteListMobile').hide();
        }

        /* Function to display random values in read onlyin textbox*/
        var DisplayRandomValues = function () {
                       
            $('#lstVariables  input[type=text]').each(function (index, item) {
                $(item).val(Math.random() * 100);
            });

            $('#lstMobilevariablesList  input[type=text]').each(function (index, item) {
                $(item).val(Math.random() * 100);
            });      
      
        }


        /* Function to handle PLC textbox change*/
        var HandlePlcTextBoxValueChange = function () {
                       
            $('.ActualReadWriteBox').each(function (index, item) {

                var plcValu = $(this).children().eq(1).val();
                var hiddenTextBoxValue = $(this).children().eq(2).val();
               // console.log(plcValu);
               // console.log(hiddenTextBoxValue);

                if (plcValu.trim() != hiddenTextBoxValue.trim()) {
                    $(this).children().eq(2).val(plcValu);
                    $(this).parent().children().eq(0).val(plcValu)
                }

            });

        }

        /* Function to handle Read write textbox enter click*/
        function handleKeyPressReadWrite(event)
        {
            event = (event) ? event : window.event;
            var charCode = (event.which) ? event.which : event.keyCode;
            if (charCode > 31 && (charCode < 44 || charCode > 57)) {
                return false;
            }
           
            if (event.which == 13) {
               
                var enteredValue = $(this).val();
                if (enteredValue.trim() == "" || enteredValue == null || enteredValue == undefined) {
                    alert('Please enter a valid value');
                    return;
                }

                var valuein = $(this).next().children().eq(1).val();              
                $(this).next().children().eq(1).val($(this).val());               
                $(this).next().children().eq(1).blur();               
                event.preventDefault();
            }
        }

        /* Function to handle Read write textbox blur click*/
        function handleBlurReadWrite(event) {


            var currentValue = $(this).val();
            if (currentValue.trim() != "" || currentValue != null || currentValue != undefined) {
                var valuein = $(this).next().children().eq(1).val();
                $(this).next().children().eq(1).val($(this).val());
                $(this).next().children().eq(1).blur();
                event.preventDefault();
            }
        }


         /* Handle view graph click  */
        function updateElementName(e) {
                       
            var color;           

           // console.log(plottedColors);

            var selectedlistItem = ($(e).parent().parent());
            var variablename = selectedlistItem.find("span:first-child").text();
            var textDetails = selectedlistItem.find("input[type='text']");     

            $('#spnApplicationElement').html($('#elementName').html());

            //to add
            var clickedVariableName = $(e).attr('name');
           
            //console.log(variablename);         
            
            var found = $.inArray($(textDetails).attr('id'), addedAddress) > -1;
            if (!found)
            {
                addedAddress.push($(textDetails).attr('id'));
                addedVariableNames.push(variablename);

                for (i = 0 ; i < availableColors.length; i++) {
                    color = availableColors[i];
                    //alert(color);
                    var colorFound = $.inArray(color, plottedColors) > -1;
                    //alert(colorFound);
                    if (!colorFound) {
                        plottedColors.push(color);
                        break;
                    }
                }

                var div = getRowToAdd(variablename, $(textDetails).attr('id'), color);
                $('#addedVariablesList').append(div);

            }

            //NOW GET DATA
            getData();           
         

            $.plot($("#flotcontainer"), dataset, options);

            totalGraphsPlotted = totalGraphsPlotted + 1;

            update();

        }

		 /* Get live data of variables  */
        function getData() {

            options = {
                series: {
                    lines: {
                        show: true,
                        lineWidth: 1.2,
                        fill: false
                    }
                },
                xaxis: {
                    mode: "time",
                    tickSize: [2, "second"],
                    tickFormatter: function (v, axis) {
                        var date = new Date(v);

                        if (date.getSeconds() % 4 == 0) {
                            var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                            var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                            var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

                            return hours + ":" + minutes + ":" + seconds + "    ";
                        } else {
                            return "";
                        }
                    },
                    axisLabel: "Time",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 10
                },
                yaxis: [],
                legend: {
                    show: false,labelBoxBorderColor: "#fff"
                }
            };         
            
            options.colors = plottedColors;
            /* new code*/           
            now = new Date().getTime();
            for (i = 0; i < addedAddress.length; i++) {
                              
                var y = $('#' + addedAddress[i]).val();                
                var temp = [now += updateInterval, y];

                var data = [];
                if (dataset[i] === undefined) {
                    //alert('undefined');
                    data = [];
                }
                else {
                    //alert('defined');
                    data = dataset[i].data;
                }

                data.push(temp);

                if ($('#ElementDetails').css('display') == 'none') {
                    if (data.length % 10 == 0)
                    {
                        data.shift();
                    }
                }
                else if (data.length % 15 == 0)
                {
                    data.shift();
                }                

                var yValues = [];                
                for (k = 0; k < data.length; k++) {
                    var singleArray = data[k];
                    yValues.push(singleArray[1]);
                }

                var maxNumber = Math.max.apply(null, yValues);
                var minNumber = Math.min.apply(null, yValues);
                              

                var y = {
                    min: minNumber,
                    max: maxNumber,
                    tickSize: 5,
                    tickFormatter: function (v, axis) {
                        if (v % 10 == 0) {
                            return v + "%";
                        } else {
                            return "";
                        }
                    },
                    axisLabel: "Value",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 6
                    
                }

                if (dataset.length > 1) {
                    y.position = "right";
                }

                options.yaxis.push(y);
               
                var objectToAdd;
                
                if (dataset.length <= 1) {
                   
                    objectToAdd = { label: addedVariableNames[i], data: data };
                } else
                {
                   
                    objectToAdd = { label: addedVariableNames[i], data: data, yaxis: i + 1 };
                }

                dataset[i] = objectToAdd;
            }          

        }

        function update() {

            getData();                   

            if ($('#ElementDetails').css('display') == 'none') {
                
                $.plot($("#flotcontainerMobile"), dataset, options)
            }
            else {
                
                $.plot($("#flotcontainer"), dataset, options)
            }
            setTimeOutfunctionCall = setTimeout(update, updateInterval);
        }

         /* Handle auto complete add of variable and plot its graph  */
        function AddVariableToPage(event) {
                      

            var selectedVariableName;
            if ($('#ElementDetails').css('display') == 'none') {
                selectedVariableName = $('#mobileVariables').val();
            }
            else {
                selectedVariableName = $('#variables').val();
            }


            if (selectedVariableName.trim() == "" || selectedVariableName == null || selectedVariableName == undefined)
            {
                alert('Please select a valid variable to add');
                if ($('#ElementDetails').css('display') == 'none') {
                    selectedVariableName = $('#mobileVariables').val('');
                }
                else {
                    selectedVariableName = $('#variables').val('');
                }
                return;
            }

            var varfound = $.inArray(selectedVariableName, addedVariableNames) > -1;
            if (varfound) {
                alert('Cannot add ' + selectedVariableName + ' again.');
                if ($('#ElementDetails').css('display') == 'none') {
                    selectedVariableName = $('#mobileVariables').val('');
                }
                else {
                    selectedVariableName = $('#variables').val('');
                }
                return;
            }

            var avaliablefound = $.inArray(selectedVariableName, availableVariables) > -1;
            if (!avaliablefound) {
                alert('Cannot add ' + selectedVariableName + ' . Invalid variable. ');
                if ($('#ElementDetails').css('display') == 'none') {
                    selectedVariableName = $('#mobileVariables').val('');
                }
                else {
                    selectedVariableName = $('#variables').val('');
                }
                return;
            }

            if ($('#ElementDetails').css('display') == 'none') {
                if (totalGraphsPlotted == 2) {
                    $('#mobileVariables').val('');
                    alert('Cannot plot more than 2 graphs!!!');
                    return;
                }
            }
            else {
                if (totalGraphsPlotted == 5) {
                    $('#variables').val('');
                    alert('Cannot plot more than 5 graphs!!!');
                    return;
                }
            }
           

            var textBoxId;
            var color;

            for(i =0; i< addressDetails.length; i++)
            {                
                if (addressDetails[i].Name == selectedVariableName)
                {                   
                    var found = $.inArray(addressDetails[i].id, addedAddress) > -1;
                    if (!found) {
                        textBoxId = addressDetails[i].id;
                        addedAddress.push(addressDetails[i].id);
                        addedVariableNames.push(selectedVariableName);
                        totalGraphsPlotted = totalGraphsPlotted + 1;

                        for (i = 0 ; i < availableColors.length; i++) {
                            color = availableColors[i];
                            //alert(color);
                            var colorFound = $.inArray(color, plottedColors) > -1;
                            //alert(colorFound);
                            if (!colorFound) {
                                plottedColors.push(color);
                                break;
                            }
                        }
                    }                    
                }
            }
           
            var div;

            if ($('#ElementDetails').css('display') == 'none') {
                div = getRowToAddForMobile(selectedVariableName, textBoxId, color);
                $('#listOfAddedvariablesMobile').append(div);
            }
            else {
                div = getRowToAdd(selectedVariableName, textBoxId, color);
                $('#addedVariablesList').append(div);
            }
           
            if ($('#ElementDetails').css('display') == 'none') {
                $('#mobileVariables').val('');
            }
            else {
               $('#variables').val('');
            }
        }

		  /* Handle Delete variable click and stop plotting its graph  */
        function removeVariableRow(e) {

                var found = $.inArray($(e).attr('name'), addedAddress) > -1;
                if (found) {
                    var indexPosition = addedAddress.indexOf($(e).attr('name'));
                    if (indexPosition != -1) {

                        var result = confirm("Are you sure you want to delete " + addedVariableNames[indexPosition] + "?");
                        if (result) {
                            addedAddress.splice(indexPosition, 1);
                            addedVariableNames.splice(indexPosition, 1);
                            plottedColors.splice(indexPosition, 1);
                            dataset.splice(indexPosition, 1);
                            options.yaxis.splice(indexPosition, 1);
                            $(e).parent().parent().remove();
                            totalGraphsPlotted = totalGraphsPlotted - 1;
                        }
                    }

                }              
            
           }

        function getRowToAdd(varName , textBoxId, color)
        {          

            var tr = '<tr class="tempRow"><td style="width:80%;padding:5px;"><div style="height:25px;width:25px;background-color:dummyColor;display:inline-block;"></div> &nbsp;&nbsp; Variablename'
                   + '</td><td style="width:20%;padding:5px;"><input type="image" name="dummyName" src="Close.png" style="width:15px;height:15px;" id="AddImage"'
                   + 'alt="Remove variable" onclick="removeVariableRow(this);" /></td></tr>'

            tr = (tr.replace('Variablename', varName));
            tr = (tr.replace('dummyName', textBoxId));
            tr = (tr.replace('dummyColor', color));
            return tr;
        }

		 /* Show graph in mobile  */
        function displayMobileGraph(e)
        {
            $('#mobileVariablesList').css('display', 'none');
            $('#mobileGraphPlot').show();

            var selectedlistItem = ($(e).parent().parent());
            var variablename = selectedlistItem.find("span:first-child").text();
            var textDetails = selectedlistItem.find("input[type='text']");

            //console.log(variablename);
            //console.log(textDetails);
            var color;
            var found = $.inArray($(textDetails).attr('id'), addedAddress) > -1;
            
            if (!found) {
                addedAddress.push($(textDetails).attr('id'));
                addedVariableNames.push(variablename);

                for (i = 0 ; i < availableColors.length; i++) {
                    color = availableColors[i];
                    //alert(color);
                    var colorFound = $.inArray(color, plottedColors) > -1;
                    //alert(colorFound);
                    if (!colorFound) {
                        plottedColors.push(color);
                        break;
                    }
                }

                var div = getRowToAddForMobile(variablename, $(textDetails).attr('id'), color);
                $('#listOfAddedvariablesMobile').append(div);
            }
           
            getData();

            $.plot($("#flotcontainerMobile"), dataset, options);

            totalGraphsPlotted = totalGraphsPlotted + 1;    
            update();
        }

        /* Function to get row to add of the selected variable*/
        function getRowToAddForMobile(varName , textBoxId, color)
        {
                     
            var tr = '<tr> <td style="width:2%;"> <div style="height:12px;width:12px;background-color:dummyColor;display:inline-block;"></div></td>'
                   + '<td style="width:40%;">Variablename</td>'
                 + '<td style="width:20%;"><input type="image" name="dummyName" src="Close.png" style="width:12px;height:12px;" id="AddImage" alt="Remove variable" onclick="removeVariableRow(this);" /></td></tr>'

            tr = (tr.replace('Variablename', varName));
            tr = (tr.replace('dummyName', textBoxId));
            tr = (tr.replace('dummyColor', color));          

            return tr;
        }

        /* Function to hide mobile graph*/
        function HideMobileGraph()
        {
            $('#mobileGraphPlot').hide();
            if (dataset.length > 0) {
                dataset = [];
                addedAddress = [];
                plottedColors = [];
                addedVariableNames = [];
                options.yaxis = [];
                $('#mobileVariables').val("");
                $('#listOfAddedvariablesMobile').empty();
                totalGraphsPlotted = 0;
                //clearTimeout(setTimeOutfunctionCall);

            }
            $('#mobileVariablesList').css('display', 'block');
        }



        /* End of page specific scripts */

      
