import React from 'react'
import styled from 'styled-components';

const Card = ({title, leftLabel, rightLabel, description, imgSrc}) => {
    return (
        <CardStyled >
            <div className="container">
                <div className="card-body">
                    <img src={imgSrc}></img>
                    <p>{description}</p>
                    <span className="rightLabel">{leftLabel}</span>
                    <span className="leftLabel">{rightLabel}</span>
                </div>
                <div className="card-footer">
                    <h4>{title}</h4>
                </div>
            </div>
        </CardStyled >
    )
};

const CardStyled = styled.div`
    background-color: var(--background-light-space);
    border-left: 1px solid var(--border-color);
    border-top: 8px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    transition: all .4s ease-in-out;
    width: 200px;

    @media screen and (min-width:1200px){
        width: 300px;
        margin: 1rem 1rem 1rem 1rem;
    }
    
    &:hover {
        border-top: 8px solid var(--primary-color);
        transform: translateY(5px);
    }
    .container {
        padding: .5rem;
        .card-body {
            min-height: 250px;
            align-items: center;
            @media screen and (min-width:1200px){
                min-height: 350px;
            }
            img {
                max-width: 450px;
                max-height: 240px;
                margin: auto;
                display: block;
                @media screen and (min-width:1200px){
                    max-width: 550px;
                    max-height: 340px;
                }
            }
            p {
                text-align: left;
                display: none;
            }
            span {
                padding: .5rem;
                font-size: small;
                display: none;
            }
            .leftLabel {
                position: absolute;
                bottom: 0;
                left: 0;
            }
            .rightLabel {
                position: absolute;
                bottom: 0;
                right: 0;
            }
            @media screen and (max-width:1200px){
                p {
                    font-size: medium;
                }
            }
            &:hover {
                img {
                    display: none;
                }
                p, span {
                    display: block;
                }
            }
        }
        .card-footer {
            border-top: .1rem solid var(--secondary-color);
            h4 {
                color: var(--font-color-3);
                font-size: .9rem;
                padding: 1rem;
                text-align: center;
            }
        }
    }
`;

export default Card;