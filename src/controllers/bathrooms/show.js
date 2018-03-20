BathroomsShowCtrl.$inject = ['Bathroom', 'User', '$state', '$auth'];

function BathroomsShowCtrl(Bathroom, User, $state, $auth) {
  const vm = this;

  vm.bathroom = {};
  // vm.bathroom.requests = {};
  vm.userId = null;
  vm.text = '';
  vm.message = '';

  Bathroom.findById($state.params.id)
    .then(res => {
      vm.bathroom = res.data;
    });

  if($auth.getPayload()){
    User.findById($auth.getPayload().sub)
      .then(res =>  {
        vm.userId = res.data;
      });
    // console.log(vm.userId);
  }



  function remove() {
    Bathroom.remove(vm.bathroom)
      .then(() => $state.go('bathroomsIndex'));
  }

  function handleRequest() {
    Bathroom.createRequest(vm.bathroom, {user: vm.bathroom.requests._id})
      .then(res => {
        vm.bathroom = res.data;
      });
    vm.text = '';
    console.log(vm.bathroom.requests);
  }

  // function handleDialogue() {
  // if(vm.message){
  //   console.log(vm.bathroom);
  //   vm.bathroom.requests.forEach(request => {
  //     request.dialogue.push(vm.message);
  //     console.log(request.dialogue);
  //   });
  //   vm.message = '';
  //   Bathroom.update(vm.bathroom);
  // }
  // }

  function handleComment(){
    Bathroom.commentCreate($state.params.id, this.comments)
      .then(() => $state.go('bathroomsShow', {id: $state.params.id}));
    console.log(vm.bathroom.comments);
  }

  vm.remove = remove;
  vm.handleRequest = handleRequest;
  vm.handleComment = handleComment;
  // vm.handleDialogue = handleDialogue;

}

export default BathroomsShowCtrl;
