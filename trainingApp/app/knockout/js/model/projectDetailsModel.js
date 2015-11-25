define(["ko"], function(ko) {

    return {
		getProjectDetail: function(pid,ProjectCollectionFunction) {
			$.getJSON("/api/projects/"+pid,function(data){
				ProjectCollectionFunction(data);
			})
		}
	}
});
