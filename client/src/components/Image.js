import React, { Fragment, useState, useEffect } from 'react';

const Image = (data) => {
  const [Img, setImg] = useState();
  //   console.log(data.data.data);
  useEffect(() => {
    // arrayBufferToBase64((buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(data.data.data));

    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    var base64Flag = 'data:image/jpeg;base64,';
    var imageStr = window.btoa(binary);
    setImg(base64Flag + imageStr);

    // });
  }, []);

  // setImg(buffer) => {
  //     var binary = '';
  //     var bytes = [].slice.call(new Uint8Array(buffer));
  //     bytes.forEach((b) => binary += String.fromCharCode(b));
  //     var base64Flag = 'data:image/jpeg;base64,';
  //     var imageStr = window.btoa(binary);
  //     return ()
  // };

  return (
    <Fragment>
      <img src={Img} alt='Helpful alt text' />
    </Fragment>
  );
};

export default Image;
// class Image extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             img: ''
//         };
//     };
//     arrayBufferToBase64(buffer) {
//         var binary = '';
//         var bytes = [].slice.call(new Uint8Array(buffer));
//         bytes.forEach((b) => binary += String.fromCharCode(b));
//         return window.btoa(binary);
//     };
//     componentDidMount() {
//         fetch('http://yourserver.com/api/img_data')
//         .then((res) => res.json())
//         .then((data) => {
//             var base64Flag = 'data:image/jpeg;base64,';
//             var imageStr =
//                 this.arrayBufferToBase64(data.img.data.data);
//             this.setState({
//                 img: base64Flag + imageStr
//             )}
//         })
//     }
//     render() {
//         const {img} = this.state;
//         return (
//             <img
//                 src={img}
//                 alt='Helpful alt text'/>
//         )
//     }
// export default Image;
