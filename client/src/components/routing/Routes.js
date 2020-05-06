import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import MyPhotos from '../profile-forms/MyPhotos';
import MyProfile from '../profile-forms/MyProfile';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Photos from '../photos/Photos';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import VerificationSuccess from '../verification/VerificationSuccess';
import Recuperation from '../verification/Recuperation';
import Reset from '../verification/Reset';

import Chat from '../chat/Chat';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/profiles' component={Profiles} />
        <PrivateRoute exact path='/profile/:id' component={Profile} />

        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/my-photos' component={MyPhotos} />
        <PrivateRoute exact path='/my-profile' component={MyProfile} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/photos' component={Photos} />
        <PrivateRoute exact path='/posts/:id' component={Post} />

        <PrivateRoute exact path='/chat' component={Chat} />
        <Route
          exact
          path='/confirmation/:token'
          component={VerificationSuccess}
        />
        <Route exact path='/recuperation' component={Recuperation} />
        <Route exact path='/reset/:token' component={Reset} />

        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
