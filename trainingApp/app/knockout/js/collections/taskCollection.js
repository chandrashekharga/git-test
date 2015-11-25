define(["ko"], function(ko) {

    return {
		getTasks: function(pid,bid,TaskCollectionFunction) {
			$.getJSON("/api/projects/"+pid+"/backlogs/"+bid+"/tasks",function(data){
				TaskCollectionFunction(data);
			})
		}
	}
});
