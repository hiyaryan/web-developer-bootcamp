import { useState, useEffect } from "react";
import axios from "axios";
import ProfileSearchForm from "./ProfileSearchForm";

const BASE_URL = "https://api.github.com/users";

export default function ProfileViewerWithSearch() {
    const [username, setUsername] = useState("hiyaryan");
    const [profile, setProfile] = useState({ data: null, isLoading: true });

    useEffect(
        function fetchUserOnUsernameChange() {
            async function fetchUser() {
                const userResult = await axios.get(`${ BASE_URL }/${ username }`);
                setProfile({ data: userResult.data, isLoading: false });
            }
            fetchUser();
        }, [username]
    );

    function search(username) {
        setProfile({ data: null, isLoading: true });
        setUsername(username);
    }

    if (profile.isLoading) return <i>Loading...</i>

    return (
        <div>
            <ProfileSearchForm search={search} />
            <h3>{profile.data.name}</h3>
            <img src={profile.data.avatar_url} />
        </div>
    );
}