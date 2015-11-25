define(["ko"], function(ko) {

    return {
		getResources: function(pid,ResourceCollectionFunction) {
			$.getJSON("/api/projects/"+pid+"/resources",function(data){

				ResourceCollectionFunction(data);
			})
		}
	}
});
