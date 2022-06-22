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
        <div className='login-page'>
            <h1 className='google'>Google</h1>
            Kliknij w poniższy link żeby przejść do strony logowania
            <br/>
            <span className='google-link'><a href={googleLink.url}>Login</a></span>
            <br/>
            <br/>
            <h1 className='github'>Github</h1>
            Kliknij w poniższy link żeby przejść do strony logowania
            <br/>
            <span className='github-link'><a href={githubLink.url}>Login</a></span>
        </div>
    );
}