import React from 'react'

interface Props {
    params: {
        id: string
    }
}

const UserProfilePage = ({ params: { id } }: Props) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <h1>ProfilePage</h1>
            <hr />
            <p className="text-4xl">Profile Page for {id}</p>
        </div>
    )
}

export default UserProfilePage
