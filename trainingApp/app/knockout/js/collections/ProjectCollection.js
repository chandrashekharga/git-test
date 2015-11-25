define(["ko"], function(ko) {

    return {
		getProjects: function(ProjectCollectionFunction) {
			$.getJSON("/api/projects",function(data){
				ProjectCollectionFunction(data);
			})
		}
	}
});
