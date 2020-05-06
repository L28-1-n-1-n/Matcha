import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { verifyEmail } from '../../actions/verification';

const VerificationSuccess = ({
  verifyEmail,
  //   confirmation: { user, loading },
  match,
}) => {
  useEffect(() => {
    verifyEmail(match.params.token);
  }, [verifyEmail, match.params.token]);
  // }, []);

  console.log('token here is ');
  console.log(match.params.token);

  //   return loading || user === null ? (
  return (
    <Fragment>
      <h1 className='x-large text-primary-T'>
        <i className='fas fa-check-circle' /> Verification is Successful
      </h1>
      <p className='large'>Please login again.</p>
      <div>{}</div>
    </Fragment>
  );
};

VerificationSuccess.propTypes = {
  verifyEmail: PropTypes.func.isRequired,
  //   user: PropTypes.object.isRequired,
};

// const mapStateToProps = (state) => ({
//   user: state.user,
// });

// export default connect(mapStateToProps, { verifyEmail })(VerificationSuccess);

export default connect(null, { verifyEmail })(VerificationSuccess);

// export default VerificationSuccess;

// import React, { Fragment, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import Spinner from '../layout/Spinner';
// import PostItem from '../posts/PostItem';
// import CommentForm from '../post/CommentForm';
// import CommentItem from '../post/CommentItem';
// import { getPost } from '../../actions/post';

// const Post = ({ getPost, post: { post, loading }, match }) => {
//   useEffect(() => {
//     getPost(match.params.id);
//   }, [getPost, match.params.id]);

//   return loading || post === null ? (
//     <Spinner />
//   ) : (
//     <Fragment>
//       <Link to='/posts' className='btn'>
//         Back To Posts
//       </Link>
//       <PostItem post={post} showActions={false} />
//       <CommentForm postId={post._id} />
//       <div className='comments'>
//         {post.comments.map(comment => (
//           <CommentItem key={comment._id} comment={comment} postId={post._id} />
//         ))}
//       </div>
//     </Fragment>
//   );
// };

// Post.propTypes = {
//   getPost: PropTypes.func.isRequired,
//   post: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   post: state.post
// });

// export default connect(mapStateToProps, { getPost })(Post);
