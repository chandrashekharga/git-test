define(["ko"], function(ko) {

    return {
		getBacklogs: function(pid,BacklogCollectionFunction) {
			$.getJSON("/api/projects/"+pid+"/backlogs/",function(data){
				BacklogCollectionFunction(data);
			})
		}
	}
});
