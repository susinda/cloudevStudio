/**
 * Created by kavith on 7/31/14.
 */
var editorItemCounter = 0;
var count = 0;
var lastItem= null;
var dataString = null;
var CurElement = null;
var id = null;
var CurElementisSource =null;
var CurElementisTarget = null;
var x =0; var y=0;
jsPlumb.bind("ready", function () {
    initJsPlumb($("#jsPlumbContainer"));
});



function selectDeleteFunction() {
//alert("selectDeleteFunction");
  if (CurElement != null)
   CurElement.removeClass('selected'); //deselect old
 
  CurElement = $(this);
  id = $(this).attr('id');
  CurElement.addClass('selected'); //select new      
}




function initJsPlumb(container) {
    jsPlumb.setContainer(container);
//    jsPlumb.draggable($(".draggable"), {
//        containment:$("#jsPlumbContainer")
//    });
}

$(document).ready(function () {

var logMediator = document.registerElement('wso2-log', {
prototype: Object.create(HTMLDivElement.prototype) }); 


    $(".draggableIcon").draggable({
        helper: 'clone',
        containment: 'jsPlumbContainer',
        cursor: 'move',
        zIndex: 1000,
        //When first dragged
        stop: function (ev, ui) {
//            var pos = $(ui.helper).offset();
//
//            var type = $(this).attr("id");
//            var objName = "#" + type + editorItemCounter;
//
//            $(objName).removeClass("draggableIcon");
//            $(objName).removeClass("ui-draggable");
//            $(objName).addClass("draggable")
//
//            $(objName).draggable({
//                containment: 'jsPlumbContainerWrapper',
//                stop: function (ev, ui) {
//                    var pos = $(ui.helper).offset();
//                    console.log($(this).attr("id"));
//                    console.log(pos.left);
//                    console.log(pos.top);
//                }
//            });
        }
    });
    //Make element droppable
    $("#jsPlumbContainer").droppable({
        drop: function (ev, ui) {

	x= x + 100;y=y  + 200;
            if ($(ui.draggable).attr('id').search(/dragged/) == -1) {
                editorItemCounter++;

                var element = $(ui.draggable).clone();
                var type = element.attr('id');
                var objName = "dragged" +type+ editorItemCounter;

        	var newPosX =  $(this).offset().left;
        	var newPosY =  $(this).offset().top;
		alert(newPosX+"..and .."+newPosY);
		element.css({'top':x, 'left' : y });
                element.attr('id', objName);
                element.removeClass("draggableIcon");
                element.removeClass("ui-draggable");		
                element.addClass("draggable");
                element.click(selectDeleteFunction); //since this makes troubles
		element.dblclick(openPopup);
		
		setData(element, type);
                //element.data('jsonConfig', dataString);

                element.addClass("wso2log_style");
                $(this).append(element);
                jsPlumb.draggable(objName, {
                    containment: $("#jsPlumbContainer")
                });
                if(lastItem == null){
                    lastItem = $("#"+objName);
                }else{
                    jsPlumb.connect({
                        source:lastItem,
                        target:$("#"+objName),
                        anchors:["Right", "Left" ]
                    });
                }
                lastItem = $("#"+objName);
            }
        },
		tolerance: "pointer" 
			
    });


});


$(document).keydown(function(e) {
         //alert(e.which); //run to find the keycode of the key you want, don't use backspace, that is used to go back in browser history
         if (e.keyCode == 46  && CurElement != null)
         {    var connectionList = jsPlumb.getAllConnections(id);
               
		for (var key in connectionList){
			//alert("Iterating :")
    			if(connectionList[key].sourceId==CurElement.attr('id')){ CurElementisSource =connectionList[key].targetId }
			if(connectionList[key].targetId==CurElement.attr('id')){ CurElementisTarget =connectionList[key].sourceId }
			//alert(i +" and "+ l);
		}		
		
		jsPlumb.detachAllConnections(id);
		CurElement.remove();
               
		
	      if(CurElementisTarget!= null && CurElementisSource!=null )
	      { jsPlumb.connect({source:CurElementisTarget, target:CurElementisSource,  anchors:["Right", "Left" ]});}
		
               CurElement = null; //clear, that element doesn't exist anymore
         }
});

