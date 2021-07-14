import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import firebase from '../../../config/firebase';
import '../../../styles/css/story.css';
import heart_item from './heart.png';

function story(props) {
    const storyID = props.match.params.id;
    const {story} = props;
    const [storyDetail, setStoryDetail] = useState(null);

    useEffect(() => {
        const db = firebase.firestore();
        let unsubscribe;
        db
            .collection('stories')
            .doc(storyID)
            .get()
            .then(doc => {
                if (doc.exists) {
                    unsubscribe = db
                        .collection('stories')
                        .doc(storyID)
                        .onSnapshot((snapshot => {
                            setStoryDetail(snapshot.data())
                        }));
                } else {
                    const confirm = window.confirm("can't find a story on this id");
                    if (confirm) {
                        props.history.push(`/`);
                    } else {
                        props.history.push(`/`);
                    }
                }
            }).catch(error => {
            console.log(error);
        })

        return () => unsubscribe;
    }, []);

    useEffect(() => {
        if (story.name === '') {
            props.history.push(`/story/${storyID}/name`);
        }
    }, []);

    function formSubmit(event) {
        event.preventDefault();

        const updatedStory = storyDetail.story;
        const myStory = event.target.elements.story.value;
        updatedStory.push({
            name: story.name,
            myStory: myStory
        });

        firebase.firestore()
            .collection('stories')
            .doc(storyID)
            .update({story: updatedStory})
            .then(() => {
                event.target.elements.story.value = '';
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <div className="container-fluid nav-container">
                <form onSubmit={formSubmit}>
                    <div className="row">
                        <div
                            className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 d-flex align-items-center justify-content-center">
                            <h3 className="text-white text-center">{storyDetail && storyDetail.storyName}</h3>
                        </div>
                        <div
                            className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 d-flex align-items-center justify-content-center">
                            <textarea className="form-control txtStory" required name="story"/>
                        </div>
                        <div
                            className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 pt-2 pt-sm-2 pt-md-2 pt-lg-2 pt-xl-2 text-center d-flex align-items-center justify-content-center">
                            <button type="submit" className="btn btn-warning pl-5 pr-5">Submit</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="container-fluid story-container">
                <div className="row">
                    {
                        storyDetail && storyDetail.story.length > 0 ?
                            storyDetail.story.map((item, index) => (
                                <div key={index} className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-3">
                                    <div className="card p-3">
                                        <h5 className="story-card-heading">{index + 1}) {item.name}</h5>
                                        <p>{item.myStory}</p>
                                    </div>
                                </div>
                            ))
                            :
                            <div className="col-12">
                                <h3 className="text-white text-center">Waiting for your awesome imagination</h3>
                            </div>
                    }
                </div>
            </div>

            <div style={{backgroundColor: "#707474", height: 50}}>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="copyright">
                                <div>
                                    <p className="copyright-text mb-0 mt-2">
                                        Copyright &copy;
                                        {
                                            ' ' + new Date().getFullYear()+ ' '
                                        }
                                        All rights reserved | Made with <img style={{width: 25}} src={heart_item} alt=""/> by
                                        Shamal
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const mapStateToProps = (state) => ({
    story: state.story
});

export default withRouter(connect(mapStateToProps)(story));