({
    doInit: function(component,event,helper){
       
     var selectedlist = component.find("myselect").get("v.value");
     component.set("v.selectlist",selectedlist);
     
     helper.myAction(component, event, helper);
 },
    
    onChangeMySelect : function(component,event,helper){
        var selectedlist = component.find("myselect").get("v.value");
        
        
        console.log("got the selectedlist"+selectedlist);
        //   var AssignmentListEvent = component.getEvent("AssignmentListEvent");
        var AssignE = $A.get("e.c:AssignmentListEvent");
        AssignE.setParams({"selectedlist": selectedlist});
        AssignE.fire();  
        //   alert("Event Fired");
    }  
})


HELPER ___________________________________________________

({  
     myAction : function(component, event, helper) {
        
        var action = component.get("c.getUserTeamByTeam");
        action.setCallback(this, $A.getCallback(function(response){
            var state= response.getState();
            var result = response.getReturnValue();    
            if(state=="SUCCESS"){
                if(result == 'The Montreal Team')
                {
                    component.set("v.TeamName",'Montreal');
                    component.set("v.MontrealView",true);
                }
                else if(result == 'Ottawa Team')
                {
                    component.set("v.TeamName",'Ottawa');
                    component.set("v.OttawaView",true);
                }
                else if(result == 'Toronto Team')
                {
                    component.set("v.TeamName",'Toronto');
                    component.set("v.TorontoView",true);
                }
                else if(result == 'Leaders')
                {
                    component.set("v.TorontoView",true);
                    component.set("v.MontrealView",true);
                    component.set("v.OttawaView",true);
                }
                
            }else if (state=="ERROR"){
                var errors = response.getError();
                console.error(errors);
            }
            
            
            
        } ));
        $A.enqueueAction(action);
    
    
    
},
