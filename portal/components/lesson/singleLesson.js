apple.controller('singleLesson', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$q', 'userService', 'Upload','server',
    function($rootScope, $scope, $state, $stateParams, $http, $q, userService, Upload, server) {

    $scope.lessonId = $stateParams.lessonId;
    $scope.lessonNum = $stateParams.lessonNum;
    $scope.courseId = $stateParams.courseId;
    
    // $scope.$on('setSelectedCourse', function(event, data) { 
    //     console.log("course ID was selected: " + data); 
    //     $scope.courseId= data.courseId;
    
    // });
     
    
				
    // To get student attendance in a single lesson :
	// Function name: GetStudentsAttendance
    // Input: lessonid
    $scope.getAttendanceOfLesson = function() {
		var data = {};
		data.lessonid = $scope.lessonId;
        server.requestPhp(data, "GetStudentsAttendance").then(function(data) {
            $scope.stundentsAttandance = data;
			console.log($scope.stundentsAttandance);
        });
    }


    // attendanceStatus: "0"
    // checkstudentid: "5177"
    // firstname: "Samir"
    // image: "data/images/1500967004823.jpg"
    // lastname: "Beshtawy"
    // userid: "1182"

    // attendanceStatus: "3"
    // checkstudentid: null
    // firstname: "Galit"
    // image: ""
    // lastname: "Gelbort-Zilberman"
    // userid: "1273"

    
    $scope.getAttendanceOfLesson();

    // To get attendance option for dropdown:
	// Function name: GetAttendanceStatuses
	// Input: -
    $scope.GetAttendanceStatuses = function() {
        var data = {};
        server.requestPhp(data, "GetAttendanceStatuses").then(function(data) {
            $scope.AttendanceStatusesTags = data;
            console.log($scope.AttendanceStatusesTags);
        });
    }

    $scope.GetAttendanceStatuses();

    //  {id: "1", name: "נוכח", value: "0", IsShow: "1"}
    //  {id: "2", name: "מאחר", value: "1", IsShow: "1"}
    //  {id: "3", name: "דיווח שלא יגיע", value: "2", IsShow: "1"}
    //  {id: "4", name: ""לא דיווח, והמדריך השאיר בסטטוס "לא יגיע", value: "3", IsShow: "1"}


    

    // To update the status of a single student:
	// If the student.checkstudentid==null
	// 	Use:
	// 	Function name: AddCheckStudentStatus
	// 	Input: student, lessonid
	// Else use: 

	// 	Function name: UpdateCheckStudentStatus
    // 	Input: student, lessoned
    
    $scope.UpdateAttendeeStatus = function(student) {
        var data={};
        var async = $q.defer(); 
        if (student.checkstudentid==null) {
            data.lessonid=$scope.lessonId;
            data.status = student.attendanceStatus;
            data.student = student.userid;
            console.log(data);
            server.requestPhp(data, 'AddCheckStudentStatus').then(function (data) {
                console.log("Success in saving status");
                async.resolve(data); // --> no data came back
            }, function (err) {
                console.error(err);
                async.reject(error);
            });
            return async.promise;
        } else {
            data.lessonid=$scope.lessonId;
            data.status = student.attendanceStatus;
            data.student = student.userid;
            console.log(data);
            server.requestPhp(data, 'UpdateCheckStudentStatus').then(function (data) {
                console.log("Success in saving status");
                async.resolve(data); // --> no data came back
            }, function (err) {
                console.error(err);
                async.reject(error);
            });
            return async.promise;
        }
		
	}

    $scope.backSingleCourse = function(){
		$state.transitionTo('singleCourse', {courseId: $scope.courseId});
	};
       

}]);
