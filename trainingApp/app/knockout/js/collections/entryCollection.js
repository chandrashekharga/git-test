define(["ko"], function(ko) {

    return {
		getEntries: function(pid,bid,tid,EntryCollectionFunction) {
			$.getJSON("/api/projects/"+pid+"/backlogs/"+bid+"/tasks/"+tid+"/entries",function(data){
				EntryCollectionFunction(data);
			})
		}
	}
});
