import React, { Fragment } from 'react'
import { ChangePassword } from '../components/Profile/ChangePassword'
import { ChangeNickname } from '../components/Profile/ChangeNickname'

function ProfilePage() {
    return (
        <Fragment>
            <ChangePassword />
            <ChangeNickname />
        </Fragment>
    )
}

export default ProfilePage