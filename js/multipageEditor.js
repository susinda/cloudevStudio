
var editorItemCounter = 0;
var currentId= null;
var count = 0;
var counter = 0;
var lastItem= null;
var lastItem1= null;
var dataString = null;
var CurElement = null;
var id = null;
var over = "false";
var CurElementisSource =null;
var CurElementisTarget = null;
var x =170; var x1 =170; var CurY = null;var divwidth = 200;var x3=60; var x5 = 120;
var elemSourceLocList = [];
var elemTargetLocList = [];
var elemSourceId = [];
var elemTargetId = [];
var elemSourceLocList1 = [];
var elemTargetLocList1 = [];
var elemSourceId1 = [];
var elemTargetId1 = [];
var elemSource = null;
var elemTarget = null;
var xSpace =0; var a =0;
var currentPopup = null;
var x2js = null;


$(document).ready(function () {

	x2js = new X2JS();
    registerTabChangeEvent();
    registerMouseAndKeyEvents();
    registerJsPlumbBind();
    jsplumbHandleDraggable();
    jsplumbHandleDropable();

});



function initJsPlumb(container) {
	jsPlumb.setContainer(container);
}


function setUpdatedDataCallBack(obj) {
	var strID = CurElement.attr('id');
	var divMediator = document.getElementById(strID);
	$(divMediator).data('jsonConfig', obj);
	currentPopup.dialog("close");
}


function openMediatorConfigDialog(path, title){
      if(a==0){
          $(document.body).append('<div id="logMpopup"></div>');
          $("#logMpopup").attr('id', "logMpopup");
          $("#logMpopup").load(path);
          $("#logMpopup").dialog({ autoOpen: false,
                         bgiframe: true,
                         height: 400,
                         width: 600,
                         modal: false,
                         draggable: true,
                         resizable: true,
                         position: 'center' });
          $("#logMpopup").dialog('option', 'title', title);
          currentPopup = $("#logMpopup");
          ++a;
      }
      currentPopup.dialog("open");
}



function registerMouseAndKeyEvents() {

	$(document).on('mouseenter','#jsPlumbContainerWrapper11',function() {
		currentId = $(this).attr('id'); //alert(currentId);
	     over="true";console.log(over);

	});

	$(document).on('mouseleave','#jsPlumbContainerWrapper11',function() {
	    over="false";console.log(over);

	});

	$(document).mousemove(function(e){// to get the cursor point to drop an icon
    		                      CurY= e.pageX;
    		                   });

    $(document).keydown(function(e) {
            designViewKeyDown(e);
    });

}


function registerTabChangeEvent() {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
          console.log('tabChagne');
         var tabName = $(e.target).html();
         if ( tabName == 'Source') {
            activateSourceView();
         } else {
            activateDesignView();
         }
    });
}

function registerJsPlumbBind() {
    jsPlumb.bind("ready", function () {
    	initJsPlumb($("#jsPlumbContainer"));
    });
}



function activateSourceView() {

    console.log('activateSourceView');
    var prevElement = null;
    var nextElement = null;
    var connectionList = jsPlumb.getAllConnections();

    $('#sourceEditorTextBox').val('<sequence name="sample_sequence">');

    for (var key in connectionList){

	if(connectionList[key].sourceId != null){
	  prevElement = document.getElementById(connectionList[key].sourceId);
	}
	if(connectionList[key].targetId != null){
	     nextElement = document.getElementById(connectionList[key].targetId);
	}

	var jObj = $(prevElement).data('jsonConfig');
	console.log(prevElement);
	console.log('serializing ' + jObj);
	console.log(jObj);
	var xmlElement = '\n' + x2js.json2xml_str(jObj);
	var currentText = $('#sourceEditorTextBox').val();
	$('#sourceEditorTextBox').val(currentText + xmlElement);
     }

    var jObj = $(nextElement).data('jsonConfig');
    console.log('serializing ' + jObj);
    console.log(jObj);
    var xmlElement = '\n' + x2js.json2xml_str(jObj);
    var currentText = $('#sourceEditorTextBox').val() ;
    $('#sourceEditorTextBox').val(currentText + xmlElement + '\n</sequence>');
}



function activateDesignView() {
   console.log('activateDesignView');
   var sequenceObj = x2js.xml_str2json($("#sourceEditorTextBox").val());
   var sequence = sequenceObj.sequence;
   var logArray = sequence.log;
   console.log(logArray);

   $("#jsPlumbContainer").empty();
   var prevDivElement = null;
   for (var i=0; i<logArray.length; i++) {
       console.log(logArray[i]);
       var currentDiv = AddDiv(logArray[i]);
       if (prevDivElement != null ) {
         connectDivs(prevDivElement, currentDiv);
       }
       prevDivElement = currentDiv;
   }

}






