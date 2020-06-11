import io from 'socket.io-client';

export const socket = io.connect('http://localhost:5000');

export const forceRefresh = (userID) => async () => {
  console.log('force front reached');
  console.log(userID);
  try {
    var userList = [];
    socket.emit('initialList', userList);
    await socket.on('listupdate', (list) => {
      userList.concat(list);
      console.log(userList);
      console.log(list);
      let tmp = list.findIndex((x) => x.user === userID);
      // If user is online
      if (tmp !== -1) {
        socket.emit('initiateRefresh', userID, list[tmp].sid);
      }
    });
    console.log('here, userList is ', userList);
    //   const res = await axios.get('/api/posts');
    //   console.log(res);
    //   dispatch({
    //     type: GET_POSTS,
    //     payload: res.data,
    //   });
  } catch (err) {
    console.log(err);
  }
};

//   //Message from server
//   socket.on('logchannel', (message) => {
//     console.log(message);
//     socid = message;
//     console.log('socid five', socid);

//     if (user && socid) {
//       connDetails = { user: user._id, name: user.firstname, sid: socid };
//       console.log(connDetails);
//       socket.emit('lol', connDetails);
//     }
//     // setMessageList(messageList);
//     // outputMessage(message);
//   });
//   if (targetSoc) {
//     socket.emit('newChatMessage', transMsg, targetSoc.sid);
//   }
