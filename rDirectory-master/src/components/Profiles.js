import React, { useEffect, useState } from 'react'

const Profiles = () => {

    const [profiles, setProfiles] = useState([])
    const [sortedProfiles, setSortedProfiles] = useState([])
    useEffect(() => {
        fetch("https://randomuser.me/api/?results=5")
            .then(res => res.json())
            .then(data => setProfiles(data.results))
    }, [])

    const sortData = () => {

        const sorted = profiles.sort((a, b) => {
            if (a.email < b.email) { return -1; }
            if (a.email > b.email) { return 1; }
            return 0;
        })

        setSortedProfiles(sorted)
    }

    const filterData = (info) => {
        const filtered = profiles.filter(profile => profile.gender !== info)
        setProfiles(filtered)
    }




    const renderProfiles = () => {
        if (profiles.length > 0) {
            return profiles.map((profile, index) => (
                <ul key={index}>
                    <li>Gender: {profile.gender}</li>
                    <li>Email: {profile.email}</li>
                    <li>Country: {profile.location.country}</li>
                </ul>
            ))
        } else {
            return <p>loading...</p>
        }
    }
    return (
        <div>
            <h2> profiles</h2>
            {renderProfiles()}
            <div>
                <button onClick={sortData}>Sort by email</button>
                <button onClick={() => filterData("male")}>Filter for females</button>
            </div>
        </div>
    )
}

export default Profiles
