import React, {useEffect, useState} from "react";

export const LoginPage = () => {
    const [googleLink, setGoogleLink] = useState('none');
    const [githubLink, setGithubLink] = useState('none')
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // TO DO: CHANGE WHEN DEPLOYING
        fetch("http://localhost:3051/api/v1/oauth/google")
            .then(res => res.json())
            .then(
                (result) => {
                    setGoogleLink(result);
                },
                (error) => {
                    console.log(error);
                    setIsLoaded(true);
                }
            )
        // TO DO: CHANGE WHEN DEPLOYING
        fetch("http://localhost:3051/api/v1/oauth/github")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setGithubLink(result);
                },
                (error) => {
                    console.log(error);
                    setIsLoaded(true);
                }
            )
    }, []);

    if(!isLoaded)
        return (
            <>
                Loading...
            </>
        )
    return (
        <>
            <h1>Google</h1>
            Kliknij w poniższy link żeby przejść do strony logowania
            <br/>
            <a href={googleLink.url}>Login</a>
            <br/>
            <br/>
            <h1>Github</h1>
            Kliknij w poniższy link żeby przejść do strony logowania
            <br/>
            <a href={githubLink.url}>Login</a>
        </>
    );
}