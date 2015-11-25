define(["sammy", "ko"], function(Sammy, ko) {
    return Sammy(function() {
        this.get('/', function() {
            this.render("templates/projects.html").replace('#container').then(function() {
                require(['viewModel/ProjectWithCollection', 'collections/ProjectCollection'], function(ViewModel, ProjectCollection) {
					ProjectCollection.getProjects(function(data) {
						ko.applyBindings(new ViewModel(data), document.getElementById('projectContainer'));
					});
                })
            });
        });
		this.get('/#projects/:id/resources', function() {
		var pid = this.params.id;
            this.render("templates/resources.html").replace('#container').then(function() {			
                require(['viewModel/ResourceWithCollection', 'collections/resourceCollection'], function(ResourceViewModel, ResourceCollection) {							
					ResourceCollection.getResources(pid,function(data) {
						ko.applyBindings(new ResourceViewModel(data), document.getElementById('resourceContainer'));
					});   
                })
            });
			this.render("templates/resources.html").replace('#container').then(function() {
                require(['viewModel/backlogViewModel', 'collections/backlogCollection'], function(BacklogViewModel, BacklogCollection) {
					BacklogCollection.getBacklogs(pid,function(data) {
						ko.applyBindings(new BacklogViewModel(data,pid), document.getElementById('backlogContainer'));
					});   
                })
            });		
	    this.render("templates/resources.html").replace('#container').then(function() {		
                require(['viewModel/ProjectDetailViewModel', 'model/projectDetailsModel'], function(ProjectDetailViewModel, ProjectDetailCollection) {
					ProjectDetailCollection.getProjectDetail(pid,function(data) {
						ko.applyBindings(new ProjectDetailViewModel(data), document.getElementById('projectDetailContainer'));
					});
                })
            });
        });	
		this.get('/#projects/:pid/backlogs/:id/tasks', function() {	
		var pid = this.params.pid;
		var bid=this.params.id;
			console.log(pid);
            this.render("templates/tasks.html").replace('#container').then(function() {
                require(['viewModel/taskViewModel', 'collections/taskCollection'], function(TaskViewModel, TaskCollection) {
					TaskCollection.getTasks(pid,bid,function(data) {
						ko.applyBindings(new TaskViewModel(data,pid,bid), document.getElementById('taskContainer'));

					});
                  
                })
            });
        });

		
	 this.get('/#projects/:pid/backlogs/:bid/tasks/:id/entries', function() {	
		var pid = this.params.pid;
		var bid=this.params.bid;
		var tid=this.params.id;
            this.render("templates/entries.html").replace('#container').then(function() {
                require(['viewModel/entryViewModel', 'collections/entryCollection'], function(EntryViewModel, EntryCollection) {
					EntryCollection.getEntries(pid,bid,tid,function(data) {
						ko.applyBindings(new EntryViewModel(data), document.getElementById('entriesContainer'));

					});
                  
                })
            });
        });
    })
});