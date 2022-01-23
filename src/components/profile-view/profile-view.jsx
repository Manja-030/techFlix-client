import React from 'react';

import UpdateProfile from "./update-profile";
import FavMovies from "./fav-movies";


function ProfileView(user) {

  return(
    <UpdateProfile />
    <FavMovies />
  )
}

export default ProfileView;
