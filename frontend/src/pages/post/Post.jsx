import React, {useEffect, useState} from "react";
import TitleContainer from "../../components/titleContainer/TitleContainer";
import {useParams} from "react-router-dom";
import api from "../../api";

const Post = () => {
    const [post, setPost] = useState();
    const {id} = useParams();

    useEffect(() => {

        async function fetchData() {
            await api.get(`/news/${id}`)
                .then(response => {
                    setPost(response.data);
                })
                .catch(error => {
                    console.log("Error fetching data: ", error);
                })
        }
        fetchData();
    }, [id]);

    return (
        <div className="container">
            {post && (
            <>
                <TitleContainer title={post.title} description={"Objavljeno: " + post.dateCreated} />
                <article>
                    {post.content}
                </article>
                <p className="aboutText">
                    Autor: {post.author.firstName} {post.author.lastName}
                </p>
            </>
            )}
        </div>
    )
}

export default Post;