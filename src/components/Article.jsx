import React from "react";

export default function Article(props) {
    return (
        <div>
            <h4 className="media-heading">
                {props.location.state.article.title}
            </h4>
            <div className='mt-4'>
                <img className="media-object img-responsive mr-5 article-img"
                     src={props.location.state.article.urlToImage}
                     alt=''
                />
                <p>{props.location.state.article.content}</p>
                <p>For more information,
                    <a
                        className='link-color'
                        href={props.location.state.article.url}
                        rel="noopener noreferrer"
                        target="_blank">
                        click here
                    </a>
                </p>
            </div>
            <div className="media-body">
                <p className="text-right">
                    {props.location.state.article.author}
                </p>
            </div>
        </div>
    )
}