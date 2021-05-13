import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import firebase from '../../../config/firebase';
import '../../../styles/css/story.css';

function story(props) {
    const storyID = props.match.params.id;
    const {story} = props;
    const [storyDetail, setStoryDetail] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase;
        firebase.firestore()
            .collection('stories')
            .doc(storyID)
            .get()
            .then(doc => {
                if (doc.exists) {
                    firebase.firestore()
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

        return () => unsubscribe()
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
                        <div className="col-3 d-flex align-items-center justify-content-center">
                            <h3 className="text-white text-center">{storyDetail && storyDetail.storyName}</h3>
                        </div>
                        <div className="col-7 d-flex align-items-center justify-content-center">
                            <textarea className="form-control txtStory" required name="story"/>
                        </div>
                        <div className="col-2 text-center d-flex align-items-center justify-content-center">
                            <button type="submit" className="btn btn-warning pl-5 pr-5">Submit</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="container-fluid mt-5">
                <div className="row">
                    {
                        storyDetail && storyDetail.story.length > 0 ?
                            storyDetail.story.map((item, index) => (
                                <div key={index} className="col-4 mb-3">
                                    <div className="card p-3">
                                        <h5 className="story-card-heading">{index+1}) {item.name}</h5>
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
        </>
    );
}

export const mapStateToProps = (state) => ({
    story: state.story
});

export default withRouter(connect(mapStateToProps)(story));