var mobileMenuImages = ["Ele.png", "Param.png", "Alerts.png", "Settings.png"];
var isActive = true;


var pollingUriPath = window.location.pathname;
if (!pollingUriPath || pollingUriPath == "/") {
    var pollingUriName = "index.cgx"
} else {
    var pollingUriName = pollingUriPath.substr(pollingUriPath.lastIndexOf("/") + 1, pollingUriPath.lastIndexOf(".") - pollingUriPath.lastIndexOf("/")) + "cgx"
}

$(document).ready(function () {

    pollServer();
    $('#deskTopLeftbar').css('display', 'none');
    //var d = new Date();

    var pageTitle = $.fn.SetPageTitle(document.location.href);
    $("#selectedMobileElement").text(pageTitle);
    document.title = pageTitle;

   var iPAddress = window.location.hostname;
    $('#lstIpAddress').text(iPAddress);  
    $('#lstIpAddressMobile').text(iPAddress);


    if ($('.menuSmallDevices').css('display') == 'none') {
         
        $('#ListofElements').empty();
        var deskTopliToAddLeftBar = "";
              
        var liBuilt = false;

        liBuilt = buildLiThroughRootPages(deskTopliToAddLeftBar);
        if (!liBuilt)
        {
            buildLiThroughSubPages(deskTopliToAddLeftBar);
        }      

    }   

   if ($('.menuSmallDevices').css('display') == 'block') {
            
        $('#deskTopLeftbar > li').each(function (index, item) {
            
            var currentLi = $(this);

            var anchor = ($(this).children().eq(0));
            var textName = ($(anchor).text());
            var hashTag = ($(anchor).attr('href'));
            var liToAdd = '';

            if (currentLi.find('ul').length > 0) {
                liToAdd += '<li style="width:90%;margin-top:10%;" onclick="closeNav();"><a style="display:inline;" href="' + hashTag + '">' + textName + '</a><span class="pull-right" data-param1="' + hashTag + '" onclick="LoadChildrenMobile(this);closeNav();"><h3 style="display:inline;">+</h3></span></li>';
            }
            else {
                liToAdd += '<li style="width:90%;margin-top:10%;" onclick="closeNav();"><a style="display:inline;" href="' + hashTag + '">' + textName + '</a></li>';
            }
            $('.mobileList').append(liToAdd);             
        });

        $('.mobileList').append($('.closeIconSmallDevices li'));
        $('.mobileList').append($('.menuSmallDevices'));
        $('.mobileList').append($('#mobileCompanyName'));
              
       
        if (window.innerHeight > window.innerWidth) {
            $('#mobileCompanyName').css({ top: $("#mySidenav")[0].scrollHeight - 50, position: 'absolute' });
        }
        else {

            //$('#mobileCompanyName').css({ top: $("#mySidenav")[0].scrollHeight - 50, position: 'absolute' });
            $('#mobileCompanyName').css('margin-top', '15%');
        }
   }

    /* Function to get month name */
   $.fn.GetMonthName = function (monNumber) {
       var str = "";
       switch (monNumber) {
           case 0:
               str = "Jan";
               break;
           case 1:
               str = "Feb";
               break;
           case 2:
               str = "Mar";
               break;
           case 3:
               str = "Apr";
               break;
           case 4:
               str = "May";
               break;
           case 5:
               str = "Jun";
               break;
           case 6:
               str = "Jul";
               break;
           case 7:
               str = "Aug";
               break;
           case 8:
               str = "Sep";
               break;
           case 9:
               str = "Oct";
               break;
           case 10:
               str = "Nov";
               break;
           case 11:
               str = "Dec";
               break;
       }

       return str;
   }
  
    /* Function to open breadcrum for desktop */
   $("#spnBreadCrum").click(function (e) {

       handleSpanClick(e, $(divBreadCrum), '#divBreadCrum');

   });

    /* Function to open breadcrum for tablet */
   $("#spnBreadCrumTablet").click(function (e) {

       handleSpanClickMobile(e, $(divBreadCrumTablet), '#divBreadCrumTablet');
   });

    /* Function to open breadcrum for mobile */
   $("#spnBreadCrumMobile").click(function (e) {
       
       var $el = $("#divMenuDetails");
       if ($el.is(":visible")) {
           $("#OptionDiv").hide();
       }

       handleSpanClickMobile(e, $(divBreadCrumMobile), '#divBreadCrumMobile');
   });

   $(document).click(function () {


       if ($('.menuSmallDevices').css('display') == 'none') {
           var $el = $("#divBreadCrum");
           if ($el.is(":visible")) {
               $('#divBreadCrum').toggle("slow");
           }
       }

       if ($('.menuSmallDevices').css('display') == 'block') {
           var $el = $("#divBreadCrumTablet");
           if ($el.is(":visible")) {
               $('#divBreadCrumTablet').toggle("slow");
           }

           var $elMobile = $("#divBreadCrumMobile");
           if ($elMobile.is(":visible")) {
               $('#divBreadCrumMobile').toggle("slow");

               var clickedElement = event.target;
               var hashTag = ($(clickedElement).attr('data-param1'));

               var tblParameters = $('#tblParameters');
               var tblCalender = $('#tblCalender');


               var divMenuDetails = $('#divMenuDetails')

               if (divMenuDetails.is(":visible")) {
                   $("#OptionDiv").hide();
               }
               else if (tblParameters == undefined && tblCalender == undefined)
                   $("#OptionDiv").hide();


           }
       }
   });

});


var timeoutPolling = 1000;
var TIMEOUTPOLLING_SUCCESS = 1000;
var TIMEOUTPOLLING_ERROR = 10000;

function pollServer() {
    if (isActive) {
        window.setTimeout(function () {
            $.ajax({
                url: pollingUriPath + '?_=' + new Date().getTime(),
                type: "GET",
                async: true,
                timeout: 800,
                cache: false,
                headers: { 'If-Modified-Since': 'Sat, 1 Jan 2000 00:00:00 GMT' },
                success: function (result) {
					
					timeoutPolling = TIMEOUTPOLLING_SUCCESS;
					
                    //console.log(pollingUriPath + '?_=' + new Date().getTime());
                    //console.log("Status: Success");
                    $("#ConnectedIconDesktopDummy").hide();
                    $("#ConnectedIconDesktop").show();

                    $("#imgConnectedStatusMobileDummy").hide();
                    $("#imgConnectedStatusMobile").show();

                    var d = new Date();
                    $("#ConnectedIconDesktop").attr("src", "Conn.png");
                    $("#imgConnectedStatusMobile").attr("src", "Conn.png");
                    var seconds = d.getSeconds();


                    if (seconds < 10) {
                        seconds = ("0" + seconds.toString());
                    }
                    else {
                        seconds = seconds.toString();
                    }

                    $("#currentTime").text(d.getDate() + " " + $.fn.GetMonthName(d.getMonth()) + " " + d.getFullYear() + ", " + d.getHours() + ":" + d.getMinutes() + ":" + seconds);
                    $("#lastUpdatedTime").text(d.getDate() + " " + $.fn.GetMonthName(d.getMonth()) + " " + d.getFullYear() + ", " + d.getHours() + ":" + d.getMinutes() + ":" + seconds);


                    //SUCCESS LOGIC
                    pollServer();
                },
                error: function () {
					
					timeoutPolling = TIMEOUTPOLLING_ERROR;
					
                    //console.log(pollingUriPath + '?_=' + new Date().getTime());
                    //console.log("Status: Error");
                    $("#ConnectedIconDesktop").hide();
                    $("#ConnectedIconDesktopDummy").show();

                    $("#imgConnectedStatusMobileDummy").show();
                    $("#imgConnectedStatusMobile").hide();

                    //ERROR HANDLING
                    pollServer();
                }});
        }, timeoutPolling);
    }
}



$.fn.SetPageTitle = function (url) {
    var pageTitle = "";
    var startPos = document.location.href.lastIndexOf("/");
    var page = url.substring(startPos + 1, url.length);

    $("#deskTopLeftbar a").each(function (idx, item) {
        if ($(item).attr("href") == "#" || $(item).attr("href") == page) {
            pageTitle = $(item).text();
        }
    });

    return pageTitle;
}

/* Function to open mobile and tablet side menu */

function openNav() {   

   document.getElementById("mySidenav").style.width = "300px";
}

/* Function to close mobile and tablet side menu */
function closeNav() {
  
    document.getElementById("mySidenav").style.width = "0";    
}


/* Function that shows breadcrum */
function handleSpanClick(e, divBreadCrum, elementID) {
    var currentPageHref = window.location.pathname.split('/')[1];

    if (currentPageHref.length > 1 && currentPageHref.indexOf('#') > -1) {
        currentPageHref = currentPageHref.slice(0, -1);
    }

    $('#deskTopLeftbar > li').each(function (index, item) {
        var currentLi = $(this);
        if (currentLi.children().length >= 1) {

            var allAnchorEle = $(this).find('a');
            allAnchorEle.each(function (index, item) {
                var href = ($(item).attr('href'));

                if (href == "#") {
                    href = currentPageHref;
                    //alert(href)
                    divBreadCrum.empty();
                    divBreadCrum.append('<li style="z-index:1;padding:5px;"><a href="' + href + '">' + $(item).text() + '</a></li>');

                } else if (href == currentPageHref) {

                    divBreadCrum.empty();
                    var parentLi = $(item).parent();
                    var allParentLis = $(parentLi).parentsUntil('ul.menu').get().reverse();

                    $(allParentLis).each(function (index, item) {
                        if ($(item).is("li")) {
                            var anchorEle = $(this).find('a').first();
                            divBreadCrum.append('<li style="z-index:1;padding:5px;"><a href="' + $(anchorEle).attr('href') + '">' + $(anchorEle).text() + '</a></li>');
                            divBreadCrum.append('<li style="z-index:1;padding:5px;"><a>&#8595;</a></li>');
                        }
                    });

                    $(elementID + ' li:last').remove();
                }
            });
        }
    });

    e.stopPropagation();
    $(elementID).toggle("slow");
}


/* Function that shows breadcrum Mobile and Tablet */
function handleSpanClickMobile(e, divBreadCrum, elementID) {

    closeNav();

    var currentPageHref;

    if ($('#divMenuDetails').css('display') == 'block') {
        var ul = $('#ListofMenuElementsMobile');
        var li = $(ul).children().eq(0);
        var anchor = $(li).children().eq(0);
        //console.log(anchor);
        var href1 = $(anchor).attr('href');
        //alert($(anchor).attr('href'))
        var currentPageHref = href1;
      
    }
    else {
       //alert('in')
        var currentPageHref = window.location.pathname.split('/')[1];
    }

    //alert(currentPageHref)
    
    if (currentPageHref.length > 1 && currentPageHref.indexOf('#') > -1) {
        currentPageHref = currentPageHref.slice(0, -1);
    }

    $('#deskTopLeftbar > li').each(function (index, item) {
        var currentLi = $(this);
        if (currentLi.children().length >= 1) {

            var allAnchorEle = $(this).find('a');
            allAnchorEle.each(function (index, item) {

                var href = ($(item).attr('href'));
                var actualhref = href;
                //alert(actualhref)

                if (href == "#") {
                    href = currentPageHref;
                    //alert(href)
                    divBreadCrum.empty();
                    divBreadCrum.append('<li style="z-index:1;padding:5px;"><a data-param1="' + $(item).attr('href') + '" onclick="LoadSubmenuMobile(this);">' + $(item).text() + '</a></li>');

                } else if (href == currentPageHref) {

                    divBreadCrum.empty();
                    var parentLi = $(item).parent();
                    var allParentLis = $(parentLi).parentsUntil('ul.menu').get().reverse();

                    $(allParentLis).each(function (index, item) {
                        if ($(item).is("li")) {
                            var anchorEle = $(this).find('a').first();
                            divBreadCrum.append('<li style="z-index:1;padding:5px;"><a data-param1="' + $(anchorEle).attr('href') + '" onclick="LoadSubmenuMobile(this);">' + $(anchorEle).text() + '</a></li>');
                            divBreadCrum.append('<li style="z-index:1;padding:5px;"><a>&#8595;</a></li>');
                        }
                    });

                    $(elementID + ' li:last').remove();
                }
            });
        }
    });

    e.stopPropagation();
    $(elementID).toggle("slow");
}


function LoadPage(element)
{
    var hashTag = ($(element).attr('data-param1'));
    window.location.href = hashTag;
}

function buildLiThroughRootPages(deskTopliToAddLeftBar)
{
    var menuBuit = false;

    $('#deskTopLeftbar > li').each(function (index, item) {

        var circleType = 'greyCircle';
       
       // alert(index)
            var currentLi = $(this);
            if (currentLi.children().length > 0) {

                var allAnchorEle = $(this).find('a').first();
                allAnchorEle.each(function (index, item) {
                var href = ($(item).attr('href'));
                
                 //alert(href)
                if (href == "#") {

                    menuBuit = true;
                    circleType = "greenCircle";
                }
                if (currentLi.find('ul').length > 0) {
                    deskTopliToAddLeftBar += '<li><div data-param1="' + href + '" class="' + circleType + '" onclick="LoadPage(this);"></div> <a class="DeskTopLiElements" href="' + href + '">' + $(item).text() + '</a>  <span class="pull-right" style="font-weight:bold" data-param1="' + href + '" onclick="LoadChildren(this);"><h3 style="display:inline;">+</h3></span></li>'

                }
                else {
                    deskTopliToAddLeftBar += '<li><div data-param1="' + href + '" class="' + circleType + '" onclick="LoadPage(this);"></div> <a class="DeskTopLiElements" href="' + href + '">' + $(item).text() + '</a></li>'
               
                }              
                    
                });
            }       

    });

    if (!menuBuit) {
        $('#ListofElements').empty();
        deskTopliToAddLeftBar = "";
    }
    else {
        $('#ListofElements').append(deskTopliToAddLeftBar);
    }

    return menuBuit;

}

function buildLiThroughSubPages(deskTopliToAddLeftBar) {
     

    var menuBuilt = false;

    var currentPageHref = window.location.pathname.split('/')[1];
    if (currentPageHref.length > 1 && currentPageHref.indexOf('#') > -1) {
        currentPageHref = currentPageHref.slice(0, -1);
    }

    var menutoAdd = '';


    $('#deskTopLeftbar a').each(function (anchIndex, anch) {
        
        if (!menuBuilt) {
                   
            var anchHref = $(anch).attr('href');
          
            if (anchHref == currentPageHref) {
                menutoAdd = $(anch).text();   
                menuBuilt = true;              
            }

            if (menuBuilt)
            {
                var parentLi = $(anch).parent();               
                var parentUL = $(parentLi).parent();  
                var siblings = $(parentUL).children();              
               

                $(parentUL).children().each(function (idx, sibling) {
                   
                    var circleType = "greyCircle";
                    var anchorElement = $(sibling).children().eq(0);
                    if (menutoAdd == $(anchorElement).text())
                    {
                        circleType = "greenCircle";
                    }
                 
                    if ($(anchorElement).next().is('ul')) {
                        deskTopliToAddLeftBar += '<li><div data-param1="' + $(anchorElement).attr('href') + '" class="' + circleType + '"  onclick="LoadPage(this);"></div> <a class="DeskTopLiElements" href="' + $(anchorElement).attr('href') + '">' + $(anchorElement).text() + '</a>  <span class="pull-right" style="font-weight:bold" data-param1="' + $(anchorElement).attr('href') + '" onclick="LoadChildren(this);"><h3 style="display:inline;">+</h3></span></li>';

                    }
                    else {
                        deskTopliToAddLeftBar += '<li><div data-param1="' + $(anchorElement).attr('href') + '" class="' + circleType + '"  onclick="LoadPage(this);"></div> <a class="DeskTopLiElements" href="' + $(anchorElement).attr('href') + '">' + $(anchorElement).text() + '</a></li>';
                    }

                });
            }
           
        }

    });

    if (!menuBuilt) {
        $('#ListofElements').empty();
        deskTopliToAddLeftBar = "";
    }
    else {
        $('#ListofElements').append(deskTopliToAddLeftBar);
    }
}


function LoadChildren(element)
{
    var hashTag = ($(element).attr('data-param1'));
    var hashFound = false;
    var deskTopliToAddLeftBar = "";

    $('#deskTopLeftbar a').each(function (anchIndex, anch) {

        if(!hashFound)
        {
            var anchHref = $(anch).attr('href');

            if (anchHref == hashTag) {
                hashFound = true;
                
                if ($(anch).next().is('ul'))
                {
                    var childULElement = $(anch).next();
                    $(childULElement.children()).each(function (index,item) {
                        var li = $(item);
                        var anchorElement = $(li).children().eq(0);
                        if ($(anchorElement).next().is('ul')) {

                            deskTopliToAddLeftBar += '<li><div data-param1="' + $(anchorElement).attr('href') + '" class="greyCircle"  onclick="LoadPage(this);"></div> <a class="DeskTopLiElements" href="' + $(anchorElement).attr('href') + '">' + $(anchorElement).text() + '</a>  <span class="pull-right" style="font-weight:bold" data-param1="' + $(anchorElement).attr('href') + '" onclick="LoadChildren(this);"><h3 style="display:inline;">+</h3></span></li>';
                        }
                        else {
                            deskTopliToAddLeftBar += '<li><div data-param1="' + $(anchorElement).attr('href') + '" class="greyCircle"  onclick="LoadPage(this);"></div> <a class="DeskTopLiElements" href="' + $(anchorElement).attr('href') + '">' + $(anchorElement).text() + '</a></li>';
                        }
                    });
                }
            }
        }

    });

    if(hashFound)
    {
        $('#ListofElements').empty();
        $('#ListofElements').append(deskTopliToAddLeftBar);
    }

}

function LoadChildrenMobile(element) {
    var hashTag = ($(element).attr('data-param1'));
    var isRootPage = ($(element).attr('data-rootPage'));

    if (isRootPage == "true") {
        hashTag = "#";
    }

    var hashFound = false;
    var deskTopliToAddLeftBar = "";

    $('#deskTopLeftbar a').each(function (anchIndex, anch) {

        if (!hashFound) {
            var anchHref = $(anch).attr('href');

            if (anchHref == hashTag) {
                hashFound = true;

                $('#selectedMenuMobile').html($(anch).text());

                if ($(anch).next().is('ul')) {
                    var childULElement = $(anch).next();
                    $(childULElement.children()).each(function (index, item) {
                        var li = $(item);
                        var anchorElement = $(li).children().eq(0);
                        if ($(anchorElement).next().is('ul')) {

                            deskTopliToAddLeftBar += '<li><a style="margin-bottom: 5%; text-transform:uppercase;" class="MobileLiElements" href="' + $(anchorElement).attr('href') + '">' + $(anchorElement).text() + '</a>  <span class="pull-right" style="font-weight:bold;font-size:125%;" data-param1="' + $(anchorElement).attr('href') + '" onclick="LoadChildrenMobile(this);"><h3 style="display:inline;">+</h3></span></li>';
                        }
                        else {
                            deskTopliToAddLeftBar += '<li><a style="margin-bottom: 5%; text-transform:uppercase;" class="MobileLiElements" href="' + $(anchorElement).attr('href') + '">' + $(anchorElement).text() + '</a></li>';
                        }

                    });
                }
            }
        }

    });

    //console.log(deskTopliToAddLeftBar);

    if (hashFound) {
        $('#ListofMenuElementsMobile').empty();
        $('#ListofMenuElementsMobile').append(deskTopliToAddLeftBar);
        $('#divMenuDetails').show();
        $('#pageBody').hide();
        $("#OptionDiv").hide();
    }

}

function LoadSubmenuMobile(element)
{
    var deskTopliToAddLeftBar = '';
    var href = ($(element).attr('data-param1'));  
    $('#ListofMenuElementsMobile').empty();
    $('#pageBody').hide();

    var hashFound = false;
    $('#deskTopLeftbar a').each(function (anchIndex, anch) {

        if (!hashFound) {
            var anchHref = $(anch).attr('href');

            if (anchHref == href) {
                hashFound = true;
                $('#selectedMenuMobile').html($(anch).text());
                //alert($(anch).text())
                //$('#selectedMenuMobile').html($(anchHref).text());

                var parentLi = $(anch).parent();
                //console.log(parentLi);
                var parentUL = $(parentLi).parent();

                $(parentUL).children().each(function (index, item) {
                    var isRootPage = false;
                    var currentLi = $(item);
                    var anchorElement = $(item).children().eq(0);

                    var hashTag = $(anchorElement).attr('href');

                    if (($(anchorElement).attr('href')) == "#")
                    {
                        var currentPageHref = window.location.pathname.split('/')[1];
                        if (currentPageHref.length > 1 && currentPageHref.indexOf('#') > -1) {
                            currentPageHref = currentPageHref.slice(0, -1);
                        }

                        hashTag = currentPageHref;
                        isRootPage = true;
                    }

                    if ($(anchorElement).next().is('ul')) {
                       
                        if (isRootPage) {
                            deskTopliToAddLeftBar += '<li><a style="margin-bottom: 5%; text-transform:uppercase;" class="MobileLiElements" href="' + hashTag + '">' + $(anchorElement).text() + '</a>  <span class="pull-right" style="margin-left:10%;font-weight:bold" data-rootPage= "true" data-param1="' + hashTag + '" onclick="LoadChildrenMobile(this);"><h3 style="display:inline;">+</h3></span></li>';
                        }
                        else {
                            deskTopliToAddLeftBar += '<li><a style="margin-bottom: 5%; text-transform:uppercase;" class="MobileLiElements" href="' + hashTag + '">' + $(anchorElement).text() + '</a>  <span class="pull-right" style="margin-left:10%;font-weight:bold" data-param1="' + hashTag + '" onclick="LoadChildrenMobile(this);"><h3 style="display:inline;">+</h3></span></li>';
                        }
                    }
                    else {
                        deskTopliToAddLeftBar += '<li><a style="margin-bottom: 5%; text-transform:uppercase;" class="MobileLiElements" href="' + hashTag + '">' + $(anchorElement).text() + '</a></li>';
                    }
                });

            }
        }

    });


    $('#ListofMenuElementsMobile').append(deskTopliToAddLeftBar);
    $('#divMenuDetails').show();

    //if ($('#OptionDiv') != undefined && $('#OptionDiv') != null && $('#OptionDiv').css('display', 'block')) {
    //    $('#OptionDiv').css('display', 'none');
    //}
}